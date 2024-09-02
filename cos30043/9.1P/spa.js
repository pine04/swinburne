const app = Vue.createApp({});

app.component("my-menu", {
    data() {
        return {
            tabs: [
                { displayText: "Name Test", route: "name_test" },
                { displayText: "Post Management", route: "post_management" },
                { displayText: "Student Marks", route: "student_marks" }
            ]
        };
    },
    template: `
        <nav class="menu my-4">
            <router-link v-for="tab in tabs" :to="\`/\${tab.route}\`">
                {{tab.displayText}}
            </router-link>
        </nav>
    `
});

const NameTestAppComponent = {
    data() {
        return {
            strName: ""
        }
    },
    template: `
        <h1>String Test</h1>
        <label>
            Please enter your name:
            <input type="text" name="name" v-model="strName">
        </label>
        <div v-show="strName.trim() !== ''">
            <p v-show='strName.trim().toLowerCase() === "tung"'>Awesome name.</p>
            <p v-show='strName.trim().toLowerCase() !== "tung"'>{{strName}} is not my name.</p>
        </div>
    `
};

const PostManagementAppComponent = {
    data() {
        return {
            newStatus: "",
            statuses: []
        }
    },
    template: `
        <h1>Post management</h1>
        <label class="me-2 my-3">
            Status: <input type="text" v-model="newStatus">
        </label>
        <button type="button" @click="add()" class="btn btn-primary">Post</button>
        <p v-for="(status, index) in statuses">
            {{status}}
            <button type="button" @click="remove(index)" class="btn btn-danger">Delete</button>
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

const StudentMarksAppComponent = {
    components: {
        "paginate": VuejsPaginateNext
    },
    data() {
        return {
            page: 1,
            students: [
                {"name": "Alice", "mark": 50},
                {"name": "Bob", "mark": 52},
                {"name": "Charlie", "mark": 54},
                {"name": "David", "mark": 56},
                {"name": "Eve", "mark": 58},
                {"name": "Frank", "mark": 60},
                {"name": "Grace", "mark": 62},
                {"name": "Hannah", "mark": 64},
                {"name": "Isaac", "mark": 66},
                {"name": "Jack", "mark": 68},
                {"name": "Katherine", "mark": 70},
                {"name": "Liam", "mark": 72},
                {"name": "Mia", "mark": 74},
                {"name": "Noah", "mark": 76},
                {"name": "Olivia", "mark": 78},
                {"name": "Paul", "mark": 80},
                {"name": "Quinn", "mark": 82},
                {"name": "Ruby", "mark": 84},
                {"name": "Sophia", "mark": 86},
                {"name": "Thomas", "mark": 88},
                {"name": "Uma", "mark": 90},
                {"name": "Victor", "mark": 92},
                {"name": "Willow", "mark": 94},
                {"name": "Xander", "mark": 96},
                {"name": "Yara", "mark": 98},
                {"name": "Zachary", "mark": 100}
            ]
        };
    },
    template: `
        <h1>Student marks</h1>
        <div class="table-responsive">
            <table class="table table-striped">
                <caption>Table 1: Student marks</caption>
                <thead>
                    <tr>
                        <th scope="col" id="name">Student Name</th>
                        <th scope="col" id="marks">Marks</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="student in studentsInPage">
                        <td headers="name">{{student.name}}</td>
                        <td headers="marks">{{student.mark}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <paginate
            v-model="page"
            :page-count="Math.ceil(students.length / 3)"
        >
        </paginate>
    `,
    computed: {
        studentsInPage() {
            const start = (this.page - 1) * 3;
            return this.students.slice(start, start + 3);
        }
    }
}

const routes = [
    { path: "/", component: NameTestAppComponent },
    { path: "/name_test", component: NameTestAppComponent },
    { path: "/post_management", component: PostManagementAppComponent },
    { path: "/student_marks", component: StudentMarksAppComponent }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: routes
});

app.use(router);
app.mount("#app");