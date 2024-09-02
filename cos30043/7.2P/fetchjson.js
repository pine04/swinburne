const app = Vue.createApp({ });

app.component("fetchjson-app", {
    data() {
        return {
            units: []
        };
    },
    template: `
        <h1>Units</h1>
        <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Code</th>
                        <th scope="col">Description</th>
                        <th scope="col">Credit Points</th>
                        <th scope="col">Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="unit in units">
                        <td>{{unit.code}}</td>
                        <td>{{unit.desc}}</td>
                        <td>{{unit.cp}}</td>
                        <td>{{unit.type}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    mounted() {
        fetch("./units.json")
        .then(res => res.json())
        .then(data => this.units = data)
        .catch(error => console.log(error));
    }
});

app.mount("#app");