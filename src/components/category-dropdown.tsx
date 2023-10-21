import { Blocks, ChevronDown } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Category = {
  name: string;
  slug: string;
  id: number;
  children: Array<Category>;
};

function getCategories(): Array<Category> {
  return [
    {
      name: "Biznes",
      slug: "biznes",
      id: 1,
      children: [],
    },
    {
      name: "IT",
      slug: "it",
      id: 2,
      children: [
        {
          name: "Warsztaty",
          slug: "it-warsztaty",
          id: 4,
          children: [
            {
              name: "Stacjonarne",
              slug: "it-warsztaty-stacjonarne",
              id: 6,
              children: [],
            },
            {
              name: "Online",
              slug: "it-warsztaty-online",
              id: 7,
              children: [],
            },
          ],
        },
        {
          name: "Wykłady",
          slug: "it-wyklady",
          id: 5,
          children: [],
        },
      ],
    },
    {
      name: "Sport",
      slug: "sport",
      id: 3,
      children: [],
    },
  ];
}

type CategoryDropdownItemProps = {
  category: Category;
};

function CategoryDropdownItem({ category }: CategoryDropdownItemProps) {
  const hasChildren = category.children.length > 0;
  const categoryUrl = `/wydarzenia/${category.slug}`;

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

export function CategoryDropdown() {
  const categories = getCategories();
  const allEventsCategory: Category = {
    name: "Wszystkie",
    slug: "",
    id: -1,
    children: [],
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="group">
          <Blocks className="me-2 w-5 h-5" />
          <span>Wydarzenia</span>
          <ChevronDown className="ms-2 relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
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
