const app = Vue.createApp({ });

app.component("jsonrequest-app", {
    data() {
        return {
            posts: []
        };
    },
    template: `
        <div v-for="post in posts" class="my-3">
            <p>{{post.id}} - {{post.title}}</p>
        </div>
    `,
    mounted() {
        $.getJSON("https://jsonplaceholder.typicode.com/posts", (data) => {
            this.posts = data;
        });
    }
});

app.mount("#app");