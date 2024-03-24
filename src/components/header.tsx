import Image from "next/image"
import xbn from '/public/xbn.png'
export default function Header() {
    return (
        <header className="flex">
            <Image className="w-[10vw]"
            src = {xbn}
            alt="logo"
            />
            
        </header>
    )
} 