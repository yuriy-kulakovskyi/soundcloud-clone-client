"use client";

import { signUp } from "@/auth";
import useAuthModal from "@/hooks/useAuthModal";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { getUser } from "@/app/lib/data";
import Button from "../home/button";
import { toast } from "react-hot-toast";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: File | null;
}

export default function Signup() {
  // auth modal
  const { onOpen, onClose } = useAuthModal();

  // user context
  const { setUser } = useUser();

  // form data
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null,
  });

  // error state
  const [error, setError] = useState<string>("");

  // avatar preview state
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files && files[0]) {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file,
      });
      setAvatarPreview(URL.createObjectURL(file));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('confirmPassword', formData.confirmPassword);
    if (formData.avatar) {
      data.append('avatar', formData.avatar);
    }

    try {
      const response = await signUp(data);
      setError("");

      // store token to the local storage
      localStorage.setItem("token", response.data.token);

      const token = response.data.token;
      const id = response.data._id;

      const fetchUser = async () => {
        try {
          const response = await getUser(id, token);
          setUser(response.data);
          toast.success("Registered successfully");
        } catch (error) {
          console.error(error);
        }
      };

      fetchUser();

      // close the modal
      onClose();
    } catch (error: any) {
      console.error(error);
      setError(error.response.data);
    }
  }  

  return (
    <>
      {/* form */}
      <form
        onSubmit={handleSubmit}
        className="
          flex
          flex-col
          gap-4
          w-full
          max-w-xs
          items-center
      ">
        <div
          className="
            w-24
            h-24
            rounded-full
            bg-neutral-700
            flex
            items-center
            justify-center
            text-white
            text-4xl
            cursor-pointer
            hover:bg-gray-700
            relative
            focus:outline-none
          "
          style={{
            backgroundImage: avatarPreview ? `url(${avatarPreview})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* input avatar */}
          <input
            type="file"
            accept="image/*"
            name="avatar"
            id="avatar"
            className="
              invisible
              w-full
              h-full
              absolute
            "
            onChange={handleChange}
          />
          {!avatarPreview && <label className="cursor-pointer w-full h-full flex items-center justify-center" htmlFor="avatar">+</label>}
        </div>

        <input
          type="name"
          name="name"
          placeholder="Name"
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
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
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
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
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
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Repeat Password"
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
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <Button
          type="submit"
          className="text-white"
        >
          Sign up
        </Button>

        {/* error message */}
        {error !== "" && <p className="bg-white rounded-full py-2 text-red-500 text-center">{error}</p>}

        <p className="text-center text-lg">Already have an account? <button onClick={() => onOpen("login")} className="text-blue-600 underline hover:no-underline">Sign In</button></p>
      </form>
    </>
  );
}
