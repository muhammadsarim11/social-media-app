export const resetPasswordTemplate = (name, resetUrl) => `
  <div style="font-family: Arial, sans-serif; max-width: 520px; margin: auto;">
    <h2 style="color: #111;">Password Reset Request</h2>
    <p>Hi ${name},</p>
    <p>Aapne password reset ki request ki hai. Neeche button pe click karein:</p>
    <a href="${resetUrl}"
       style="display:inline-block; padding:12px 24px; background:#2563eb;
              color:#fff; text-decoration:none; border-radius:6px;">
      Reset Password
    </a>
    <p style="margin-top:20px; font-size:13px; color:#666;">
      Ye link <b>15 minutes</b> me expire ho jayega aur sirf ek dafa use ho sakta hai.
    </p>
    <p style="font-size:13px; color:#666;">
      Agar ye request aapne nahi ki, to is email ko ignore kar dein.
    </p>
  </div>
`;

export const passwordChangedTemplate = (name) => `
  <div style="font-family: Arial, sans-serif; max-width: 520px; margin: auto;">
    <h2 style="color:#111;">Password Changed</h2>
    <p>Hi ${name},</p>
    <p>Aapka password abhi successfully change kar diya gaya hai.</p>
    <p style="color:#b91c1c;">
      Agar ye aapne nahi kiya, to fauran support se raabta karein.
    </p>
  </div>
`;
