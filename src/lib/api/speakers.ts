import { EventSpeaker } from "@/lib/constants";

export async function getSpeakerBySlug(
  slug: string
): Promise<EventSpeaker | null> {
  if (slug !== "jan-kowalski") return null;
  return {
    name: "Jan Kowalski",
    slug: "jan-kowalski",
    photo: "https://picsum.photos/300/300?v=5",
    description: `<p data-wahfont="18">Od prawie 25 lat zajmuje się marketingiem – zarówno po stronie agencji, jak i klienta. Pracował w dużych sieciowych agencjach reklamowych jak Saatchi &amp; Saatchi i DDB, a także w lokalnych agencjach. Od 10 lat prowadzi własną firmę, która świadczyła usługi m.in. dla Tauron, Panasonic, LG itp. Od 7 lat buduje start-upy i doradza im na etapie budowania przedsięwzięcia. </p>
        <br />
    <p data-wahfont="18">Przez wiele lat był jurorem konkursu efektywności reklamowej EFFIE. Zdobył także wiele nagród na konkursach reklamowych, m.in. EFFIE i Golden Arrow. </p>
    <br />
    <p data-wahfont="18">Współtworzył system samoregulacji reklamy w Polsce.</p>`,
  };
}
