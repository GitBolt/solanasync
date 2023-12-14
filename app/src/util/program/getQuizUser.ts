import * as anchor from '@coral-xyz/anchor';
import { anchorProgram } from '@/util/helper';

export const getQuizUser = async (
  wallet: anchor.Wallet,
  quizCode: number,
  publicKey: string,
) => {
  const program = anchorProgram(wallet);
  console.log(quizCode, publicKey)
  try {
    // @ts-ignore
    const data = await program.account.quizUserAccount.all([
      {
        memcmp: {
          offset: 8,
          bytes: anchor.utils.bytes.bs58.encode([quizCode]),
        },
      },
      {
        memcmp: {
          offset: 8 + 12,
          bytes: new anchor.web3.PublicKey(publicKey).toBase58(),
        },
      },
    ])

    if (data && data.length) {
      console.log("Found User");
      const data2 = await fetch(data[0].account);
      return { error: false, details: data2 };
    }
    return { error: "Account not found", sig: '' };
  } catch (e) {
    throw e;
  }
};
