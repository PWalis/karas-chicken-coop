import barnhouseraster from "../../assets/barnhouseraster.png"
import Image from "next/image"

export function FlockCard({}: Readonly<{}>) {
    return (
<div className="max-w-[300px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <div>
        <Image src={barnhouseraster} width={500} height={500} alt="Picture of Cornelious The Rooster" />
        </div>
    </a>
    <div className="p-5">
        <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Kara,</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Cornelius was the first rooster to join the hall of fame and go viral on facebook! He stands proud as a candy corn polish rooster.</p>
    </div>
</div>
    );
}