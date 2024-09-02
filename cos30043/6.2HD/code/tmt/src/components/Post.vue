<template>
    <v-card variant="flat" v-if="postData !== null">
        <v-card-title>
            <v-list-item>
                <template v-slot:prepend>
                    <v-avatar image="/default_avatar.jpg"></v-avatar>
                </template>

                <v-list-item-title>
                    {{ postData.post.author.displayName }}
                </v-list-item-title>

                <v-list-item-subtitle> @{{ postData.post.author.username }} </v-list-item-subtitle>

                <template v-if="postData.post.author.username === currentUsername" v-slot:append>
                    <v-menu>
                        <template v-slot:activator="{ props }">
                            <v-btn icon="mdi-dots-vertical" variant="flat" v-bind="props"></v-btn>
                        </template>

                        <v-list>
                            <v-list-item @click="openEditDialog"> Edit </v-list-item>
                            <v-list-item @click="openDeleteDialog"> Delete </v-list-item>
                        </v-list>
                    </v-menu>

                    <v-dialog
                        v-model="editDialog"
                        @after-leave="exitEditDialog"
                        max-width="600"
                        persistent
                    >
                        <v-card>
                            <v-card-title>Edit post</v-card-title>

                            <v-alert v-if="editError" type="error" variant="tonal" :text="editError" class="my-5"></v-alert>

                            <v-card-text>
                                <v-textarea
                                    v-model="editedPostText"
                                    no-resize
                                    rows="15"
                                    variant="outlined"
                                ></v-textarea>
                            </v-card-text>

                            <v-card-actions>
                                <v-btn type="button" @click="exitEditDialog">Cancel</v-btn>
                                <v-btn
                                    type="submit"
                                    color="primary"
                                    variant="tonal"
                                    @click="handleEdit"
                                    >Edit</v-btn
                                >
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <v-dialog v-model="deleteDialog" max-width="400">
                        <v-card>
                            <v-card-title>Delete post</v-card-title>

                            <v-alert v-if="deleteError" type="error" variant="tonal" :text="deleteError" class="my-5"></v-alert>

                            <v-card-text>
                                Do you want to delete this post? This action cannot be undone.
                            </v-card-text>

                            <v-card-actions>
                                <v-btn type="button" @click="exitDeleteDialog">Cancel</v-btn>
                                <v-btn
                                    type="submit"
                                    color="error"
                                    variant="tonal"
                                    @click="handleDelete"
                                    >Delete</v-btn
                                >
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </template>
            </v-list-item>
        </v-card-title>

        <v-card-text>
            <p v-for="paragraph in paragraphs" class="my-2">
                {{ paragraph }}
            </p>

            <v-dialog v-if="mediaThumbnails.length > 0" v-model="mediaDialog" max-width="1400">
                <template v-slot:activator="{ props: activatorProps }">
                    <v-row dense class="mt-2">
                        <v-col
                            v-for="(thumbnail, index) in mediaThumbnails"
                            :cols="layout[mediaThumbnails.length][index]['cols']"
                        >
                            <v-img
                                :src="thumbnail"
                                width="100%"
                                max-height="250"
                                :aspect-ratio="layout[mediaThumbnails.length][index]['aspectRatio']"
                                cover
                                v-hover
                                v-bind="activatorProps"
                            >
                                <v-overlay
                                    v-if="index === 3"
                                    contained
                                    :model-value="true"
                                    persistent
                                    class="justify-center align-center"
                                >
                                    <v-icon
                                        icon="mdi-plus"
                                        size="96"
                                        color="rgba(255, 255, 255, 0.5)"
                                    ></v-icon>
                                </v-overlay>
                            </v-img>
                        </v-col>
                    </v-row>
                </template>

                <v-carousel :continuous="false">
                    <v-carousel-item
                        v-for="media in postData.post.media"
                        :src="media"
                        color="black"
                        draggable="false"
                    ></v-carousel-item>
                </v-carousel>
            </v-dialog>

            <p class="grey-lighten-1 font-italic">
                {{ dateFormat(postData.post.timePosted, "mmmm dS, yyyy, h:MM:ss TT") }}
            </p>
        </v-card-text>

        <v-card-actions>
            <v-btn
                prepend-icon="mdi-thumb-up"
                :ripple="false"
                :color="hasLiked ? 'primary' : ''"
                @click="handleClickOnLike"
            >
                {{ postData.post.reactions.likes }}
            </v-btn>
            <v-btn
                prepend-icon="mdi-thumb-down"
                :ripple="false"
                :color="hasDisliked ? 'primary' : ''"
                @click="handleClickOnDislike"
            >
                {{ postData.post.reactions.dislikes }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { ref, computed, defineProps, defineEmits, watchEffect } from "vue";
import dateFormat from "dateformat";

const props = defineProps(["postUri"]);
const emit = defineEmits(["delete"]);

const { currentUsername } = storeToRefs(useAuthStore());

const postData = ref(null);
const editedPostText = ref("");

watchEffect(async () => {
    try {
        const response = await fetch(props.postUri);
        const data = await response.json();
        postData.value = data;
    } catch (error) {
        console.log(error);
    }
});

const mediaThumbnails = computed(() => postData.value.post.media.slice(0, 4));
const paragraphs = computed(() => postData.value.post.textContent.split("\n"));

const layout = {
    1: [
        {
            cols: "12",
            aspectRatio: "1"
        }
    ],
    2: [
        {
            cols: "6",
            aspectRatio: "1"
        },
        {
            cols: "6",
            aspectRatio: "1"
        }
    ],
    3: [
        {
            cols: "6",
            aspectRatio: "1"
        },
        {
            cols: "6",
            aspectRatio: "1"
        },
        {
            cols: "12",
            aspectRatio: "2"
        }
    ],
    4: [
        {
            cols: "6",
            aspectRatio: "1"
        },
        {
            cols: "6",
            aspectRatio: "1"
        },
        {
            cols: "6",
            aspectRatio: "1"
        },
        {
            cols: "6",
            aspectRatio: "1"
        }
    ]
};

const mediaDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);
const editError = ref("");
const deleteError = ref("");

