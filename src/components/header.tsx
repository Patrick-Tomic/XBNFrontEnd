/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
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
  const [userAuth, setUserAuth] = useState()

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
      const req = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}login`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/json'
        }

      })
      const file = await req.json()
      if (req.status !== 200) {
        /* setLogErr(true) */
        return
      }
      console.log(file)
      /*  setUserAuth(true) */
      localStorage.setItem('token', file.token)
      localStorage.setItem('userAuthorization', 'true')
      localStorage.setItem('admin', file.body.admin)
      reset()
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    // check if token in local storage is valid
    const validateToken = async () => {
      try {
        const token = localStorage.getItem('token')
        const valid = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}load/${localStorage.getItem('token')}`)
        const data = await valid.json()
        if (valid.status === 200) {
          console.log('good to go')
        } else {
          console.log('not valid')
          localStorage.clear()
        }
      } catch (err) {
        console.log('expired token')
      }
    }
    validateToken()
    // fix this load issue//
    if (localStorage.getItem('userAuthorization') === 'true') {
      document.getElementById('logoutBtn')?.setAttribute('style', 'display:block;')
      document.getElementById('cart')?.setAttribute('style', 'display:block')
      document.getElementById('startingBtns')?.setAttribute('style', 'display:none;')
    }
    const fetchBrands = async () => {
      const brandResponse = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}brands`)
      const data = await brandResponse.json()
      const brands = await data.brands
      setBrands(brands)
    }
    fetchBrands()
    const fetchCat = async () => {
      const categoryResponse = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}categories`)
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
        <header className="flex justify-evenly items-center md:text-lgm sm:text-base xl:text-xl 2xl:text-2xl">
          <p></p>
            <a href="/">Home</a>
             <ul id='brandUL'>
                <li id='brandHead'>Shop by Brand</li>
                <div className='brandDiv absolute'>
                {brandListItems}
                </div>
             </ul>
             <Image className="w-[12vw] h-[18vh] lg:h-[16vh] lg:w-[12vw] md:w-[10vw] md:h-[12vh] sm:h-[10vh] sm:w-[8vw]"
              src={xbn} alt={''} />
             <ul id='catUL'>
                <li id='categoryHead'>Shop by Category</li>
                <div className='absolute catDiv'>
                {categoryListItems}
                </div>
             </ul>
             <a href="#">Contact Us</a>
             <div className='flex justify-around w-[10vw]'>
                  <button id='logoutBtn' className='hidden sm:text-base sm:w-[8vw] md:w-[8vw] lg:w-[6vw] font-sans border-solid border-black border-2 rounded-xl text-lg w-[4vw] h-[4vh]' onClick = {() => {
                    localStorage.clear()
                    window.location.reload()
                  }}>Logout</button>
              <div className='flex' id='startingBtns'>
              <button id='login' className=' font-sans border-solid border-black border-2 rounded-xl text-lg w-[4vw] h-[4vh] mr-10' onClick={() => {
                document.getElementById('loginForm')?.setAttribute('style', 'display:block')
              }}>Login</button>
              <a href="/signup"><button className=' font-sans border-solid border-black border-2 rounded-xl text-lg w-[4vw] h-[4vh]'>Sign-up</button></a>
              </div>
              <a className='hidden' id='cart' href="#"><svg className='w-10 h-10' fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                  width="800px" height="800px" viewBox="0 0 902.86 902.86"
                  >
                <g>
                  <g>
                    <path d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z
                      M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z"/>
                    <path d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717
                      c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744
                      c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742
                      C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744
                      c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z
                      M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742
                      S619.162,694.432,619.162,716.897z"/>
                  </g>
                </g>
                </svg></a>
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
