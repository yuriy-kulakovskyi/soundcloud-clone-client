"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "@/app/ui/home/button";
import useAuthModal from "@/hooks/useAuthModel";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import clsx from "clsx";

interface HeaderProps {
  children: React.ReactNode;
  className?: string
}

const Header: React.FC<HeaderProps> = ({
  children,
  className
}) => {
  const authModal = useAuthModal();
  const router = useRouter();
  const { user, setUser } = useUser();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.refresh();
  }

  return (
    <div
      className={twMerge(`
        h-fit
        bg-gradient-to-b
        from-orange-800
        p-6
      `,
        className)}
    >
      <div
        className="
          w-full
          mb-4
          flex
          items-center
          justify-between
        "
      >
        <div
          className="
            hidden
            md:flex
            gap-x-2
            items-center
          "
        >
          <button
            onClick={() => router.back()}
            className="
              rounded-full
              bg-black
              flex
              items-center
              justify-center
              hover:opacity-75
              transition
            "
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>

          <button
            onClick={() => router.forward()}
            className="
              rounded-full
              bg-black
              flex
              items-center
              justify-center
              hover:opacity-75
              transition
            "
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="
              rounded-full
              p-2
              bg-white
              flex
              items-center
              justify-center
              hover:opacity-75
              transition
            "
          >
            <HiHome className="text-black" size={20} />
          </button>
          <button className="
              rounded-full
              p-2
              bg-white
              flex
              items-center
              justify-center
              hover:opacity-75
              transition
            "
          >
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="
          flex
          justify-between
          items-center
          gap-x-4
        ">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button
                onClick={handleLogout}
                className="
                  bg-white px-6 py-2
                "
              >
                Logout
              </Button>
              <Button onClick={() => router.push("/account")}
                className={clsx("border-none", !user.avatar &&"bg-white", user.avatar && "p-0")}
              >
                {!user.avatar ?
                  <FaUserAlt /> :
                  <div className="
                    w-[40px]
                    h-[40px]
                    bg-cover
                    bg-center
                    rounded-full
                    "
                    style={{
                      backgroundImage: `url(${process.env.NEXT_PUBLIC_SERVER_URL + user?.avatar})`
                    }}
                  >
                  </div>
                }
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={() => authModal.onOpen("register")}

                  className="
                  bg-transparent
                  text-neutral-300
                  font-medium
                "
                >
                  Sign Up
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => authModal.onOpen("login")}

                  className="
                  bg-white
                  px-6
                  py-2
                "
                >
                  Log In
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div >
  )
}

export default Header;