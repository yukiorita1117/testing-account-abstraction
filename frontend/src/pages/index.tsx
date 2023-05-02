import { useWeb3 } from "../contexts/Web3Context";
import { TokenBalance } from "../components/TokenBalance";
import { SendToken } from "../components/SendToken";

export default function Home() {
  const { web3, account, balance } = useWeb3();

  return (
    <div>
      <h1>ERC-4337 Wallet</h1>

      {account && (
        <>
          <p>Account: {account}</p>
          <p>
            Balance: {web3 && web3.utils.fromWei(balance || "0", "ether")} MATIC
          </p>
          <TokenBalance />
          <SendToken />
        </>
      )}
    </div>
  );
}
