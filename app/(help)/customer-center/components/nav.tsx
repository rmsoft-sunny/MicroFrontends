"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  {
    href: "/customer-center",
    title: "공지사항",
  },
  {
    href: "/customer-center/faq",
    title: "FAQ",
  },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="mx-auto flex justify-center gap-8 border-y bg-background px-2 pb-2 text-[#696972]">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "inline-flex justify-start p-2 pt-3 text-sm font-bold hover:bg-white",
            pathname === link.href && "rounded-none border-b-2 border-blue-400",
            pathname.startsWith(link.href) &&
              !pathname.includes("faq") &&
              "rounded-none border-b-2 border-blue-400",
          )}
        >
          {link.title}
        </Link>
      ))}
    </nav>
  );
}
