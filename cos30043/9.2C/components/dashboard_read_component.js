const DashboardReadComponent = {
    components: {
        "paginate": VuejsPaginateNext
    },
    data() {
        return {
            page: 1,
            units: []
        };
    },
    template: `
        <h1 class="my-3">View units</h1>
        <button type="button" @click="refresh" class="btn btn-secondary">Refresh</button>
        <p class="my-3">Total {{units.length}} units</p>
        <div class="table-responsive my-3">
            <table class="table table-striped">
                <caption>Table 1: List of units</caption>
                <thead>
                    <tr>
                        <th scope="col" id="code">Code</th>
                        <th scope="col" id="desc">Description</th>
                        <th scope="col" id="cp">Credit Points</th>
                        <th scope="col" id="type">Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="unit in unitsInPage">
                        <td headers="code">{{unit.code}}</td>
                        <td headers="desc">{{unit.desc}}</td>
                        <td headers="cp">{{unit.cp}}</td>
                        <td headers="type">{{unit.type}}</td>
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
    methods: {
        fetchData() {
            fetch("/api/unit.php")
            .then(res => res.json())
            .then(data => this.units = data)
            .catch(error => console.log(error));
        },
        refresh() {
            this.fetchData();
        }
    },
    mounted() {
        this.fetchData();
    }
}