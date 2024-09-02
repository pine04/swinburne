const DashboardUpdateComponent = {
    components: {
        "paginate": VuejsPaginateNext
    },
    data() {
        return {
            page: 1,
            units: [],
            success: "",
            error: ""
        };
    },
    template: `
        <h1 class="my-3">Delete units</h1>
        <p class="text-danger">{{error}}</p>
        <p class="text-success">{{success}}</p>
        <div class="table-responsive my-3">
            <table class="table table-striped">
                <caption>Table 1: List of units</caption>
                <thead>
                    <tr>
                        <th scope="col" id="code">Code</th>
                        <th scope="col" id="desc">Description</th>
                        <th scope="col" id="cp">Credit Points</th>
                        <th scope="col" id="type">Type</th>
                        <th scope="col" id="update">Update?</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="unit in unitsInPage">
                        <td headers="code">
                            <input type="text" name="code" v-model="unit.code" class="form-control" required>
                        </td>
                        <td headers="desc">
                            <input type="text" name="description" v-model="unit.desc" class="form-control" required>
                        </td>
                        <td headers="cp">
                            <input type="text" name="cp" v-model="unit.cp" pattern="^[\\d]{1,2}\\.[\\d]{1}$" placeholder="Must be in format DD.D" class="form-control">
                        </td>
                        <td headers="type">
                            <input type="text" name="type" v-model="unit.type" class="form-control" required>
                        </td>
                        <td headers="update">
                            <button type="button" @click="updateUnit(unit.id)" class="btn btn-primary">
                                Update
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <paginate
                v-model="page"
                :page-count="Math.ceil(units.length / 5)">
            </paginate>
        </div>
    `,
    computed: {
        unitsInPage() {
            const start = (this.page - 1) * 5;
            return this.units.slice(start, start + 5);
        }
    },
    mounted() {
        fetch("/api/unit.php")
        .then(res => res.json())
        .then(data => this.units = data)
        .catch(error => console.log(error));
    },
    methods: {
        updateUnit(id) {
            const unit = this.units.find(unit => unit.id === id);

            const options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    code: unit.code,
                    desc: unit.desc,
                    cp: unit.cp,
                    type: unit.type
                })
            };

            fetch(`/api/unit.php/${id}`, options)
            .then(res => res.json())
            .then(data => {
                if (data === 1) {
                    this.success = "Successfully updated unit.";
                } else {
                    this.error = "Unit was not updated.";
                }
            })
            .catch(error => console.log(error));
        }
    }
};