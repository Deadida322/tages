import { computed } from "vue";

export default (value, emit) =>
    computed({
        get: () => value.value,
        set(val) {
            emit("update:model-value", val);
        }
    });
