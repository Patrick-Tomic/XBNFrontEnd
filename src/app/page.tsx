/* eslint-disable import/no-absolute-path */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'
import Image from 'next/image'
import Header from '@/components/header'
import xbn from '/public/xbnLogoB.png'
import { useEffect } from 'react'
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
  })
  return (
  <>
  <Header />
  <main>
  <iframe className=' border-solid border-2 border-black w-[600px] h-[775px]' title="vimeo-player" src="https://player.vimeo.com/video/928577228?h=5c2f067c4f" width="900px" height="775" allowFullScreen></iframe>
  <div id='homeDescription' className='flex flex-col items-center justify-start w-[30vw]'>
  <Image className="w-[15vw] h-[18vh]"
              src={xbn} alt={''} />
    <div className='border-solid border-gray-600 border-2 flex flex-col justify-center items-center bg-[#353935]'>
      <h1 className=' absolute p-3 border-4 border-solid border-orange-400 bg-white top-[38%] text-3xl text-orange-400 font-bold bg-'>Our Promise</h1>
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
