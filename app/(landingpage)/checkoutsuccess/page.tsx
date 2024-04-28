import Image from "next/image";
import chicken_illustration from "@/ui/assets/chicken_illustration_1.png";

export default function CheckoutSuccess() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen h-fit">
        <h2 className="text-5xl mb-4 text-floc-gray"> Thank you for your purchase! </h2>
        <h3 className="text-2xl text-floc-gray/80"> Now, you can get back to doing what you love, and we can too.  </h3>
      <div className="w-fit max-w-[600px]">
        <img src={chicken_illustration.src}></img>
      </div>
    <p className="text-lg max-w-[400px] text-center"> We will ship your order out as soon as we can. If you have any questions please reach out us: support@kcc.com</p>
    </main>
  );
}
