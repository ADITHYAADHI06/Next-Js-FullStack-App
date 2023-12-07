"use client";
import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const page = () => {
  const [status, setstatus] = useState();
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  async function handleRestePassword(e: any) {
    e.preventDefault();
    const res: any = await axios.post("api/users/resetpassword", {
      token,
      password,
    });

    console.log(res);
    // console.log(res.data.data);
    setstatus(res.data.status);
  }

  // useEffect(() => {
  //   handleRestePassword();
  // }, []);

  return (
    <div>
      {status ? (
        <></>
      ) : (
        <>
          <h1>forgot password</h1>
          <form
            onSubmit={(e) => {
              handleRestePassword(e);
            }}
          >
            <input
              className="text-black"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
            <input type="submit" value="Submit" />
          </form>
        </>
      )}

      {status ? (
        <h1 className="text-center text-4xl mb-4">
          {status === 200
            ? "Verification sucessfull"
            : "Invaild Token try agian"}
        </h1>
      ) : (
        <></>
      )}

      <Link className="mx-auto bg-yellow-600 rounded-lg p-2 px-4" href="/">
        HOME
      </Link>
    </div>
  );
};

export default page;
