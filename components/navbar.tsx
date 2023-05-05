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
      if (typeof window !== "undefined" && window.ethereum) {
        if (window.ethereum.selectedAddress) {
          const address = window.ethereum.selectedAddress;
          setWalletAddress(address);
        }

        // Listen for changes in account connection status
        window.ethereum.on("accountsChanged", async (accounts: string[]) => {
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          } else {
            setWalletAddress("");
          }
        });
      }
    }
    fetchWalletAddress();

    // Clean up the event listener when the component is unmounted
    return () => {
      if (typeof window !== "undefined" && window.ethereum) {
        window.ethereum.removeAllListeners("accountsChanged");
      }
    };
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
