import isEmail from "validator/lib/isEmail.js";

// Only the status code ever reaches the client; the vendor and its errors stay server-side.
const fail = (statusCode) => createError({ statusCode, statusMessage: "Request failed." });

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);
  const field = (name) => String(body?.[name] ?? "").trim();

  const fullName = field("fullName");
  const workEmail = field("workEmail");
  const organisation = field("organisation");

  if (!fullName || !organisation || !isEmail(workEmail)) throw fail(400);

  if (missingConfig(config).length) throw fail(503);

  try {
    await $fetch(`${config.mailerApiUrl}/addressbooks/${config.mailerAddressBookId}/emails`, {
      method: "POST",
      headers: { Authorization: `Bearer ${config.mailerApiKey}` },
      body: {
        emails: [
          {
            email: workEmail,
            variables: {
              Name: fullName,
              Organisation: organisation,
              "Team size": field("teamSize"),
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
