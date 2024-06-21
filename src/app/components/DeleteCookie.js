"use client"
import React from 'react'
import Cookies from "js-cookie";
export default function DeleteCookie() {
  const handlelogout=()=>{
    Cookies.remove("AuthAdmin")
    window.location.reload()
  }
  return (
    <span onClick={()=>handlelogout()}>Logout</span>
  )
}
