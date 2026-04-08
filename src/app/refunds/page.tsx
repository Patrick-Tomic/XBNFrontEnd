import Header from "@/components/header";
import Footer from "@/components/footer";

export default function RefundPolicy() {
  return (
    <>
      <Header />
      <main className="bg-[#0a0a0a] min-h-screen flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-[600px] bg-[#111111] border border-[#2a2a2a] rounded-2xl p-10 shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-[#ff4d00] opacity-30" />
            <h1 className="text-white text-2xl font-bold tracking-wide whitespace-nowrap">Refund Policy</h1>
            <div className="h-px flex-1 bg-[#ff4d00] opacity-30" />
          </div>
          <p className="text-[#a3a3a3] text-base leading-relaxed">
            Unopened products can be exchanged in store or shipped back for credit. Any opened products
            cannot be refunded or exchanged unless the product is out of date, opened incorrectly, or
            damaged.
          </p>
          <div className="mt-8 pt-6 border-t border-[#1e1e1e]">
            <p className="text-[#525252] text-sm">
              Questions?{" "}
              <a href="/contact" className="text-[#ff4d00] hover:text-[#ff6b2b] transition-colors">
                Contact us
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
