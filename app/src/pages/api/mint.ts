import type { NextApiRequest, NextApiResponse } from 'next';
import {
  MetadataArgs,
  TokenProgramVersion,
  TokenStandard,
} from '@metaplex-foundation/mpl-bubblegum';
import * as anchor from '@project-serum/anchor';
import { mintCompressedNft } from '@/util/cnft/mint';
import mongoose from 'mongoose';
import { Workshop } from '@/util/schema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === 'GET') {
    res.status(200).json({
      label: 'SolanaSync',
      icon: 'https://solanasync.com/icon.png',
    });
    return;
  }

  if (req.method === 'POST') {
    try {
      const { account } = req.body;
      const { workshopId } = req.query
      
      if (!account) {
        res.status(400).json({ error: 'No account provided' });
        return;
      }

      const user = new anchor.web3.PublicKey(account);
      const CONNECTION = new anchor.web3.Connection(process.env.RPC_URL as string || "https://api.devnet.solana.com");
      const PAYER = anchor.web3.Keypair.fromSecretKey(
        new Uint8Array(JSON.parse(process.env.GAS_KEY as string))
      );
      const reference = anchor.web3.Keypair.generate();

      const nftMetadata: MetadataArgs = {
        name: "NFT NAME",
        symbol: "HEY",
        uri: "NFT METADATA URL",
        creators: [
          {
            address: PAYER.publicKey,
            verified: false,
            share: 100,
          },
        ],
        editionNonce: 0,
        uses: null,
        collection: null,
        primarySaleHappened: false,
        sellerFeeBasisPoints: 0,
        isMutable: false,
        tokenProgramVersion: TokenProgramVersion.Original,
        tokenStandard: TokenStandard.NonFungible,
      };


      const workshop = await Workshop.findOne({ id: workshopId })
      if (!workshop) {
        return res.status(400).json({ error: "Workshop does not exist" })
      }
      const transaction = await mintCompressedNft(
        reference.publicKey,
        PAYER.publicKey,
        new anchor.web3.PublicKey(workshop.cNFTMetadata.merkleTreeAddress!),
        new anchor.web3.PublicKey(workshop.cNFTMetadata.mintAccount!),
        new anchor.web3.PublicKey(workshop.cNFTMetadata.metadataAccount!),
        new anchor.web3.PublicKey(workshop.cNFTMetadata.masterEditionAccount!),
        nftMetadata,
        user
      );
      if (!transaction) {
        res.status(400).json({
          error: "Got empty transaction",
        });
        return;
      }

      const { blockhash, lastValidBlockHeight } = await CONNECTION.getLatestBlockhash();
      transaction.feePayer = PAYER.publicKey;
      transaction.recentBlockhash = blockhash;
      transaction.lastValidBlockHeight = lastValidBlockHeight;
      transaction.partialSign(PAYER);

      console.log("Signed Gasless")

      const serializedTransaction = transaction.serialize({
        requireAllSignatures: false,
      });
      const base64 = serializedTransaction.toString("base64");

      console.log("Serialized", base64)

      res.status(200).json({
        transaction: base64,
        message: "Enjoy your free workshop NFT!",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
    return;
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
