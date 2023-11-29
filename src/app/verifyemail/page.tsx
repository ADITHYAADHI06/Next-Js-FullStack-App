"use client";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const page = () => {
  const [status, setstatus] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  //   console.log(token);

  //   setToken(searchParams.get("token") || "");

  async function ifVerified() {
    const res: any = await axios.post("api/users/verifyemail", token);

    console.log(res);
    console.log(res.data.data);
    setstatus(res.data.data);
  }

  useEffect(() => {
    ifVerified();
  }, []);

  return (
    <div className="flex justify-center h-screen flex-col ">
      <h1 className="text-center text-4xl mb-4">
        {status === "INVALID TOKEN"
          ? "Invaild Token try agian"
          : "Verification sucessfull"}
      </h1>

      <Link className="mx-auto bg-yellow-600 rounded-lg p-2 px-4" href="/">
        HOME
      </Link>
    </div>
  );
};

export default page;
