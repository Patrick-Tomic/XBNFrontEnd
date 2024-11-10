import Header from "@/components/header"
import Footer from "@/components/footer"
export default function RefundPolicy(){
    return(
        <>
        <Header/>
        <main className="flex flex-col items-center h-[60vh]">
     
            <h1 className="text-2xl font-bold mb-10">
                Refund Policy
            </h1>
            <p className="w-[40vw] text-xl">None opened products can be exchanged in store or shipped back for credit. Any opened products can not be refunded or exchanges unless product is out of date, opened or damage</p>
        </main>
        <Footer/>
        
        </>
    )
}