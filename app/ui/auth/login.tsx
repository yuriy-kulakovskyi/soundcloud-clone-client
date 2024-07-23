"use client";

import { signIn } from "@/auth";
import { useState } from "react";
import useAuthModal from "@/hooks/useAuthModal";
import { getUser } from "@/app/lib/data";
import { useUser } from "@/hooks/useUser";
import Button from "../home/button";
import { toast } from "react-hot-toast";

export default function Login() {
  // auth modal
  const { onOpen, onClose } = useAuthModal();

  // user context
  const { setUser } = useUser();

  // email state
  const [email, setEmail] = useState<string>("");

  // password state
  const [password, setPassword] = useState<string>("");

  // error state
  const [error, setError] = useState<string>("");

  // submit handler
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await signIn(email, password);
      setError("");

      // store token to the local storage
      localStorage.setItem("token", response.data.token);

      const token = response.data.token;
      const id = response.data._id;

      const fetchUser = async () => {
        try {
          const response = await getUser(id, token);
          setUser(response.data);
          toast.success("Logined successfully");
        } catch (error) {
          console.error(error);
        }
      };

      fetchUser();

      // close the modal
      onClose();
    } catch (error : any) {
      console.error(error);
      setError(error.response.data);
    }
  }

  return (
    <>
      {/* form */}
      <form className="
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
            flex
            w-full
            rounded-md
            bg-neutral-700
            border
            border-transparent
            px-3
            py-3
            text-lg
            disabled: opacity-90
            focus:outline-none
          "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="
            flex
            w-full
            rounded-md
            bg-neutral-700
            border
            border-transparent
            px-3
            py-3
            text-lg
            disabled: opacity-90
            focus:outline-none
          "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          className="
            text-white
          "
        >
          Sign in
        </Button>

        {/* error message */}
        {error !== "" && <p className="bg-white rounded-full py-2 text-red-500 text-center">{error}</p>}

        <p className="text-center text-lg">Don&apos;t have an account? <button onClick={() => onOpen("register")} className="text-blue-600 underline hover:no-underline">Sign Up</button></p>
      </form>
    </>
  );
}