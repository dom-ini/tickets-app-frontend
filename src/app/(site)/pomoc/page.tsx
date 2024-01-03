import { Metadata } from "next";

import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BreadcrumbNavigationItem } from "@/lib/types";

type HelpItem = {
  question: string;
  answer: string;
};

export const metadata: Metadata = {
  title: "Pomoc",
};

const helpContent: Array<HelpItem> = [
  {
    question: "Dlaczego lody smakują lepiej latem?",
    answer:
      "Lody smakują lepiej latem, bo zimą często jest za zimno, aby jeść je na dworze.",
  },
  {
    question: "Czy dźwięki potrafią latać?",
    answer:
      "Niestety nie, dźwięki pozostają w miejscu, ale można je usłyszeć, gdy się rozchodzą.",
  },
  {
    question: "Co by się stało, gdyby krowy zaczęły latać?",
    answer:
      "Gdyby krowy zaczęły latać, to obowiązujące przepisy dotyczące ruchu lotniczego musiałyby zostać dostosowane.",
  },
  {
    question: "Kiedy księżyc zrobią czekoladowym?",
    answer:
      "Księżyc nie stanie się czekoladowy, to niemożliwe w rzeczywistości.",
  },
  {
    question: "Jakie są szanse na spotkanie jednorożca w Polsce?",
    answer:
      "Szanse na spotkanie jednorożca w Polsce są bardzo niskie, ponieważ są one stworzeniami mitycznymi.",
  },
  {
    question: "Czy słonie potrafią grać w szachy?",
    answer:
      "Słonie są inteligentne, ale nie słyną z umiejętności gry w szachy.",
  },
  {
    question: "Jakie jest ulubione danie kosmitów?",
    answer:
      "Nie mamy pewności, ale mówi się, że kosmici uwielbiają kosmiczne popcorny.",
  },
  {
    question: "Czy można przeczytać książkę, patrząc na nią?",
    answer:
      "Tak, można przeczytać książkę, patrząc na jej strony i czytając tekst.",
  },
  {
    question: "Ile kalorii ma dźwięk deszczu?",
    answer: "Dźwięk deszczu nie ma kalorii, ale może być relaksujący.",
  },
  {
    question: "Czy strona internetowa może być zjedzona?",
    answer:
      "Nie, strony internetowe nie są jadalne, ale można je przeglądać na komputerze.",
  },
];

const breadcrumbElements: Array<BreadcrumbNavigationItem> = [{ name: "Pomoc" }];

export default function Help() {
  return (
    <div className="container my-10">
      <Breadcrumbs elements={breadcrumbElements} className="mb-8" />
      <h1 className="mb-4 text-3xl font-bold tracking-tight">Pomoc</h1>
      <article>
        <h2 className="mb-2">
          Tutaj znajdziesz odpowiedzi na (prawdopodobnie) nigdy niezadawane
          pytania.
        </h2>
        <h3>
          <b>Uwaga</b> - pytania zostały wygenerowane przez ChatGPT, nie
          odpowiadam za trwałe uszkodzenia mózgu spowodowane ich czytaniem.
        </h3>
        <Accordion type="multiple" className="my-8 border-t">
          {helpContent.map((item, i) => (
            <AccordionItem
              key={i}
              value={i.toString()}
              className="last-of-type:border-b-0"
            >
              <AccordionTrigger className="text-start">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </article>
    </div>
  );
}
