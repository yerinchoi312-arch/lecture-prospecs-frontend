import { twMerge } from "tailwind-merge";
import men from "../../assets/images/home/mainMen.png";
import women from "../../assets/images/home/mainWomen.png";

function MainSecondSection() {
    return (
        <section className={twMerge(["w-full", "flex", "h-150"])}>
            <Card image={men} title={"Men"}/>
            <Card image={women} title={"Women"}/>
        </section>
    );
}
export default MainSecondSection;


type CardProps ={
    image :string;
    title :string;
}
function Card({image,title}:CardProps) {
    return (
        <div className={"w-full relative flex justify-center items-center group overflow-hidden"}>
            <div
                style={{ backgroundImage: `url(${image})` }}
                className={twMerge(
                    ["w-full", "h-full"],
                    ["absolute", "top-0", "left-0"],
                    ["group", "group-hover:scale-105", "-z-1"],
                    ["transition-all", "duration-300"],
                )}
            />
            <span
                className={twMerge(
                    ["text-5xl", "italic", "font-bold","text-white"],
                    ["border-b-2", "border-transparent"],
                    ["group", "  group-hover:border-white"],
                    ["transition-all", "duration-300"],
                )}>
                {title}
            </span>
        </div>
    );
}
