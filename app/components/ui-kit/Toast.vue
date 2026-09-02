<template>
  <Teleport to="body">
    <Transition
      :enter-active-class="$style.moving"
      :leave-active-class="$style.moving"
      :enter-from-class="$style.hidden"
      :leave-to-class="$style.hidden"
    >
      <div
        v-if="message"
        :class="[$style.toast, kind === 'error' && $style.error]"
        :role="kind === 'error' ? 'alert' : 'status'"
      >
        <span :class="$style.marker" aria-hidden="true" />
        <UiKitTypography :type="MAP.P2" as="p">{{ message }}</UiKitTypography>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { MAP } from "@/constants/typography";

const props = defineProps({
  message: { type: String, default: "" },
  kind: { type: String, default: "success" },
  duration: { type: Number, default: 4000 },
});

const emit = defineEmits(["dismiss"]);

let timer;

watch(
  () => props.message,
  (message) => {
    clearTimeout(timer);
    if (message) timer = setTimeout(() => emit("dismiss"), props.duration);
  },
);

const onKeydown = (event) => {
  if (event.key === "Escape" && props.message) emit("dismiss");
};

onMounted(() => window.addEventListener("keydown", onKeydown));
onUnmounted(() => {
  clearTimeout(timer);
  window.removeEventListener("keydown", onKeydown);
});
</script>

<style module lang="scss">
.toast {
  position: fixed;
  inset-inline-end: 108px;
  bottom: 32px;
  z-index: 60;
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: calc(100% - 216px);
  padding: 14px 18px;
  background-color: var(--FQ-primary);
  border: 1px solid var(--FQ-grey-85);
  color: var(--FQ-on-dark);

  @include below1440 {
    inset-inline-end: 40px;
    max-width: calc(100% - 80px);
  }

  @include below760 {
    inset-inline: 16px;
    bottom: 24px;
    max-width: calc(100% - 32px);
  }
}

.marker {
  flex: none;
  width: 5px;
  height: 5px;
  background-color: var(--FQ-accent-1);
}

.error .marker {
  background-color: var(--FQ-error);
}

.moving {
  transition:
    opacity 160ms ease,
    translate 160ms ease;
}

.hidden {
  opacity: 0;
  translate: 0 8px;
}
</style>
