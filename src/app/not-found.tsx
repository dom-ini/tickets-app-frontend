import Link from "next/link";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="container">
        <div className="text-center my-16 max-w-lg mx-auto">
          <h1 className="text-9xl font-semibold">404</h1>
          <h2 className="text-4xl font-bold">Strona nie istnieje</h2>
          <p className="my-8 text-muted-foreground">
            Podana strona nie została znaleziona. Sprawdź, czy adres URL nie
            zawiera błędów i spróbuj ponownie, lub przejdź do strony głównej.
          </p>
          <Button asChild>
            <Link href="/">Wróć na stronę główną</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
