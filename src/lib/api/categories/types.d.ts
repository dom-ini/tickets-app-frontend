export type CategoryWithoutChildren = {
  name: string;
  slug: string;
  id: number;
};

export type Category = CategoryWithoutChildren & {
  children: Array<Category>;
};
