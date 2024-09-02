<template>
    <div class="container">
        <h1 class="text-center">Units</h1>
        <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col" id="code">Code</th>
                        <th scope="col" id="description">Description</th>
                        <th scope="col" id="credit points">Credit Points</th>
                        <th scope="col" id="type">Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(unit, index) in units" :key="index">
                        <td headers="code">{{ unit.code }}</td>
                        <td headers="description">{{ unit.desc }}</td>
                        <td headers="credit points">{{ unit.cp }}</td>
                        <td headers="type">{{ unit.type }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import data from "../data/units.json";

export default {
    data() {
        return {
            units: data
        }
    }
}
</script>