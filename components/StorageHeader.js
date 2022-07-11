import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";
import { MicrophoneIcon, SearchIcon, XIcon } from "@heroicons/react/solid";
import UltraJaguar from "../public/UltraJaguar.png";
import SearchHeaderOptions from "./SearchHeaderOptions";
import Link from "next/link"




export default function StorageHeader() {
  const router = useRouter();
  const searchInputRef = useRef(null);
  function search(event) {
    event.preventDefault();
    const term = searchInputRef.current.value;
    if (!term.trim()) return;
    router.push(`/search?term=${term.trim()}&searchType=`);
  }
  return (
    <header className="sticky top-0 bg-white">
      <div className="flex w-full p-6 items-center ">
        <Image
          onClick={() => router.push("/")}
          width="250"
          objectFit="contain"
          height="108"
          className="cursor-pointer"
          src={UltraJaguar}
          />
        <form className="flex justify-between border border-gray-200 rounded-full shadow-lg px-6 py-3 ml-10 mr-5 flex-grow max-w-8xl items-center space-x-4">
        <nav className="flex justify-between w-full bg-white space-x-4">
            <div className="container-lg px-0 flex justify-between p-5 text-md text-gray-700 flex space-x-4">
                <div className="flex w-full items-center">
                <a className="nav-brand mr-auto ml-0">Welcome to our Blockchain ultra box, to post your crypto documents you will need a wallet and some Xdai. Follow these steps to create your crypto documents!
                </a>
                <div className="flex space-x-4 items-center">
                <Link href="https://metamask.io/download/">
            <a className="mr-2 font-bold text-yellow-600">
            🦊 1. Download your crypto wallet
            </a>
          </Link>
                </div>
                <div className="flex space-x-4 items-center">
                <Link href="https://chainlist.org/chain/300">
            <a className="mr-2 font-bold text-blue-600">
            🌐 2. Add chain to your wallet
            </a>
          </Link>
                </div>
                <div className="flex space-x-4 items-center">
                <Link href="https://www.gimlu.com/faucet">
            <a className="mr-2 font-bold text-green-600">
            🪙	3. Copy your wallet address and get some Optimism on GC(XDAI)
            </a>
          </Link>
                </div>
                <div className="flex space-x-4 items-center">
                <Link href="https://add.gnosis.tools/">
            <a className="mr-2 font-bold text-red-600">
            🐆	4. Post your Crypto Jaguar document! 
            </a>
          </Link>
                </div>
                </div>
            </div>
        </nav>
        </form>
      </div>
    </header>
  );
}