import * as anchor from '@coral-xyz/anchor';
import { anchorProgram } from '@/util/helper';

export const getTopUsers = async (
  wallet: anchor.Wallet,
  quizCode: number,
) => {
  const program = anchorProgram(wallet);

  try {
    // @ts-ignore
    const data = await program.account.quizUserAccount.all([
      {
        memcmp: {
          offset: 8,
          bytes: anchor.utils.bytes.bs58.encode([quizCode]),
        },
      },

    ])

    console.log("TOP USERS: ", data)
    if (data && data.length) {
      return { error: false, data };
    }
    return { error: "Account not found", sig: '' };
  } catch (e) {
    throw e;
  }
};
