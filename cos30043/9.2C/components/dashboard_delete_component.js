const DashboardDeleteComponent = {
    components: {
        "paginate": VuejsPaginateNext
    },
    data() {
        return {
            page: 1,
            units: [],
            error: ""
        };
    },
    template: `
        <h1 class="my-3">Delete units</h1>
        <p class="text-danger">{{error}}</p>
        <div class="table-responsive my-3">
            <table class="table table-striped">
                <caption>Table 1: List of units</caption>
                <thead>
                    <tr>
                        <th scope="col" id="code">Code</th>
                        <th scope="col" id="desc">Description</th>
                        <th scope="col" id="cp">Credit Points</th>
                        <th scope="col" id="type">Type</th>
                        <th scope="col" id="delete">Delete?</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="unit in unitsInPage">
                        <td headers="code">{{unit.code}}</td>
                        <td headers="desc">{{unit.desc}}</td>
                        <td headers="cp">{{unit.cp}}</td>
                        <td headers="type">{{unit.type}}</td>
                        <td headers="delete">
                            <button type="button" @click="deleteUnit(unit.id)" class="btn btn-danger">
                                Delete
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
        deleteUnit(id) {
            const options = {
                method: "DELETE"
            };

            fetch(`/api/unit.php/${id}`, options)
            .then(res => res.json())
            .then(data => {
                if (data === 1) {
                    this.units = this.units.filter(unit => unit.id !== id);
                } else {
                    this.error = "An error happened while deleting the unit. Try again later";
                }
            })
            .catch(error => console.log(error));
        }
    }
};