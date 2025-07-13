"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { HeaderBase } from "./header-base";
import { useSession } from "@opencut/auth/client";
import { getStars } from "@/lib/fetch-github-stars";
import { useEffect, useState } from "react";
import Image from "next/image";

export function Header() {
  const { data: session } = useSession();
  const [star, setStar] = useState<string>("");

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const data = await getStars();
        setStar(data);
      } catch (err) {
        console.error("Failed to fetch GitHub stars", err);
      }
    };

    fetchStars();
  }, []);

  const leftContent = (
    <Link href="/" className="flex items-center gap-3">
      <Image src="/logo.svg" alt="OpenCut Logo" width={32} height={32} />
      <span className="text-xl font-medium hidden md:block">OpenCut</span>
    </Link>
  );

  const rightContent = (
    <nav className="flex items-center gap-2 md:gap-3">
      <Link href="/contributors" className="hidden sm:block">
        <Button variant="text" className="text-sm p-0">
          Contributors
        </Button>
      </Link>
      {process.env.NODE_ENV === "development" ? (
        <Link href="/projects">
          <Button size="sm" className="text-xs md:text-sm ml-2 md:ml-4">
            <span className="hidden sm:inline">Projects</span>
            <span className="sm:hidden">App</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      ) : (
        <Link href="https://github.com/OpenCut-app/OpenCut" target="_blank">
          <Button size="sm" className="text-xs md:text-sm ml-2 md:ml-4">
            <span className="hidden sm:inline">GitHub {star}+</span>
            <span className="sm:hidden">GitHub</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      )}
    </nav>
  );

  return (
    <div className="mx-2 sm:mx-4 md:mx-0">
      <HeaderBase
        className="bg-accent border rounded-xl md:rounded-2xl max-w-3xl mx-auto mt-2 md:mt-4 pl-3 md:pl-4 pr-3 md:pr-[14px]"
        leftContent={leftContent}
        rightContent={rightContent}
      />
    </div>
  );
}
