import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import Link from 'next/link'
import Pagination from "../components/pagination"
import styles from '../styles/Home.module.css'
import Image from "next/image";
import UltraJaguar from "../public/UltraJaguar.png"
import StorageHeader from "../components/StorageHeader"
import Footer from "../components/Footer"


import {
    ultrajaguaraddress, ultrajaguarCloudaddress
} from '../config'

import ULTRAJAGUAR from '../artifacts/contracts/ULTRAJAGUAR.sol/ULTRAJAGUAR.json'
import ULTRAJAGUARCloud from '../artifacts/contracts/ULTRAJAGUARCloud.sol/ULTRAJAGUARCloud.json'

export default function CreatorDashboard() {
    const [nfts, setNfts] = useState([])
    const [sold, setSold] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')
    useEffect(() => {
      loadNFTs()
    }, [])
    async function loadNFTs() {
      const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
      })
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()
        
      const marketContract = new ethers.Contract(ultrajaguarCloudaddress, ULTRAJAGUARCloud.abi, signer)
      const tokenContract = new ethers.Contract(ultrajaguaraddress, ULTRAJAGUAR.abi, provider)
      const data = await marketContract.fetchItemsCreated()
      
      const items = await Promise.all(data.map(async i => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId)
        const meta = await axios.get(tokenUri)
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          sold: i.sold,
          image: meta.data.image,
        }
        return item
      }))
      /* create a filtered array of items that have been sold */
      const soldItems = items.filter(i => i.sold)
      setSold(soldItems)
      setNfts(items)
      setLoadingState('loaded') 
    }
    if (loadingState === 'loaded' && !nfts.length) return (<StorageHeader/>)
    return (
      <div>
        <div className="p-4">
          <StorageHeader/>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 pt-5 flex items-end">
            {
              nfts.map((nft, i) => (
                <div key={i} className="border shadow rounded-xl overflow-hidden">
                  <img src={nft.image} className="rounded" />
                </div>
              ))
            }
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
  // export async function getServerSideProps({ req }) {
  //   const { user } = await supabase.auth.api.getUserByCookie(req)
  
  //   if (!user) {
  //     return { props: {}, redirect: { destination: '/sign-in' } }
  //   }
  
  //   return { props: { user } }
  // }
// export async function getServerSideProps({ req }) {
//   const { user } = await supabase.auth.api.getUserByCookie(req)

//   if (!user) {
//     return { props: {}, redirect: { destination: '/sign-in' } }
//   }

//   return { props: { user } }
// }