import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — NeuronX" },
      {
        name: "description",
        content:
          "How NeuronX collects, uses, and protects information across our website and engagements.",
      },
      { property: "og:title", content: "Privacy Policy — NeuronX" },
      {
        property: "og:description",
        content: "NeuronX's privacy policy and data handling practices.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="Last updated: January 2025"
      />

      <section className="section">
        <div className="container-wide max-w-3xl">
          <article className="prose-content space-y-10 text-muted-foreground">
            <Section title="1. Overview">
              NeuronX Intelligence Inc. ("NeuronX", "we", "us") respects your
              privacy. This policy describes what information we collect through
              our website and engagements, how we use it, and the choices you have.
            </Section>

            <Section title="2. Information we collect">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong className="text-foreground">Contact information</strong>{" "}
                  you submit via forms (name, work email, company, message).
                </li>
                <li>
                  <strong className="text-foreground">Engagement data</strong>{" "}
                  shared during the course of a project, governed by a separate NDA
                  and Master Services Agreement.
                </li>
                <li>
                  <strong className="text-foreground">Usage data</strong> such as
                  pages visited and approximate location, used to improve the site.
                </li>
              </ul>
            </Section>

            <Section title="3. How we use information">
              We use information to respond to inquiries, schedule consultations,
              deliver contracted services, and improve our website. We do not sell
              personal information.
            </Section>

            <Section title="4. Data retention">
              Inquiry data is retained for up to 24 months. Engagement data is
              retained according to the terms of your contract with us.
            </Section>

            <Section title="5. Sharing">
              We share information only with service providers necessary to operate
              our business (e.g., email infrastructure, analytics). All providers
              are bound by confidentiality and data protection terms.
            </Section>

            <Section title="6. Security">
              We follow industry-standard security practices including encryption
              in transit and at rest, access controls, and audit logging. See our{" "}
              <a className="text-primary hover:underline" href="/security">
                Security
              </a>{" "}
              page for more detail.
            </Section>

            <Section title="7. Your rights">
              You may request access, correction, or deletion of your personal
              information at any time by emailing{" "}
              <a className="text-primary hover:underline" href="mailto:privacy@neuronx.ai">
                privacy@neuronx.ai
              </a>
              .
            </Section>

            <Section title="8. Contact">
              Questions about this policy? Email{" "}
              <a className="text-primary hover:underline" href="mailto:privacy@neuronx.ai">
                privacy@neuronx.ai
              </a>
              .
            </Section>
          </article>
        </div>
      </section>
    </SiteShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <div className="mt-3 leading-relaxed">{children}</div>
    </div>
  );
}
