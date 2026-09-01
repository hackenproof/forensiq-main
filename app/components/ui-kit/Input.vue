<template>
  <div :class="[$style.field, { [$style.invalid]: error }]">
    <label :for="id" :class="$style.label">{{ label }}</label>
    <input
      :id="id"
      :class="$style.input"
      :type="type"
      :name="name"
      :placeholder="label"
      :autocomplete="autocomplete"
      :aria-invalid="error ? true : undefined"
      :aria-describedby="error ? `${id}-error` : undefined"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
    />
    <p v-if="error" :id="`${id}-error`" :class="$style.error">{{ error }}</p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: "" },
  name: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, default: "text" },
  autocomplete: { type: String, default: undefined },
  error: { type: String, default: "" },
});

defineEmits(["update:modelValue", "blur"]);

const id = useId();
</script>

<style module lang="scss">
.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.label {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.input {
  width: 100%;
  height: 58px;
  padding: 14px 18px;
  appearance: none;
  background-color: var(--FQ-grey-95);
  border: 1px solid var(--FQ-grey-85);
  border-radius: 0;
  color: #333333;
  font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
  font-size: 16px;
  line-height: 28px;
  transition:
    background-color 160ms ease,
    border-color 160ms ease;

  &::placeholder {
    color: var(--FQ-grey-65);
    opacity: 1;
  }

  &:hover {
    background-color: var(--FQ-grey-91);
  }

  &:focus,
  &:focus-visible {
    background-color: var(--FQ-white);
    border-color: var(--FQ-grey-65);
    outline: none;
  }
}

input[type="number"] {
  -moz-appearance: textfield;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  margin: 0;
  -webkit-appearance: none;
}

.invalid .input {
  background-color: var(--FQ-error-surface);
  border-color: var(--FQ-error);
}

.error {
  color: var(--FQ-error);
  font-size: 12px;
  line-height: 12px;
}
</style>
