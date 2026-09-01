<template>
  <section id="request-demo" :class="$style.section">
    <SectionIntro
      narrow
      title="See ForensIQ on Your Own Caseload"
      lead="Whether you're standing up a procurement evaluation or piloting a tool with your IR team, we'll set you up with a working environment — not a slide deck."
    />

    <form :class="$style.form" novalidate @submit.prevent="onSubmit">
      <div :class="$style.fields">
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
      </div>

      <UiKitButton type="submit" large :disabled="pending" :class="$style.submit">
        {{ pending ? "Sending…" : "Contact us" }}
      </UiKitButton>
    </form>

    <UiKitToast
      :message="status"
      :kind="status === FAILED ? 'error' : 'success'"
      @dismiss="status = ''"
    />
  </section>
</template>

<script setup>
import isEmail from "validator/lib/isEmail.js";

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
  @include band;

  row-gap: 48px;
  background-color: var(--FQ-grey-95);

  @include below(w760) {
    row-gap: var(--FQ-gap-block);
  }

  > * {
    grid-column: content;
  }
}

.form {
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 600px;
  max-width: 100%;

  @include wide {
    width: 632px;
  }

  @include below(w1440) {
    width: 548px;
  }

  @include below(w1200) {
    width: 428px;
  }

  @include below(w960) {
    width: 446px;
  }

  @include below(w760) {
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

  @include below(w760) {
    min-width: 0;
    width: 100%;
  }
}
</style>
