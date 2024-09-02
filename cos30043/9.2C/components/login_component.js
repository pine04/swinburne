const LoginComponent = {
    data() {
        return {
            store,
            username: "",
            password: "",
            error: ""
        };
    },
    template: `
        <form class="login-form" @submit="handleLogin">
            <h1 class="text-center">Login</h1>
            <p class="text-danger text-center">{{error}}</p>
            <label class="d-block mb-3 form-label">
                Username: <input type="text" name="username" class="form-control" v-model="username">
            </label>
            <label class="d-block mb-3 form-label">
                Password: <input type="password" name="password" class="form-control" v-model="password">
            </label>
            <p class="form-text">Hint: Username is "admin" and password is "1234567890".</p>
            <button type="submit" class="btn btn-primary">
                Log in
            </button>
        </form>
    `,
    methods: {
        handleLogin(e) {
            e.preventDefault();

            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: this.username, 
                    password: this.password
                })
            };

            fetch("/api/user.php", options)
            .then(res => res.json())
            .then(data => {
                if (data === null) {
                    this.error = "Username or password incorrect.";
                } else {
                    this.store.authenticate();
                    this.$router.replace({ path: "/dashboard" });
                }
            });
        }
    },
    mounted() {
        if (this.store.isAuthenticated) {
            this.$router.replace({ path: "/dashboard" });
        }
    }
};