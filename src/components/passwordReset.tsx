import Image from 'next/image'
import logo from '/public/xbnLogoB.png'
import { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
export default function PasswordReset(){
     
    const [error, setError] = useState('')
    const validationSchema = Yup.object().shape({
        email:Yup.string(),
        password: Yup.string(),
        confirmPassword: Yup.string().required('Please fill out the password portion')
      .oneOf([Yup.ref('password')], 'Password does not match')
    })
    const formOptions = {resolver: yupResolver(validationSchema)}
    const {register, handleSubmit, reset, formState} = useForm(formOptions)
    const {errors} = formState
    const submitForm = async(data: any) => {
        const formData = JSON.stringify(data)
         
        if(data.password !== data.confirmPassword){
            setError('Passwords do not match')
            return
        }
        try{
            const req = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}resetPassword`, {
                method: 'POST',
                body: formData,
                headers: { 'Content-Type': 'application/json' }
            })
            const file = await req.json()
            if(req.status !== 200 || file.message === 'error'){
                return
            }
            else if(file.message === 'success'){
                window.location.href = '/'
            }
    }catch(err){
        console.log(err)
    }
    
}
const email: any = localStorage.getItem('email')
return(
    <main className="bg-[#353935] h-[100vh]  justify-center items-center hidden" id='passwordResetMain'>
        <form className='bg-white shadow-md shadow-white w-[40%] h-[60%]  flex-col justify-around text-xl' onSubmit={handleSubmit(submitForm)}>
            <div>
                <input type="text" className='hidden' value={email} {...register('email')} />
                <label htmlFor="">Enter Password:</label>
                <input className='border-2 border-black border-solid' type="password" {...register('password')} />
            </div>
            <div>
                <label htmlFor="">Confirm Password:</label>
                <input className='border-2 border-black border-solid' type="password" {...register('confirmPassword')} />
            </div>
            <button type='submit'>
                Enter
            </button>
        </form>
    </main>
)}