/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/no-absolute-path */
import Image from 'next/image'
import xbn from '/public/xbn.png'
export default function Sidebar () {
  return (
        <header>
             <Image className="w-[12vw] h-[18vh]"
              src={xbn} alt={''} />
            <button id="sideButton"><svg width="337" height="266" viewBox="0 0 337 266" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="97.248" width="337" height="71.5054" rx="25" fill="#F28C28"/>
            <rect width="337" height="71.5054" rx="25" fill="#F28C28"/>
            <rect y="194.494" width="337" height="71.5054" rx="25" fill="#F28C28"/>
            </svg>
            </button>
        </header>
  )
}
