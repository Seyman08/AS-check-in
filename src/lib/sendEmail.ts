// lib/sendEmail.ts
import emailjs from "@emailjs/browser";

emailjs.init("vKL5vSZ9wTmC991IF");

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
      "service_6blg2ak",
      "template_3lu95i9",
      templateParams,
    );
    console.log("Email sent:", result.status, result.text);
  } catch (error) {
    console.error("Email send error:", error);
  }
};
