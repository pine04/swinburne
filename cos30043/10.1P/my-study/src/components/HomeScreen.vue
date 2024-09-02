<template>
    <h1 class="text-center">
        Welcome {{ firstName }} {{ lastName }}!
    </h1>

    <p class="text-center">What is your name?</p>

    <div class="name-fields">
        <label>
            First Name <input type="text" name="firstName" v-model="firstName">
        </label>
        <label>
            Last Name <input type="text" name="lastName" v-model="lastName">
        </label>
    </div>

    <div class="radio-container">
        <label>
            <input type="radio" name="picture" value="mountain" v-model="picture"> Mountain
        </label>
        <label>
            <input type="radio" name="picture" value="tree" v-model="picture"> Tree
        </label>
    </div>

    <img v-show="picture === 'mountain'" src="../assets/mountain.jpg" alt="Image of mountain.">
    <img v-show="picture === 'tree'" src="../assets/tree.jpg" alt="Image of tree">
</template>

<script>
export default {
    data() {
        return {
            firstName: "",
            lastName: "",
            picture: "mountain"
        };
    }
}
</script>

<style scoped>
.name-fields {
    margin: 0 auto;
    width: fit-content;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.radio-container {
    display: flex;
    gap: 1rem;
    width: fit-content;
    margin: 2rem auto;
}

img {
    display: block;
    margin: 0 auto;
}
</style>