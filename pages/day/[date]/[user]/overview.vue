<script lang="ts" setup>
import { handleAPI } from '~/server/helpers';
import { useUserStore } from '~/stores/user';

const $route = useRoute();
const userId = ref<string | null>(null);
const user = ref<Object | null>(null);
const date = ref<string>;
const trackedDatas = ref<[] | null>(null);

const userStore = useUserStore();

userId.value = $route.params.user;
userStore.setUserId(userId.value);


trackedDatas.value = [
    {
        title: 'pression artérielle',
        api: 'bloodpressure',
        data: [],
    }
];

const formattedDate = computed(() => {
    return formatDate($route.params.date);
});

onMounted(async () => {

    // Fetch the user data

    await nextTick();
    await fetchUser(userId.value);
});

async function fetchUser(userId: string): Promise<Object> {
    // Fetch the user data from the API
    console.log('Overview - userId', userId);
    const data = await handleAPI(`user/${userId}`)
    user.value = data.value
}

const formatDate = (date: string): string => {
    // get current hours and minutes (format HH:MM:SS)
    const event = new Date();
    const currentTimestamp = event.toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'});
    const dateToFormat = new Date(`${date}T${currentTimestamp}`);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    const formattedDate = dateToFormat.toLocaleDateString('fr-CA', options);
    return formattedDate;
};
</script>

<template>
    <div>
        <div class="mx-auto text-left m-8">
            <div v-if="user" class="mb-2">{{ user.avatarUrl }} {{ user.username }}</div>
            <h1>{{ formattedDate }}</h1>
        </div>
        <p v-if="users">Users: {{ users.avatarUrl }} {{ users.username }}</p>
        <template v-for="trackedData in trackedDatas">
            <dataDayCard :title="trackedData.title" :api="trackedData.api" :data="trackedData.data" />
        </template>

        <!-- Add your template content here -->
    </div>
</template>


<style scoped>
/* Add your styles here */
</style>