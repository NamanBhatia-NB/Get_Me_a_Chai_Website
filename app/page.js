import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-white h-[45vh] gap-5 md:px-0 px-5 text-xs md:text-base sm:my-16 my-24 md:my-12 ">
        <div className="flex gap-4 justify-center items-center font-bold md:text-5xl text-2xl ">Get Me a Chai ! <span><img src="/tea.gif" width={80} alt="" className="invertImg" /></span></div>
        <p className="text-lg text-center">
          A crowdfunding platform for creators to fund their projects.
        </p>
        <p className="text-lg text-center flex justify-center">
          A place where your fans can buy you a chai. Unleash the power of your fans and get your projects funded.
        </p>
        <div className="flex md:flex-row flex-col items-center">
          <Link href="/login">
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here!</button>
          </Link>
          <Link href="/about">
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More!</button>
          </Link>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto py-10 px-10 w-full justify-center">
        <h2 className="text-3xl font-bold text-center mb-12">Your fans can buy you a Chai.</h2>
        <div className="flex gap-5 justify-around ">
          <div className="item flex flex-col items-center justify-center space-y-3">
            <img src="/man.gif" className="bg-slate-400 rounded-full p-4" width={150} alt="" />
            <p className="font-bold text-center">Fans want to help</p>
            <p className="text-center">Your fans are available for you to help you.</p>
          </div>
          <div className="item flex flex-col items-center justify-center space-y-3">
            <img src="/coin.gif" className="bg-slate-400 rounded-full p-4" width={150} alt="" />
            <p className="font-bold text-center">Fans want to help</p>
            <p className="text-center">Your fans are available for you to help you.</p>
          </div>
          <div className="item flex flex-col items-center justify-center space-y-3">
            <img src="/group.gif" className="bg-slate-400 rounded-full p-4" width={150} alt="" />
            <p className="font-bold text-center">Fans want to help</p>
            <p className="text-center">Your fans are available for you to help you.</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto pt-14 pb-32 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center mb-12">Learn more about us</h2>
        <div className="w-[90%] h-[40vh] md:w-[50%] md:h-[40vh] lg:w-[50%] lg:h-[40vh] xl:w-[40vh]">
          <iframe className="w-full h-full" src="https://www.youtube-nocookie.com/embed/zGruPOYlvRs?si=5pGOcQGcTcXUtUFM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>
    </>
  );
}