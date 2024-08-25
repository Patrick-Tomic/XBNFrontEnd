/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-base-to-string */
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

import UserMenu from './userMenu'
import Image from 'next/image'
import X from '/public/X.png'
import { set, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import xbn from '/public/xbn.png'
export default function Header () {
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [userAuth, setUserAuth] = useState(false)

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
      localStorage.setItem('id', file.body._id)
      reset()
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    document.getElementById('brandUL')?.addEventListener('mouseover', () => {
      document.getElementById('brandDiv')?.setAttribute('style', 'height:80vh;')
    })
    document.getElementById('brandUL')?.addEventListener('mouseout', () => {
      document.getElementById('brandDiv')?.setAttribute('style', 'height:auto;')
    });
    // check if token in local storage is valid
    ( async () => {
        const token = localStorage.getItem('token')
        const valid = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}load/${localStorage.getItem('token')}`)
        const data = await valid.json()
        if (valid.status === 200) {
          document.querySelector('.startingBtns')?.setAttribute('style', 'display:none')
          document.querySelector('#logoutBtn')?.setAttribute('style', 'display:block')
          document.getElementById('cart')?.setAttribute('style', 'display:block')
          localStorage.setItem('validToken', 'true')
        } else {
          console.log('not valid')
          localStorage.clear()
        }
    
    })();
 
    ( async () => {
      const brandResponse = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}brands`)
      const data = await brandResponse.json()
      const brands = await data.brands
      setBrands(brands)
    })();
 
    (async () => {
      const categoryResponse = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}categories`)
      const dataB = await categoryResponse.json()
      const cat = await dataB.categories
      setCategories(cat)
  })();
    
  }, [])
  const categoryListItems = categories.map((cat: any) => {
    document.getElementById(`${cat.type}`)?.addEventListener('mouseover', () => {
      document.getElementById(`div${cat.type}`)?.setAttribute('style', 'transform:scaleX(1);')
    })
    document.getElementById(`${cat.type}`)?.addEventListener('mouseout', () => {
      document.getElementById(`div${cat.type}`)?.setAttribute('style', 'transform:scaleX(0);')
    })
    return (
        <li key={cat.type} id='categoryChild' className='p-5 bg-[white] border-x-2 border-black hidden'>
            <button id={`${cat.type}`} onClick={() => {
              window.location.href = `/category/${cat._id}`
            }}>
              {cat.type}
            </button>
            <div className='border-b-2 w-[80%] scale-x-0 solid border-2 ease-in-out transition-all delay-[.1s] origin-left border-black' id={`div${cat.type}`}></div>
        </li>
    )
  })

  const brandListItems = brands.map((brand: any) => {
    document.getElementById(`${brand._id}`)?.addEventListener('mouseover', () => {
      document.getElementById(`div${brand._id}`)?.setAttribute('style', 'transform:scaleX(1);')
    })
    document.getElementById(`${brand._id}`)?.addEventListener('mouseout', () => {
      document.getElementById(`div${brand._id}`)?.setAttribute('style', 'transform:scaleX(0);')
    })
    return (
     <li key={brand._id} id='brandChild' className="hidden p-5 bg-[white] border-x-2  border-black border-solid  ">
             {/*  <a href={`/brand/${brand._id}`}> {brand.name}</a> */}
             <button id={`${brand._id}`} onClick={() => {
               window.location.href = `/brands/${brand._id}`
             }}>{brand.name}</button>
              <div className='border-b-2 w-[80%] scale-x-0 solid border-2 ease-in-out transition-all delay-[.1s] origin-left border-black' id={`div${brand._id}`}></div>
          </li>
    )
  })
  return (
    <>
        <header className="flex justify-evenly items-center md:text-lgm sm:text-base xl:text-xl 2xl:text-2xl">
          <p></p>
            <a href="/">Home</a>
             <ul id='brandUL'>
                <li id='brandHead'>Shop by Brand</li>
                <div id='brandDiv' className='brandDiv overflow-y-scroll absolute'>
                {brandListItems}
                </div>
             </ul>
             <Image className="w-[12vw] h-[18vh] lg:h-[16vh] lg:w-[12vw] md:w-[10vw] md:h-[12vh] sm:h-[10vh] sm:w-[8vw]"
              src={xbn} alt={''} />
             <ul id='catUL'>
                <li id='categoryHead'>Shop by Category</li>
                <div id='categoryDiv' className='absolute catDiv  border-solid border-black bg-[#B87333]'>
                {categoryListItems}
                </div>
             </ul>
             <a href="#">Contact Us</a>
             <div className='flex justify-around w-[10vw]'>
                  <button id='userMenu' onClick={() => {
                    document.getElementById('userClass')?.setAttribute('style', 'transform:scale(1);')
                  }}>
                  <svg width="37" height="45" viewBox="0 0 37 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M18.5 4.5C13.5913 4.5 9.612 8.52944 9.612 13.5C9.612 18.4706 13.5913 22.5 18.5 22.5C23.4087 22.5 27.388 18.4706 27.388 13.5C27.388 8.52944 23.4087 4.5 18.5 4.5ZM26.5903 24.2311C29.7766 21.7642 31.832 17.8752 31.832 13.5C31.832 6.04416 25.8631 0 18.5 0C11.1369 0 5.16801 6.04416 5.16801 13.5C5.16801 17.8752 7.22338 21.7642 10.4097 24.2311C8.17556 25.2319 6.12014 26.648 4.35929 28.4311C2.99958 29.8079 1.85577 31.3628 0.950149 33.0415C-0.721055 36.1393 -0.0395101 39.2979 1.84255 41.5313C3.65438 43.6815 6.55681 45 9.612 45H27.388C30.4432 45 33.3456 43.6815 35.1574 41.5314C37.0395 39.2979 37.7211 36.1393 36.0498 33.0415C35.1442 31.3628 34.0004 29.8079 32.6407 28.4311C30.8799 26.648 28.8244 25.2319 26.5903 24.2311ZM18.5 27C14.3748 27 10.4186 28.6594 7.50167 31.6131C6.44399 32.6841 5.55449 33.8933 4.85016 35.1988C4.16809 36.4632 4.38812 37.6195 5.22313 38.6104C6.12836 39.6847 7.7585 40.5 9.612 40.5H27.388C29.2415 40.5 30.8716 39.6847 31.7769 38.6104C32.6119 37.6195 32.8319 36.4632 32.1498 35.1988C31.4455 33.8933 30.556 32.6841 29.4983 31.6131C26.5814 28.6594 22.6252 27 18.5 27Z" fill="#010000"/>
                  </svg>
                  </button>
                  <a className='hidden' id='cart' href="/shoppingCart"><svg className='w-10 h-10' fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
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

    <div className='absolute top-[1%] left-[86.25%]  h-[100vh]'>
    <UserMenu />
    </div>
        </header>

         <form id='loginForm' className='flex invisible flex-col fixed z-[11] font-[Junge] bg-[#353935]  h-[50vh] w-[30vw] top-[25%] left-[35%] rounded-md ' onSubmit={handleSubmit(submitForm)}>
         <button className='self-end' id='userMenuExit' onClick={() => {
           document.querySelector('main')?.setAttribute('style', 'filter: blur(0px)')
           document.querySelector('header')?.setAttribute('style', 'filter: blur(0px)')
           document.getElementById('loginForm')?.setAttribute('style', 'visibility:hidden;')
         }}>
                <Image src = { X } alt='X' />
                </button>
         <div className='flex flex-col ml-10'>

           <label className=' text-xl font-bold text-white' htmlFor="emai">Email:</label>
           <input type="text" className='border-2 border-black border-solid text-black w-[25vw] '  {...register('username')} />
         </div>
         <div className='flex flex-col ml-10 mt-10'>
           <label className=' text-xl font-bold text-white' htmlFor="password">Password:</label>
           <input className='border-2 border-black w-[25vw] border-solid text-black'  type="password" {...register('password')} />
      
         </div>
         <div className='flex flex-col  items-center'>
         <button className='border-2 self-center p-1 border-solid hover:bg-gray-300 border-black bg-white text-black text-md  mt-10 rounded-lg transition-all ease-in-out duration-[1s]'>Forgot Password?</button>
         <button className='border-2 self-center p-1 border-solid hover:bg-gray-300 border-black bg-white text-black text-2xl  mt-10 rounded-lg transition-all ease-in-out duration-[1s]' type='submit'>Submit</button>
        <button onClick={() => {
          window.location.href = '/signup'
        }} className='border-2 self-center p-1 border-solid hover:bg-gray-300 border-black bg-white text-black text-2xl  mt-10 rounded-lg transition-all ease-in-out duration-[1s]'>Create Account</button>
         </div>
       </form>
</>
  )
}
