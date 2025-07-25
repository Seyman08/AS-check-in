import Header from "@/app/components/Header";
import Head from "next/head";

export default function StaffLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header role="admin" />
      <main>{children}</main>;
    </div>
  );
}
