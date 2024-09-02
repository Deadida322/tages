<script setup>
    import { RouterLink } from "vue-router";
    defineProps({
        items: {
            type: Array,
            default: () => []
        },
        delimiter: {
            type: String,
            default: "/"
        }
    });
</script>

<template>
    <div class="breadcrumbs">
        <div
            v-for="(item, idx) in items"
            :key="item.to"
            class="breadcrumbs__item"
            :to="item.to">
            <template v-if="idx < items.length - 1">
                <router-link
                    :to="item.to"
                    class="breadcrumbs__item">
                    {{ item.label }}
                </router-link>
                <div class="breadcrumbs__delimiter">
                    {{ delimiter }}
                </div>
            </template>
            <template v-else>
                {{ item.label }}
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .breadcrumbs {
        display: flex;
        gap: 6px;
        font-size: 16px;

        &__item {
            display: flex;
            gap: 6px;

            a {
                text-decoration: none;
                color: rgb(114 119 131);

                &:hover {
                    cursor: pointer;
                    text-decoration: underline;
                }
            }
        }

        &__delimiter {
            color: rgb(114 119 131);
        }

        @media screen and (width <= 800px) {
            font-size: 12px;
        }

        @media screen and (width <= 600px) {
            font-size: 10px;
        }
    }
</style>
