const app = Vue.createApp({});

app.component(
    "app-mypost",
    {
        data() {
            return {
                newStatus: "",
                statuses: []
            }
        },
        template: `
            <label class="me-2 my-3">
                Status: <input type="text" v-model="newStatus">
            </label>
            <button type="button" @click="add()">Post</button>
            <p v-for="(status, index) in statuses">
                {{status}}
                <button type="button" @click="remove(index)">Delete</button>
            </p>
        `,
        methods: {
            add() {
                this.statuses.unshift(this.newStatus);
            },
            remove(index) {
                this.statuses = this.statuses.filter((_, i) => i !== index);
            }
        }
    }
);

app.mount("#app");