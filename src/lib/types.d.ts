export type NavigationItem = {
  name: string;
  href: string;
};

export type BreadcrumbNavigationItem = Partial<NavigationItem> & {
  href?: string;
};
