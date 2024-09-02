<script setup>
    import { toRefs } from "vue";
    import TSelect from "@/components/UI/TSelect.vue";
    import materials from "@/assets/materials.json";
    import useInnerValue from "@/composables/useInnerValue";
    const sorts = [
        {
            label: "Цена по возрастанию",
            value: "price-up"
        },
        {
            label: "Цена по убыванию",
            value: "price-down"
        }
    ];
    const props = defineProps({
        modelValue: {
            type: Object,
            default: () => {}
        }
    });

    const { modelValue } = toRefs(props);
    const emit = defineEmits(["update:model-value"]);
    const innerValue = useInnerValue(modelValue, emit);
    console.log(modelValue);
</script>

<template>
    <div class="shop-filters">
        <t-select
            v-model="innerValue.sort"
            default-value="price-up"
            :items="sorts"></t-select>
        <t-select
            v-model="innerValue.material"
            default-value="1"
            label-key="name"
            value-key="id"
            :items="materials"></t-select>
    </div>
</template>

<style lang="scss" scoped>
    .shop-filters {
        display: flex;
        gap: 24px;

        @media screen and (max-width: 800px) {
            flex-direction: column;
        }
    }
</style>
