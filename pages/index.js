import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import UltraJaguar from "../public/UltraJaguar.png";
import { SearchIcon, MicrophoneIcon } from "@heroicons/react/solid";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function Home() {
  const router = useRouter();
  const searchInputRef = useRef(null);
  function search(event) {
    event.preventDefault();
    const term = searchInputRef.current.value;
    if (!term.trim()) return;
    router.push(`/search?term=${term.trim()}&searchType=`);
  }
  async function randomSearch(event) {
    event.preventDefault();
    const randomTerm = await fetch(
      "https://random-word-api.herokuapp.com/word?number=1"
    ).then((response) => response.json());
    if (!randomTerm) return;
    router.push(`/search?term=${randomTerm}&searchType=`);
  }
  
  return (
    <div>
      <Head>
        <title>UltraJaguar</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <Header/>

      <form className="flex flex-col items-center mt-40">
        <Image  
        width="1200"
        objectFit="cover"
        height="405"
        src={UltraJaguar}
        alt="Teaching humanity and the animals"
        />
        <div className="flex flex-col sm:flex-row w-[50%] space-y-2 mt-8 sm:space-y-0 sm:space-x-4 justify-center text-lg font-bold text-green-500">
          Defending forests through searchs and donations.
        </div>
        <div className="flex w-full mt-5 mx-auto max-w-[90%] border border-green-500 hover:shadow-lg focus-within:shadow-lg px-5 py-3 rounded-full items-center sm:max-w-xl lg:max-w-2xl">
          <SearchIcon className="h-5 text-green-600 mr-3" />
          <input
            ref={searchInputRef}
            type="text"
            className="flex-grow focus:outline-none"
          />
          <MicrophoneIcon className="h-5 text-green-500 mr-3" />
        </div>
        <div className="flex flex-col sm:flex-row w-[50%] space-y-2 mt-8 sm:space-y-0 sm:space-x-4 justify-center text-green-500">
          <button onClick={search} className="btn">
            Ultra Search
          </button>
          <button onClick={randomSearch} className="btn">
            Help save the Forests
          </button>
        </div>
      </form>

      {/* Footer */}

      <Footer />
    </div>
  );
}