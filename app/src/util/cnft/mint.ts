import { PublicKey, Transaction } from "@solana/web3.js";
import {
  createMintToCollectionV1Instruction,
  MetadataArgs,
  PROGRAM_ID as BUBBLEGUM_PROGRAM_ID,
} from "@metaplex-foundation/mpl-bubblegum";
import {
  SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
  SPL_NOOP_PROGRAM_ID,
} from "@solana/spl-account-compression";
import { PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";


export const mintCompressedNft = async (
  reference: PublicKey,
  payer: PublicKey,
  merkleTreeAddress: PublicKey,
  mintAccount: PublicKey,
  metadataAccount: PublicKey,
  masterEditionAccount: PublicKey,
  metadata: MetadataArgs,
  toAddress: PublicKey
) => {
  try {
    const [treeAuthority, _] = PublicKey.findProgramAddressSync(
      [merkleTreeAddress.toBuffer()],
      BUBBLEGUM_PROGRAM_ID
    );

    const [bubblegumSigner, __] = PublicKey.findProgramAddressSync(
      [Buffer.from("collection_cpi", "utf8")],
      BUBBLEGUM_PROGRAM_ID
    );

    const mintInstruction = createMintToCollectionV1Instruction(
      {
        payer,
        merkleTree: merkleTreeAddress,
        treeAuthority,
        treeDelegate: payer,
        leafOwner: toAddress,
        leafDelegate: payer,
        collectionAuthority: payer,
        collectionAuthorityRecordPda: BUBBLEGUM_PROGRAM_ID,
        collectionMint: mintAccount,
        collectionMetadata: metadataAccount,
        editionAccount: masterEditionAccount,
        compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        logWrapper: SPL_NOOP_PROGRAM_ID,
        bubblegumSigner,
        tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
      },
      {
        metadataArgs: Object.assign(metadata, {
          collection: {
            key: mintAccount,
            verified: false,
          },
        }),
      }
    );

    mintInstruction.keys.push({
      pubkey: payer,
      isSigner: true,
      isWritable: true,
    });

    mintInstruction.keys.push({
      pubkey: toAddress,
      isSigner: true,
      isWritable: false,
    });

    mintInstruction.keys.push({
      pubkey: reference,
      isSigner: false,
      isWritable: false,
    });

    const transaction = new Transaction().add(mintInstruction);

    console.log("Transaction created successfully");
    return transaction;
  } catch (err) {
    console.log("An error occured while creating the transaction");
    console.log(err);
  }
};