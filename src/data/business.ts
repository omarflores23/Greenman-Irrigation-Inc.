// Owner-editable facts. Set approval flags only after owner verification.
export const isPublicSite = process.env.SITE_PUBLICATION_MODE === "public";
export const business = {
  name: "GreenMan Irrigation, Inc.",
  domain: "https://greenmanirrigationinc.com",
  location: "Lynn, Massachusetts",
  familyOwned: true,
  phone: {
    display: "(978) 798-5474",
    href: "tel:+19787985474",
    approved: false,
  },
  address: {
    street: "181 Henry Ave",
    city: "Lynn",
    state: "MA",
    zip: "01902",
    approved: false,
  },
  email: { value: "luismeono@yahoo.com", approved: false },
  facebook:
    "https://www.facebook.com/p/GreenMan-Irrigation-Inc-100054579468900/",
  tiktok: "https://www.tiktok.com/@greenman_52",
  socialDestinationsVerified: false,
  serviceAreas: ["Lynn"],
  serviceAreasApproved: false,
  ownerName: null,
  foundingYear: null,
  officialLogoApproved: false,
  reviews: [] as {
    name: string;
    quote: string;
    source: string;
    approved: boolean;
  }[],
  beforeAfterPairs: [] as {
    before: string;
    after: string;
    caption: string;
    approved: boolean;
  }[],
  team: [] as {
    name: string;
    role: string;
    bio: string;
    photo: string;
    approved: boolean;
  }[],
  plansApproved: false,
};
export const canShowPhone = !isPublicSite || business.phone.approved;
export const phoneHref = canShowPhone ? business.phone.href : "/contact";
export const phoneLabel = canShowPhone
  ? business.phone.display
  : "Contact GreenMan";
export const navigation = [
  { label: "Home", href: "/" },
  { label: "Irrigation", href: "/irrigation" },
  { label: "Landscaping", href: "/landscaping" },
  { label: "Residential", href: "/residential" },
  { label: "Commercial", href: "/commercial" },
  { label: "Seasonal Care", href: "/maintenance-plans" },
  { label: "About", href: "/about" },
  { label: "Our Work", href: "/gallery" },
  { label: "Reviews", href: "/reviews" },
  { label: "FAQ", href: "/faq" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Contact", href: "/contact" },
];
