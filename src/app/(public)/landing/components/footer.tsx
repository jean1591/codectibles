import Link from "next/link";
import { classNames } from "@/utils";
import { gradientBg } from "@/app/(app)/ui";

const navigation = [
  { name: "Features", href: "/landing" },
  { name: "Privacy policy", href: "/landing/privacy-policy" },
  { name: "Terms of service", href: "/landing/tos" },
];

// TODO: add "updates" with change log
export const Footer = () => {
  return (
    <footer className="mt-24 md:mt-32 bg-slate-800 text-slate-100">
      <div className="px-4 py-8 md:py-12 mx-auto w-full lg:max-w-5xl overflow-hidden">
        <nav
          className="-mb-8 columns-2 md:flex md:justify-center md:space-x-12"
          aria-label="Footer"
        >
          {navigation.map((item) => (
            <div key={item.name} className="pb-8">
              <Link
                href={item.href}
                className="text-sm leading-6 hover:text-slate-300"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>

        <div className="mt-12 text-sm flex items-center justify-center gap-x-1">
          <p>Made with ❤️ by</p>
          <Link
            href="https://jeanrobertou.com"
            target="_blank"
            className={classNames(
              gradientBg,
              "inline-block text-transparent bg-clip-text"
            )}
          >
            Jean Robertou
          </Link>
        </div>
      </div>
    </footer>
  );
};
