import { Blocks, ChevronDown } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCategories } from "@/lib/api/categories";
import { allEventsCategory } from "@/lib/api/categories/constants";
import { Category } from "@/lib/api/categories/types";

type CategoryDropdownItemProps = {
  category: Category;
};

function CategoryDropdownItem({ category }: CategoryDropdownItemProps) {
  const hasChildren = category.children.length > 0;
  const categoryUrl = `/kategorie/${category.slug}`;

  return (
    <>
      {hasChildren ? (
        <DropdownMenuSub>
          <Link href={categoryUrl}>
            <DropdownMenuSubTrigger className="cursor-pointer">
              {category.name}
            </DropdownMenuSubTrigger>
          </Link>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {category.children.map((subcategory) => (
                <CategoryDropdownItem
                  category={subcategory}
                  key={subcategory.id}
                />
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      ) : (
        <Link href={categoryUrl}>
          <DropdownMenuItem className="cursor-pointer">
            {category.name}
          </DropdownMenuItem>
        </Link>
      )}
    </>
  );
}

export async function CategoryDropdown() {
  const categories = await getCategories();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="group" data-test="categories-btn">
          <Blocks className="me-2 w-5 h-5" />
          <span>Kategorie</span>
          <ChevronDown className="ms-2 relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent data-test="categories-dropdown">
        {categories.map((category) => (
          <CategoryDropdownItem category={category} key={category.id} />
        ))}
        <DropdownMenuSeparator />
        <CategoryDropdownItem
          category={allEventsCategory}
          key={allEventsCategory.id}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
