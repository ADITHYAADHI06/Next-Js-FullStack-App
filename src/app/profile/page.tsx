"use client";
import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const onLogout = async () => {
    try {
      await axios.get("api/users/logout");
      toast.success("logout successfull");
      router.push("/login");
    } catch (error: any) {
      toast.error("something went wrong in logout");
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1>Profile page</h1>
      <button onClick={onLogout} className="bg-blue-500 text-white p-3">
        logout
      </button>
    </div>
  );
};

export default page;
