"use client";

import SoundCloudLogo from "@/app/ui/soundcloud-logo";
import Link from "next/link";
import { signIn } from "@/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  // email state
  const [email, setEmail] = useState<string>("");

  // password state
  const [password, setPassword] = useState<string>("");

  // error state
  const [error, setError] = useState<string>("");

  // router
  const router = useRouter();

  // submit handler
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await signIn(email, password);
      setError("");

      // store token to the local storage
      localStorage.setItem("token", response.data.token);

      // redirect to the home page
      router.push("/");
    } catch (error : any) {
      console.error(error);
      setError(error.response.data);
    }
  }

  return (
    <section className="min-h-screen flex flex-col justify-center items-center pt-20 pb-20 pl-5 pr-5">
      {/* logo */}
      <SoundCloudLogo />

      <h3 className="
        mt-12
        text-4xl
        font-bold
        text-center
        text-white
      ">
        Sign in to SoundCloud
      </h3>

      {/* form */}
      <form className="
        mt-8
        flex
        flex-col
        gap-4
        w-full
        max-w-xs
      "
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="Email"
          className="
            px-5
            py-4
            rounded
            bg-gray-800
            text-white
            placeholder-gray-400
            focus: outline-none
            text-2xl
          "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="
            px-5
            py-4
            rounded
            bg-gray-800
            text-white
            placeholder-gray-400
            focus: outline-none
            text-2xl
          "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="
            px-5
            py-4
            rounded
            bg-orange-500
            text-white
            font-bold
            hover:bg-orange-600
          "
        >
          Sign in
        </button>

        {/* error message */}
        {error !== "" && <p className="bg-white rounded py-2 text-red-500 text-center">{error}</p>}

        <p className="text-center text-lg">Don't have an account? <Link className="text-blue-600 underline hover:no-underline" href={"/auth/signup"}>Sign Up</Link></p>
      </form>
    </section>
  );
}