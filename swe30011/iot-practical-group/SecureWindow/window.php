<?php

$connection = mysqli_connect('localhost', 'root', 'pinetar@2004', 'assignment3_smarthome');
$table = "ip_address";

?>

<!DOCTYPE html>
<html>

<head>
    <title>Tripwire Window</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script src="https://unpkg.com/mqtt@5.9.1/dist/mqtt.min.js"></script>
</head>

<body>
    <div id="command-list">
        <h1 class="text-center fs-1 my-5">Tripwire Window Control Page</h1>

        <?php
        $sql = "SELECT * FROM `$table` WHERE `id` = 1";

        $result = mysqli_query($connection, $sql);
        if ($result && mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            $ip_address = $row["ip_address"];
            $time_recorded = date_create($row["time_recorded"]);
            echo "<p class='alert alert-success mx-5' role='alert'>Camera's IP address: <a href='http://$ip_address'>$ip_address</a>. Recorded on " . date_format($time_recorded, "d/m/Y H:i:s") . ".</p>";
        } else {
            echo "<p class='alert alert-danger mx-5' role='alert'>Cannot retrieve camera's IP address at the moment.</p>";
        }
        ?>

        <div class="row gy-5 mx-auto" style="max-width: 64rem">
            <div class="col-lg-6 col-12" style="display: flex; flex-direction: column; align-items: center">
                <h2>Window intrusion status</h2>
                <iframe width="450" height="260" style="border: 1px solid #cccccc;" src="https://thingspeak.com/channels/2615476/charts/1?api_key=J5NEMX7SP4A2K5EZ&bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"></iframe>
            </div>

            <div class="col-lg-6 col-12" style="display: flex; flex-direction: column; align-items: center">
                <h2>Recent commands</h2>
                <p>This list refreshes once every 20 seconds.</p>
                <p v-if="commandFetchError" class="text-danger">{{ commandFetchError }}</p>

                <ul v-else>
                    <p v-if="commands.length === 0">No recent commands.</p>
                    <li v-for="command in commands">
                        {{ command.name }} - {{ command.time }}
                    </li>
                </ul>
            </div>
        </div>

        <div class="mx-auto my-5" style="width: fit-content">
            <p v-if="!mqttConnected" class="text-center">Not yet connected to MQTT broker. Please wait...</p>
            <button class="btn btn-primary fs-4" :disabled="!mqttConnected" @click="turnOn">Turn on tripwire</button>
            <button class="btn btn-primary fs-4 ms-5" :disabled="!mqttConnected" @click="turnOff">Turn off
                tripwire</button>
        </div>

        <h2 class="text-center fs-4"><a href="./gallery.php">View security camera photos >></a></h2>
    </div>

    <script>
        Vue.createApp({
            data() {
                return {
                    mqttConnected: false,
                    mqttClient: null,
                    commandFetchError: "",
                    commands: []
                }
            },
            mounted() {
                this.getCommands();
                this.connectToMqtt();
                setInterval(() => this.getCommands(), 20000);
            },
            methods: {
                async getCommands() {
                    try {
                        const response = await fetch("https://api.thingspeak.com/channels/2615477/fields/1.json?api_key=ZKEC3NFIBRXE3LHF&results=10");
                        const data = await response.json();
                        this.commands = data.feeds
                            .sort((a, b) => new Date(b["created_at"]) - new Date(a["created_at"]))
                            .map((e) => ({
                                name: e["field1"],
                                time: new Date(e["created_at"]).toLocaleString()
                            }));
                    } catch (error) {
                        this.commandFetchError = "An error happened while retrieving command data. Please come back later.";
                    }
                },
                connectToMqtt() {
                    const client = mqtt.connect('ws://mqtt3.thingspeak.com:80/mqtt', {
                        username: "IiQRIhAqLTofBRojHxs9EzI",
                        clientId: "IiQRIhAqLTofBRojHxs9EzI",
                        password: "q1MnAQKHGCaMqKrv6/5eO2Wz"
                    });

                    this.mqttClient = client;
                    const self = this;

                    client.on("connect", () => {
                        console.log("Connected to MQTT broker successfully.");
                        self.mqttConnected = true;
                    });
                },
                turnOn() {
                    console.log("Turning on...")
                    this.mqttClient.publish("channels/2615477/publish/fields/field1", "turn on");
                },
                turnOff() {
                    console.log("Turning off...")
                    this.mqttClient.publish("channels/2615477/publish/fields/field1", "turn off");
                }
            }
        }).mount("#command-list");        
    </script>
</body>

</html>

<?php mysqli_close($connection); ?>