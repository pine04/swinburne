<template>
    <div class="body">
        <v-form ref="formRef" class="form rounded-lg my-16">
            <h1 class="text-center my-5">Register</h1>

            <v-alert v-if="error" type="error" variant="tonal" :text="error" class="my-5"></v-alert>

            <v-stepper
                v-model="stepperValueString"
                class="elevation-0"
                :mobile="$vuetify.display.mobile"
            >
                <v-stepper-header class="elevation-0">
                    <v-stepper-item title="Login information" value="1"></v-stepper-item>
                    <v-divider></v-divider>
                    <v-stepper-item title="Basic information" value="2"></v-stepper-item>
                    <v-divider></v-divider>
                    <v-stepper-item
                        title="Additional information"
                        value="3"
                        subtitle="Optional"
                    ></v-stepper-item>
                </v-stepper-header>

                <v-stepper-window>
                    <v-container>
                        <v-stepper-window-item value="1">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="formData.username"
                                        counter="30"
                                        :counter-value="formData.username.length"
                                        :rules="usernameRules"
                                        variant="outlined"
                                        label="Username"
                                        id="username"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12">
                                    <v-text-field
                                        v-model="formData.email"
                                        :rules="emailRules"
                                        variant="outlined"
                                        label="Email"
                                        type="email"
                                        id="email"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12">
                                    <v-text-field
                                        v-model="formData.password"
                                        counter="30"
                                        :counter-value="formData.password.length"
                                        :rules="passwordRules"
                                        variant="outlined"
                                        label="Password"
                                        type="password"
                                        id="password"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12">
                                    <v-text-field
                                        v-model="formData.cfPassword"
                                        :rules="cfPasswordRules"
                                        variant="outlined"
                                        label="Confirm password"
                                        type="password"
                                        id="cfPassword"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-stepper-window-item>

                        <v-stepper-window-item value="2">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="formData.displayName"
                                        counter="50"
                                        :counter-value="formData.displayName.length"
                                        :rules="displayNameRules"
                                        variant="outlined"
                                        label="Display name"
                                        id="displayName"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-select
                                        v-model="formData.gender"
                                        :items="['Male', 'Female', 'Non-binary', 'Undisclosed']"
                                        variant="outlined"
                                        label="Gender"
                                        id="gender"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12">
                                    <v-date-input
                                        v-model="formData.birthdate"
                                        :rules="birthdateRules"
                                        label="Birthdate"
                                        variant="outlined"
                                        prepend-icon=""
                                        id="birthdate"
                                    ></v-date-input>
                                </v-col>
                            </v-row>
                        </v-stepper-window-item>

                        <v-stepper-window-item value="3">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="formData.location"
                                        counter="100"
                                        :counter-value="formData.location.length"
                                        :rules="locationRules"
                                        variant="outlined"
                                        label="Location"
                                        id="location"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-select
                                        v-model="formData.relationshipStatus"
                                        :items="[
                                            'Single',
                                            'Dating',
                                            'Engaged',
                                            'Married',
                                            'Undisclosed'
                                        ]"
                                        variant="outlined"
                                        label="Relationship status"
                                        id="relatationshipStatus"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea
                                        v-model="formData.bio"
                                        counter="255"
                                        :counter-value="() => formData.bio.length"
                                        :rules="bioRules"
                                        variant="outlined"
                                        label="Bio"
                                        id="bio"
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                        </v-stepper-window-item>
                    </v-container>
                </v-stepper-window>

                <v-stepper-actions
                    prev-text="Previous"
                    :next-text="nextButtonText"
                    @click:prev="prevStep"
                    @click:next="nextStep"
                    :disabled="disabled"
                ></v-stepper-actions>
            </v-stepper>

            <p class="text-center">
                Already have an account? <router-link to="/login">Login</router-link>
            </p>
        </v-form>
    </div>
</template>

<script setup>
import { useAuthStore } from "@/store/auth";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";

const { register } = useAuthStore();

const stepperValue = ref(1);
const stepperValueString = computed(() => stepperValue.value.toString());
const nextButtonText = computed(() => (stepperValue.value === 3 ? "Register" : "Next"));

const inputsOfStep = {
    1: ["username", "email", "password", "cfPassword"],
    2: ["displayName", "gender", "birthdate"],
    3: ["location", "relationshipStatus", "bio"]
};

const formData = reactive({
    username: "",
    email: "",
    password: "",
    cfPassword: "",
    displayName: "",
    gender: "Undisclosed",
    birthdate: null,
    location: "",
    relationshipStatus: "Undisclosed",
    bio: ""
});
const error = ref("");

const formRef = ref(null);

const router = useRouter();

async function handleRegister() {
    try {
        const { valid, errors } = await formRef.value?.validate();

        if (!valid) {
            const firstInvalidInputId = errors[0].id;
            const step = Object.keys(inputsOfStep).find((key) =>
                inputsOfStep[key].includes(firstInvalidInputId)
            );
            stepperValue.value = +step;
            return;
        }

        const { status, data } = await register(formData);

        if (status === 200) {
            router.push("/");
        } else {
            error.value = data.message;
        }
    } catch (error) {
        console.log(error);
    }
}

function nextStep() {
    if (stepperValue.value === 3) {
        handleRegister();
    } else {
        stepperValue.value++;
    }
}

function prevStep() {
    if (stepperValue.value > 1) {
        stepperValue.value--;
    }
}

const disabled = computed(() => {
    switch (stepperValue.value) {
        case 1:
            return "prev";
        default:
            return false;
    }
});

const usernameRules = [
    (v) => v !== "" || "Username is required.",
    (v) =>
        /^[a-zA-Z0-9_]*$/.test(v) ||
        "Username can only consist of alphanumeric characters and underscores.",
    (v) => v.length <= 30 || "The maximum length for username is 30 characters."
];

const emailRules = [(v) => v !== "" || "Email is required."];

const passwordRules = [
    (v) => v !== "" || "Password is required.",
    (v) =>
        /^[a-zA-Z0-9]{8,30}$/.test(v) ||
        "Password must consist of alphanumeric characters and be between 8 and 30 characters in length."
];

const cfPasswordRules = [
    (v) => v !== "" || "Please confirm your password.",
    (v) => v === formData.password || "Passwords do not match."
];

const displayNameRules = [
    (v) => v !== "" || "Display name is required.",
    (v) => v.length <= 50 || "The maximum length for display name is 50 characters."
];

const birthdateRules = [(v) => v !== null || "Birthdate is required."];

const locationRules = [
    (v) => v.length <= 100 || "The maximum length for location is 100 characters."
];

const bioRules = [(v) => v.length <= 255 || "The maximum length for bio is 255 characters."];
</script>

<style scoped>
.body {
    width: 100%;
    min-height: 100vh;
    min-height: 100dvh;
    padding: 2rem;
    background-image: url("../../public/background.png");
    background-size: cover;
}

.form {
    background-color: white;
    width: 100%;
    max-width: 48rem;
    padding: 2rem;
    margin: 0 auto;
}
</style>
