import silkie_doodle_4 from "../assets/silkie_doodle_4.png";
import Link from "next/link";
export const NoItemsCheckout: React.FC = () => {
  return (
    <div className="flex flex-col m-2 justify-center place-items-center">
      <h2 className="text-3xl sm:text-3xl text-center mt-4 ">
        Looks like there is nothing in your cart...
      </h2>
      <img src={silkie_doodle_4.src} className="flex w-full max-w-[600px]" />
      <Link
        href={"/shop"}
        className="flex place-items-center text-4xl sm:text-5xl font-bold text-center uppercase tracking-wide hover:text-floc-gray/40 transition-all ease-in-out duration-200"
      >
        Checkout the Shop!
        <div className="h-6 w-6">
        </div>
      </Link>
    </div>
  );
};
