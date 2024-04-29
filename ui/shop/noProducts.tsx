import silke_doodle_2 from "../assets/silke_doodle_2.png"

export const NoProducts: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <img src={silke_doodle_2.src} className="w-48 h-48" />
            <h1 className="text-2xl font-bold">No Products Found</h1>
        </div>
    )
}