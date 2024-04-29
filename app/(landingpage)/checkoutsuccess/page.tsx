import Image from "next/image";
import silkie_doodle from "@/ui/assets/silkie_doodle.png";
import TiktokIcon from "@/ui/assets/icons/tiktok-icon";
import FacebookIcon from "@/ui/assets/icons/Facebook-icon";
import InstagramIcon from "@/ui/assets/icons/Instagram-icon";
import YoutubeIcon from "@/ui/assets/icons/Youtube-icon";

export default function CheckoutSuccess() {
  return (
    <main className="flex bg-gray-100 flex-col items-center justify-center min-h-screen h-fit text-center">
      <h2 className="text-5xl mb-4 text-floc-gray">
        Thank you for your purchase!
      </h2>
      <h3 className="text-2xl mx-10 text-floc-gray/80">
        Now, you can get back to doing what you love, and we can too.
      </h3>
      <div className="w-fit max-w-[700px]">
        <img src={silkie_doodle.src}></img>
      </div>
      <p className="text-lg max-w-[400px] text-center mb-3">
        We will ship your order out as soon as we can. If you have any questions
        please reach out us: support@kcc.com
      </p>
      <div>
        <p className="text-floc-gray/90">In the meantime, stay up to date with our newest chicken content!</p>
        <div className="flex justify-center gap-2 m-2">
          <FacebookIcon className="w-10 h-10"></FacebookIcon>
          <TiktokIcon className="w-10 h-10"></TiktokIcon>
          <InstagramIcon className="w-10 h-10"></InstagramIcon>
          <YoutubeIcon className="w-10 h-10"></YoutubeIcon>
        </div>
      </div>
    </main>
  );
}
