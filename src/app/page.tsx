import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";

export default function Home() {
  return (

    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="h-[75vh] p-10 flex justify-center items-center">
        <h1 className="text-7xl">anjulimaintl</h1>
      </main>
      <Footer />
    </div>
  );
}
