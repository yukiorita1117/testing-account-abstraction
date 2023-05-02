import { createContext, useContext, useState, useEffect } from "react";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import ERC4337Token from "../contracts/Erc4337Token.json"; // ABIをインポート

interface IWeb3Context {
  web3: Web3 | undefined;
  account: string | undefined;
  balance: string | undefined;
  contract: Contract | undefined; // これを追加
}

declare global {
  interface Window {
    ethereum: any;
  }
}

const Web3Context = createContext<IWeb3Context>({
  web3: undefined,
  account: undefined,
  balance: undefined,
  contract: undefined,
}); // これを追加

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [web3, setWeb3] = useState<Web3>();
  const [account, setAccount] = useState<string>();
  const [balance, setBalance] = useState<string>();
  const [contract, setContract] = useState<Contract>(); // これを追加

  // Web3とアカウントを初期化
  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      window.ethereum.enable().then((accounts: any) => {
        setAccount(accounts[0]);

        // アカウントの残高を取得
        web3Instance.eth.getBalance(accounts[0]).then(setBalance);

        // コントラクトを初期化
        const contractAddress =
          process.env.NEXT_PUBLIC_ERC4337_TOKEN_CONTRACT_ADDRESS; // 環境変数からコントラクトアドレスを取得
        const contractInstance = new web3Instance.eth.Contract(
          ERC4337Token.abi,
          contractAddress
        ); // ABIとコントラクトアドレスを指定
        setContract(contractInstance);
      });
    }
  }, []);

  return (
    <Web3Context.Provider value={{ web3, account, balance, contract }}>
      {/* これを追加 */}
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  return useContext(Web3Context);
}
