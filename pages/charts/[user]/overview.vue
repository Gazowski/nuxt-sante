<script lang="ts" setup>
    const message = ref('Hello, World!');
</script>

<template>
    <div>
        <h1>{{ message }}</h1>
    </div>
</template>

<style scoped>
h1 {
    color: #42b983;
}
</style>