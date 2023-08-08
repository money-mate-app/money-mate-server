import { createTransport } from "nodemailer";
import { APP_EMAIL, APP_EMAIL_PASSWORD } from "../../constants";

const MAIL_SETTINGS = {
    service: "gmail",
    auth: {
        user: APP_EMAIL,
        pass: APP_EMAIL_PASSWORD,
    },
};

export default async function sendEmail(email: string, otp: string) {
    const transporter = createTransport(MAIL_SETTINGS);
    try {
        const res = await transporter.sendMail({
            from: `MoneyMate ${MAIL_SETTINGS.auth.user}`,
            to: email,
            subject: "Email verification from MoneyMate",
            html: `
            <div style="font-family: Helvetica,Arial,sans-serif;overflow:hidden;line-height:2;background-color:#0f0f0f;color:#ffffff">
            <div style="margin:20px auto;width:80%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #5EEAD4;text-decoration:none;font-weight:600">MoneyMate</a>
              </div>
              <p style="font-size:1.1em;margin-bottom:0">Dear User,</p>
              <p style="margin-top:0">Your OTP for MoneyMate verification is:</p>
              <h2 style="background: #5EEAD4E6;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
               <p style="margin-bottom:0">Thank you for using MoneyMate.</p>
              <p style="font-size:0.9em;margin-top:5">Regards,<br />MoneyMate</p>
              <hr style="border:none;border-top:1px solid #eee" />
              <footer>
                  <p style="margin:0">&copy; 2023 MoneyMate. All rights reserved.</p>
                  <p style="margin:0">Contact us at  <a href="mailto:app.moneymate@gmail.com" style="color:#5EEAD4">app.moneymate@gmail.com</a></p>
              </footer>
            </div>
          </div>
          
            `,
        });
        return res;
    } catch (err: Error | any) {
        return err;
    }
}
