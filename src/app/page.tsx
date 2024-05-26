/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable import/no-absolute-path */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'
import Footer from '@/components/footer'
import aminos from '/public/aminoShelf.png'
import supps from '/public/suppShelf.png'
import pre from '/public/preShelf.png'
import Image from 'next/image'
import Header from '@/components/header'
import xbn from '/public/xbnLogoB.png'
import imgA from '/public/imgA.png'
import imgB from '/public/imgB.png'
import imgC from '/public/imgC.png'
import imgD from '/public/imgD.png'
import imgE from '/public/imgE.jpg'
import imgF from '/public/imgF.jpg'
import imgG from '/public/imgG.jpg'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
export default function Home () {
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
      localStorage.setItem('id', file.body._id)
      reset()
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }
  const [count, setCount] = useState(0)
  useEffect(() => {
    document.getElementById('brandHead')?.addEventListener('mouseover', () => {
      document.querySelectorAll('#brandChild').forEach((child) => {
        child.setAttribute('style', 'display:block;')
      })
    })

    document.getElementById('categoryHead')?.addEventListener('mouseover', () => {
      document.querySelectorAll('#categoryChild').forEach((child) => {
        child.setAttribute('style', 'display:block')
      })
    })
    document.getElementById('catUL')?.addEventListener('mouseleave', () => {
      document.querySelectorAll('#categoryChild').forEach((child) => {
        child.setAttribute('style', 'display:hidden')
      })
    })

    document.getElementById('brandUL')?.addEventListener('mouseleave', () => {
      document.querySelectorAll('#brandChild').forEach((child) => {
        child.setAttribute('style', 'display:hidden')
      })
    })
    setTimeout(() => {
      const slideA = document.querySelector('.slideA')
      const slideB = document.querySelector('.slideB')
      const slideC = document.querySelector('.slideC')
      const slideD = document.querySelector('.slideD')
      const slideE = document.querySelector('.slideE')
      const slideF = document.querySelector('.slideF')
      const slideG = document.querySelector('.slideG')
      const slideH = document.querySelector('.slideH')
      const slideI = document.querySelector('.slideI')
      const slideJ = document.querySelector('.slideJ')
      if (count === 0) {
        slideA?.setAttribute('style', 'opacity:0; visibility:hidden; transition: 0.5s linear')
        slideB?.setAttribute('style', 'opacity:1; visibility:visible; transition: 0.5s linear 0.5s')
      }
      if (count === 1) {
        slideB?.setAttribute('style', 'opacity:0; visibility:hidden; transition: 0.5s linear')
        slideC?.setAttribute('style', 'opacity:1; visibility:visible; transition: 0.5s linear 0.5s')
      }
      if (count === 2) {
        slideC?.setAttribute('style', 'opacity:0; visibility:hidden; transition: 0.5s linear')
        slideD?.setAttribute('style', 'opacity:1; visibility:visible; transition: 0.5s linear 0.5s')
      }
      if (count === 3) {
        slideD?.setAttribute('style', 'opacity:0; visibility:hidden; transition: 0.5s linear')
        slideE?.setAttribute('style', 'opacity:1; visibility:visible; transition: 0.5s linear 0.5s')
      }
      if (count === 4) {
        slideE?.setAttribute('style', 'opacity:0; visibility:hidden; transition: 0.5s linear')
        slideF?.setAttribute('style', 'opacity:1; visibility:visible; transition: 0.5s linear 0.5s')
      }
      if (count === 5) {
        slideF?.setAttribute('style', 'opacity:0; visibility:hidden; transition: 0.5s linear')
        slideG?.setAttribute('style', 'opacity:1; visibility:visible; transition: 0.5s linear 0.5s')
      }
      if (count === 6) {
        slideG?.setAttribute('style', 'opacity:0; visibility:hidden; transition: 0.5s linear')
        slideA?.setAttribute('style', 'opacity:1; visibility:visible; transition: 0.5s linear 0.5s')
      }
      if (count === 7) {
        slideG?.setAttribute('style', 'opacity:0; visibility:hidden; transition: 0.5s linear')
        slideH?.setAttribute('style', 'opacity:1; visibility:visible; transition: 0.5s linear 0.5s')
      }
      if (count === 8) {
        slideH?.setAttribute('style', 'opacity:0; visibility:hidden; transition: 0.5s linear')
        slideI?.setAttribute('style', 'opacity:1; visibility:visible; transition: 0.5s linear 0.5s')
      }
      if (count === 9) {
        slideI?.setAttribute('style', 'opacity:0; visibility:hidden; transition: 0.5s linear')
        slideJ?.setAttribute('style', 'opacity:1; visibility:visible; transition: 0.5s linear 0.5s')
      }
      if (count === 10) {
        slideJ?.setAttribute('style', 'opacity:0; visibility:hidden; transition: 0.5s linear')
        slideA?.setAttribute('style', 'opacity:1; visibility:visible; transition: 0.5s linear 0.5s')
      }
      let num = count + 1
      if (count === 10) {
        num = 0
        setCount(num)
      } else {
        setCount(num)
      }
    }, 5000)
  })
  return (
  <>
  <Header />
  <form id='loginForm' className='hidden fixed z-[11] font-sans font-[Junge] bg-[#edeade] h-[50vh] w-[50vw] top-[10%] left-[25%] rounded-md flex flex-col justify-center items-center' onSubmit={handleSubmit(submitForm)}>
      <div className='flex flex-col'>
        <label className=' text-xl font-bold' htmlFor="emai">Email:</label>
        <input type="text" className='border-2 border-black border-solid text-black w-[50%] ' {...register('username')} />
      </div>
      <div className='flex flex-col'>
        <label className=' text-xl font-bold' htmlFor="password">Password:</label>
        <input className='border-2 border-black w-[50%] border-solid text-black' type="password" {...register('password')} />
      </div>
      <button className='border-2 p-1 border-solid hover:bg-gray-300 border-black bg-white text-black text-2xl ml-[30%] mt-2 rounded-lg transition-all ease-in-out duration-[1s]' type='submit'>Submit</button>
    </form>
  <main className='md:flex md:flex-col sm:flex-col md:items-center sm:flex sm:items-center lg:items-center lg:flex lg:flex-col xl:grid p-0 m-0 grid-cols-2 pb-10'>
    <div className='col-span-2 p-10 w-[100%]  bg-[#71797E]'>
  <div id='wrap' className=' 2xl:h-[720px] xl:h-[720px] lg:h-[720px] md:h-[550px] sm:h-[550px]  w-[57.5%]   '>
  <Image className='slideA rounded-md absolute 2xl:w-[1008px] xl:w-[1008px] max-h-[700px] z-[9] left-[25%] xl:left-[20%] lg:w-[882px] lg:left-[10%] md:left-[10%] md:w-[706px] sm:left-0 ' alt='pre' src= {pre} />
   <Image className='slideB rounded-md absolute 2xl:w-[1008px] xl:w-[1008px] max-h-[700px] z-[8] left-[25%] xl:left-[20%] lg:w-[882px] lg:left-[10%] md:left-[10%] md:w-[706px] sm:left-0 ' src={imgC} alt='aminos' />
  <Image className='slideC rounded-md absolute 2xl:w-[1008px] xl:w-[1008px] max-h-[700px] z-[7] left-[25%] xl:left-[20%] lg:w-[882px] lg:left-[10%] md:left-[10%] md:w-[706px] sm:left-0 ' src={supps} alt='supps' />
  <Image className='slideD rounded-md absolute 2xl:w-[1008px] xl:w-[1008px] max-h-[700px] z-[6] left-[25%] xl:left-[20%] lg:w-[882px] lg:left-[10%] md:left-[10%] md:w-[706px] sm:left-0 ' src={imgA} alt='imgA' />
  <Image className='slideE rounded-md absolute 2xl:w-[1008px] xl:w-[1008px] max-h-[700px] z-[5] left-[25%] xl:left-[20%] lg:w-[882px] lg:left-[10%] md:left-[10%] md:w-[706px] sm:left-0 ' src={imgB} alt='imgB' />
  <Image className='slideF invisible rounded-md absolute 2xl:w-[1008px] xl:w-[1008px] max-h-[700px] z-[4] left-[25%] xl:left-[20%] lg:w-[882px] lg:left-[10%] md:left-[10%] md:w-[706px] sm:left-0 ' src={aminos} alt='imgC' />
  <Image className='slideG rounded-md absolute 2xl:w-[1008px] xl:w-[1008px] max-h-[700px] z-[3] left-[25%] xl:left-[20%] lg:w-[882px] lg:left-[10%] md:left-[10%] md:w-[706px] sm:left-0 ' src={imgD} alt='imgD' />
  <Image className='slideH rounded-md absolute 2xl:w-[1008px] xl:w-[1008px] max-h-[700px] z-[2] left-[25%] xl:left-[20%] lg:w-[882px] lg:left-[10%] md:left-[10%] md:w-[706px] sm:left-0 ' src={imgE} alt='imgE' />
  <Image className='slideI rounded-md absolute 2xl:w-[1008px] xl:w-[1008px] max-h-[700px] z-[1] left-[25%] xl:left-[20%] lg:w-[882px] lg:left-[10%] md:left-[10%] md:w-[706px] sm:left-0 ' src={imgF} alt='imgF' />
  <Image className='slideJ rounded-md absolute 2xl:w-[1008px] xl:w-[1008px] max-h-[700px] z-[auto] left-[25%] xl:left-[20%] lg:w-[882px] lg:left-[10%] md:left-[10%] md:w-[706px] sm:left-0 ' src={imgG} alt='imgG' />
  </div>
  </div>
  <iframe className='xl:h-[620px] sm:w-auto xl:mt-40 md:w-auto lg:w-auto ml-0 xl:ml-52 xl:w-[500px] 2xl:w-[500px]  2xl:h-[775px] 2xl:mt-0 ' title="vimeo-player" src="https://player.vimeo.com/video/928577228?h=5c2f067c4f" width="900px" height="775" allowFullScreen></iframe>
  <div id='homeDescription' className=' md:m-10 sm:m-10 lg:m-10 xl:w-[25vw] flex flex-col items-center justify-start 2xl:w-[30vw] ml-32 '>
  <Image className="w-[15vw] h-[15vh]"
              src={xbn} alt={''} />
    <div className='border-solid border-gray-600 border-2 flex flex-col justify-center items-center bg-[#353935]'>
      <h1 className=' z-[1]absolute p-3 border-4 border-solid border-orange-400 bg-white top-[38%] text-3xl text-orange-400 font-bold bg-'>Our Promise</h1>
      <p className='text-orange-400 text-xl font-bold 2xl:text-lg '>Our mission at Xtreme Body Nutrition is to develop an individualized supplement stack that fits your lifestyle, fitness goals, and
        training style to help your reach your goals! We pride ourselves on always bringing in high-quality products, and
        providing helpful employee knowledge which created the fantastic customer retention over the years. <br></br> <br></br>
        We want to be a resource for you. Come in and chat with us today and make your health and fitness dream a reality!
      </p>
    </div>
  </div>
  </main>
  <Footer />
  </>
  )
}
