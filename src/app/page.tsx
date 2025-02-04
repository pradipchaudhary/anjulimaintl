import Image from "next/image";

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">


        <div className="h-[80vh] flex gap-4 items-center flex-col ">

          <h1 className="text-7xl">anjulimaintl</h1>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        @compright, {Date.now("2015-03-25")}
      </footer>
    </div>
  );
}
