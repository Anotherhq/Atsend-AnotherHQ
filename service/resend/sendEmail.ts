import resend from ".";
import { EmailTemplate } from "./email-template";

export const sendEmail = async (email: string, firstName: string) => {
    const { data, error } = await resend.emails.send({
        from: 'ATSend Newsletter <noreply@skmayya.me>', 
        to: [email],
        subject: '🎉 You’re on the waitlist! Welcome to ATSend',
        react: EmailTemplate({ 
            firstName,
            message: "Thanks for joining the waitlist! You're among the first to experience ATSend. We'll keep you updated with exclusive news and early access details. Stay tuned!"
        }) as React.ReactElement,
    });
    
    if (error) {
        console.error("Email sending failed:", error);
        return null;
    }
    return data;
};
