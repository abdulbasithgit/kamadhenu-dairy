import { ArrowRightIcon } from "@/components/icons";
import { FadeIn } from "@/components/motion/FadeIn";
import { ProductCard } from "@/components/products/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredProducts } from "@/data/products";

export function FeaturedProducts() {
  return (
    <Section labelledBy="products-title">
      <SectionHeading
        id="products-title"
        eyebrow="From our farm"
        title="Fresh from Kamadhenu"
        intro="Everything is made from our own cows' milk, in small batches."
      />
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featuredProducts.map((product, i) => (
          <li key={product.slug}>
            <FadeIn delay={i * 0.08} className="h-full">
              <ProductCard product={product} />
            </FadeIn>
          </li>
        ))}
      </ul>
      <div className="mt-10 text-center">
        <ButtonLink href="/products" variant="outline">
          View all products <ArrowRightIcon size={18} />
        </ButtonLink>
      </div>
    </Section>
  );
}
