import { createApp } from "vue";
import { createPinia } from "pinia";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import { VDateInput } from "vuetify/lib/labs/components.mjs";
import * as directives from "vuetify/directives";

import "@mdi/font/css/materialdesignicons.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.directive("hover", {
    mounted: (el) => {
        el.style.transition = "opacity 0.2s ease-in-out";

        el.addEventListener("mouseover", () => {
            el.style.opacity = "0.8";
        });

        el.addEventListener("mouseout", () => {
            el.style.opacity = "1.0";
        });
    }
});

const vuetify = createVuetify({
    components: {
        ...components,
        VDateInput
    },
    directives
});

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount("#app");
