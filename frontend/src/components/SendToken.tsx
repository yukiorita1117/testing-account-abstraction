import { useState } from "react";
import { useWeb3 } from "../contexts/Web3Context";

export function SendToken() {
  const { account, contract } = useWeb3();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const sendToken = () => {
    if (account && contract) {
      contract.methods.transfer(recipient, amount).send({ from: account });
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Recipient address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={sendToken}>Send</button>
    </div>
  );
}
