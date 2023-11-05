import { Category } from "@/lib/constants";

export async function getCategories(): Promise<Array<Category>> {
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
