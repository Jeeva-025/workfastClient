"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className="h-screen w-17 bg-gray-900 text-white fixed flex flex-col items-center px-1 py-3">
      <ul className="space-y-4">

        <li className="flex flex-col items-center justify-center">
          <Link
            href="/people"
            className={`flex px-3   flex-col items-center justify-center ${
              pathname.includes("/people") ? "text-yellow-500 border-b-2 border-yellow-500" : "text-gray-400"
            }`}
          >
            <p className="text-xs">@</p>
            <p  className="text-[10px]">People</p>
          </Link>
        </li>

       
      </ul>
    </div>
  );
};

export default Navbar;
