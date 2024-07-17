"use client";

import { signIn } from "@/auth";
import { useState } from "react";
import useAuthModal from "@/hooks/useAuthModel";
import { getUser } from "@/app/lib/actions";
import { useUser } from "@/hooks/useUser";

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
            px-4
            py-2
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
            px-4
            py-2
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
            px-4
            py-2
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

        <p className="text-center text-lg">Don't have an account? <button onClick={() => onOpen("register")} className="text-blue-600 underline hover:no-underline">Sign Up</button></p>
      </form>
    </>
  );
}