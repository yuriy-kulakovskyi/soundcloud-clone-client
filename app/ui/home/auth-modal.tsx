"use client";

import useAuthModal from "@/hooks/useAuthModal";
import Login from "../auth/login";
import Modal from "./modal";
import Signup from "../auth/signup";

const AuthModal = () => {
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
