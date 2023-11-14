import type {
  Category,
  CategoryWithoutChildren,
} from "@/lib/api/categories/types";

interface CategoryTreeApi extends Category {}
interface CategoryApi extends CategoryWithoutChildren {}

export function mapCategoryTreeFromApi(
  categories: Array<CategoryTreeApi>,
): Array<Category> {
  return categories;
}

export function mapCategoriesFromApi(
  categories: Array<CategoryApi>,
): Array<CategoryWithoutChildren> {
  return categories;
}

export function mapCategoryFromApi(
  category: CategoryApi,
): CategoryWithoutChildren {
  return category;
}
