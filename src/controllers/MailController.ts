import { Request, Response } from "express";
import { MailModel, ENV } from "../models/EmailModel";
import nodemailer, { Transporter } from 'nodemailer';

class MailController {
    private readonly transporter: Transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: ENV.USER_EMAIL_ID,
                pass: ENV.USER_EMAIL_PASSWORD,
            },
      });
    }

    sendMail = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { to, subject, html }: MailModel = req.body;

            const mailOption = {
                from: ENV.USER_EMAIL_ID,
                to,
                subject,
                html,

            };
            const info = await this.transporter.sendMail(mailOption);
            return res.status(200).json({ message: "Mail sent successfully", info: info.response });

        } catch (error) {
            return res.status(500).json({ message: "Failed to send mail", error });
        }
    };
}

export default new MailController();
