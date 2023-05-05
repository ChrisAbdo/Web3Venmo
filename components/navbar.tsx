import React, { useEffect } from "react";

import { createWalletClient, custom } from "viem";
import { mainnet } from "viem/chains";

declare global {
  interface Window {
    ethereum: any;
  }
}

export default function Navbar() {
  const [walletAddress, setWalletAddress] = React.useState<string>("");

  useEffect(() => {
    async function fetchWalletAddress() {
      if (
        typeof window !== "undefined" &&
        window.ethereum &&
        window.ethereum.selectedAddress
      ) {
        const address = window.ethereum.selectedAddress;
        setWalletAddress(address);
      }
    }
    fetchWalletAddress();
  }, []);

  async function connectWallet() {
    if (typeof window !== "undefined") {
      const client = createWalletClient({
        chain: mainnet,
        transport: custom(window.ethereum),
      });

      const accounts = await client.requestAddresses();
      const [address] = await client.getAddresses();

      setWalletAddress(accounts[0]);
      console.log(address);
    }
  }

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      <p>{walletAddress}</p>
    </div>
  );
}
