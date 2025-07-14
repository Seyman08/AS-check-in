// lib/sendEmail.ts
import emailjs from "@emailjs/browser";

emailjs.init("lLF_1fOuK_WN9Bl3c");

export const sendAttendanceNotification = async (
  name: string,
  action: string,
  time: string,
  status: string,
) => {
  const templateParams = {
    name,
    action,
    time,
    status,
  };

  try {
    const result = await emailjs.send(
      "service_7dj1juy",
      "template_cc6eefa",
      templateParams,
    );
    console.log("Email sent:", result.status, result.text);
  } catch (error) {
    console.error("Email send error:", error);
  }
};
