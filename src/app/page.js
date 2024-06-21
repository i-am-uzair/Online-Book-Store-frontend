import Image from "next/image";
import DataDisplay from "./components/DataDisplay";

export default function Home() {
  return (
   <>
     {/* <section className="w-full bg-white ">
  <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-16 max-w-7xl lg:py-24 bg-[url('/home-page-image.jpg')]">
    <div className="flex w-full mx-auto text-left">
      <div className="relative inline-flex items-center mx-auto align-middle">
        <div className="text-center">
          <h1 className="max-w-5xl text-2xl font-bold leading-none tracking-tighter text-neutral-600 md:text-5xl lg:text-6xl lg:max-w-7xl">
          knowledge Meets Future:  <br className="hidden lg:block"/>
          Where Education become power
          </h1>
          <p className="max-w-xl mx-auto mt-8 text-base leading-relaxed text-gray-500">Your one-stop shop for books. &amp;Where style meets smart living.</p>
          <div className="flex justify-center w-full max-w-2xl gap-2 mx-auto mt-6">

          </div>
        </div>
      </div>
    </div>
  </div>
</section> */}


<section class="bg-center bg-no-repeat bg-[url('/home-page-image.jpg')] bg-gray-400 bg-blend-multiply">
    <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="max-w-5xl text-2xl font-bold leading-none tracking-tighter text-white md:text-5xl lg:text-6xl lg:max-w-7xl">
            knowledge Meets Future:  <br className="hidden lg:block"/>
            Where Education become power
          </h1>
          <p className="max-w-xl mx-auto mt-8 text-base leading-relaxed text-gray-500">Your one-stop shop for books. &amp;Kee readng.</p>
    </div>
</section>

<DataDisplay></DataDisplay>
   </>
  );
}
