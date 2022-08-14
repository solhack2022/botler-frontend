import { Connection, Transaction } from "@solana/web3.js";
import { useState } from "react";

export function useWallet() {
  const [publicKey, setPublicKey] = useState("");

  const connect = async () => {
    if (!window.phantom?.solana) {
      return;
    }

    try {
      const resp = await window.phantom?.solana.connect();
      setPublicKey(resp.publicKey.toString());
    } catch (err) {
      console.error(err);
    }
  };

  const disconnect = () => setPublicKey("");

  const sendTx = async () => {
    if (window.phantom?.solana) {
      const network = "<NETWORK_URL>";
      const connection = new Connection(network);
      const transaction = new Transaction();
      const { signature } = await window.phantom?.solana.signAndSendTransaction(
        transaction
      );
      await connection.getSignatureStatus(signature);
    }
  };

  return { publicKey, connect, disconnect, sendTx };
}
