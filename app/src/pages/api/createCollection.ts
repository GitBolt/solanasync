import { NextApiRequest, NextApiResponse } from 'next';
import { Connection, Keypair, clusterApiUrl } from '@solana/web3.js';
import { ALL_DEPTH_SIZE_PAIRS, ValidDepthSizePair } from '@solana/spl-account-compression';
import { createCollection, createTree } from '@/util/cnft/utils';
import { CreateMetadataAccountArgsV3 } from '@metaplex-foundation/mpl-token-metadata';
import { web3 } from '@coral-xyz/anchor';
import { Workshop } from '@/util/schema';
import { findLeastDepthPair } from '@/util/helper';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, symbol, workshopId, nftImageUri, size } = req.body
      if (!name || !symbol || !workshopId || !nftImageUri) {
        return res.status(400).json({ error: "Name, symbol and workshop id and nft image uri all are required" })
      }

      const payer = web3.Keypair.fromSecretKey(
        new Uint8Array(JSON.parse(process.env.GAS_KEY as string))
      );

      const CLUSTER_URL = process.env.RPC_URL || clusterApiUrl("devnet");
      const connection = new Connection(CLUSTER_URL, "processed");


      const { maxDepth, maxBufferSize } = findLeastDepthPair(size)
      
      const maxDepthSizePair = {
        maxDepth,
        maxBufferSize,
      };
      const canopyDepth = maxDepthSizePair.maxDepth - 5;

      const treeKeypair = Keypair.generate();

      await createTree(connection, payer, treeKeypair, maxDepthSizePair as ValidDepthSizePair, canopyDepth);

      const collectionMetadataV3: CreateMetadataAccountArgsV3 = {
        data: {
          name: name,
          symbol: symbol,
          uri: nftImageUri,
          sellerFeeBasisPoints: 100,
          creators: [
            {
              address: payer.publicKey,
              verified: false,
              share: 100,
            },
          ],
          collection: null,
          uses: null,
        },
        isMutable: false,
        collectionDetails: null,
      };

      const collection = await createCollection(connection, payer, collectionMetadataV3);

      console.log(collection)
      await Workshop.updateOne(
        { _id: workshopId },
        {
          $set: {
            cNFTMetadata: {
              merkleTreeAddress: treeKeypair.publicKey.toBase58(),
              mintAccount: collection.mint.toBase58(),
              metadataAccount: collection.metadataAccount.toBase58(),
              masterEditionAccount: collection.masterEditionAccount.toBase58(),
              size: size,
            }
          }
        }
      )

      res.status(200).json({ message: 'Collection Created', mint: collection.mint.toBase58() });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
