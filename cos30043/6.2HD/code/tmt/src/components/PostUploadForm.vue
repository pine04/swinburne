<template>
    <v-dialog v-model="dialog" max-width="900">
        <template v-slot:activator="{ props: activatorProps }">
            <v-card variant="outlined">
                <v-card-title>Write something</v-card-title>
                <v-card-text>
                    <v-text-field
                        variant="outlined"
                        hide-details
                        density="compact"
                        v-bind="activatorProps"
                    ></v-text-field>
                </v-card-text>
            </v-card>
        </template>

        <v-card>
            <v-card-title>What's on your mind?</v-card-title>

            <v-alert
                v-if="status"
                :type="status.type"
                :text="status.text"
                variant="tonal"
                class="my-5"
            ></v-alert>

            <v-form @submit="post" v-model="valid">
                <v-card-text>
                    <v-textarea
                        no-resize
                        rows="15"
                        variant="outlined"
                        v-model="postContent.textContent"
                        :rules="textContentRules"
                        counter="255"
                        :counter-value="() => postContent.textContent.length"
                        class="mb-5"
                    ></v-textarea>
                    <v-file-input
                        label="Upload photos"
                        chips
                        multiple
                        variant="outlined"
                        prepend-icon="mdi-camera"
                        v-model="postContent.mediaFiles"
                        accept="image/*"
                    ></v-file-input>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn type="button" @click="closeDialog">Cancel</v-btn>
                    <v-btn type="submit" :disabled="!valid">Post</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { reactive, ref } from "vue";

const dialog = ref(false);
const valid = ref(false);
const postContent = reactive({
    textContent: "",
    mediaFiles: []
});
const status = ref(null);

function closeDialog() {
    dialog.value = false;
}

async function post(e) {
    e.preventDefault();

    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                textContent: postContent.textContent,
                mediaFiles: postContent.mediaFiles.map((file) => file.name)
            })
        };
        const response = await fetch("/api/posts", options);
        const data = await response.json();

        for (const uploadUrl of data.mediaUploadUrls) {
            const file = postContent.mediaFiles.find((file) => file.name === uploadUrl.file);
            const uploadOptions = {
                method: "PUT",
                body: file
            };
            await fetch(uploadUrl.url, uploadOptions);
        }

        status.value = {
            type: "success",
            text: "Post uploaded."
        };

        postContent.textContent = "";
        postContent.mediaFiles = [];
    } catch (error) {
        console.log(error);

        status.value = {
            type: "error",
            text: "Cannot upload post."
        };
    }
}

const textContentRules = [
    (v) => v !== "" || "Please enter some text.",
    (v) => v.length <= 255 || "The maximum length for text content is 255 characters."
];
</script>
