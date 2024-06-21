"use client"
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { FormControl } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import {
    Card,
    Input,
    Typography,
    Textarea,
  } from "@material-tailwind/react";

// import { URL } from 'url';
   

  
  // const storeProduct ={}
export default function Additem() {

    // init the router
    const router = useRouter();
    // storing product details
    const [BookName, setBookName] = useState()
    const [AuthorName, setAuthorName] = useState()
    const [Bookqty, setBookqty] = useState()
    const [BookPrice, setBookPrice] = useState(0)
    const [ISBN, setISBN] = useState()
    const [BookCategory, setBookCategory] = useState("no selected")
    const [BookDesc, setBookDesc] = useState()
    const [pdf, setpdf] = useState()

    // storing images for product
    // const [image, setImage] = useState();
    // const [preview, setPreview] = useState([]);
    // thumbnail image for product
    const [thumbnail, setThumbnail] = useState();
    const [url, seturl] = useState();
    const [show, setshow] = useState(false)
   

   const HandleSubmit = async()=>{

     try{
      const BookImageFormData = new FormData();
      BookImageFormData.append("file",thumbnail)
      BookImageFormData.append("upload_preset","OnlineBookstore")
      BookImageFormData.append("cloud_name","ddxnmzjhg")
      
       const resImg = await axios.post("https://api.cloudinary.com/v1_1/ddxnmzjhg/image/upload",BookImageFormData)
       seturl(resImg.data.url)

       const formdata = new FormData();
       formdata.append('file',pdf)
       formdata.append('title',BookName)
       formdata.append('Author',AuthorName)
       formdata.append('qty',Bookqty)
       formdata.append('price',BookPrice)
       formdata.append('ISBN',ISBN)
       formdata.append('category',BookCategory)
       formdata.append('Desc',BookDesc)
       formdata.append('url',url)
      // const data = {ProductName,Productid,Productqty,Productcategory,Productdesc,Productprice,url,pdf}
  
      const result = await axios.post("http://localhost:3001/upload-files",formdata,{headers:{"Content-Type":"multipart/form-data"}})
      toast.success(result.data.message);
      console.log("hello")
      console.log(url)
      // console.log(result)
    }catch(error){
      toast.success(result.data.message);
    }    
  }

  useEffect(() => {
    const checkUser = async()=>{
      const res = await axios.get("http://localhost:3001/AdminAuth",{withCredentials:true})
      if(res.data.Status===true){
        setshow(true)
      }else{
        router.push('http://localhost:3000/Admin/Login')
      }
    }
    return () => {
      checkUser()
    }
  }, [])

    
    return (
    <>
    {

      show===true?
      <div className='lg:flex sm:block'>
      <ToastContainer />
        {/* left section */}
        <div className='mr-10'> 
        <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Add you Book
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to list a Book.
      </Typography>
      <div className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">

        {/* this is the details section */}

        {/* section 1 */}
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Book Name
          </Typography>
          <Input
            size="lg"
            placeholder="Product name ex:- hooides"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={(e)=>setBookName(e.target.value)}
          />

        {/* section 2 */}
         <Typography variant="h6" color="blue-gray" className="-mb-3">
            Author Name
          </Typography>
          <Input
            size="lg"
            placeholder="Book Author name"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={(e)=>setAuthorName(e.target.value)}
          />


          {/* section 4 */}
          <Typography variant="h6" color="blue-gray" className="-mb-3">
           ISBN.
          </Typography>
          <Input
            required
            size="lg"
            placeholder="Enter your ISBN of Book"
            type='text'
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={(e)=>setISBN(e.target.value)}
          />

        {/* this component is from material ui website  */}
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
        <div>
        
          <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={BookCategory}
          label="Category"
          onChange={(e)=>setBookCategory(e.target.value)}
        >
            <MenuItem value="Fiction" selected={true}>Fiction</MenuItem>
            <MenuItem value="Non-Fiction">Non-Fiction</MenuItem>
            <MenuItem value="Novel">Novel</MenuItem>
            <MenuItem value="Romance">Romance</MenuItem>
            <MenuItem value="Hacking">Hacking</MenuItem>
            <MenuItem value="Programming">Programming</MenuItem>
            <MenuItem value="Comic-book">Comic book</MenuItem>
        </Select>
      </FormControl>
    </Box>

    
        </div>
        </Box>
        {/* <Typography>
          Choose your images for Product
        </Typography> */}
         {/* <input type="file"  accept='image/jpg, image/jpeg, image/png' multiple onChange={(e)=>{
            if(e.target.files && e.target.files.length > 0){
                setImage(e.target.files)
            }
         }}/> */}
        </div>

        {/* image preview code */}
        {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {preview && preview.map(( pic ) => (
            <div>
            <img
                className="h-40 w-full max-w-full rounded-lg object-cover object-center"
                src={pic}
                alt="gallery-photo"
            />
            </div>
            ))}
        </div> */}
      </div>
    </Card>    
    </div>

    {/* right section    */}
        <div className='ml-4'>
        <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Pricing
      </Typography>
      <div className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">

        {/* section 1 */}
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Price
          </Typography>
          <Input
            size="lg"
            placeholder="price "
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={(e)=>setBookPrice(e.target.value)}
          />
          {/* <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your product price
          </Typography>
          <Input
            size="lg"
            placeholder="Enter your ammount"
            type='text'
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          /> */}

        {/* this component is from material ui website  */}
        {/* <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
        </Box> */}
        {/* section 2 */}
        <Typography>
          upload your pdf of book
        </Typography>
        <input type="file"  accept='application/pdf' onChange={(e)=>setpdf(e.target.files[0])}/>

        <Typography>
          Choose your Thumbnail pic
        </Typography>
        <input type="file"  accept='image/jpg, image/jpeg, image/png' onChange={(e)=>setThumbnail(e.target.files[0])}/>

        </div>
      </div>

      {/* section 3 */}
      <Typography>Description of your book</Typography>
      <Textarea variant="standard" onChange={(e)=>setBookDesc(e.target.value)} />  
      {/* < className='mt-8' onClick={()=>HandleSubmit}>Upload product</Button> */}
      <input type="button" value="upload product" className='bg-black mt-3 text-white rounded-md w-1/2 hover:shadow-lg p-2 hover:cursor-pointer' onClick={()=>HandleSubmit()} />
    </Card>    
        </div>
      </div>

      :""
    }
    </>
  )
}
