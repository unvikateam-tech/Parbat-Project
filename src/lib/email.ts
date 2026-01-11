import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendAdminNotification = async ({
  prevRating,
  newRating,
  reviewText,
  userName,
  email,
  phone,
  createdAt,
}: any) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  console.log('Attempting to send email to:', adminEmail);
  if (!adminEmail || !process.env.RESEND_API_KEY) {
    console.warn('Missing ADMIN_EMAIL or RESEND_API_KEY');
    return;
  }

  try {
    await resend.emails.send({
      from: 'Unvika Reviews <onboarding@resend.dev>',
      to: adminEmail,
      subject: `Review Alert: Low Rating Received (${newRating}/5)`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; color: #333;">
          <h2 style="color: #ef4444;">New Low Rating Alert</h2>
          <p><strong>User:</strong> ${userName}</p>
          <p><strong>Email:</strong> ${email || 'N/A'}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Rating:</strong> <span style="font-size: 1.2rem; color: #f59e0b;">${newRating}/5</span> ${prevRating ? `(Previously: ${prevRating})` : ''}</p>
          <p><strong>Review Content:</strong></p>
          <blockquote style="background: #f9f9f9; padding: 15px; border-left: 5px solid #ccc; margin: 10px 0;">
            ${reviewText}
          </blockquote>
          <p style="font-size: 0.8rem; color: #666;">Submitted At: ${new Date(createdAt).toLocaleString()}</p>
        </div>
      `,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Resend email failed:', error);
  }
};

export const sendServiceAlert = async (serviceName: string, errorMessage: string) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail || !process.env.RESEND_API_KEY) return;

  try {
    await resend.emails.send({
      from: 'Unvika Health <onboarding@resend.dev>',
      to: adminEmail,
      subject: `CRITICAL: Service Failure - ${serviceName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #fee2e2; border-radius: 10px; color: #991b1b; background: #fef2f2;">
          <h2 style="margin-top: 0;">⚠️ Service Alert: ${serviceName}</h2>
          <p>The following service has encountered a critical error or hit its limit:</p>
          <div style="background: white; padding: 15px; border-radius: 5px; border: 1px solid #fca5a5; font-family: monospace;">
            ${errorMessage}
          </div>
          <p><strong>Status:</strong> Temporarily Disabled</p>
          <p style="font-size: 0.8rem; color: #b91c1c;">Time: ${new Date().toLocaleString()}</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Failed to send service alert email:', error);
  }
};
