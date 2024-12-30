<script setup lang="ts">
import FocusTrap from 'primevue/focustrap';
import { handleAPI } from '~/server/helpers'

const showStep1 = ref(true);
const showStep2 = ref(false);
const showStep3 = ref(false);
const showStep4 = ref(false);
const currentStep = ref(1);

const name = ref('');
const email = ref('');
const selectedAvatar = ref();

const nameInput = useTemplateRef('name-input');
const emailInput = useTemplateRef('email-input');
// const vFocusTrap = FocusTrap; // important, renommer pour l'utiliser dans le template


const router = useRouter();
const toast = useToast();

const isGoToNext = async () => {
    if (currentStep.value === 1) {
        if (name.value.length > 2) {
            // showStep1.value = false;
            showStep2.value = true;
            
            await nextTick();
            currentStep.value = 2;
        }
    } else if (currentStep.value === 2) {
        if (email.value.length > 2) {
            // showStep2.value = false;
            showStep3.value = true;
            currentStep.value = 3;
        }
    } 
}

const onSelectEmoji = (emoji) => {
    console.log('onSelectEmoji', emoji)
    selectedAvatar.value = emoji;

    console.log('selectedAvatar', selectedAvatar.value)

    showStep4.value = true;
    currentStep.value = 4;
}

const submitForm = async () => {
    const options = {
        method: 'POST',
        body: {
            username: name.value,
            email: email.value,
            avatarUrl: selectedAvatar.value.i
        }
    }
    const data = await handleAPI('auth/register', options);
    console.log('data', data.value)
    if(data.value.message) {
        toast.add({ severity: 'success', summary: 'Profil créé', detail: data.value.message, life: 8000 });
        emptyForm();
        router.push('/');
    } else {
        toast.add({ severity: 'error', summary: 'Erreur', detail: data.error, life: 8000 });
        emptyForm();
    }
  

}

const showError = (msg) => {
    toast.add({ severity: 'error', summary: 'Error Message', detail: msg, life: 8000 });
};

const emptyForm = () => {
    name.value = '';
    email.value = '';
    selectedAvatar.value = '';
    showStep1.value = true;
    showStep2.value = false;
    showStep3.value = false;
    showStep4.value = false;
    currentStep.value = 1;
}


</script>

<template>
  <div>
    <Toast />
    <form @submit.prevent="submitForm" @keydown.enter="$event.preventDefault()" class="form">
        <h1 class="text-4xl m-4">Ajouter un nouveau profil</h1>
        <div class="form__content" v-focustrap>
            <div v-show="showStep1" class="form__step">
                <label for="name">Quel nom veux tu utiliser ?</label>
                <InputText @keyup.tab.enter="isGoToNext" type="text" v-model="name" ref="name-input" autofocus />
            </div>
            <div v-show="showStep2" class="form__step">
                <label for="email">ton courriel ?</label>
                <InputText @keyup.tab.enter="isGoToNext" type="email" v-model="email" ref="email-input" autofocus />
            </div>
            <div v-show="showStep3">
                <label for="avatar">Choisis un avatar: </label>
                <div v-if="selectedAvatar"> Avatar selectionné: {{ selectedAvatar.i }}</div>
                <NuxtEmojiPicker
                    :hide-search="false"
                    theme="light"
                    @select="onSelectEmoji"
                />
                <input type="hidden" v-model="selectedAvatar" />
            </div>
            <div v-show="showStep4">
                <button type="submit" :autofocus="currentStep == 4">Ajouter</button>
            </div>
        </div>
    </form>
  </div>
</template>

<style scoped>
    .form__content {
        display: grid;
        gap: 1rem;
    }

    .form__step {
        display: flex;
        gap: .5rem;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }


</style>