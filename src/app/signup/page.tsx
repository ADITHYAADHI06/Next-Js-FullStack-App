"use client"
import {useState} from "react"
import Link from 'next/link'
import { useRouter } from "next/navigation";

import {toast} from "react-hot-toast"
import axios from "axios"



const signup = () => {
         const router=useRouter();

        const [user, setuser] = useState({
          username:"",
          email:"",
          password:""
         })  

         const [signUploading, setsignUploading] = useState(false)

         const onSignUp= async()=>{
           try {
            setsignUploading(true);

            const response =await axios.post("api/users/signup",user);
            console.log("signup succesful ",response.data);
            router.push("/login");
            
           } catch (err:any) {
               toast.error(err.message);
               console.log("error while creating user");
               setsignUploading(false);

           }finally{
            setsignUploading(false);
           }
         }

  return (
    <div className="flex justify-center flex-col " >
      <h1 className="text-center">Sign Up</h1>
      <div className="flex flex-col w-4/12 mx-auto">
        <label htmlFor="userName">UserName</label>
        <input className="text-black" type='text' placeholder="username" value={user.username} onChange = {(e)=>{setuser({...user,username:e.target.value }) }} />
        <label htmlFor="email">email</label>
        <input className="text-black" type='text' placeholder="email" value={user.email} onChange = {(e)=>{setuser({...user,email:e.target.value }) }} />
        <label htmlFor="password">password</label>
        <input className="text-black" type='password' placeholder="password" value={user.password} onChange = {(e)=>{setuser({...user,password:e.target.value }) }} />
      <button className="p-3 m-4 bg-white text-black" onClick={onSignUp} >sign up</button>
      <p>{signUploading && "Saving User ......"}</p>
      <Link href="/login">vist login</Link>
      </div>
    </div>

  )
}

export default signup