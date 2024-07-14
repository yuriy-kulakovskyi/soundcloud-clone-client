"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { getUser } from "./lib/actions";
import { jwtDecode } from "jwt-decode";

const Home: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      redirect("/auth/login");
    } else {
      try {
        const decoded: any = jwtDecode(token);

        const fetchUser = async () => {
          try {
            const response = await getUser(decoded._id, token);
            setCurrentUser(response.data);
          } catch (error) {
            console.error(error);
          }
        };

        fetchUser();
      } catch (error) {
        console.error("Token decoding error:", error);
        redirect("/auth/login");
      }
    }
  }, [redirect]);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {currentUser ? currentUser.name : "Loading..."}
    </div>
  );
};

export default Home;
