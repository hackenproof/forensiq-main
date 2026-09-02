export default {
  title: "See ForensIQ on Your Own Caseload",
  lead: "Whether you're standing up a procurement evaluation or piloting a tool with your IR team, we'll set you up with a working environment — not a slide deck.",
  fields: [
    { name: "fullName", label: "Full name", type: "text", autocomplete: "name" },
    { name: "workEmail", label: "Work email", type: "email", autocomplete: "email" },
    { name: "organisation", label: "Organisation", type: "text", autocomplete: "organization" },
    { name: "teamSize", label: "Team size / case volume", type: "number" },
  ],
  submitLabel: "Contact us",
  successMessage: "Thanks — we'll be in touch shortly.",
  failureMessage: "Something went wrong. Please email us instead.",
};
