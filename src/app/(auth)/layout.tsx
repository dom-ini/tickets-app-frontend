import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SkipToContent } from "@/components/skip-to-content";
import { Card } from "@/components/ui/card";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SkipToContent href="#content" />
      <Header isAuthPage />
      <main id="content">
        <div className="flex pt-20 sm:pt-0 sm:min-h-screen items-center">
          <div className="flex-1 h-screen bg-login bg-cover bg-center hidden sm:block"></div>
          <div className="flex-1 bg-background">
            <Card className="w-full sm:w-96 mx-auto shadow-none border-none">
              {children}
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
