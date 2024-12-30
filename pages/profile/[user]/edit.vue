<script lang="ts" setup>

const userName = ref<string>('');
const userEmail = ref<string>('');

const saveProfile = () => {
    // Logic to save profile
};
</script>

<template>
    <div>
        <h1>Edit Profile</h1>
        <form @submit.prevent="saveProfile">
            <div>
                <label for="name">Name:</label>
                <input id="name" v-model="userName" type="text" />
            </div>
            <div>
                <label for="email">Email:</label>
                <input id="email" v-model="userEmail" type="email" />
            </div>
            <button type="submit">Save</button>
        </form>
    </div>
</template>

<style scoped>
/* Add your styles here */
</style>