function openEditDialog() {
    editDialog.value = true;
    editedPostText.value = postData.value.post.textContent;
}

function exitEditDialog() {
    editDialog.value = false;
    editedPostText.value = postData.value.post.textContent;
}

async function handleEdit() {
    try {
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                textContent: editedPostText.value
            })
        };
        const response = await fetch(`/api/posts/${postData.value.post.postId}`, options);
        const data = await response.json();
        console.log(data);

        if (response.status === 200) {
            postData.value.post.textContent = editedPostText.value;
            editError.value = "";
            exitEditDialog();
        } else {
            editError.value = data.message;
        }
    } catch (error) {
        console.log(error);
    }
}

function openDeleteDialog() {
    deleteDialog.value = true;
}

function exitDeleteDialog() {
    deleteDialog.value = false;
}

async function handleDelete() {
    try {
        const response = await fetch(`/api/posts/${postData.value.post.postId}`, {
            method: "DELETE"
        });
        const data = await response.json();
        console.log(data);

        if (response.status === 200) {
            exitDeleteDialog();
            emit("delete");
        } else {
            deleteError.value = data.message;
        }
    } catch (error) {
        console.log(error);
    }
}

const hasLiked = computed(() => postData.value.reaction === "Like");
const hasDisliked = computed(() => postData.value.reaction === "Dislike");

async function like() {
    try {
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ reaction: "Like" })
        };
        const response = await fetch(
            `${props.postUri}/reactions/${currentUsername.value}`,
            options
        );
        const data = await response.json();
        console.log(data);

        if (response.status === 201) {
            postData.value.post.reactions.likes += 1;
            postData.value.reaction = "Like";
        }
    } catch (error) {
        console.log(error);
    }
}

async function dislike() {
    try {
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ reaction: "Dislike" })
        };
        const response = await fetch(
            `${props.postUri}/reactions/${currentUsername.value}`,
            options
        );
        const data = await response.json();
        console.log(data);

        if (response.status === 201) {
            postData.value.post.reactions.dislikes += 1;
            postData.value.reaction = "Dislike";
        }
    } catch (error) {
        console.log(error);
    }
}

async function removeReaction() {
    try {
        const response = await fetch(`${props.postUri}/reactions/${currentUsername.value}`, {
            method: "DELETE"
        });
        const data = await response.json();
        console.log(data);

        if (response.status === 200) {
            if (postData.value.reaction === "Like") {
                postData.value.post.reactions.likes -= 1;
            } else if (postData.value.reaction === "Dislike") {
                postData.value.post.reactions.dislikes -= 1;
            }
            postData.value.reaction = "None";
        }
    } catch (error) {
        console.log(error);
    }
}

async function handleClickOnLike() {
    if (postData.value.reaction === "Like") {
        return await removeReaction();
    }

    if (postData.value.reaction === "Dislike") {
        await removeReaction();
    }

    await like();
}

async function handleClickOnDislike() {
    if (postData.value.reaction === "Dislike") {
        return await removeReaction();
    }

    if (postData.value.reaction === "Like") {
        await removeReaction();
    }

    await dislike();
}
</script>
