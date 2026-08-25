<template>
  <section id="request-demo" :class="$style.section">
    <div :class="$style.column">
      <div :class="$style.intro">
        <div :class="$style.titleBox">
          <UiKitTypography :type="MAP.H2" as="h2" :class="$style.title">
            See ForensIQ on Your Own Caseload
          </UiKitTypography>
        </div>

        <UiKitTypography :type="MAP.P1" as="p" :class="$style.lead">
          Whether you're standing up a procurement evaluation or piloting a tool with your IR team,
          we'll set you up with a working environment — not a slide deck.
        </UiKitTypography>
      </div>

      <form :class="$style.form" novalidate @submit.prevent="onSubmit">
        <UiKitInput
          v-for="field in FIELDS"
          :key="field.name"
          v-model="values[field.name]"
          :name="field.name"
          :label="field.label"
          :type="field.type"
          :autocomplete="field.autocomplete"
          :error="visibleErrors[field.name]"
          @blur="touched[field.name] = true"
        />

        <UiKitButton type="submit" fullwidth>Request demo</UiKitButton>

        <UiKitTypography
          v-if="submitted"
          :type="MAP.P2"
          as="p"
          :class="$style.notice"
          role="status"
        >
          Validation passed. This form is not connected to a backend yet.
        </UiKitTypography>
      </form>
    </div>
  </section>
</template>

<script setup>
import isEmail from "validator/lib/isEmail.js";

import { MAP } from "@/constants/typography";

const FIELDS = [
  { name: "fullName", label: "Full name", type: "text", autocomplete: "name" },
  { name: "workEmail", label: "Work email", type: "email", autocomplete: "email" },
  { name: "organisation", label: "Organisation", type: "text", autocomplete: "organization" },
  { name: "teamSize", label: "Team size / case volume", type: "text" },
];

const nameParts = (value) => value.split(/\s+/).filter((part) => /\p{L}/u.test(part));

const RULES = {
  fullName: (value) => (nameParts(value).length >= 2 ? "" : "Enter your first and last name."),

  workEmail: (value) => {
    if (!value) return "Enter your work email address.";
    return isEmail(value) ? "" : "Enter a valid email address, like email@example.com.";
  },

  organisation: (value) => (value ? "" : "Enter the name of the organisation you work for."),
};

const values = reactive(Object.fromEntries(FIELDS.map((field) => [field.name, ""])));
const touched = reactive(Object.fromEntries(FIELDS.map((field) => [field.name, false])));
const submitted = ref(false);

const errors = computed(() => {
  const result = {};

  for (const [name, rule] of Object.entries(RULES)) {
    const message = rule(values[name].trim());
    if (message) result[name] = message;
  }

  return result;
});

const visibleErrors = computed(() =>
  Object.fromEntries(
    Object.entries(errors.value).filter(([name]) => touched[name] || submitted.value),
  ),
);

function onSubmit() {
  submitted.value = true;

  for (const field of FIELDS) {
    touched[field.name] = true;
  }

  if (Object.keys(errors.value).length) {
    submitted.value = false;
  }
}
</script>

<style module lang="scss">
.section {
  @include shell;

  margin-top: var(--FQ-gap-section);
}

.column {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: var(--FQ-cta-w);
  max-width: 100%;
  margin-inline: auto;
  gap: 56px;
}

.intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  text-align: center;
}

.titleBox {
  width: 400px;
  max-width: 100%;
}

.title {
  color: var(--FQ-ink-soft);
}

.lead {
  color: var(--FQ-text-muted);
}

.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.notice {
  color: var(--FQ-text-muted);
}
</style>
