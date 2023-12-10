import type { NextApiRequest, NextApiResponse } from 'next';
import {
  MetadataArgs,
  TokenProgramVersion,
  TokenStandard,
} from '@metaplex-foundation/mpl-bubblegum';
import * as anchor from '@project-serum/anchor';
import { mintCompressedNft } from '@/util/cnft/mint';
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

      console.log("Getting Connection")
      const connection = new anchor.web3.Connection(process.env.RPC_URL as string || "https://api.devnet.solana.com");

      const user = new anchor.web3.PublicKey(account);

      console.log("User: ", user.toBase58())

      const payer = anchor.web3.Keypair.fromSecretKey(
        new Uint8Array(JSON.parse(process.env.GAS_KEY as string))
      );
      const reference = anchor.web3.Keypair.generate();
      console.log("Ref: ", reference.publicKey.toBase58())

      const nftMetadata: MetadataArgs = {
        name: "NFT NAME",
        symbol: "HEY",
        uri: "NFT METADATA URL",
        creators: [
          {
            address: payer.publicKey,
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

      console.log("Metadata ready")

      console.log("Workshop Id: ", workshopId)
      const workshop = await Workshop.findOne({ _id: workshopId })
      console.log("Workshop From Db: ", workshop)
      if (!workshop) {
        return res.status(400).json({ error: "Workshop does not exist" })
      }

      console.log("Found Workshop. Minting Compressed NFT Ix")

      const transaction = await mintCompressedNft(
        reference.publicKey,
        payer.publicKey,
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

      console.log("Got Mint Tx")
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
      console.log("Blockhash: ", blockhash)

      transaction.feePayer = payer.publicKey;
      transaction.recentBlockhash = blockhash;
      transaction.lastValidBlockHeight = lastValidBlockHeight;
      transaction.partialSign(payer);

      console.error("Signed Gasless")

      const serializedTransaction = transaction.serialize({
        requireAllSignatures: false,
      });
      const base64 = serializedTransaction.toString("base64");

      console.error("Serialized", base64)

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
