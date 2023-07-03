import MailJet from "node-mailjet";

import { env } from "./env";

export const mailClient = MailJet.apiConnect(
  env("MAILJET_API_KEY"),
  env("MAILJET_API_SECRET")
);

type SendEmailArgs = { to: string; subject: string; htmlPart: string };

export const sendEmail = async ({ to, subject, htmlPart }: SendEmailArgs) =>
  mailClient.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "me@snamoah.dev",
          Name: "SurveyFly",
        },
        To: [
          {
            Email: to,
          },
        ],
        Subject: subject,
        HTMLPart: htmlPart,
      },
    ],
  });
