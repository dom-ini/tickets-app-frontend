import { EventSearchResult } from "@/components/event-search-result";
import { EventSearch } from "@/components/event-search";
import { getCategories } from "@/lib/api/categories";
import { Category } from "@/lib/constants";
import { getEvents } from "@/lib/api/events";

type CategoryPageProps = {
  params: {
    slug: string;
  };
};

function getCategoriesSlugs(
  categories: Array<Category>,
  result: Array<{ slug: Array<string> }> = []
) {
  for (const category of categories) {
    result.push({ slug: [category.slug] });
    if (category.children.length > 0) {
      getCategoriesSlugs(category.children, result);
    }
  }
  return result;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  const slugs = getCategoriesSlugs(categories);
  slugs.push({ slug: [""] });

  return slugs;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const events = await getEvents();

  return (
    <div className="container my-10">
      <h1 className="font-semibold text-4xl md:text-5xl mb-4">
        {params.slug || "Szukaj wydarzeń"}
      </h1>
      <EventSearch className="ml-0 my-8" />
      <EventSearchResult events={events} />
    </div>
  );
}
