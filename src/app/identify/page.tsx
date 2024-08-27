'use client'
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from 'next/image'
import logo from '/public/xbnLogoB.png'
import { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
export default function IdentifyAccount(){
const validationSchema = Yup.object().shape({
    email: Yup.string() ,
    confirmNum: Yup.string()
   
})
const formOptions = { resolver: yupResolver(validationSchema)}
const { register, handleSubmit, reset, formState } = useForm(formOptions)
const {errors} = formState
const submitForm = async(data: any) => {
     
    const formData = JSON.stringify(data)
    try{
        
        const req = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}forgotPass`, {
            method: 'POST',
            body: formData,
            headers: {  'Content-Type': 'application/json' }
        })
        const file = await req.json()
        if(req.status !== 200 || file.message === 'error'){
            return
        }
        else if(file.message === 'success'){
            window.location.href  = '/'
        }else if(file.message === 'Email sent'){
            document.getElementById('sendEmail')?.classList.add('invisible')
            document.getElementById('sendCode')?.classList.remove('invisible')

        }
    }catch(err){
        console.log(err)
    }
}
 
    return(
        <main className="bg-[#353935] h-[100vh] flex justify-around items-center">
             <Image className="w-[20vw]" src = {logo} alt= 'logo' />
                <div className="bg-white h-[60vh] p-20 shadow-lg">
                <form id="forgetPasswordG" onSubmit={handleSubmit(submitForm)}>
                <div id="sendEmail">
                <label htmlFor="">Enter Your email: </label>
                <input type="text" {...register('email')} />
                </div>
                <div className="invisible" id="sendCode">
                    <label htmlFor="Code">Enter code:</label>
                    <input type="text"   {...register('confirmNum')} />
                    
                        
                </div>
                <button type="submit">Enter</button>
                </form>
                </div>
             </main>
    )
}