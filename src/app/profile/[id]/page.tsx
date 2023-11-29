"use client";
// import { useRouter } from 'next/navigation'
// import { useSearchParams } from 'next/navigation'
import { usePathname } from "next/navigation";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  const searchParams = usePathname();
  // console.log(searchParams.split("/")[2]);

  const EmailVerify = async () => {
    // try {
    //   const Token = searchParams.split("/")[2];
    //   await axios.post("/api/users/verifyEmail", { Token: Token });
    // } catch (error: any) {
    //   console.log(error);
    // }
  };
  return <div>profile {searchParams.split("/")[2]}</div>;
};

export default page;
