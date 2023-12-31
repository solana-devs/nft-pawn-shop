import { Main } from "@/components/Main";
import { NFTCard } from "@/components/NFTCard";
import { usePawnShop } from "@/contexts/PawnShopProvider";
import { useWallet } from "@solana/wallet-adapter-react";
export default function Home() {
  const { orders } = usePawnShop()
  const { publicKey } = useWallet()

  return (
    <Main>
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold md:text-4xl">NFT Pawn Shop</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-6">
          {orders.length > 0 ? (
            <>
              {orders.filter(order => publicKey?.equals(order.customer)).map((order) => <NFTCard key={order.pda.toString()} kind="userOrder" data={order} />)}
              {orders.filter(order => !publicKey || !publicKey.equals(order.customer)).map((order) => <NFTCard key={order.pda.toString()} kind="order" data={order} />)}
            </>
          ) : <p className="font-medium text-white/60">No NFTs to be pawned.</p>}
        </div>
      </div>
    </Main>
  )
}
