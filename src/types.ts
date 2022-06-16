import { FixedPointNumber, Token } from "@acala-network/sdk-core";
import { Observable } from "rxjs";
import { BaseCrossChainAdapter } from "./base-chain-adapter";
import { RegisteredChain } from "./configs";

export type CROSS_CHAIN_ENV = "kusama" | "polkadot";

export interface Chain {
  readonly id: RegisteredChain;
  readonly display: string;
  // chain icon resource path
  readonly icon: string;
  // set id to -1 if the chain is para chain
  readonly paraChainId: number;
}

export interface CrossChainRouter {
  from: Chain;
  to: Chain;
  token: string;
}

export interface CrossChainTransferParams {
  amount: FixedPointNumber;
  to: RegisteredChain;
  token: string;
  address: string;
}

export interface CrossChainInputConfigs {
  minInput: FixedPointNumber;
  maxInput: FixedPointNumber;
  destCrossChainFee: TokenBalance;
  ss58Prefix: number;
  tokenDecimals: number;
}

export interface BridgeTxParams {
  module: string;
  call: string;
  params: any[];
}

export interface BridgeSDKConfigs {
  adapters: BaseCrossChainAdapter[];
}

export interface CrossChianBalanceChangedConfigs {
  token: string;
  address: string;
  amount: FixedPointNumber;
  tolerance?: number;
  timeout?: number;
}

export enum BalanceChangedStatus {
  "CHECKING",
  "SUCCESS",
  "TIMEOUT",
  "UNKNOWN_ERROR",
}

export interface BaseSDK {
  get isReady(): Promise<boolean>;
  get isReady$(): Observable<boolean>;
}

export interface TokenBalance {
  token: Token | string;
  balance: FixedPointNumber;
}

export interface BalanceData {
  free: FixedPointNumber;
  locked: FixedPointNumber;
  reserved: FixedPointNumber;
  available: FixedPointNumber;
}

export interface BalanceAdapter {
  subscribeBalance(token: Token | string, address: string): Observable<BalanceData>;
  getED(token: Token | string): FixedPointNumber;
}