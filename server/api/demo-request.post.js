import { validateDemoRequest } from "#shared/demo-request-validation";

const fail = (statusCode) => createError({ statusCode, statusMessage: "Request failed." });
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);
  const field = (name) => String(body?.[name] ?? "").trim();

  const values = {
    fullName: field("fullName"),
    workEmail: field("workEmail"),
    organisation: field("organisation"),
    teamSize: field("teamSize"),
  };

  if (Object.keys(validateDemoRequest(values)).length) throw fail(400);

  if (missingConfig(config).length) throw fail(503);

  try {
    await $fetch(`${config.mailerApiUrl}/addressbooks/${config.mailerAddressBookId}/emails`, {
      method: "POST",
      headers: { Authorization: `Bearer ${config.mailerApiKey}` },
      body: {
        emails: [
          {
            email: values.workEmail,
            variables: {
              Name: values.fullName,
              Organisation: values.organisation,
              "Team size": values.teamSize,
            },
          },
        ],
      },
    });
  } catch (error) {
    console.error(`Demo request rejected upstream (${error?.statusCode ?? "no response"})`);
    throw fail(502);
  }

  return { ok: true };
});
