import { defineStore } from "pinia";
import { ref, watch } from "vue";
import storeItems from "@/assets/items.json";
import { getItem, setItem } from "../helpers/ls";

export const useShopStore = defineStore("shop", () => {
    const items = ref(storeItems);
    const favorite = ref(getItem("favorite") || []);
    const cart = ref(getItem("cart") || []);

    const toggleFavorite = (id) => {
        const favoriteIndex = favorite.value.indexOf(String(id));
        if (favoriteIndex === -1) {
            favorite.value.push(id);
        } else {
            favorite.value.splice(favoriteIndex, 1);
        }
    };

    const toggleCart = (id) => {
        const cartIndex = cart.value.indexOf(String(id));
        if (cartIndex === -1) {
            cart.value.push(id);
        } else {
            cart.value.splice(cartIndex, 1);
        }
    };

    watch(
        favorite,
        (val) => {
            setItem("favorite", val);
        },
        { deep: true }
    );

    watch(
        cart,
        (val) => {
            setItem("cart", val);
        },
        { deep: true }
    );
    return { items, favorite, toggleFavorite, toggleCart, cart };
});
