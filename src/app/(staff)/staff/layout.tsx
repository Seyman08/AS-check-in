import Header from "@/app/components/Header";
import Head from "next/head";

export default function StaffLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header role="staff" />
      <main>{children}</main>;
    </div>
  );
}
