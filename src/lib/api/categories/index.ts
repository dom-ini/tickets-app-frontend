import { fetchData } from "@/lib/api";
import {
  mapCategoriesFromApi,
  mapCategoryFromApi,
  mapCategoryTreeFromApi,
} from "@/lib/api/categories/mapper";

import type {
  Category,
  CategoryWithoutChildren,
} from "@/lib/api/categories/types";

export async function getCategories(): Promise<Array<Category>> {
  const data = await fetchData("/event-types", {
    next: { revalidate: 60 },
  });
  return mapCategoryTreeFromApi(data);
}

export async function getCategoryBySlug(
  slug: string
): Promise<CategoryWithoutChildren | null> {
  try {
    const data = await fetchData(`/event-types/${slug}`, {
      next: { revalidate: 60 },
    });
    return mapCategoryFromApi(data);
  } catch {
    return null;
  }
}

export async function getCategoryHierarchyBySlug(
  slug: string
): Promise<Array<CategoryWithoutChildren>> {
  const data = await fetchData(`/event-types/${slug}/hierarchy`, {
    next: { revalidate: 60 },
  });
  return mapCategoriesFromApi(data);
}
