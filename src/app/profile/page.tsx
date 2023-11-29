"use client";
import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

const page = () => {
  const router = useRouter();
  const [data, setdata] = useState("nothing");
  const [CompleteUserdata, setCompleteUserdata] = useState({
    email: "",
    emailType: "VERIFY",
    _id: "",
  });

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
      // console.log(res.data.data);
      setCompleteUserdata({
        ...CompleteUserdata,
        email: res.data.data.email,
        _id: res.data.data._id,
      });
      setdata(res.data.data._id);
    } catch (error: any) {
      toast.error("something went wrong in logout");
      console.log(error.message);
    }
  };

  if (!CompleteUserdata) {
    return <></>;
  }

  const EmailVerify = async () => {
    try {
      const res: any = await axios.post(
        "api/users/sendVerifyEmail",
        CompleteUserdata
      );
      // console.log(res);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    onGetUserDetails();
  }, []);

  return (
    <div className="h-screen flex-col flex justify-center">
      <h1 className="text-center">Profile page</h1>
      <div className="mt-10 flex justify-center">
        <button className="text-white bg-red mx-3">
          {data === "nothing" ? (
            "nothing"
          ) : (
            <Link href={`/profile/${data}`}>{data}</Link>
          )}
        </button>

        <button
          onClick={EmailVerify}
          className="bg-yellow-500 p-2 inline-block text-white p-3"
        >
          Verify Email
        </button>

        <button
          onClick={onGetUserDetails}
          className="bg-green-500 text-white p-3"
        >
          me info
        </button>
        <button onClick={onLogout} className="bg-red-500 text-white p-3">
          logout
        </button>
      </div>
    </div>
  );
};

export default page;
