<script setup>
import PostUploadForm from "@/components/PostUploadForm.vue";
import Feed from "@/components/Feed.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";

const { currentUsername } = storeToRefs(useAuthStore());
</script>

<template>
    <v-main>
        <v-container>
            <PostUploadForm></PostUploadForm>
            <Feed :source="`/api/users/${currentUsername}/news-feed`"></Feed>
        </v-container>
    </v-main>
</template>
