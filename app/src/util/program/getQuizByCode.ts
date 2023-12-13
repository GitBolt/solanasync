import * as anchor from '@coral-xyz/anchor'
import { anchorProgram } from '@/util/helper';

export const getQuizByCode = async (
  wallet: anchor.Wallet,
  quizId: number,
) => {
  const program = anchorProgram(wallet);

  try {
    // @ts-ignore
    const data = await program.account.quizAccount.all([
      {
        memcmp: {
          offset: 8,
          bytes: anchor.utils.bytes.bs58.encode(Uint8Array.from([quizId])),
        },
      },
    ])

    console.log(data)
    if (data || data.length) {
      console.log("Found")
      const data2 = await fetch(data[0].account.data)
      const json = await data2.json()
      return { error: false, details: json, account: data.account }
    }
    return { error: "Account not found", sig: '' }
  } catch (e: any) {
    console.log(e)
    return { error: e.toString(), sig: null }
  }
}