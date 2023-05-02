import { useEffect, useState } from "react";
import { useWeb3 } from "../contexts/Web3Context";

export function TokenBalance() {
  const { account, contract } = useWeb3();
  const [balance, setBalance] = useState<string>();

  useEffect(() => {
    if (account && contract) {
      contract.methods.balanceOf(account).call().then(setBalance);
    }
  }, [account, contract]);

  if (balance === undefined) {
    return <div>balance is undefined so Loading...</div>;
  }

  return <div>Balance: {balance}</div>;
}
