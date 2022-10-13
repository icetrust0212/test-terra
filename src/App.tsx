import "./App.css";
import { useEffect, useState, useMemo } from "react";
import {
  useWallet,
  useConnectedWallet,
  useLCDClient,
  WalletStatus,
} from "@terra-money/wallet-provider";
import { contractAddress } from "./contract/address";
import { FBLProjectClient } from "./contract/clients/FBLProjectClient";
import { ConnectWallet } from "./components/ConnectWallet";
import { Coin, Coins } from "@terra-money/terra.js";
import { betAmountList, betValueList } from "data";
import toast, { Toaster } from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';

const App = () => {
  const [betAmount, setBetAmount] = useState(0);
  const [betValue, setBetValue] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [updating, setUpdating] = useState(false);
  const connectedWallet = useConnectedWallet();
  const lcd = useLCDClient();
  const [owner, setOwner] = useState<string>("");
  const [burntAmount, setBurntAmount] = useState(0);

  const {
    status,
    network,
    wallets,
    availableConnectTypes,
    availableConnections,
    connect,
    disconnect,
  } = useWallet();

  const contractClient = useMemo(() => {
    if (!connectedWallet) {
      return;
    }
    return new FBLProjectClient(
      lcd,
      connectedWallet,
      contractAddress("FBL-project", connectedWallet)
    );
  }, [lcd, connectedWallet]);

  const handleBet = async () => {
    if (contractClient) {
      if (betAmount === 0) {
        toast.error("Bet amount should be correct.");
        return;
      }
      setUpdating(true);
      const c = new Coin("uluna", betAmount);
      const cs = new Coins([c]);
      try {
        const res = await contractClient.bet({ bet: betValue }, cs);
        const bet_result = JSON.parse(res?.raw_log || "{}")?.[0]?.events?.find((event: any) => event.type === "wasm")?.attributes?.find((attribute: any) => attribute.key === "bet_result")?.value;
        if (bet_result === "true") {
          toast.success('You won!');
        } else {
          toast.error('You lost');
        }
        updateBalance();
      } catch (e) {
        toast.error("Error");
        console.log("error: ", e);
      } finally {
        setUpdating(false);
      }
    }
  };

  const handleWithdraw = async () => {
    if (contractClient) {
      setUpdating(true);
      try {
        await contractClient.withdraw();
        updateBalance();
        toast.success("Done");
      } catch(e: any) {
        toast.error("Error");
        console.log("error: ", e);
      } finally {
        setUpdating(false);
      }
    }
  }

  async function updateBalance() {
    const [balance] = await lcd.bank.balance(wallets[0].terraAddress);
    const coins = balance.toData();
    setWalletBalance(parseInt(coins[0].amount) / 1000000);
    if (contractClient) {
      const burntAmount = await contractClient.getBurntAmountQuery();
      console.log("burntAmount: ", burntAmount);
      setBurntAmount(parseInt(burntAmount.amount) / 1000000);
    }
  }

  useEffect(() => {
    if (connectedWallet) {
      updateBalance();
    }
  }, [lcd, connectedWallet, wallets, contractClient]);

  useEffect(() => {
    async function prefetch() {
      let owner = await contractClient?.getOwnerQuery();
      console.log("owner: ", owner);
      setOwner(owner?.owner || "");
    }
    if (connectedWallet && contractClient) {
      prefetch();
    }
  }, [lcd, connectedWallet, wallets, contractClient]);

  return (
    <div className="App">
      <header className="main w-[100%] flex flex-col items-center ">
        <div className="bet-amount-selector">
          {betAmountList.map((item) => (
            <button
              className={`btn ${betAmount === item.value && "selected"}`}
              key={`bet-amount-${item.id}`}
              onClick={() => setBetAmount(item.value)}
            >
              ${item.label}
            </button>
          ))}
        </div>
        <div className="bet-value-selector mt-5">
          {betValueList.map((item) => (
            <button
              className={`btn ${betValue === item.value && "selected"}`}
              key={`bet-value-${item.id}`}
              onClick={() => setBetValue(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
        {status === WalletStatus.WALLET_CONNECTED && (
          <div className="my-[50px] flex gap-[20px] mx-[auto]">
            <button onClick={handleBet} disabled={updating} type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {updating && <FaSpinner />}
              {!updating && "Bet"}
            </button>
            {
              owner === wallets[0].terraAddress && (
                <button onClick={handleWithdraw} type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Withdraw
                </button>
              )
            }
          </div>
        )}
      </header>
      {
        status === WalletStatus.WALLET_CONNECTED && (
          <div className="flex flex-col">
            <span className="bg-[transparent] w-[auto] text-[white] text-[24px]">Wallet Balance: {new Intl.NumberFormat().format(walletBalance)}</span>
            <span className="bg-[transparent] w-[auto] text-[red] text-[24px]">Burnt Amount: {new Intl.NumberFormat().format(burntAmount)}</span>
          </div>
        )
      }
      <ConnectWallet />
    </div>
  );
};

export default App;
