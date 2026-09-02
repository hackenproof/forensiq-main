import isEmail from "validator/lib/isEmail.js";

const nameParts = (value) => value.split(/\s+/).filter((part) => /\p{L}/u.test(part));
const isValidTeamSize = (value) => /^\d+$/.test(value) && Number(value) > 0 && Number(value) <= 100;

export function validateDemoRequest(values = {}) {
  const fullName = String(values.fullName ?? "").trim();
  const workEmail = String(values.workEmail ?? "").trim();
  const organisation = String(values.organisation ?? "").trim();
  const teamSize = String(values.teamSize ?? "").trim();
  const errors = {};

  if (nameParts(fullName).length < 2) errors.fullName = "Enter your first and last name.";
  if (!workEmail) errors.workEmail = "Enter your work email address.";
  else if (!isEmail(workEmail))
    errors.workEmail = "Enter a valid email address, like email@example.com.";
  if (!organisation) errors.organisation = "Enter the name of the organisation you work for.";
  if (!isValidTeamSize(teamSize)) errors.teamSize = "Enter a whole number for your team size.";

  return errors;
}
