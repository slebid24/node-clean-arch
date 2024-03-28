import sgMail from '@sendgrid/mail';
import { User } from '../entities/User';

export class EmailService {
	constructor() {
		sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
	}

	async sendEmail(to: string, subject: string, text: string, html: string) {
		const msg = {
			to,
			from: process.env.EMAIL_FROM || 'lebids24@gmail.com',
			subject,
			text,
			html,
		};

		try {
			await sgMail.send(msg);
			console.log(`Email sent to ${to}`);
		} catch (error: unknown) {
			console.error('Error sending email:', error);

			if (error instanceof Error && 'response' in error) {
				console.error('SendGrid response:', error);
			}

			throw error instanceof Error ? error : new Error('EmailService failed to send email.');
		}
	}

	async sendConfirmationEmail(user: User, token: string) {
		const subject = 'Email Confirmation';
		const text = `Please confirm your email by clicking on the following link: ${process.env.FRONTEND_URL}/confirm/${token}`;
		const html = `<p>Please confirm your email by clicking on the following link: <a href="${process.env.FRONTEND_URL}/confirm/${token}">Confirm Email</a></p>`;

		await this.sendEmail(user.email, subject, text, html);
	}

	async sendPasswordResetEmail(user: User, token: string) {
		const subject = 'Password Reset Request';
		const text = `Please reset your password by clicking on the following link: ${process.env.FRONTEND_URL}/reset-password/${token}`;
		const html = `<p>Please reset your password by clicking on the following link: <a href="${process.env.FRONTEND_URL}/reset-password/${token}">Reset Password</a></p>`;

		await this.sendEmail(user.email, subject, text, html);
	}
}
