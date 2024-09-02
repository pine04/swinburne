const units = [
    { code: 'ICT10001', desc: 'Problem Solving with ICT', cp: 12.5, type: 'Core' },
    { code: 'COS10005', desc: 'Web Development', cp: 12.5, type: 'Core' },
    { code: 'INF10003', desc: 'Introduction to Business Information Systems', cp: 12.5, type: 'Core' },
    { code: 'INF10002', desc: 'Database Analysis and Design', cp: 12.5, type: 'Core' },
    { code: 'COS10009', desc: 'Introduction to Programming', cp: 12.5, type: 'Core' },
    { code: 'INF30029', desc: 'Information Technology Project Management', cp: 12.5, type: 'Core' },
    { code: 'ICT30005', desc: 'Professional Issues in Information Technology', cp: 12.5, type: 'Core' },
    { code: 'ICT30001', desc: 'Information Technology Project', cp: 12.5, type: 'Core' },
    { code: 'COS20001', desc: 'User-Centred Design', cp: 12.5, type: 'Software Development' },
    { code: 'TNE10005', desc: 'Network Administration', cp: 12.5, type: 'Software Development' },
    { code: 'COS20016', desc: 'Operating System Configuration', cp: 12.5, type: 'Software Development' },
    { code: 'SWE20001', desc: 'Development Project 1 - Tools and Practices', cp: 12.5, type: 'Software Development' },
    { code: 'COS20007', desc: 'Object Oriented Programming', cp: 12.5, type: 'Software Development' },
    { code: 'COS30015', desc: 'IT Security', cp: 12.5, type: 'Software Development' },
    { code: 'COS30043', desc: 'Interface Design and Development', cp: 12.5, type: 'Software Development' },
    { code: 'COS30017', desc: 'Software Development for Mobile Devices', cp: 12.5, type: 'Software Development' },
    { code: 'INF20012', desc: 'Enterprise Systems', cp: 12.5, type: 'Systems Analysis' },
    { code: 'ACC10007', desc: 'Financial Information for Decision Making', cp: 12.5, type: 'Systems Analysis' },
    { code: 'INF20003', desc: 'Requirements Analysis and Modelling', cp: 12.5, type: 'Systems Analysis' },
    { code: 'ACC20014', desc: 'Management Decision Making', cp: 12.5, type: 'Systems Analysis' },
    { code: 'INF30005', desc: 'Business Process Management', cp: 12.5, type: 'Systems Analysis' },
    { code: 'INF30003', desc: 'Business Information Systems Analysis', cp: 12.5, type: 'Systems Analysis' },
    { code: 'INF30020', desc: 'Information Systems Risk and Security', cp: 12.5, type: 'Systems Analysis' },
    { code: 'INF30001', desc: 'Systems Acquisition & Implementation Management', cp: 12.5, type: 'Systems Analysis' }
];

const app = Vue.createApp({ });

app.component("app-lookup2", {
    data() {
        return {
            filters: {
                code: "",
                description: "",
                type: ""
            },
            units: units
        }
    },
    computed: {
        filteredUnits() {
            return this.units.filter(unit =>
                unit.code.includes(this.filters.code.toUpperCase()) &&
                unit.desc.toLowerCase().includes(this.filters.description.toLowerCase()) &&
                (this.filters.type === "" || unit.type === this.filters.type)
            ).sort((a, b) => a.desc.localeCompare(b.desc));
        }
    },
    template: `
        <div class="row my-3">
            <div class="col-xxl-2 col-lg-3 col-4">
                <label>
                    Code: <input type="text" v-model="filters.code" class="d-block">
                </label>
            </div>
            <div class="col-xxl-2 col-lg-3 col-4">
                <label>
                    Description: <input type="text" v-model="filters.description" class="d-block">
                </label>
            </div>
            <div class="col-xxl-2 col-lg-3 col-4">
                <fieldset>
                    <legend class="fs-6">Unit Type:</legend>
                    <label class="d-block">
                        <input type="radio" value="Core" v-model="filters.type"> Core
                    </label>
                    <label class="d-block">
                        <input type="radio" value="Software Development" v-model="filters.type"> Software Development
                    </label>
                    <label class="d-block">
                        <input type="radio" value="Systems Analysis" v-model="filters.type"> Systems Analysis
                    </label>
                    <label class="d-block">
                        <input type="radio" value="" v-model="filters.type"> All
                    </label>
                </fieldset>
            </div>
        </div>

        <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Code</th>
                        <th scope="col">Description</th>
                        <th scope="col">Credit Points</th>
                        <th scope="col">Type</th>
                        <th scope="col">More Info</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="unit in filteredUnits">
                        <td>{{unit.code}}</td>
                        <td>{{unit.desc}}</td>
                        <td>{{unit.cp.toFixed(2)}}</td>
                        <td>{{unit.type}}</td>
                        <td>
                            <router-link :to="\`/unit/\${unit.code}\`">show details</router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
});

const UnitDetailsComponent = {
    props: ["unitCode"],
    computed: {
        unit() {
            return units.find(unit => unit.code === this.unitCode);
        } 
    },
    template: `
        <h2>Unit Code: {{unit.code}}</h2>
        <ul>
            <li>{{unit.code}}</li>
            <li>{{unit.desc}}</li>
            <li>{{unit.cp}}</li>
            <li>{{unit.type}}</li>
        </ul>
    `
};

const routes = [
    { path: "/", component: { template: "<div></div>" } }, // To suppress warning.
    { path: "/unit/:unitCode", component: UnitDetailsComponent, props: true }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: routes
});

app.use(router);
app.mount("#app");