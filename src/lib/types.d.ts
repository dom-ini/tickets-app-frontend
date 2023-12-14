export type NavigationItem = {
  name: string;
  href?: string;
  onClick?: () => void;
};

export type BreadcrumbNavigationItem = Partial<NavigationItem> & {
  href?: string;
};
