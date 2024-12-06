import 'dotenv/config';
export const ENV = {

  USER_EMAIL_ID: process.env.USER_EMAIL_ID,
  USER_EMAIL_PASSWORD: process.env.USER_EMAIL_PASSWORD,

}

export interface MailModel {
  to: string;
  subject: string;
  html?: string;
}