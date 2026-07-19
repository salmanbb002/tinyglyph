import type { Metadata } from "next";
import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = { title: "Privacy", description: "SmallTextGen privacy information." };

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Privacy"
      title="Your text belongs to you."
      intro="The converter is designed to work without accounts, uploads, or behavioral profiles."
      sections={[
        {
          title: "Text conversion",
          body: <p>Text entered in the main generator is transformed on your device. It is not sent to our server, stored in a database, or attached to an account.</p>,
        },
        {
          title: "Local preferences",
          body: <p>Saved styles are stored in your browser using local storage. You can clear them at any time through your browser settings. They do not follow you to another browser or device.</p>,
        },
        {
          title: "AI requests",
          body: <p>If you choose the AI caption starter, the topic and tone you submit are sent through our server to the configured Hugging Face inference provider. Do not enter confidential or sensitive information in that optional field.</p>,
        },
        {
          title: "Operational data",
          body: <p>Your hosting provider may process limited technical logs such as IP address, browser type, timestamps, and error details for security and reliability. Configure this notice to name your provider and retention period before a public launch.</p>,
        },
        {
          title: "Changes",
          body: <p>Material updates to this notice should be dated and published here. This starter policy is not legal advice and should be reviewed for the laws and services that apply to your deployment.</p>,
        },
      ]}
    />
  );
}
