import { siteConfig } from "@/app/config/siteConfig";
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Section,
  Heading,
  Img,
} from "@react-email/components";
import * as React from "react";

interface AttendanceNotificationProps {
  name: string;
  action: string;
  status: string;
  time: string;
}

export default function AttendanceNotification({
  name,
  action,
  status,
  time,
}: AttendanceNotificationProps) {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Logo */}
          <Section style={styles.logoSection}>
            <Img
              src="https://as-check-in-web-app.vercel.app/logo.png" 
              alt="Apeke Stitches Logo"
              width="100"
              height="auto"
              style={styles.logo}
            />
          </Section>

          <Heading style={styles.heading}>Staff Attendance Alert</Heading>
          <Text style={styles.text}>Hello Admin,</Text>
          <Text style={styles.text}>
            <strong>{name}</strong> just performed a <strong>{action}</strong>.
          </Text>

          <Section style={styles.section}>
            <Text style={styles.detail}>
              🕒 <strong>Time:</strong> {time}
            </Text>
            <Text style={styles.detail}>
              📊 <strong>Punctuality:</strong> {status}
            </Text>
          </Section>

          <Text style={styles.footer}>
            💼 Apeke Stitches Staff Attendance System
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const styles = {
  body: {
    backgroundColor: "#f9f9f9",
    fontFamily: "'Bricolage Grotesque', sans-serif",
    padding: "20px",
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "30px",
    maxWidth: "600px",
    margin: "0 auto",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },
  logoSection: {
    textAlign: "center" as const,
    marginBottom: "20px",
  },
  logo: {
    display: "block",
    margin: "0 auto",
    maxWidth: "120px",
  },
  heading: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#222",
    textAlign: "center" as const,
  },
  text: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#333",
    marginBottom: "10px",
  },
  section: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  detail: {
    fontSize: "15px",
    color: "#444",
    marginBottom: "8px",
    
  },
  footer: {
    fontSize: "14px",
    color: "#888",
    marginTop: "30px",
    borderTop: "1px solid #eee",
    paddingTop: "15px",
    textAlign: "center" as const,
  },
};
