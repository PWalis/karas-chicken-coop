import silkie_doodle_2 from "../assets/silkie_doodle_2.png"

export const NoProducts: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full m-2">
            <h2 className="text-4xl mt-10 text-center "> Looks like there aren't any products at the moment...  </h2>
            <img src={silkie_doodle_2.src} className="flex w-full max-w-[600px]" />
            <h3 className="text-3xl font-bold text-center"> Please check back again soon! </h3> 
        </div>
    )
}