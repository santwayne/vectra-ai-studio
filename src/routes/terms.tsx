import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — NeuronX" },
      {
        name: "description",
        content:
          "Terms governing the use of NeuronX's website and the engagement of our services.",
      },
      { property: "og:title", content: "Terms of Service — NeuronX" },
      {
        property: "og:description",
        content: "NeuronX's terms of service.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description="Last updated: January 2025"
      />

      <section className="section">
        <div className="container-wide max-w-3xl">
          <article className="space-y-10 text-muted-foreground">
            <Section title="1. Acceptance">
              By accessing this website you agree to these terms. If you do not
              agree, please do not use the site.
            </Section>

            <Section title="2. Services">
              NeuronX provides AI engineering, design, and consulting services
              under separate written agreements. Information on this website is
              for general purposes and is not a binding offer.
            </Section>

            <Section title="3. Intellectual property">
              All content on this website — including copy, designs, logos, and
              graphics — is owned by NeuronX Intelligence Inc. and may not be
              reproduced without written consent.
            </Section>

            <Section title="4. Confidentiality">
              All client engagements are governed by a separate NDA. We treat
              all client information with strict confidentiality.
            </Section>

            <Section title="5. Disclaimers">
              The website is provided "as is" without warranties of any kind. We
              do not warrant that the site will be uninterrupted or error-free.
            </Section>

            <Section title="6. Limitation of liability">
              To the maximum extent permitted by law, NeuronX shall not be liable
              for any indirect, incidental, or consequential damages arising
              from use of the website.
            </Section>

            <Section title="7. Governing law">
              These terms are governed by the laws of the Province of Ontario,
              Canada, without regard to conflict of law principles.
            </Section>

            <Section title="8. Contact">
              Questions about these terms? Email{" "}
              <a className="text-primary hover:underline" href="mailto:legal@neuronx.ai">
                legal@neuronx.ai
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
