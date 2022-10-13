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