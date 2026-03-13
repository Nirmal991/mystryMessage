import { resend } from '@/lib/resend';
import VerificationEmail from '../../emails/VerificatinEmails';
import { ApiResponse } from '@/types/ApiResponse';

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
      await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Mystry MessageVerification Code',
      react: VerificationEmail({username, otp: verifyCode}),
      });
        return { sucess: true, message: 'Verification email send successfully' }
    } catch (Emailerror) {
        console.log("Error sending verification Email: ", Emailerror);
        return { sucess: false, message: 'Failed to send verification email' }
    }
}
