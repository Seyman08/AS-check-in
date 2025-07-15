import { NextRequest, NextResponse } from "next/server";
// import { resend } from "@/lib/resend";

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

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
