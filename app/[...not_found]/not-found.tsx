import Link from "next/link";
import silkie_doodle_3 from "@/ui/assets/silkie_doodle_3.png";
export default function NotFound() {
  return (
    <div className="min-w-screen min-h-screen bg-white">
      <div className="flex flex-col place-items-center justify-center h-full">
        <p className="text-8xl mt-10 lg:mt-20">404</p>
        <h1 className="text-4xl justify-center text-center">
          The Page You Are Looking For Does Not Exist..
        </h1>
        <div className="max-w-screen-sm">
          <img src={silkie_doodle_3.src} alt="" />
        </div>
        <div>
          <Link className="text-3xl hover:text-light-yellow text-floc-gray uppercase" href="/"> Return to Home </Link>
        </div>
      </div>
    </div>
  );
}
