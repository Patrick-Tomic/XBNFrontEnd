/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable import/no-absolute-path */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'
import { useEffect } from 'react'

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

export default function Home () {
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

    let count = 0
    setInterval(() => {
      const slideA = document.querySelector('.slideA')
      const slideB = document.querySelector('.slideB')
      const slideC = document.querySelector('.slideC')
      const slideD = document.querySelector('.slideD')
      const slideE = document.querySelector('.slideE')
      const slideF = document.querySelector('.slideF')
      const slideG = document.querySelector('.slideG')
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
      count++
      if (count === 7) { count = 0 }
    }, 5000)
  })
  return (
  <>
  <Header />
  <form action=""></form>
  <main className='grid p-0 m-0 grid-cols-2'>
  <div className='h-[800px] w-[100%] col-span-2'>
  <Image className='slideA absolute w-[100%] h-[700px] z-[6] ' alt='pre' src= {pre} />
  <Image className='slideB  absolute w-[100%] h-[700px] z-[5]' src={imgC} alt='aminos' />
  <Image className='slideC  absolute w-[100%] h-[700px] z-[4]' src={supps} alt='supps' />
  <Image className='slideD  absolute w-[100%] h-[700px] z-[3]' src={imgA} alt='imgA' />
  <Image className='slideE  absolute w-[100%] h-[700px] z-[2]' src={imgB} alt='imgB' />
  <Image className='slideF  absolute w-[100%] h-[700px] z-[1]' src={aminos} alt='imgC' />
  <Image className='slideG  absolute w-[100%] h-[700px] z-auto' src={imgD} alt='imgD' />
  </div>
  <iframe className=' w-[px]  h-[775px]' title="vimeo-player" src="https://player.vimeo.com/video/928577228?h=5c2f067c4f" width="900px" height="775" allowFullScreen></iframe>
  <div id='homeDescription' className='flex flex-col items-center justify-start w-[30vw]'>
  <Image className="w-[15vw] h-[18vh]"
              src={xbn} alt={''} />
    <div className='border-solid border-gray-600 border-2 flex flex-col justify-center items-center bg-[#353935]'>
      <h1 className=' z-[1]absolute p-3 border-4 border-solid border-orange-400 bg-white top-[38%] text-3xl text-orange-400 font-bold bg-'>Our Promise</h1>
      <p className='text-orange-400 text-xl font-bold'>Our mission at Xtreme Body Nutrition is to develop an individualized supplement stack that fits your lifestyle, fitness goals, and
        training style to help your reach your goals! We pride ourselves on always bringing in high-quality products, and
        providing helpful employee knowledge which created the fantastic customer retention over the years. <br></br> <br></br>
        We want to be a resource for you. Come in and chat with us today and make your health and fitness dream a reality!
      </p>
    </div>
  </div>
  </main>
  </>
  )
}
