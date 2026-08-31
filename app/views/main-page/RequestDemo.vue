<template>
  <section id="request-demo" :class="$style.section">
    <div :class="$style.column">
      <div :class="$style.intro">
        <UiKitTypography :type="MAP.H2" as="h2" :class="$style.title">
          See ForensIQ on Your Own Caseload
        </UiKitTypography>

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

        <UiKitButton type="submit" large :disabled="pending" :class="$style.submit">
          {{ pending ? "Sending…" : "Contact us" }}
        </UiKitButton>

        <UiKitTypography v-if="status" :type="MAP.P2" as="p" :class="$style.notice" role="status">
          {{ status }}
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
  { name: "teamSize", label: "Team size / case volume", type: "number" },
];

const nameParts = (value) => value.split(/\s+/).filter((part) => /\p{L}/u.test(part));
const isValidTeamSize = (value) => /^\d+$/.test(value) && Number(value) > 0 && Number(value) <= 100;

const RULES = {
  fullName: (value) => (nameParts(value).length >= 2 ? "" : "Enter your first and last name."),

  workEmail: (value) => {
    if (!value) return "Enter your work email address.";
    return isEmail(value) ? "" : "Enter a valid email address, like email@example.com.";
  },

  organisation: (value) => (value ? "" : "Enter the name of the organisation you work for."),

  teamSize: (value) => (isValidTeamSize(value) ? "" : "Enter a whole number for your team size."),
};

const SENT = "Thanks — we'll be in touch shortly.";
const FAILED = "Something went wrong. Please email us instead.";

const values = reactive(Object.fromEntries(FIELDS.map((field) => [field.name, ""])));
const touched = reactive(Object.fromEntries(FIELDS.map((field) => [field.name, false])));
const pending = ref(false);
const status = ref("");

const errors = computed(() => {
  const result = {};

  for (const [name, rule] of Object.entries(RULES)) {
    const message = rule(values[name].trim());
    if (message) result[name] = message;
  }

  return result;
});

const visibleErrors = computed(() =>
  Object.fromEntries(Object.entries(errors.value).filter(([name]) => touched[name])),
);

async function onSubmit() {
  for (const field of FIELDS) {
    touched[field.name] = true;
  }

  if (Object.keys(errors.value).length) return;

  pending.value = true;
  status.value = "";

  try {
    await $fetch("/api/demo-request", { method: "POST", body: { ...values } });
    status.value = SENT;

    for (const field of FIELDS) {
      values[field.name] = "";
      touched[field.name] = false;
    }
  } catch {
    status.value = FAILED;
  } finally {
    pending.value = false;
  }
}
</script>

<style module lang="scss">
.section {
  @include shell;

  padding-block: var(--FQ-section-py);
}

.column {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 544px;
  max-width: 100%;
  margin-inline: auto;
  gap: 56px;

  @include below(tablet) {
    gap: 32px;
  }
}

.intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--FQ-gap-intro);
  text-align: center;
}

.title {
  text-wrap: balance;

  color: var(--FQ-grey-22);
}

.lead {
  color: var(--FQ-text-muted);
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.form > :not(.submit) {
  width: 100%;
}

.form .submit {
  margin-top: 44px;

  @include below(tablet) {
    width: 100%;
    padding-block: 12px;
    margin-top: 20px;
  }
}

.notice {
  color: var(--FQ-text-muted);
}
</style>
