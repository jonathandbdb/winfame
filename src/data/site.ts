// Global business data. Update here and it propagates to header, footer, forms and JSON-LD.
export const site = {
  name: "Winfame Surgical",
  tagline: "Precision instruments for modern surgery",
  description:
    "Winfame Surgical supplies ophthalmic knives, diamond LRI knives, surgical instruments, scalpels and diagnostic equipment to clinics, hospitals and distributors.",
  url: "https://www.winfamesurgical.com",
  email: "lulutao@winfameusa.com",
  phone: "+1 626 255 7268",
  whatsapp: "16262557268",
  iolSimulatorUrl: "https://www.iolsimulator.com/",
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
