import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/ui";
import { t } from "@/lib/i18n";
import { isLocale, site, type Locale } from "@/lib/site";
import { heroImages } from "@/db/seed-data";

export const dynamic = "force-dynamic";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const tr = t(locale);

  const cards = [
    {
      icon: "📞",
      title: locale === "fr" ? "Par téléphone" : "عبر الهاتف",
      text: tr.contactInterest,
      value: site.phoneDisplay,
      href: `tel:${site.phone}`,
    },
    {
      icon: "✉️",
      title: locale === "fr" ? "Par e-mail" : "عبر البريد الإلكتروني",
      text: tr.contactHelp,
      value: site.email,
      href: `mailto:${site.email}`,
    },
    {
      icon: "💬",
      title: "WhatsApp",
      text:
        locale === "fr"
          ? "Écrivez-nous directement, réponse rapide pendant les heures d'ouverture."
          : "راسلنا مباشرة، رد سريع خلال ساعات العمل.",
      value: site.phoneDisplay,
      href: `https://wa.me/${site.whatsapp}`,
    },
  ];

  return (
    <>
      <PageHero
        title={tr.contactTitle}
        subtitle={tr.contactLead}
        breadcrumbs={[{ href: `/${locale}`, label: tr.breadcrumbHome }, { label: tr.contactTitle }]}
        image={heroImages.solar}
      />

      <section className="section">
        <div className="wrap">
          <div className="grid gap-5 md:grid-cols-3">
            {cards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="card block p-6 text-center"
              >
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-2xl">
                  {card.icon}
                </span>
                <h3 className="mt-4 text-base font-extrabold text-brand-950">{card.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{card.text}</p>
                <p className="mt-3 text-sm font-extrabold text-accent-600">{card.value}</p>
              </a>
            ))}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
            <div className="space-y-6">
              <div className="rounded-2xl bg-brand-950 p-7 text-white">
                <h3 className="text-lg font-extrabold">{tr.contactUs}</h3>
                <ul className="mt-5 space-y-5 text-sm">
                  <li className="flex gap-3">
                    <span aria-hidden>📍</span>
                    <span>
                      <span className="block font-bold text-accent-400">{tr.address}</span>
                      <span className="text-white/80">
                        {locale === "fr" ? site.addressFr : site.addressAr}
                      </span>
                      <a
                        href={site.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 block text-xs font-bold text-accent-300 underline"
                      >
                        {locale === "fr" ? "Voir sur Google Maps" : "شاهد على خرائط جوجل"}
                      </a>
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden>🕒</span>
                    <span>
                      <span className="block font-bold text-accent-400">{tr.workingHours}</span>
                      <ul className="space-y-1 text-white/80">
                        {site.hours.map((entry) => (
                          <li key={entry.fr}>{locale === "fr" ? entry.fr : entry.ar}</li>
                        ))}
                      </ul>
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden>✉️</span>
                    <span>
                      <span className="block font-bold text-accent-400">{tr.email}</span>
                      <a href={`mailto:${site.email}`} className="text-white/80 hover:text-accent-300">
                        {site.email}
                      </a>
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden>📞</span>
                    <span>
                      <span className="block font-bold text-accent-400">{tr.phone}</span>
                      <a href={`tel:${site.phone}`} className="text-white/80 hover:text-accent-300">
                        {site.phoneDisplay}
                      </a>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <iframe
                  title="ATC Map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-5.835%2C35.762%2C-5.775%2C35.795&layer=mapnik&marker=35.7785%2C-5.8040"
                  className="h-64 w-full"
                  loading="lazy"
                />
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-extrabold text-brand-950">{tr.formTitle}</h3>
              <ContactForm
                locale={locale}
                labels={{
                  yourName: tr.yourName,
                  yourEmail: tr.yourEmail,
                  yourPhone: tr.yourPhone,
                  subject: tr.subject,
                  message: tr.message,
                  send: tr.send,
                  sending: tr.sending,
                  privacyNote: tr.privacyNote,
                  thanksTitle: tr.thanksTitle,
                  thanksText: tr.thanksText,
                  errorMsg: tr.errorMsg,
                  requiredField: tr.requiredField,
                  invalidEmail: tr.invalidEmail,
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
