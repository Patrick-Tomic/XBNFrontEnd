/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable import/no-absolute-path */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import xbn from '/public/xbn.png'
export default function Header () {
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [errMessage, setErr] = useState()
  const [logErr, setLogErr] = useState('false')
  const [userAuth, setUserAuth] = useState(localStorage.getItem('userAuthorization'))
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Please enter your email'),
    password: Yup.string().required('Please enter your password')
  })
  const formOptions = { resolver: yupResolver(validationSchema) }
  const { register, handleSubmit, reset, formState } = useForm(formOptions)
  const { errors } = formState

  const submitForm = async (data: any) => {
    const formData = JSON.stringify(data)
    try {
      const req = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/json'
        }

      })
      const file = await req.json()
      if (req.status !== 200) {
        setErr(file.info.message)
        /* setLogErr(true) */
        console.log(file)
        console.log(errMessage)
        return
      }
      console.log(file)
      /*  setUserAuth(true) */
      localStorage.setItem('token', file.token)
      localStorage.setItem('userAuthorization', 'true')
      localStorage.setItem('email', file.body.email)
      localStorage.setItem('id', file.body._id)
      localStorage.setItem('Cart', file.body.cart)
      reset()
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    if (userAuth === 'true') {
      document.getElementById('logoutBtn')?.setAttribute('style', 'display:block;')
      document.getElementById('startingBtns')?.setAttribute('style', 'display:none;')
    }
    const fetchBrands = async () => {
      const brandResponse = await fetch('http://localhost:3000/api/brands')
      const data = await brandResponse.json()
      const brands = await data.brands
      setBrands(brands)
    }
    fetchBrands()
    const fetchCat = async () => {
      const categoryResponse = await fetch('http://localhost:3000/api/categories')
      const dataB = await categoryResponse.json()
      const cat = await dataB.categories
      setCategories(cat)
    }
    fetchCat()
  }, [])
  const categoryListItems = categories.map((cat: any) => {
    return (
        <li key={cat.type} id='categoryChild' className='p-5 hidden'>
            <button onClick={() => {
              window.location.href = `/category/${cat._id}`
            }}>
              {cat.type}
            </button>
        </li>
    )
  })

  const brandListItems = brands.map((brand: any) => {
    return (
     <li key={brand._id} id='brandChild' className="hidden p-5">
             {/*  <a href={`/brand/${brand._id}`}> {brand.name}</a> */}
             <button onClick={() => {
               window.location.href = `/brands/${brand._id}`
             }}>{brand.name}</button>
          </li>
    )
  })
  return (
        <header className="flex justify-evenly items-center ">
          <p></p>
            <a href="/">Home</a>
             <ul id='brandUL'>
                <li id='brandHead'>Shop by Brand</li>
                <div className='brandDiv absolute'>
                {brandListItems}
                </div>
             </ul>
             <Image className="w-[12vw] h-[18vh]"
              src={xbn} alt={''} />
             <ul id='catUL'>
                <li id='categoryHead'>Shop by Category</li>
                <div className='absolute catDiv'>
                {categoryListItems}
                </div>
             </ul>
             <a href="#">Contact Us</a>
             <div className='flex justify-around  w-[10vw]'>
              <div className='hidden' id='logoutBtn'>
                  <button>Logout</button>
              </div>
              <div id='startingBtns'>
              <button className=' font-sans border-solid border-black border-2 rounded-xl text-lg w-[4vw] h-[4vh]' onClick={() => {
                document.getElementById('loginForm')?.setAttribute('style', 'display:block')
              }}>Login</button>
              <a href="/signup"><button>Sign-up</button></a>
              </div>
             </div>
             <form id='loginForm' className='hidden fixed z-[11] font-sans bg-gray-500 text-white h-[20vh] top-[15%] left-[78%] rounded-md' onSubmit={handleSubmit(submitForm)}>
      <div className='flex flex-col'>
        <label className=' text-xl font-bold' htmlFor="emai">Email:</label>
        <input type="text" className='border-2 border-black border-solid text-black max-w-[312px]' {...register('username')} />
      </div>
      <div className='flex flex-col'>
        <label className=' text-xl font-bold' htmlFor="password">Password:</label>
        <input className='border-2 border-black border-solid text-black' type="password" {...register('password')} />
      </div>
      <button className='border-2 p-1 border-solid hover:bg-gray-300 border-black bg-white text-black text-2xl ml-[30%] mt-2 rounded-lg transition-all ease-in-out duration-[1s]' type='submit'>Submit</button>
    </form>
        </header>
  )
}
