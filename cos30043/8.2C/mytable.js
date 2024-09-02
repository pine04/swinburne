const app = Vue.createApp({ });

app.component("mytable-app", {
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
        <h1 class="my-3">Units</h1>
        <div class="table-responsive">
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
    mounted() {
        fetch("./units.json")
        .then(res => res.json())
        .then(data => this.units = data)
        .catch(error => console.log(error));
    }
});

app.mount("#app");