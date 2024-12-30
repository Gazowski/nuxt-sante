<script lang="ts" setup>
import { ColsToRemove } from '~/utils/constant';
import { handleAPI } from '~/server/helpers'

const props = defineProps<({
    title: string;
    api: string;
    data: [];
})>();

const title = ref(props.title);
const api = ref(props.api);
const data = ref(props.data);

const route = useRoute();
const userId = route.params.user;
const URLDate = route.params.date;
const columns = ref({}) as Ref<{[key: string]: string}>;
const trackedData = ref([]) as Ref<[string, string][]>;
const trackedDataModel = defineModel({type: {}, default: {}});

const filterColumns = (dataToFilter: Object): Object => {
    const colsToRemove = ColsToRemove();
    // remove object from columns if it has a key in colsToRemove
    Object.entries(dataToFilter).filter(([key,value]) => {
        if(colsToRemove.includes(key)) {
            delete dataToFilter[key];
        }
    })

    return dataToFilter;
}

async function fetchData() {
    const data = await handleAPI(`${api.value}/${userId}?date=${URLDate}`)
    if (data.value[0]) {
        const measuredData = filterColumns(data.value[0]);
        trackedDataModel.value = measuredData;
    }
    
}

async function getDataStructure () {
    const data = await handleAPI(`${api.value}/structure`)
    columns.value = data.value;
}


const initModel = (): void => {
    const model = {};
    Object.entries(trackedData.value).forEach(([key, value]) => {
        model[key] = '';
    });
    trackedDataModel.value = model;
}

const submitForm = async () => {
    const options = {
        method: 'POST',
        body: {
            userId: userId,
            measurementDate: URLDate,
            ...trackedDataModel.value
        }
    }
    const data = await handleAPI(`${api.value}`, options);
}

onMounted(async () => {
    await nextTick();
    await getDataStructure();
    trackedData.value = filterColumns(columns.value);
    initModel();
    await fetchData();
});

</script>

<template>
    <Card class="bg-gray-700 font-sans">
        <template #title>
            <h2>{{ title }}</h2>
        </template>
        <template #content>
            <form @submit.prevent="submitForm" @keydown.enter="$event.preventDefault()" class="form">
                <div v-for="(value, key) in trackedData" :key="key" class="my-4">
                    <FloatLabel>
                        <InputText :id="key" v-model="trackedDataModel[key]" size="small" class="w-full"/>
                        <label :for="key">{{ key }}</label>
                    </FloatLabel>
                </div>
                <Button type="submit" label="Submit" size="small" />
            </form>
        </template>
    </Card>
</template>

<style scoped>
.p-floatlabel:has(input.p-filled),
.p-floatlabel:has(input:focus) {
    label {
       top: -14px;
   }
}
</style>