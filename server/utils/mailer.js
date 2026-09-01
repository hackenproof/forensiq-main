const REQUIRED = {
  mailerApiUrl: "NUXT_MAILER_API_URL",
  mailerApiKey: "NUXT_MAILER_API_KEY",
  mailerAddressBookId: "NUXT_MAILER_ADDRESS_BOOK_ID",
};

export const missingConfig = (config) =>
  Object.entries(REQUIRED)
    .filter(([key]) => !config[key])
    .map(([, variable]) => variable);
