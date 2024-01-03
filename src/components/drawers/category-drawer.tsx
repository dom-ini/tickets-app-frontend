import { ChevronDown } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SheetClose, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { getCategories } from "@/lib/api/categories";
import { allEventsCategory } from "@/lib/api/categories/constants";
import { Category } from "@/lib/api/categories/types";

type CategoryDrawerItemProps = {
  category: Category;
};

function CategoryDrawerItem({ category }: CategoryDrawerItemProps) {
  const hasChildren = category.children.length > 0;
  const categoryUrl = `/kategorie/${category.slug}`;

  return (
    <>
      {hasChildren ? (
        <Collapsible>
          <div className="flex justify-between items-center border-b py-1 group">
            <SheetClose asChild>
              <Link
                className=" flex-1 hover:text-primary dark:hover:text-secondary transition-all"
                href="/kategorie/it"
              >
                {category.name}
              </Link>
            </SheetClose>
            <CollapsibleTrigger
              asChild
              className="[&[data-state=open]>svg]:rotate-180"
            >
              <Button variant="ghost" size="icon" aria-label="Rozwiń">
                <ChevronDown className="transition-all" size="16" />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="pl-6">
            {category.children.map((subcategory) => (
              <CategoryDrawerItem category={subcategory} key={subcategory.id} />
            ))}
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <SheetClose asChild>
          <Link
            href={categoryUrl}
            className="block py-3 hover:text-primary dark:hover:text-secondary border-b"
          >
            {category.name}
          </Link>
        </SheetClose>
      )}
    </>
  );
}

export async function CategoryDrawer() {
  const categories = await getCategories();

  return (
    <SheetContent side="left" className="overflow-y-auto">
      <SheetHeader className="font-bold">Wydarzenia</SheetHeader>
      <nav className="mt-4">
        <CategoryDrawerItem
          category={allEventsCategory}
          key={allEventsCategory.id}
        />
        {categories.map((category) => (
          <CategoryDrawerItem category={category} key={category.id} />
        ))}
      </nav>
    </SheetContent>
  );
}
