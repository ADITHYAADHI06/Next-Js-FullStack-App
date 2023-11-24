"use client"
import {useState} from "react"
import Link from 'next/link'

const login = () => {

        const [user, setuser] = useState({
          email:"",
          password:""
         })  

         const onLogin= async()=>{

         }


  return (
    <div className="flex justify-center flex-col w-full" >
      <h1 className="text-center">Sign Up</h1>
      <div className="flex justify-center flex-col mx-auto w-4/12">
        <label htmlFor="email">email</label>
        <input className="text-black" type='text' placeholder="email" value={user.email} onChange = {(e)=>{setuser({...user,email:e.target.value }) }} />
        <label htmlFor="password">password</label>
        <input className="text-black" type='password' placeholder="password" value={user.password} onChange = {(e)=>{setuser({...user,password:e.target.value }) }} />
      <button className="p-3 mt-4 bg-white text-black" onClick={onLogin} >Login</button>
      <button><Link href="/signup">vist signup</Link></button>
      </div>
    </div>

  )
}

export default login