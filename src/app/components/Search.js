"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react'

export default function Search() {


    const [searchTerm, setSearchTerm] = useState('');
    const [data, setdata] = useState([])

    const HandleSearch = async()=>{
       const res = await axios.get(`http://localhost:3001/Search/${searchTerm}`)
        console.log(res)   
        setdata(res.data.results)
    }

  return (
    <>
        <div className="max-w-md ml-9 mt-3">   
    <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" onChange={(e)=>setSearchTerm(e.target.value)} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
        <button onClick={()=>HandleSearch()} type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</div>

<section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
          
          {
            
            data.map((item,index)=>{
                if(index <=5){
              return <div className="lg:w-1/4 md:w-1/2 p-4 w-full  bg-gray-50 " key={item._id}>
              <Link href={`/Books/${item._id}`} className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-auto block"
                  src={item.url}
                  // src="https://5.imimg.com/data5/SELLER/Default/2022/11/OF/VG/DS/92261648/men-hoodies-jacket.png"
                />
              </Link>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  {item.Bookcategory}
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                 {item.BookName}
                </h2>
                <span>

                    {/* <RatingCom></RatingCom> */}
                </span>
              </div>
            </div>
                }
            })
            
          }
          </div>
        </div>
      </section>
    </>
  )
}
