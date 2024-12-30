<script setup lang="ts">
import { handleAPI } from '~/server/helpers'

const { $Splitting } = useNuxtApp();
const targetRef = useTemplateRef('text-splitting');
const animationReady = ref(false) as Ref<boolean>;
const profils = ref([]) as Ref<Profil[]>;
const date = ref() as Ref<string>;

date.value = new Date().toISOString().split('T')[0];
console.log('date', date.value)


onMounted(async () => {
    if (targetRef.value) {
        animationReady.value = true;
        const textSplit = $Splitting(
            {
                target: targetRef.value,
                by: 'chars',
            }
        )
    }

    fetchProfils();
})

const fetchProfils = async () => {
    await nextTick();
    const data = await handleAPI('user');
    profils.value = data.value;
}

</script>
<template>
    <div v-show="animationReady">
        <h1 class="text-4xl m-4" ref="text-splitting" v-show="animationReady">Bonjour</h1>
            <div v-for="profil in profils" :key="profil.id">
                <NuxtLink class="m-4 px-4 py-2 bg-gray-800 block" :to="`day/${date}/${profil.id}/overview`">{{ profil.avatarUrl }} {{ profil.username }}</NuxtLink>
                <!-- add a edit sign -->
            </div>
        <NuxtLink to="/profile/new">Ajouter un nouveau profil</NuxtLink>
    </div>
</template>

<style></style>