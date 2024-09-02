const DashboardComponent = {
    data() {
        return {
            store
        };
    },
    components: {
        "read-component": DashboardReadComponent,
        "insert-component": DashboardInsertComponent,
        "update-component": DashboardUpdateComponent,
        "delete-component": DashboardDeleteComponent
    },
    template: `
        <button type="button" class="btn btn-secondary my-4 d-block" @click="logout">Log out</button>
        <h1 class="my-4">Dashboard</h1>
        <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="read-tab" data-bs-toggle="tab" data-bs-target="#read-pane" type="button" role="tab">Read</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="insert-tab" data-bs-toggle="tab" data-bs-target="#insert-pane" type="button" role="tab">Insert</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="update-tab" data-bs-toggle="tab" data-bs-target="#update-pane" type="button" role="tab">Update</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="delete-tab" data-bs-toggle="tab" data-bs-target="#delete-pane" type="button" role="tab">Delete</button>
            </li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane fade show active" id="read-pane">
                <read-component></read-component>
            </div>
            <div class="tab-pane fade" id="insert-pane">
                <insert-component></insert-component>
            </div>
            <div class="tab-pane fade" id="update-pane">
                <update-component></update-component>
            </div>
            <div class="tab-pane fade" id="delete-pane">
                <delete-component></delete-component>
            </div>
        </div>
    `,
    methods: {
        logout() {
            this.store.unauthenticate();
            this.$router.replace({ path: "/login" });
        }
    },
    mounted() {
        if (!this.store.isAuthenticated) {
            this.$router.replace({ path: "/login" });
        }
    }
};