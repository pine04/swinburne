#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <PubSubClient.h>
#include "soc/soc.h"
#include "soc/rtc_cntl_reg.h"
#include "esp_camera.h"

#define CAMERA_MODEL_AI_THINKER
#include "camera_pins.h"

const char *ssid = "son";
const char *password = "0983514480";

String serverName = "192.168.1.11";
String serverPath = "/upload.php";
const int serverPort = 80;

const char* mqtt_server = "mqtt3.thingspeak.com";
const char* clientId = "ESUgEgguFC8bMwgNISgcPCU";
const char* username = "ESUgEgguFC8bMwgNISgcPCU";
const char* mqtt_password = "McHpRt041efTUVMM6Ku3n+WX";

const char* commandTopic = "channels/2615477/subscribe/fields/field1";
const char* intrusionTopic = "channels/2615476/publish/fields/field1";

String requestEndpoint = "http://" + serverName + ":80" + "/ip_address.php";
String debugEndpoint = "http://" + serverName + ":80" + "/debug.php";

int tripwireStatusPin = 2;
int cameraCooldown = 10 * 1000;
int timeAtLastPhoto = -10 * 1000;
int tripwireState = HIGH;
int tripwireStatePin = 12;

unsigned long publishInterval = 60 * 1000;
unsigned long timeAtLastPublish = 0;
int intrusionsPerMinute = 0;

WiFiClient client;
PubSubClient mqttClient(client);
HTTPClient httpClient;

void startCameraServer();
void setupLedFlash(int pin);

void setup() {
  WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0); 

  pinMode(4, OUTPUT);
  pinMode(33, OUTPUT);
  pinMode(tripwireStatusPin, INPUT);
  pinMode(tripwireStatePin, OUTPUT);

  Serial.begin(115200);
  Serial.setDebugOutput(true);
  Serial.println();

  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sccb_sda = SIOD_GPIO_NUM;
  config.pin_sccb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.frame_size = FRAMESIZE_UXGA;
  config.pixel_format = PIXFORMAT_JPEG;
  config.grab_mode = CAMERA_GRAB_WHEN_EMPTY;
  config.fb_location = CAMERA_FB_IN_PSRAM;
  config.jpeg_quality = 12;
  config.fb_count = 1;

  if (config.pixel_format == PIXFORMAT_JPEG) {
    if (psramFound()) {
      config.jpeg_quality = 10;
      config.fb_count = 2;
      config.frame_size = FRAMESIZE_SVGA;
      config.grab_mode = CAMERA_GRAB_LATEST;
    } else {
      config.fb_location = CAMERA_FB_IN_DRAM;
      config.frame_size = FRAMESIZE_CIF;
    }
  } else {
    config.frame_size = FRAMESIZE_240X240;
  }

  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x\n", err);
    return;
  }

  sensor_t *s = esp_camera_sensor_get();
  Serial.println(s->id.PID);
  s->set_vflip(s, 1);
  s->set_framesize(s, FRAMESIZE_QVGA);
  s->set_hmirror(s, 1);

#if defined(LED_GPIO_NUM)
  setupLedFlash(LED_GPIO_NUM);
#endif

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  WiFi.setSleep(false);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");

  sendDebugMessage("Connected to WIFI. Starting camera server.");

  sendDebugMessage("Announcing IP to server.");
  announceIPToServer();

  startCameraServer();

  sendDebugMessage("Started camera server.");

  Serial.print("Ready! Access camera server at: 'http://");
  Serial.println(WiFi.localIP());

  mqttClient.setServer(mqtt_server, 1883);
  mqttClient.setCallback(callback);
}

void loop() {
  if (!mqttClient.connected()) {
    sendDebugMessage("Reconnecting to MQTT server.");
    reconnect();
  }
  mqttClient.loop();

  long now = millis();
  if (now - timeAtLastPublish >= publishInterval) {
    timeAtLastPublish = now;
    sendDebugMessage("Pushing message to intrusion topic.");
    publish();
  }

  digitalWrite(tripwireStatePin, tripwireState);

  if (now < 10000) {
    return;
  }

  int tripwireActivated = digitalRead(tripwireStatusPin);

  if (tripwireActivated && (millis() - timeAtLastPhoto) >= cameraCooldown) {
    sendDebugMessage("Tripwire activated. Sending photo.");
    sendPhoto();
    timeAtLastPhoto = millis();
    intrusionsPerMinute += 1;
  }
}

