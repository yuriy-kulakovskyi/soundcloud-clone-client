"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    id: 1,
    href: "/auth/login",
    text: "log in",
  },
  {
    id: 2,
    href: "/auth/signup",
    text: "sign up",
  },
];

const NavLinks: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="
        md:h-full bg-orange-700 text-white
        h-[50vh]
      ">
        <ul className="
          h-full flex md:justify-center items-center md:flex-col
          flex-row w-full
          md:divide-y divide-x md:divide-x-0
        ">
          {navLinks.map(link => {
            return (
              <li key={link.id} className="
                list-item
                md:h-[50%] w-full h-full
                justify-center flex items-center
                cursor-pointer
                relative
              ">
                <Link href={link.href} type="button" className={clsx("w-full flex justify-center items-center gap-10 h-full uppercase text-2xl md:text-4xl hover:bg-dark-card hover:text-orange-700 font-extrabold",{
                  "bg-dark-card text-orange-700": pathname === link.href
                })}>
                  <span>|</span>
                  <span className="
                    text-left
                  ">
                    {/* after the first word set br tag */}
                    {link.text.split(" ").map((word, index) => {
                      return (
                        <span className="text-left" key={index}>
                          {index > 0 && <br />}
                          {word}
                        </span>
                      )
                    })}
                  </span>
                </Link>

                {pathname === link.href && 
                  // triangle in the right direction
                  <div className="w-0 h-0 
                    md:border-t-[100px] md:border-t-transparent
                    md:border-r-[120px] md:border-r-dark-bg
                    md:border-b-[100px] md:border-b-transparent
                    absolute md:right-0 md:top-[30%]
                    bottom-0 right-[20%]
                    border-l-[50px] border-l-transparent
                    border-b-[40px] border-b-dark-bg
                    border-r-[50px] border-r-transparent
                  "></div>
                }
              </li>
            )
          })}
        </ul>
      </nav>
  )
}

export default NavLinks;