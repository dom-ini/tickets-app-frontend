import { addDays, format } from "date-fns";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { EventSearch } from "@/components/event-search";
import { EventSearchResult } from "@/components/event-search-result";
import {
  getCategories,
  getCategoryBySlug,
  getCategoryHierarchyBySlug,
} from "@/lib/api/categories";
import { getEvents } from "@/lib/api/events";
import { EventDataOptions, Filters } from "@/lib/api/events/filters";
import { BreadcrumbNavigationItem } from "@/lib/types";

import type { Category } from "@/lib/api/categories/types";

type SearchParams = {
  name?: string;
  city?: string;
  heldAtFrom?: string;
  heldAtTo?: string;
  sortBy?: string;
  skip?: string;
};
type SearchData = Pick<SearchParams, "city" | "name"> & {
  heldAtFrom?: Date;
  heldAtTo?: Date;
};

type CategoryPageProps = {
  searchParams?: SearchParams;
  params: {
    slug: string;
  };
};

function getInitialSearchData(params?: SearchParams): SearchData {
  return {
    name: params?.name,
    city: params?.city,
    heldAtFrom: params?.heldAtFrom ? new Date(params.heldAtFrom) : undefined,
    heldAtTo: params?.heldAtTo ? new Date(params.heldAtTo) : undefined,
  };
}

function getOffsetedDateByDay(date: string) {
  return format(addDays(new Date(date), 1), "yyyy-MM-dd");
}

function getEventSearchFilters(params?: SearchParams): Filters {
  const filters: Filters = { isActive: true };
  if (params?.name) {
    filters.name = params.name;
  }
  if (params?.city) {
    filters.locationCity = params.city;
  }
  if (params?.heldAtFrom) {
    filters.heldAtFrom = params.heldAtFrom;
  }
  if (params?.heldAtFrom && !params?.heldAtTo) {
    filters.heldAtTo = getOffsetedDateByDay(params.heldAtFrom);
  }
  if (params?.heldAtTo) {
    filters.heldAtTo = getOffsetedDateByDay(params.heldAtTo);
  }
  return filters;
}

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

const DEFAULT_PAGE_SIZE = 25;

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const eventOptions: Required<EventDataOptions> = {
    filters: getEventSearchFilters(searchParams),
    sorting: {},
    pagination: { limit: DEFAULT_PAGE_SIZE.toString() },
  };
  const searchData = getInitialSearchData(searchParams);
  if (searchParams?.sortBy) eventOptions.sorting.sortBy = searchParams.sortBy;
  if (searchParams?.skip) eventOptions.pagination.skip = searchParams.skip;

  let categoryNames: Array<string> = [];
  const breadcrumbElements: Array<BreadcrumbNavigationItem> = [
    { name: "Kategorie", href: "/kategorie" },
  ];
  if (params.slug) {
    const category = await getCategoryBySlug(params.slug);
    if (!category) notFound();
    const categories = (
      await getCategoryHierarchyBySlug(params.slug)
    ).reverse();
    categoryNames = categories.map((cat) => cat.name);
    breadcrumbElements.push(
      ...categories.map((cat) => ({
        name: cat.name,
        href: `/kategorie/${cat.slug}`,
      }))
    );
    eventOptions.filters.categoryId = category.id;
  }

  const events = await getEvents(eventOptions);

  return (
    <div className="container my-10">
      <Breadcrumbs elements={breadcrumbElements} className="mb-8" />
      <h1 className="font-semibold text-4xl md:text-5xl mb-4">
        {params.slug ? categoryNames.join(" / ") : "Szukaj wydarzeń"}
      </h1>
      <EventSearch
        preservePath
        initialData={searchData}
        className="ml-0 my-8"
      />
      <EventSearchResult
        events={events.items}
        eventsCount={events.totalCount}
        pageSize={DEFAULT_PAGE_SIZE}
      />
    </div>
  );
}
