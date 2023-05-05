"use client";

import React from "react";

import Navbar from "@/components/navbar";

import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export default function page() {
  async function getBlock() {
    const blockNumber = await client.getBlockNumber();
    console.log(blockNumber);
  }
  return (
    <div>
      <Navbar />
      <button onClick={getBlock}>Get Block</button>
    </div>
  );
}
