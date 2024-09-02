<script setup>
    import cart from "@/assets/icons/cart.svg?component";
    import cartChecked from "@/assets/icons/cart-checked.svg?component";
    import { computed } from "vue";
    import favorite from "@/assets/icons/favorite.svg?component";
    import { useShopStore } from "../store/shop";
    const props = defineProps({
        item: {
            type: Object,
            default: () => {}
        }
    });

    const store = useShopStore();
    const favorites = computed(() => store.favorite);
    const carts = computed(() => store.cart);

    const isCartChecked = computed(
        () => carts.value.indexOf(props.item.id) !== -1
    );

    const isFavoritesChecked = computed(
        () => favorites.value.indexOf(props.item.id) !== -1
    );
</script>

<template>
    <div class="shop-card">
        <div
            v-if="item.price.old_price"
            class="shop-card__discount">
            Скидка
        </div>
        <div class="shop-card__image-wrapper">
            <img
                class="shop-card__image"
                :src="item.image.url"
                alt="card pic" />
        </div>

        <div class="shop-card__code">{{ item.code }}</div>
        <div class="shop-card__title">{{ item.name }}</div>
        <div class="shop-card__footer card-footer">
            <div class="cart-footer__price price">
                <div
                    v-if="item.price.old_price"
                    class="price__old">
                    {{ Math.floor(item.price.old_price) }}₽
                </div>
                <div class="frice__new">
                    {{ Math.floor(item.price.current_price) }}₽
                </div>
            </div>
            <div class="cart-footer__actions actions">
                <div
                    class="actions__cart actions__item"
                    @click="store.toggleCart(item.id)">
                    <component
                        :is="isCartChecked ? cartChecked : cart"></component>
                </div>
                <div
                    class="actions__favorite actions__item"
                    @click="store.toggleFavorite(item.id)">
                    <favorite
                        :fill="
                            !isFavoritesChecked ? 'black' : 'red'
                        "></favorite>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .shop-card {
        border: 1px solid rgb(238 238 238);
        padding: 12px;
        position: relative;

        &__discount {
            position: absolute;
            top: 8px;
            left: 0;
            background-color: rgb(235 87 87);
            padding: 3px 16px;
            color: white;
        }

        &__image {
            max-height: 237px;
            max-width: stretch;
        }

        &__image-wrapper {
            display: flex;
            justify-content: center;
        }

        &__title {
            font-family: "SF UI", sans-serif;
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 10px;
        }

        &__code {
            font-family: "SF UI", sans-serif;
            font-size: 10px;
            color: rgb(136 136 136);
            margin-bottom: 6px;
        }

        .card-footer {
            display: flex;
            justify-content: space-between;
        }

        .price {
            display: flex;
            gap: 9px;

            &__old {
                text-decoration: line-through;
                color: rgb(136 136 136);
            }
        }

        .actions {
            display: flex;
            gap: 11px;

            &__item {
                cursor: pointer;
            }
        }
    }
</style>
