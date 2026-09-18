import { notFound } from "next/navigation";
import { QuoteView } from "@/components/cart-view";
import { PageHero } from "@/components/ui";
import { t } from "@/lib/i18n";
import { isLocale, type Locale } from "@/lib/site";
import { heroImages } from "@/db/seed-data";

export const dynamic = "force-dynamic";

export default async function CartPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const tr = t(locale);

  return (
    <>
      <PageHero
        title={locale === "fr" ? "Demande de devis" : "طلب عرض السعر"}
        breadcrumbs={[{ href: `/${locale}`, label: tr.breadcrumbHome }, { label: tr.yourCart }]}
        image={heroImages.electrical}
      />
      <section className="section">
        <div className="wrap">
          <QuoteView
            locale={locale}
            labels={{
              cartEmpty: tr.cartEmpty,
              backToShop: tr.backToShop,
              yourCart: tr.yourCart,
              product: tr.product,
              quantity: tr.quantity,
              subtotal: tr.subtotal,
              priceOnRequest: tr.priceOnRequest,
              remove: tr.remove,
              clearCart: tr.clearCart,
              orderForm: tr.orderForm,
              yourName: tr.yourName,
              yourEmail: tr.yourEmail,
              yourPhone: tr.yourPhone,
              city: tr.city,
              addressField: tr.addressField,
              note: tr.note,
              placeOrder: tr.placeOrder,
              placing: tr.placing,
              orderSuccess: tr.orderSuccess,
              orderRef: tr.orderRef,
              orderSuccessText: tr.orderSuccessText,
              continueShopping: tr.continueShopping,
              requiredField: tr.requiredField,
              invalidEmail: tr.invalidEmail,
              errorMsg: tr.errorMsg,
            }}
          />
        </div>
      </section>
    </>
  );
}
