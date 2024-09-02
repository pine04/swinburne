<template>
    <div v-if="posts.length === 0" class="text-center text-h5 font-weight-medium my-8">
        Nothing to see here.
    </div>

    <v-infinite-scroll @load="load" ref="loader" v-show="posts.length > 0">
        <template v-for="post in posts">
            <Post :postUri="post" @delete="() => handleDeletedPost(post)"></Post>
            <v-divider class="my-4" opacity="0.4"></v-divider>
        </template>

        <template v-slot:empty>
            <p v-if="posts.length > 0" class="text-center text-h5 font-weight-medium my-8">
                That's all!
            </p>
        </template>
    </v-infinite-scroll>
</template>

<script setup>
import { ref, defineProps, watchEffect } from "vue";
import { useAuthStore } from "@/store/auth";
import Post from "./Post.vue";

const props = defineProps(["source"]);
const { setAuthenticationState } = useAuthStore();

const posts = ref([]);
let nextPage = "";

const loader = ref(null);

watchEffect(async () => {
    try {
        const response = await fetch(props.source);
        const data = await response.json();

        if (response.status === 401) {
            setAuthenticationState(false);
            return router.push("/login");
        }

        posts.value = data.posts;
        nextPage = data.nextPage;
    } catch (error) {
        console.log(error);
    }
});

async function load({ done }) {
    if (!nextPage) {
        return done("ok");
    }

    try {
        const response = await fetch(nextPage);
        const data = await response.json();

        if (response.status === 401) {
            setAuthenticationState(false);
            return router.push("/login");
        }

        if (response.status !== 200) {
            return done("error");
        }

        if (data.posts.length === 0) {
            return done("empty");
        }

        posts.value.push(...data.posts);
        nextPage = data.nextPage;
        done("ok");
    } catch (error) {
        console.log(error);
        done("error");
    }
}

function handleDeletedPost(deletedPost) {
    console.log(deletedPost + " has been deleted.");
    posts.value = posts.value.filter((post) => post !== deletedPost);
    console.log(posts.value);
}
</script>
