import Link from "next/link";
import { Linkedin, Github, AtSign } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="text-center border-t pt-8 pb-6">
      <div className="container">
        <ul className="flex justify-center">
          <li>
            <Button asChild variant="ghost">
              <a
                href="https://www.linkedin.com/in/dominik-szlaza/"
                target="_blank"
                rel="me"
                title="LinkedIn"
              >
                <Linkedin />
              </a>
            </Button>
          </li>
          <li>
            <Button asChild variant="ghost">
              <a
                href="https://github.com/dom-ini"
                target="_blank"
                rel="me"
                title="Github"
              >
                <Github />
              </a>
            </Button>
          </li>
          <li>
            <Button asChild variant="ghost">
              <a
                href="mailto:dominik.szlaza.1@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Wyślij e-mail"
              >
                <AtSign />
              </a>
            </Button>
          </li>
        </ul>
        <nav className="mt-6 mb-4 text-sm">
          <ul className="flex justify-center gap-4">
            <li>
              <Link href="/">Strona główna</Link>
            </li>
            <li>
              <Link href="/wydarzenia">Wydarzenia</Link>
            </li>
            <li>
              <Link href="/pomoc">Pomoc</Link>
            </li>
          </ul>
        </nav>
        <small>&#169; Tickts {new Date().getFullYear()}</small>
      </div>
    </footer>
  );
}
