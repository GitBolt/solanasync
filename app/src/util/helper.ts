export const truncatedPublicKey = (publicKey: string, length?: number) => {
  if (!publicKey) return;
  if (!length) {
    length = 5;
  }
  return publicKey.replace(publicKey.slice(length, 44 - length), '...');
};

import * as anchor from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js';
import { DEVNET_PROGRAM_ID, LOCALNET_PROGRAM_ID, DEVNET_RPC, LOCALNET_RPC } from '@/util/constants';
import { IDLData, IDLType } from "@/util/idl";
import { ALL_DEPTH_SIZE_PAIRS, ValidDepthSizePair } from '@solana/spl-account-compression';


export const getProvider = (wallet: anchor.Wallet, rpc_url?: string) => {
  const opts = {
    preflightCommitment: 'processed' as anchor.web3.ConfirmOptions,
  };
  const connectionURI =
    rpc_url || LOCALNET_RPC

  console.log("URI: ", connectionURI)
  const connection = new anchor.web3.Connection(
    connectionURI,
    opts.preflightCommitment
  );
  const provider = new anchor.AnchorProvider(
    connection,
    wallet,
    opts.preflightCommitment
  );
  return provider;
};

export const anchorProgram = (wallet: anchor.Wallet, network?: string) => {
  const provider = getProvider(wallet, network);
  const idl = IDLData as anchor.Idl;
  const program = new anchor.Program(
    idl,
    new PublicKey(LOCALNET_PROGRAM_ID),
    provider
  ) as unknown as anchor.Program<IDLType>;

  return program;
};

export const findLeastDepthPair = (n: number): ValidDepthSizePair => {
  for (const pair of ALL_DEPTH_SIZE_PAIRS) {
    console.log(Math.pow(2, pair.maxDepth))
    if (Math.pow(2, pair.maxDepth) >= n) {
      return pair;
    }
  }
  return ALL_DEPTH_SIZE_PAIRS[ALL_DEPTH_SIZE_PAIRS.length - 1];
}