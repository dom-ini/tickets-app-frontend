import { Event } from "@/lib/constants";

export async function getEvents(): Promise<Array<Event>> {
  return [
    {
      name: "Przykładowy event",
      heldAt: new Date("2023-10-30"),
      organizer: {
        name: "Organizator sp. z o.o.",
      },
      location: {
        city: "Gdańsk",
        name: "Polsat Plus Arena",
        slug: "polsat-plus-arena",
        latitude: 12,
        longitude: 12,
      },
      slug: "testowe-wydarzenie",
      posterVertical: "https://picsum.photos/300/400?v=1",
      posterHorizontal: "https://picsum.photos/400/267?v=1",
      description: "<p>Elo</p>",
      speakers: [],
      eventType: {
        name: "IT",
        slug: "it",
      },
    },
    {
      name: "Inny event 2",
      heldAt: new Date("2023-10-30"),
      organizer: {
        name: "Organizator sp. z o.o.",
      },
      location: {
        city: "Gdańsk",
        name: "Polsat Plus Arena",
        slug: "polsat-plus-arena",
        latitude: 12,
        longitude: 12,
      },
      slug: "testowe-wydarzenie",
      posterVertical: "https://picsum.photos/300/400?v=2",
      posterHorizontal: "https://picsum.photos/400/267?v=2",
      description: "<p>Elo</p>",
      speakers: [],
      eventType: {
        name: "IT",
        slug: "it",
      },
    },
    {
      name: "Gotuj z gotowaniem",
      heldAt: new Date("2023-10-30"),
      organizer: {
        name: "Organizator sp. z o.o.",
      },
      location: {
        city: "Gdańsk",
        name: "Polsat Plus Arena",
        slug: "polsat-plus-arena",
        latitude: 12,
        longitude: 12,
      },
      slug: "testowe-wydarzenie",
      posterVertical: "https://picsum.photos/300/400?v=3",
      posterHorizontal: "https://picsum.photos/400/267?v=3",

      description: "<p>Elo</p>",
      speakers: [],
      eventType: {
        name: "IT",
        slug: "it",
      },
    },
    {
      name: "Warsztaty z pierdzenia",
      heldAt: new Date("2023-10-30"),
      organizer: {
        name: "Organizator sp. z o.o.",
      },
      location: {
        city: "Gdańsk",
        name: "Polsat Plus Arena",
        slug: "polsat-plus-arena",
        latitude: 12,
        longitude: 12,
      },
      slug: "testowe-wydarzenie",
      posterVertical: "https://picsum.photos/300/400?v=4",
      posterHorizontal: "https://picsum.photos/400/267?v=4",

      description: "<p>Elo</p>",
      speakers: [],
      eventType: {
        name: "IT",
        slug: "it",
      },
    },
    {
      name: "Event bardzo ciekawy (serio)",
      heldAt: new Date("2023-10-30"),
      organizer: {
        name: "Organizator sp. z o.o.",
      },
      location: {
        city: "Gdańsk",
        name: "Polsat Plus Arena",
        slug: "polsat-plus-arena",
        latitude: 12,
        longitude: 12,
      },
      slug: "testowe-wydarzenie",
      posterVertical: "https://picsum.photos/300/400?v=5",
      posterHorizontal: "https://picsum.photos/400/267?v=5",
      description: "<p>Elo</p>",
      speakers: [],
      eventType: {
        name: "IT",
        slug: "it",
      },
    },
    {
      name: "Powiększ swój event",
      heldAt: new Date("2023-10-30"),
      organizer: {
        name: "Organizator sp. z o.o.",
      },
      location: {
        city: "Gdańsk",
        name: "Polsat Plus Arena",
        slug: "polsat-plus-arena",
        latitude: 12,
        longitude: 12,
      },
      slug: "testowe-wydarzenie",
      posterVertical: "https://picsum.photos/300/400?v=6",
      posterHorizontal: "https://picsum.photos/400/267?v=6",
      description: "<p>Elo</p>",
      speakers: [],
      eventType: {
        name: "IT",
        slug: "it",
      },
    },
  ];
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  if (slug !== "testowe-wydarzenie") return null;
  return {
    name: "Testowe wydarzenie",
    description: `<div _ngcontent-serverapp-c157="" class="html-container"><p style="text-align: justify;"><strong>Już 11 grudnia 2023 w TAURON Arena Kraków wystąpi gwiazda światowego formatu – Jason Derulo! Autor hitów "Savage Love", "Swalla", "Wiggle", “Whatcha Say" czy "Talk Dirty" rozgrzeje polską publiczność i zagra jedyny taki koncert w naszym kraju!&nbsp;</strong></p>
    <br />
    <p style="text-align: justify;">Jason Derulo to amerykański artysta łączący pop, hip-hop i R'n'B. Jego koncerty słyną ze spektakularnego, tanecznego show, pełnego hitów, gorących rytmów i pozytywnej energii.Artysta zabierze nas w muzyczną podróż od 2009 roku, kiedy to swoim debiutanckim singlem udało mu się zdobyć szczyt amerykańskiego Billboard Hot 100, a aktualnie jest główną postacią TikToka oraz rynku muzycznego - wydającym hity mające miliardowe wyświetlenia i streamingi. Dosłownie przed chwilą Jason wypuścił nowy singiel "Hands On Me" – którego na pewno nie zabraknie na tym koncercie.&nbsp;</p>
    <p style="text-align: justify;">Najgorętszy wieczór tej zimy – już 11 grudnia, w TAURON Arena Kraków!&nbsp;</p>
    <p style="text-align: justify;">&nbsp;</p>
    <p style="text-align: justify;">&nbsp;</p>
    <p><strong>VIP hospitality:</strong></p>
    <ul>
    <li>Miejsce na trybunie siedzącej</li>
    <li>osobne wejście – dedykowane tylko VIP</li>
    <li>dostęp do sali VIP Hospitality</li>
    <li>pełen catering: dania ciepłe, zimne wraz z napojami i alkoholem (open bar) na dwie godziny przed koncertem i godzinę po jego zakończeniu</li>
    <li>specjalny pamiątkowy identyfikator</li>
    </ul>
    <p>&nbsp;</p>
    <p><strong>M&amp;G:</strong></p>
    <ul>
    <li>Miejsce na trybunie siedzącej</li>
    <li>osobne wejście – dedykowane tylko VIP</li>
    <li>dostęp do sali VIP Hospitality</li>
    <li>pełen catering: dania ciepłe, zimne wraz z napojami i alkoholem (open bar) na dwie godziny przed koncertem i godzinę po jego zakończeniu</li>
    <li>specjalny pamiątkowy identyfikator</li>
    <li>gwarantowane spotkanie z Jason Derulo – po koncercie, w specjalnie dedykowanej do tego strefie – w celu uzyskania zdjęcia i autografu od Artysty</li>
    <li>bilet nie gwarantuje nagrania tik toka</li>
    </ul>
    <p>&nbsp;</p></div>`,
    slug: "testowe-wydarzenie",
    posterVertical: "https://picsum.photos/300/400?v=5",
    posterHorizontal: "https://picsum.photos/525/300?v=5",
    heldAt: new Date("2023-09-03"),
    location: {
      name: "Polsat Plus Arena",
      city: "Gdańsk",
      latitude: 54.38979741243814,
      longitude: 18.640400552704822,
      slug: "polsat-plus-arena",
    },
    organizer: {
      name: "Organizator sp. z o.o.",
    },
    eventType: {
      name: "Warsztaty",
      slug: "it-warsztaty",
    },
    speakers: [
      {
        name: "Jan Kowalski",
        description: "<p>Elo!</p>",
        slug: "jan-kowalski",
        photo: "https://picsum.photos/300/300?v=5",
      },
      {
        name: "Piotr Nowak",
        description: "<p>Elo!</p>",
        slug: "piotr-nowak",
        photo: "https://picsum.photos/300/300?v=6",
      },
    ],
  };
}
