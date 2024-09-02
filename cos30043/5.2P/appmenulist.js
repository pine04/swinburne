const app = Vue.createApp({ });

app.component("my-menu", {
    props: ["menu"],
    template: `
        <ul>
            <li v-for="menuItem in menu">
                {{ menuItem }}
            </li>
        </ul>
    `
});

app.mount("#app");