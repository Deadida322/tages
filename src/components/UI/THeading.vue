<script setup>
    defineProps({
        title: {
            type: String,
            default: ""
        }
    });
</script>

<template>
    <h1 class="heading">
        <slot>{{ title }}</slot>
    </h1>
</template>

<style lang="scss" scoped>
    .heading {
        font-family: "SF Display", sans-serif;
        font-size: 36px;
        font-weight: 600;
        line-height: 48px;
        text-align: left;

        @media screen and (max-width: 800px) {
            font-size: 24px;
            line-height: 38px;
        }

        @media screen and (max-width: 600px) {
            font-size: 18px;
            line-height: 28px;
        }
    }
</style>
