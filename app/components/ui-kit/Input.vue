<template>
  <div :class="[$style.field, { [$style.invalid]: invalid }]">
    <label :for="id" :class="$style.label">{{ label }}</label>
    <input
      :id="id"
      :class="$style.input"
      :type="type"
      :name="name"
      :placeholder="label"
      :autocomplete="autocomplete"
      :aria-invalid="invalid || undefined"
      :aria-describedby="invalid ? `${id}-error` : undefined"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
    />
    <p v-if="invalid" :id="`${id}-error`" :class="$style.error">{{ error }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: String, default: "" },
  name: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, default: "text" },
  autocomplete: { type: String, default: undefined },
  error: { type: String, default: "" },
});

defineEmits(["update:modelValue", "blur"]);

const id = useId();
const invalid = computed(() => Boolean(props.error));
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
  padding: 0;
  margin: -1px;
  overflow: hidden;
  border: 0;
  clip-path: inset(50%);
  white-space: nowrap;
}

.input {
  width: 100%;
  height: 58px;
  padding: 14px 18px;
  appearance: none;
  background-color: var(--FQ-surface);
  border: 1px solid var(--FQ-border-strong);
  border-radius: 0;
  color: var(--FQ-value);
  caret-color: var(--FQ-value);
  font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0;
  transition:
    background-color 160ms ease,
    border-color 160ms ease;

  &::placeholder {
    color: var(--FQ-placeholder);
    opacity: 1;
  }

  &:hover {
    background-color: var(--FQ-paper);
    border-color: var(--FQ-border-strong);
  }

  /* Figma has no focus ring: focus reads as white fill + darker border only. */
  &:focus,
  &:focus-visible {
    background-color: var(--FQ-surface-active);
    border-color: var(--FQ-marker);
    outline: none;
  }
}

.invalid .input {
  &,
  &:hover,
  &:focus,
  &:focus-visible {
    background-color: var(--FQ-error-surface);
    border-color: var(--FQ-error);
  }
}

.error {
  color: var(--FQ-error);
  font-size: 12px;
  line-height: 12px;
}
</style>
