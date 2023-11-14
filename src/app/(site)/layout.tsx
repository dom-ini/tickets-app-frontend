import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SkipToContent } from "@/components/skip-to-content";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SkipToContent href="#content" />
      <Header />
      <main id="content">{children}</main>
      <Footer />
    </>
  );
}
