<template>
  <FqSection id="request-demo" :class="$style.section">
    <div :class="$style.intro">
      <UiKitTypography :type="MAP.H2" as="h2" :class="$style.introTitle">
        {{ CONTENT.title }}
      </UiKitTypography>
      <UiKitTypography :type="MAP.P1" as="p" :class="$style.introLead">
        {{ CONTENT.lead }}
      </UiKitTypography>
    </div>

    <form :class="$style.form" novalidate @submit.prevent="onSubmit">
      <div :class="$style.fields">
        <UiKitInput
          v-for="field in CONTENT.fields"
          :key="field.name"
          v-model="values[field.name]"
          :name="field.name"
          :label="field.label"
          :type="field.type"
          :autocomplete="field.autocomplete"
          :error="visibleErrors[field.name]"
          @blur="touched[field.name] = true"
        />
      </div>

      <UiKitButton type="submit" large :disabled="pending" :class="$style.submit">
        {{ pending ? "Sending…" : CONTENT.submitLabel }}
      </UiKitButton>
    </form>

    <UiKitToast
      :message="status"
      :kind="status === CONTENT.failureMessage ? 'error' : 'success'"
      @dismiss="status = ''"
    />
  </FqSection>
</template>

<script setup>
import CONTENT from "./RequestDemo.data";
import { MAP } from "@/constants/typography";
import { validateDemoRequest } from "#shared/demo-request-validation";

const values = reactive(Object.fromEntries(CONTENT.fields.map((field) => [field.name, ""])));
const touched = reactive(Object.fromEntries(CONTENT.fields.map((field) => [field.name, false])));
const pending = ref(false);
const status = ref("");

const errors = computed(() => validateDemoRequest(values));

const visibleErrors = computed(() =>
  Object.fromEntries(Object.entries(errors.value).filter(([name]) => touched[name])),
);

async function onSubmit() {
  for (const field of CONTENT.fields) {
    touched[field.name] = true;
  }

  if (Object.keys(errors.value).length) return;

  pending.value = true;
  status.value = "";

  try {
    await $fetch("/api/demo-request", { method: "POST", body: { ...values } });
    status.value = CONTENT.successMessage;

    for (const field of CONTENT.fields) {
      values[field.name] = "";
      touched[field.name] = false;
    }
  } catch {
    status.value = CONTENT.failureMessage;
  } finally {
    pending.value = false;
  }
}
</script>

<style module lang="scss">
.section {
  --section-background: var(--FQ-grey-95);
  --section-content-gap: 48px;

  @include below760 {
    --section-content-gap: 24px;
  }
}

.intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
}

.introTitle {
  max-width: 14em;
  color: var(--FQ-grey-22);
  text-wrap: balance;
}

.introLead {
  max-width: 35em;
  color: var(--FQ-text-muted);
}

.form {
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 632px;
  max-width: 100%;

  @include below1920 {
    width: 600px;
  }

  @include below1440 {
    width: 548px;
  }

  @include below1200 {
    width: 428px;
  }

  @include below960 {
    width: 446px;
  }

  @include below760 {
    width: 100%;
  }
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.submit {
  min-width: 314px;

  @include below760 {
    min-width: 0;
    width: 100%;
  }
}

@include below760 {
  .intro {
    gap: 16px;
  }
}
</style>
