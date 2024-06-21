"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import Cookies from 'js-cookie';

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";


export default function Nav({AuthToken}) {
 
  const [Item, setItem] = useState([])
  const [Count, setCount] = useState(0)
  const [valid, setValid] = useState(false)
  const [SearchQuery, setSearchQuery] = useState()
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  const [toggle, settoggle] = useState(false)
  function menuToggle(e){
    if(toggle===false){
      settoggle(true)
    }else{
      settoggle(false)
    }
  }

  useEffect(() => {
    const checkUser=async()=>{
      const res = await axios.get("http://localhost:3001/AuthUser",{withCredentials:true})
      // console.log(res)
      if(res.data.Status === true){
        setValid(true)
      }else{
        setValid(false)
      }
    }
    return () => {
      checkUser()
    }
  }, [])


  const handleLogout =()=>{
    Cookies.remove("AuthToken")
    location.reload();
  }
  
  return (
    <>  
 
<nav className="bg-white border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between space-x-4 mx-auto p-4">
    <Link href="/" className="hidden md:flex md:items-start md:mr-7 md:rtl:space-x-reverse ">
        <span className="self-start text-2xl font-semibold whitespace-nowrap dark:text-white">Buzz Store</span>
    </Link>
    <button data-collapse-toggle="{navbar-default}" onClick={()=>menuToggle(false)} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 " aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>


    <div className={`w-full md:block md:w-auto ${toggle?'sm:flex':'hidden'}`} id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <Link href="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</Link>
        </li>
        <li>
          <Link href="/Books" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Books</Link>
        </li>
        <li>
          <Link href="/About" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About us</Link>
        </li>
        <li>
          <Link href="/Contact" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact us</Link>
        </li>
        <li>
          <Link href="/Search" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Search</Link>
        </li>
        {
          valid===false ?
          <>
        <li>
          <Link href="/Login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</Link>
        </li>
        <li>
          <Link href="/Register" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Register</Link>
        </li>
        </>:
        <>
        <li>
          <Link href="#" onClick={()=>handleLogout()} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Logout</Link>
        </li>
          <Menu>
            <MenuHandler>
              <Button className='block py-2 px-3 text-base font-normal text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'>Menu</Button>
            </MenuHandler>
            <MenuList>
              <Link href={'http://localhost:3000/MyBooks'}><MenuItem>My Books</MenuItem></Link>
              <Link href={'http://localhost:3000/UserDetails'}><MenuItem>User Details</MenuItem></Link>
              <Link href={'http://localhost:3000/Search'}><MenuItem>Search the book</MenuItem></Link>
              <Link href={'http://localhost:3000/ChangePassowrd'}><MenuItem>Change Password</MenuItem></Link>
            </MenuList>
          </Menu>

        </>
        }
      </ul>
    </div>
       
    {
      valid===true? <IconButton aria-label="cart" className='bg-slate-100 hover:bg-stone-300'>
    <Link href={"/Cart"}>
          <StyledBadge badgeContent={Item.length} color="secondary">
            <ShoppingCartIcon color='secondary'></ShoppingCartIcon>
          </StyledBadge>
    </Link>
    </IconButton>:""
    }
  </div>
</nav>
    </>
  )
}
