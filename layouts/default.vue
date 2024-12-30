<script setup lang="ts">
</script>

<template>
    <div>
        <div class="layout-intro p-4">
            <MyMenu class="absolute right-4 top-4"/>
            <slot />
        </div>
    </div>
</template>

<style scoped>
.layout-intro {
    display: grid;
    place-items: center;
    height: 100vh;
    text-align: center;
}
</style>