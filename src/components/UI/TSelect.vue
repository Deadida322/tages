<script setup>
    import { toRefs } from "vue";
    import arrow from "@/assets/icons/arrow.svg";
    import useInnerValue from "../../composables/useInnerValue";
    const props = defineProps({
        modelValue: {
            type: [String, Number],
            default: ""
        },
        items: {
            type: Array,
            default: () => []
        },
        label: {
            type: String,
            default: ""
        },
        placeholder: {
            type: String,
            default: "Выберите значение"
        },
        inline: {
            type: Boolean,
            default: false
        },
        defaultValue: {
            type: String,
            default: ""
        },
        labelKey: {
            type: String,
            default: "label"
        },
        valueKey: {
            type: String,
            default: "value"
        }
    });

    const { modelValue, defaultValue } = toRefs(props);
    const emit = defineEmits(["update:model-value"]);

    const innerValue = useInnerValue(modelValue, emit);

    const initDefault = () => {
        if (defaultValue.value && !modelValue.value) {
            innerValue.value = defaultValue.value;
        }
    };

    initDefault();
</script>

<template>
    <div
        class="select"
        :class="{ select_inline: inline }">
        <arrow class="arrow"></arrow>
        <label
            class="select__label"
            for="select"
            >{{ label }}
        </label>

        <select
            id="select"
            v-model="innerValue"
            class="select__options"
            name="select">
            <option value="">{{ placeholder }}</option>
            <option
                v-for="item in items"
                :key="item.value"
                :value="item[valueKey]">
                {{ item[labelKey] }}
            </option>
        </select>
    </div>
</template>

<style lang="scss">
    .select {
        position: relative;
        &__options {
            height: 40px;
            padding: 9px 16px;
            background-color: rgb(242 242 242);
            border: none; /* Firefox */ /* Safari and Chrome */
            appearance: none;
            min-width: 288px;
            width: 100%;
        }

        .arrow {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
        }
    }
</style>
