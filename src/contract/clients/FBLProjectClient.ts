/**
* This file was automatically generated by @octalmage/terra-cosmwasm-typescript-gen@0.2.0.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @octalmage/terra-cosmwasm-typescript-gen generate command to regenerate this file.
*/

import { LCDClient, Coins, Wallet, MsgExecuteContract, TxInfo, WaitTxBroadcastResult } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
function isConnectedWallet(x: Wallet | ConnectedWallet): x is ConnectedWallet {
  return typeof (x as Wallet).key === "undefined";
};
async function waitForInclusionInBlock(lcd: LCDClient, txHash: string): Promise<TxInfo | undefined> {
  let res;
  for (let i = 0; i <= 50; i++) {
    try {
      res = await lcd.tx.txInfo(txHash);
    } catch (error) {
      // NOOP
    }
      
    if (res) {
      break;
    }
      
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
      
  return res;
};
export type Addr = string;
export type Uint128 = string;
export interface AllBettingHistoryResponse {
  history: BetData[];
  [k: string]: unknown;
}
export interface BetData {
  address: Addr;
  bet_amount: Uint128;
  bet_result: number;
  bet_value: number;
  created_at: number;
  [k: string]: unknown;
}
export interface BettingHistoryPerWalletResponse {
  history: BetData[];
  [k: string]: unknown;
}
export interface BurntAmountResponse {
  amount: Uint128;
  [k: string]: unknown;
}
export type ExecuteMsg = {
  Bet: {
    bet: number;
    [k: string]: unknown;
  };
} | {
  Withdraw: {
    [k: string]: unknown;
  };
} | {
  SetMintBalance: {
    min_balance: Uint128;
    [k: string]: unknown;
  };
} | {
  SetNewOwner: {
    new_owner: string;
    [k: string]: unknown;
  };
};
export interface InstantiateMsg {
  denom_stable: string;
  min_balance: Uint128;
  min_bet_amount: Uint128;
  [k: string]: unknown;
}
export interface OwnerResponse {
  owner: Addr;
  [k: string]: unknown;
}
export interface PoolBalanceResponse {
  balance: Coin;
  [k: string]: unknown;
}
export interface Coin {
  amount: Uint128;
  denom: string;
  [k: string]: unknown;
}
export type QueryMsg = {
  GetAllBettingHistory: {
    [k: string]: unknown;
  };
} | {
  GetBettingHistoryPerWallet: {
    wallet: string;
    [k: string]: unknown;
  };
} | {
  GetRandomness: {
    round: number;
    [k: string]: unknown;
  };
} | {
  GetPoolBalance: {
    [k: string]: unknown;
  };
} | {
  GetOwner: {
    [k: string]: unknown;
  };
} | {
  GetBurntAmount: {
    [k: string]: unknown;
  };
};
export interface RandomnessResponse {
  value: number;
  [k: string]: unknown;
}
export type CanonicalAddr = string;
export interface State {
  bet_history: BetData[];
  burnt_amount: Uint128;
  denom_stable: string;
  min_balance: Uint128;
  min_bet_amount: Uint128;
  owner: CanonicalAddr;
  [k: string]: unknown;
}
export interface FBLProjectReadOnlyInterface {
  contractAddress: string;
  getAllBettingHistoryQuery: () => Promise<AllBettingHistoryResponse>;
  getBettingHistoryPerWalletQuery: ({
    wallet
  }: {
    wallet: string;
  }) => Promise<BettingHistoryPerWalletResponse>;
  getRandomnessQuery: ({
    round
  }: {
    round: number;
  }) => Promise<RandomnessResponse>;
  getPoolBalanceQuery: () => Promise<PoolBalanceResponse>;
  getOwnerQuery: () => Promise<OwnerResponse>;
  getBurntAmountQuery: () => Promise<BurntAmountResponse>;
}
export class FBLProjectQueryClient implements FBLProjectReadOnlyInterface {
  client: LCDClient;
  contractAddress: string;

  constructor(client: LCDClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.getAllBettingHistoryQuery = this.getAllBettingHistoryQuery.bind(this);
    this.getBettingHistoryPerWalletQuery = this.getBettingHistoryPerWalletQuery.bind(this);
    this.getRandomnessQuery = this.getRandomnessQuery.bind(this);
    this.getPoolBalanceQuery = this.getPoolBalanceQuery.bind(this);
    this.getOwnerQuery = this.getOwnerQuery.bind(this);
    this.getBurntAmountQuery = this.getBurntAmountQuery.bind(this);
  }

  getAllBettingHistoryQuery = async (): Promise<AllBettingHistoryResponse> => {
    return this.client.wasm.contractQuery(this.contractAddress, {
      GetAllBettingHistory: {}
    });
  };
  getBettingHistoryPerWalletQuery = async ({
    wallet
  }: {
    wallet: string;
  }): Promise<BettingHistoryPerWalletResponse> => {
    return this.client.wasm.contractQuery(this.contractAddress, {
      GetBettingHistoryPerWallet: {
        wallet
      }
    });
  };
  getRandomnessQuery = async ({
    round
  }: {
    round: number;
  }): Promise<RandomnessResponse> => {
    return this.client.wasm.contractQuery(this.contractAddress, {
      GetRandomness: {
        round
      }
    });
  };
  getPoolBalanceQuery = async (): Promise<PoolBalanceResponse> => {
    return this.client.wasm.contractQuery(this.contractAddress, {
      GetPoolBalance: {}
    });
  };
  getOwnerQuery = async (): Promise<OwnerResponse> => {
    return this.client.wasm.contractQuery(this.contractAddress, {
      GetOwner: {}
    });
  };
  getBurntAmountQuery = async (): Promise<BurntAmountResponse> => {
    return this.client.wasm.contractQuery(this.contractAddress, {
      GetBurntAmount: {}
    });
  };
}
export interface FBLProjectInterface extends FBLProjectReadOnlyInterface {
  contractAddress: string;
  bet: ({
    bet
  }: {
    bet: number;
  }, funds?: Coins) => Promise<any>;
  withdraw: (funds?: Coins) => Promise<any>;
  setMintBalance: ({
    minBalance
  }: {
    minBalance: string;
  }, funds?: Coins) => Promise<any>;
  setNewOwner: ({
    newOwner
  }: {
    newOwner: string;
  }, funds?: Coins) => Promise<any>;
}
export class FBLProjectClient extends FBLProjectQueryClient implements FBLProjectInterface {
  client: LCDClient;
  wallet: Wallet | ConnectedWallet;
  contractAddress: string;

  constructor(client: LCDClient, wallet: Wallet | ConnectedWallet, contractAddress: string) {
    super(client, contractAddress);
    this.client = client;
    this.wallet = wallet;
    this.contractAddress = contractAddress;
    this.bet = this.bet.bind(this);
    this.withdraw = this.withdraw.bind(this);
    this.setMintBalance = this.setMintBalance.bind(this);
    this.setNewOwner = this.setNewOwner.bind(this);
  }

  bet = async ({
    bet
  }: {
    bet: number;
  }, funds?: Coins): Promise<WaitTxBroadcastResult | TxInfo | undefined> => {
    const senderAddress = isConnectedWallet(this.wallet) ? this.wallet.walletAddress : this.wallet.key.accAddress;
    const execMsg = new MsgExecuteContract(senderAddress, this.contractAddress, {
      Bet: {
        bet
      }
    }, funds);

    if (isConnectedWallet(this.wallet)) {
      const tx = await this.wallet.post({
        msgs: [execMsg]
      });
      return waitForInclusionInBlock(this.client, tx.result.txhash);
    } else {
      const execTx = await this.wallet.createAndSignTx({
        msgs: [execMsg]
      });
      return this.client.tx.broadcast(execTx);
    }
  };
  withdraw = async (funds?: Coins): Promise<WaitTxBroadcastResult | TxInfo | undefined> => {
    const senderAddress = isConnectedWallet(this.wallet) ? this.wallet.walletAddress : this.wallet.key.accAddress;
    const execMsg = new MsgExecuteContract(senderAddress, this.contractAddress, {
      Withdraw: {}
    }, funds);

    if (isConnectedWallet(this.wallet)) {
      const tx = await this.wallet.post({
        msgs: [execMsg]
      });
      return waitForInclusionInBlock(this.client, tx.result.txhash);
    } else {
      const execTx = await this.wallet.createAndSignTx({
        msgs: [execMsg]
      });
      return this.client.tx.broadcast(execTx);
    }
  };
  setMintBalance = async ({
    minBalance
  }: {
    minBalance: string;
  }, funds?: Coins): Promise<WaitTxBroadcastResult | TxInfo | undefined> => {
    const senderAddress = isConnectedWallet(this.wallet) ? this.wallet.walletAddress : this.wallet.key.accAddress;
    const execMsg = new MsgExecuteContract(senderAddress, this.contractAddress, {
      SetMintBalance: {
        min_balance: minBalance
      }
    }, funds);

    if (isConnectedWallet(this.wallet)) {
      const tx = await this.wallet.post({
        msgs: [execMsg]
      });
      return waitForInclusionInBlock(this.client, tx.result.txhash);
    } else {
      const execTx = await this.wallet.createAndSignTx({
        msgs: [execMsg]
      });
      return this.client.tx.broadcast(execTx);
    }
  };
  setNewOwner = async ({
    newOwner
  }: {
    newOwner: string;
  }, funds?: Coins): Promise<WaitTxBroadcastResult | TxInfo | undefined> => {
    const senderAddress = isConnectedWallet(this.wallet) ? this.wallet.walletAddress : this.wallet.key.accAddress;
    const execMsg = new MsgExecuteContract(senderAddress, this.contractAddress, {
      SetNewOwner: {
        new_owner: newOwner
      }
    }, funds);

    if (isConnectedWallet(this.wallet)) {
      const tx = await this.wallet.post({
        msgs: [execMsg]
      });
      return waitForInclusionInBlock(this.client, tx.result.txhash);
    } else {
      const execTx = await this.wallet.createAndSignTx({
        msgs: [execMsg]
      });
      return this.client.tx.broadcast(execTx);
    }
  };
}