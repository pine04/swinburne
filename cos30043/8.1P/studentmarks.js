const app = Vue.createApp({ });

app.component("studentmarks-app", {
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
});

app.mount("#app");