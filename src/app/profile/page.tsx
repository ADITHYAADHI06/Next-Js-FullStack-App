"use client";
import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const page = () => {
  const router = useRouter();
  const [data, setdata] = useState("nothing");

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

  const onGetUserDetails = async () => {
    try {
      const res: any = await axios.get("api/users/me");
      // console.log(res.data.data._id);
      setdata(res.data.data._id);
    } catch (error: any) {
      toast.error("something went wrong in logout");
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1>Profile page</h1>
      <button className="text-white bg-red">
        {data === "nothing" ? (
          ""
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </button>

      <button onClick={onLogout} className="bg-blue-500 text-white p-3">
        logout
      </button>

      <button onClick={onGetUserDetails} className="bg-blue-500 text-white p-3">
        me info
      </button>
    </div>
  );
};

export default page;
