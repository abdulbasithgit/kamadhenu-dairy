/**
 * Home page content. Edit text here without touching components.
 * Icon names map to the inline SVG icons in src/components/icons.
 */
import type { IconName } from "@/components/icons/iconMap";

/* ---------------- Hero carousel ---------------- */
export interface HeroSlide {
  eyebrow: string;
  headline: string;
  subtext: string;
  /** Real photo, or leave undefined for a labelled placeholder */
  image?: { src: string; alt: string; position?: string };
  placeholderLabel: string;
}

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: "Premium A2 Milk",
    headline: "Pure A2 milk from our native cows to your doorstep",
    subtext:
      "Fresh every morning, in clean glass bottles – the way milk tasted when we were children.",
    image: {
      src: "/images/packaging.jpg",
      alt: "Sri Chettinadu Kamadhenu Premium A2 Milk in glass bottles and a carton",
      position: "70% center",
    },
    placeholderLabel: "Milk bottles photo – replace",
  },
  {
    eyebrow: "Our cows",
    headline: "Cared for like family, the Chettinad way",
    subtext:
      "Our cows graze in the open, eat green fodder and are milked gently. Happy cows give honest milk.",
    placeholderLabel: "Cows grazing at the farm – replace",
  },
  {
    eyebrow: "Morning delivery",
    headline: "At your door before your first filter coffee",
    subtext:
      "Choose daily, alternate-day or weekly delivery. Pause any time when you travel.",
    placeholderLabel: "Morning doorstep delivery photo – replace",
  },
];

/* ---------------- Brand intro ---------------- */
export const brandIntro = {
  eyebrow: "Our story",
  title: "A small farm with a simple promise",
  paragraphs: [
    "In the heart of Chettinad, we look after our cows the way families here always have – with patience, clean water, green fodder and plenty of open space.",
    "We started Kamadhenu Dairy because we wanted our own children to drink milk we could trust. Today we share that same milk with families around us: nothing added, nothing taken away.",
  ],
  imageLabel: "Family / farm founders photo – replace",
};

/* ---------------- Why A2 / Our promise ---------------- */
export interface IconCard {
  icon: IconName;
  title: string;
  text: string;
}

export const promises: IconCard[] = [
  {
    icon: "cow",
    title: "Native breed cows",
    // TODO: name your breed(s), e.g. Gir, Kangayam, Umblachery – only if true
    text: "Our milk comes from native Indian cows, which naturally give A2 milk.",
  },
  {
    icon: "leaf",
    title: "No preservatives",
    text: "No preservatives, no thickeners, no added water. Just milk.",
  },
  {
    icon: "clock",
    title: "Farm-fresh within hours",
    text: "Milked early in the morning, chilled, and on its way to you within hours.",
  },
  {
    icon: "bottle",
    title: "Glass bottle delivery",
    text: "Clean, reusable glass bottles keep milk tasting fresh and cut down on plastic.",
  },
];

/* ---------------- Our ethos ---------------- */
export const ethos: IconCard[] = [
  {
    icon: "drop",
    title: "Purity",
    text: "What leaves our farm is exactly what our cows give – tested, chilled and sealed with care.",
  },
  {
    icon: "diya",
    title: "Tradition",
    text: "Old Chettinad ways of caring for cattle, setting curd and making ghee, kept alive every day.",
  },
  {
    icon: "medal",
    title: "Quality",
    text: "Clean sheds, healthy cows and hygienic handling at every step from udder to doorstep.",
  },
];

/* ---------------- How subscription works ---------------- */
export const subscriptionSteps: IconCard[] = [
  {
    icon: "bottle",
    title: "Choose your product",
    text: "A2 milk, curd, ghee and more – pick what your family needs.",
  },
  {
    icon: "calendar",
    title: "Pick a plan",
    text: "Daily, alternate days or weekly. Change or pause whenever you like.",
  },
  {
    icon: "sunrise",
    title: "Morning doorstep delivery",
    text: "Fresh bottles at your door early every delivery morning.",
  },
  {
    icon: "wallet",
    title: "Pay monthly",
    text: "One simple bill at the end of the month. No advance needed.",
    // TODO: confirm payment terms
  },
];

/* ---------------- Stats ---------------- */
export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  /** true = sample number, shown with a visible "Sample" label. Set false once real. */
  placeholder: boolean;
}

// TODO: replace ALL of these with real numbers, then set placeholder: false.
export const stats: Stat[] = [
  { label: "Cows on our farm", value: 50, placeholder: true },
  { label: "Happy families", value: 500, suffix: "+", placeholder: true },
  { label: "Litres every day", value: 300, placeholder: true },
  { label: "Villages served", value: 10, placeholder: true },
];

/* ---------------- Gallery ---------------- */
export interface GalleryItem {
  /** Real photo, or leave undefined for a labelled placeholder */
  src?: string;
  alt: string;
  placeholderLabel: string;
  shape: "tall" | "wide" | "square";
}

export const gallery: GalleryItem[] = [
  {
    alt: "Cows grazing in the morning",
    placeholderLabel: "Cows grazing – replace",
    shape: "tall",
  },
  {
    alt: "Calf with its mother",
    placeholderLabel: "Calf with mother – replace",
    shape: "square",
  },
  { alt: "Clean cow shed", placeholderLabel: "Cow shed – replace", shape: "wide" },
  {
    alt: "Green fodder field",
    placeholderLabel: "Fodder field – replace",
    shape: "square",
  },
  {
    alt: "Milking time at the farm",
    placeholderLabel: "Milking time – replace",
    shape: "tall",
  },
  {
    alt: "Glass bottles being filled",
    placeholderLabel: "Bottling – replace",
    shape: "wide",
  },
  { alt: "Our farm team", placeholderLabel: "Farm team – replace", shape: "square" },
  {
    alt: "Traditional ghee making",
    placeholderLabel: "Ghee making – replace",
    shape: "tall",
  },
];

/* ---------------- Certifications ---------------- */
export interface Certification {
  name: string;
  detail: string;
}

// TODO: list only certificates you actually hold, with real numbers.
export const certifications: Certification[] = [
  { name: "FSSAI", detail: "Licence no. – TODO" },
  { name: "Milk lab test report", detail: "Lab name & date – TODO" },
  { name: "Veterinary health check", detail: "Details – TODO" },
  { name: "Certificate", detail: "Add another – TODO" },
];

/* ---------------- Free sample banner ---------------- */
export const freeSample = {
  title: "Taste the difference – your first bottle is on us",
  text: "Not sure yet? Ask for a free sample bottle. If you love it, start a subscription. If not, no hard feelings.",
  // TODO: confirm free sample terms (e.g. one per household, delivery areas only)
  terms: "One sample per household, within our delivery areas.",
  whatsappMessage:
    "Hello Sri Chettinadu Kamadhenu Dairy Farm, I would like to try a free sample of your A2 milk. My area / pincode is: ",
};
