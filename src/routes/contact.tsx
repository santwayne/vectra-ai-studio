import { createFileRoute } from "@tanstack/react-router";
import emailjs from "@emailjs/browser";
import { SiteShell } from "@/components/SiteShell";
import { PageHero } from "@/components/PageHero";
import { Mail, MapPin, MessageSquare, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — NeuronX" },
      {
        name: "description",
        content:
          "Get in touch with the NeuronX team. We respond to all qualified inquiries within one business day.",
      },
      { property: "og:title", content: "Contact — NeuronX" },
      {
        property: "og:description",
        content:
          "Get in touch with the NeuronX team for AI engagements, partnerships, and press.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    topic: "New engagement",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    const templateParams = {
      title: "New Contact Form Submission",
      time: new Date().toLocaleString(),
      ...formData,
      message: `
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company || "Not provided"}
Inquiry Type: ${formData.topic}

Message:
${formData.message}
      `.trim(),
    };

    try {
      await emailjs.send(
        "service_gpkmole",
        "template_7xnt2qj",
        templateParams,
        "bBMebUMYk1P4zsdvp"
      );
      setSubmitted(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Failed to send your message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <SiteShell>
      <PageHero
        eyebrow="Contact"
        title="Talk to the people who build the systems."
        description="For new engagements, partnerships, or press — drop us a note. We respond to qualified inquiries within one business day."
      />

      <section className="section">
        <div className="container-wide grid gap-10 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <div className="glass-card p-6">
              <Mail className="h-5 w-5 text-primary" />
              <h3 className="mt-3 font-semibold">Email</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                hello@neuronx.ai
              </p>
            </div>
            <div className="glass-card p-6">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="mt-3 font-semibold">Headquarters</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Toronto, Canada
              </p>
            </div>
            <div className="glass-card p-6">
              <MessageSquare className="h-5 w-5 text-primary" />
              <h3 className="mt-3 font-semibold">Response time</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Within 1 business day
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="glass-card p-8 md:p-10">
              {submitted ? (
                <div className="py-10 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                    Message sent.
                  </h3>
                  <p className="mt-3 text-muted-foreground">
                    We'll get back to you within one business day.
                  </p>
                </div>
              ) : (
                <form
                  className="space-y-5"
                  onSubmit={handleSubmit}
                >
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Send a message
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <CField
                      label="Full name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <CField
                      label="Work email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <CField
                      label="Company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                    <div>
                      <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                        Inquiry type
                      </label>
                      <select
                        name="topic"
                        value={formData.topic}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-xl border border-input bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                      >
                        <option value="New engagement">New engagement</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Press">Press</option>
                        <option value="Careers">Careers</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border border-input bg-surface px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  {error && (
                    <p className="text-xs text-red-500">{error}</p>
                  )}
                  <button type="submit" disabled={sending} className="btn-primary w-full disabled:opacity-60">
                    {sending ? "Sending…" : "Send message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function CField({
  label,
  name,
  type = "text",
  required,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-xl border border-input bg-surface px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}
