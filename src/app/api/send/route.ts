import { NextRequest, NextResponse } from "next/server";
// import { resend } from "@/lib/resend"; // commented out Resend

export async function GET(req: NextRequest) {
  try {
    // const { data, error } = await resend.emails.send({
    //   from: "onboarding@resend.dev",
    //   to: "sanmi.hq@gmail.com",
    //   subject: "Hello world",
    //   html: "<h1>Hello world from sender</h1>",
    // });

    // if (error) {
    //   return NextResponse.json({ error }, { status: 500 });
    // }

    return NextResponse.json({ message: "Email sending disabled." }); // ✅ return safe fallback
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
