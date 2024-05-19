"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Search from "./search";

const ConditionalSearch = () => {
  const pathname = usePathname();
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShowSearch(pathname !== "/");
    }
  }, [pathname]);

  return (
    <>
      <div className=" hidden w-2/4 md:block">
        {showSearch ? <Search /> : null}
      </div>
    </>
  );
};

export default ConditionalSearch;