void publish() {
  char message[2];
  itoa(intrusionsPerMinute, message, 10);

  Serial.print("Publishing to topic: ");
  Serial.print(intrusionTopic);
  Serial.print(" - Message: ");
  Serial.print(message);

  boolean status = mqttClient.publish(intrusionTopic, message);

  if (status) {
    Serial.println(" [SUCCESS]");
  } else {
    Serial.println(" [FAILURE]");
  }

  intrusionsPerMinute = 0;
}

void callback(char* topic, byte* message, unsigned int length) {
  if (strcmp(topic, commandTopic) == 0) {
    sendDebugMessage("Received new message from command topic");

    String command;
    for (int i = 0; i < length; i++) {
      command += (char)message[i];
    }

    if (command == "turn on") {
      tripwireState = HIGH;
    } else if (command == "turn off") {
      tripwireState = LOW;
    }

    Serial.println(topic);
    Serial.println(tripwireState);
    Serial.println(command);
  }
}

void reconnect() {
  // Loop until we're reconnected
  while (!mqttClient.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (mqttClient.connect(clientId, username, mqtt_password)) {
      Serial.println("connected");
      // Subscribe
      mqttClient.subscribe(commandTopic);
    } else {
      Serial.print("failed, rc=");
      Serial.print(mqttClient.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void announceIPToServer() {
  HTTPClient http;

  http.begin(client, requestEndpoint);
  http.addHeader("Content-Type", "application/json");
  int httpResponseCode = http.POST("{\"ip_address\":\"" + WiFi.localIP().toString() + "\"}");
  
  Serial.print("Announce Request HTTP Response code: ");
  Serial.println(httpResponseCode);
    
  http.end();
}

void sendDebugMessage(String message) {
  HTTPClient http;

  http.begin(client, debugEndpoint);
  http.addHeader("Content-Type", "application/json");
  int httpResponseCode = http.POST("{\"message\":\"" + message + "\"}");
  
  Serial.print("Debug Request HTTP Response code: ");
  Serial.println(httpResponseCode);
    
  http.end();
}

void sendPhoto() {
  String getAll;
  String getBody;

  camera_fb_t * fb = NULL;
  fb = esp_camera_fb_get();
  if(!fb) {
    Serial.println("Camera capture failed");
    delay(1000);
    ESP.restart();
  }
  
  Serial.println("Sending photo to server: " + serverName);

  if (client.connect(serverName.c_str(), serverPort)) {
    Serial.println("Connection to server for this request successful!");    
    String head = "--assignment3\r\nContent-Disposition: form-data; name=\"imageFile\"; filename=\"esp32-cam.jpg\"\r\nContent-Type: image/jpeg\r\n\r\n";
    String tail = "\r\n--assignment3--\r\n";

    uint32_t imageLen = fb->len;
    uint32_t extraLen = head.length() + tail.length();
    uint32_t totalLen = imageLen + extraLen;
  
    client.println("POST " + serverPath + " HTTP/1.1");
    client.println("Host: " + serverName);
    client.println("Content-Length: " + String(totalLen));
    client.println("Content-Type: multipart/form-data; boundary=assignment3");
    client.println();
    client.print(head);
  
    uint8_t *fbBuf = fb->buf;
    size_t fbLen = fb->len;
    for (size_t n=0; n<fbLen; n=n+1024) {
      if (n+1024 < fbLen) {
        client.write(fbBuf, 1024);
        fbBuf += 1024;
      }
      else if (fbLen%1024>0) {
        size_t remainder = fbLen%1024;
        client.write(fbBuf, remainder);
      }
    }   
    client.print(tail);
    
    esp_camera_fb_return(fb);
    
    int timoutTimer = 10000;
    long startTimer = millis();
    boolean state = false;
    
    while ((startTimer + timoutTimer) > millis()) {
      Serial.print(".");
      delay(100);      
      while (client.available()) {
        char c = client.read();
        if (c == '\n') {
          if (getAll.length()==0) { state=true; }
          getAll = "";
        }
        else if (c != '\r') { getAll += String(c); }
        if (state==true) { getBody += String(c); }
        startTimer = millis();
      }
      if (getBody.length()>0) { break; }
    }
    Serial.println();
    client.stop();
    Serial.println(getBody);
  }
  else {
    getBody = "Connection to " + serverName +  " failed.";
    Serial.println(getBody);
  }
}