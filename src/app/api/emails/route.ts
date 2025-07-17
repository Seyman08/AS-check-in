import AttendanceNotification from "@/emails/Attendance";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, action, time, status } = body;

    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_TO!,
      subject: "Staff Attendance Alert",
      react: AttendanceNotification({ name, action, time, status }),
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
