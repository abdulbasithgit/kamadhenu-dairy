/**
 * Customer reviews.
 *
 * TODO: Every entry below is a PLACEHOLDER. Replace with real reviews
 * (with the customer's permission), then set placeholder: false.
 * Placeholder entries are shown with a visible "Sample" label.
 */
export interface Testimonial {
  quote: string;
  name: string;
  location: string;
  placeholder: boolean;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "[Placeholder review] A real customer's words about the taste of the milk will go here.",
    name: "Customer name – TODO",
    location: "Area – TODO",
    placeholder: true,
  },
  {
    quote:
      "[Placeholder review] A real customer's words about morning delivery will go here.",
    name: "Customer name – TODO",
    location: "Area – TODO",
    placeholder: true,
  },
  {
    quote:
      "[Placeholder review] A real customer's words about the ghee or curd will go here.",
    name: "Customer name – TODO",
    location: "Area – TODO",
    placeholder: true,
  },
  {
    quote:
      "[Placeholder review] A real customer's words about the glass bottles will go here.",
    name: "Customer name – TODO",
    location: "Area – TODO",
    placeholder: true,
  },
];
