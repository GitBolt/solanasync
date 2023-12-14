import * as anchor from '@coral-xyz/anchor';
import { anchorProgram } from '@/util/helper';

export const getQuizByCode = async (
  wallet: anchor.Wallet,
  quizId: number,
) => {
  const program = anchorProgram(wallet);

  const attemptFetch = async (offset: number) => {
    try {
      // @ts-ignore
      const data = await program.account.quizAccount.all([
        {
          memcmp: {
            offset: offset,
            bytes: anchor.utils.bytes.bs58.encode([quizId]),
          },
        },
      ]);

      if (data && data.length) {
        console.log("Found");
        const data2 = await fetch(data[0].account.data);
        const json = await data2.json();
        return { error: false, details: json, account: data[0].account };
      }
      return { error: "Account not found", sig: '' };
    } catch (e) {
      console.log("Error with offset", offset, e);
      throw e;
    }
  };

  try {
    return await attemptFetch(8);
  } catch (e) {
    try {
      return await attemptFetch(12);
    } catch (e) {
      return await attemptFetch(8);
    }
  }
};
