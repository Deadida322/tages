<script setup>
    import TBreadcrumbs from "@/components/UI/TBreadcrumbs.vue";
    import THeading from "@/components/UI/THeading.vue";
    import shopFilters from "@/components/ShopFilters.vue";
    import shopCard from "@/components/ShopCard.vue";
    import { computed, ref } from "vue";
    import { useShopStore } from "../store/shop";
    const breadcrumbs = [
        {
            label: "Главная",
            to: "/"
        },
        {
            label: "Системы хранения",
            to: "/storages"
        },
        {
            label: "Комплекты стелажных систем"
        }
    ];

    const shop = useShopStore();

    const filter = ref({});

    const shopItems = computed(() => shop.items);

    const filteredShopItems = computed(() => {
        let result = shopItems.value;
        const sortSign = filter.value.sort == "price-up" ? 1 : -1;
        if (filter.value.material) {
            result = shopItems.value.filter(
                (item) => item.material == filter.value.material
            );
        }

        return result.sort(
            (a, b) =>
                (+a.price.current_price - b.price.current_price) * sortSign
        );
    });
</script>

<template>
    <div class="main-page">
        <t-breadcrumbs :items="breadcrumbs"></t-breadcrumbs>
        <t-heading class="main-page__heading"
            >Комплекты стеллажных систем</t-heading
        >
        <shop-filters v-model="filter"></shop-filters>
        <div class="shop-container">
            <shop-card
                v-for="item in filteredShopItems"
                :key="item.id"
                class="shop-container__item"
                :item="item"></shop-card>
        </div>
    </div>
</template>

<style lang="scss">
    .main-page {
        max-width: 1488px;
        width: 100%;
        padding: 32px;

        &__heading {
            margin: 32px 0;

            @media screen and (max-width: 800px) {
                margin: 24px 0;
            }

            @media screen and (max-width: 600px) {
                margin: 18px 0;
            }
        }
    }

    .shop-container {
        margin-top: 40px;
        width: 100%;

        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-column-gap: 48px;
        grid-row-gap: 40px;

        @media screen and (max-width: 1200px) {
            grid-template-columns: repeat(3, 1fr);
        }

        @media screen and (max-width: 800px) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media screen and (max-width: 600px) {
            grid-template-columns: repeat(1, 1fr);
        }
    }
</style>
