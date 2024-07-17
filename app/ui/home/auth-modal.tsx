"use client";

import useAuthModal from "@/hooks/useAuthModel";
import Login from "../auth/login";
import Modal from "./modal";
import { useRouter } from "next/navigation";
import Signup from "../auth/signup";

const AuthModal = () => {
  const router = useRouter();

  const { onClose, isOpen, page } = useAuthModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  }
  
  return (
    <Modal
      title={page === "login" ? "Welcome back" : "Welcome"}
      description={page === "login" ? "Login to your account" : "Create an account"}
      isOpen={isOpen}
      onChange={onChange}
    >
      {page === "login" ? <Login /> : <Signup />}
    </Modal>
  );
}

export default AuthModal;
