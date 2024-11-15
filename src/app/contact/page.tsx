import Header from "@/components/header";
import Footer from "@/components/footer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import * as Yup from 'yup'
export default function Contact(){

    useEffect(() => {

        document.getElementById("brandHead")?.addEventListener("mouseover", () => {
            document.querySelectorAll("#brandChild").forEach((child) => {
              child.setAttribute("style", "display:block;");
            });
          });
      
          document
            .getElementById("categoryHead")
            ?.addEventListener("mouseover", () => {
              document.querySelectorAll("#categoryChild").forEach((child) => {
                child.setAttribute("style", "display:block");
              });
            });
          document.getElementById("catUL")?.addEventListener("mouseleave", () => {
            document.querySelectorAll("#categoryChild").forEach((child) => {
              child.setAttribute("style", "display:hidden");
            });
          });
      
          document.getElementById("brandUL")?.addEventListener("mouseleave", () => {
            document.querySelectorAll("#brandChild").forEach((child) => {
              child.setAttribute("style", "display:hidden");
            });
          });
        }, []);
    const validationSchema = Yup.object().shape({
        email:Yup.string().required(),
        header:Yup.string().required(),
        message:Yup.string().required()
    })
    const formOptions = {resolver: yupResolver(validationSchema)}
    const {register, handleSubmit, reset, formState} = useForm(formOptions)

    const submitForm = async(data: any) => {
        const obj = {
            header:data.header,
            email:data.email,
            message:data.message
        }
        const formData = JSON.stringify(obj)
        try{
            const req = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}contact`,
            {
                method:"POST",
                body: formData,
                headers: {
                    "Content-Type":"application/json"
                },
            },
            )
            const file = await req.json()
            console.log(file)
        }catch(err){

        }
    }

    return(
        <>
        <Header />
        <main>
            
            <form className="border-2 border-black border-solid" onSubmit={handleSubmit(submitForm)}>
                <div className="flex flex-col">
                    <label htmlFor="email">
                        Email:
                    </label>
                    <input id="email" {...register("email")} type="email" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="header">
                        Header:
                    </label>
                    <input id="header" {...register("header")} type="text" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="message">
                        Message:
                    </label>
                    <textarea id="message" {...register("message")}   />
                </div>
            </form>
        </main>
        <Footer />
        </>
    )
}