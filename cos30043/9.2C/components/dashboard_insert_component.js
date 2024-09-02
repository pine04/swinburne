const DashboardInsertComponent = {
    data() {
        return {
            formData: {
                code: "",
                desc: "",
                cp: "",
                type: ""
            },
            error: "",
            success: ""
        };
    },
    template: `
        <form class="my-3" @submit="handleSubmit">
            <h1>Add a unit</h1>
            <p class="text-danger">{{error}}</p>
            <p class="text-success">{{success}}</p>
            <label class="form-label d-block mb-3">
                Code: <input type="text" name="code" v-model="formData.code" class="form-control" required>
            </label>
            <label class="form-label d-block mb-3">
                Description: <input type="text" name="description" v-model="formData.desc" class="form-control" required>
            </label>
            <label class="form-label d-block mb-3">
                Credit points: <input type="text" name="cp" v-model="formData.cp" pattern="^[\\d]{1,2}\\.[\\d]{1}$" placeholder="Must be in format DD.D" class="form-control" required>
            </label>
            <label class="form-label d-block mb-3">
                Type: <input type="text" name="type" v-model="formData.type" class="form-control" required>
            </label>
            <button type="submit" class="btn btn-primary">Add</button>
        </form>
    `,
    methods: {
        handleSubmit(e) {
            e.preventDefault();

            this.success = "";
            this.error = "";

            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    code: this.formData.code,
                    desc: this.formData.desc,
                    cp: this.formData.cp,
                    type: this.formData.type
                })
            };

            fetch("/api/unit.php", options)
            .then(res => res.json())
            .then(data => {
                if (data !== 0) {
                    this.success = "Added a new unit.";
                } else {
                    this.error = "Error adding unit.";
                }
            })
            .catch(error => console.log(error));
        }
    }
};