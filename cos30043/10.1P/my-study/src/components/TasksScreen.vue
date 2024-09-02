<template>
    <div class="container">
        <h1 class="text-center">Tasks</h1>

        <div class="task-input-form">
            <label class="me-2 my-3">
                Status: <input type="text" v-model="newStatus">
            </label>
            <button type="button" @click="add()" class="btn btn-primary">Post</button>
        </div>

        <p v-for="(status, index) in statuses" :key="index" class="task">
            {{ status }}
            <button type="button" @click="remove(index)" class="btn btn-danger">Delete</button>
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newStatus: "",
            statuses: []
        }
    },
    methods: {
        add() {
            this.statuses.unshift(this.newStatus);
        },
        remove(index) {
            this.statuses = this.statuses.filter((_, i) => i !== index);
        }
    }
}
</script>

<style scoped>
.task-input-form, .task {
    width: fit-content;
    margin: 0 auto;
}

.task {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
}
</style>