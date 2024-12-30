<script setup lang="ts">
import { useUserStore } from '~/stores/user';

const route = useRoute();
const date = new Date().toISOString().split('T')[0];
const menu = ref(null) as Ref<any>;
const userId = ref('') as Ref<string>;
    
const userStore = useUserStore();
userId.value = userStore.userId;
console.log('menu userId', userId.value);

watch (() => userStore.userId, (newValue, oldValue) => {
    console.log('menu userId - watch', newValue);
    userId.value = newValue;
});


const items = computed(() => [
    { title: 'Accueil', icon: 'home', to: '/' },
    { title: 'Aujourd\'hui', icon: 'sun', to: `/day/${date}/${userId.value}/overview`, disabled: !userId.value },
    { title: 'Calendrier', icon: 'calendar', to: `/calendar/${userId.value}/calendar`, disabled: !userId.value },
    { title: 'Graphiques', icon: 'chart-bar', to: `/charts/${userId.value}/overview`, disabled: !userId.value },
    { title: 'Ajouter un profil', icon: 'plus', to: '/profile/new' },
    { title: 'Mon compte', icon: 'user', to: `/profile/${userId.value}/edit`, disabled: !userId.value },
]);

const toggle: (event: any) => void = (event) => {
    menu.value.toggle(event);
};

</script>

<template>
    <div class="card flex justify-center">
        <Button type="button" icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" >
            <template #item="{ item }">
                <NuxtLink :to="`${item.to}`" :disabled="item.disabled">
                    <i class="pi pi-fw pi-{{ item.icon }}"></i>
                    <span>{{ item.title }}</span>
                </NuxtLink>
            </template>
        </Menu>
    </div>
</template>


<style scoped>
/* Your component styles go here */
</style>