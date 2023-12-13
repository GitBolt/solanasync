import * as anchor from '@coral-xyz/anchor'
import { anchorProgram } from '@/util/helper';

export const getQuiz = async (
  wallet: anchor.Wallet,
  publicKey: string,
) => {
  const program = anchorProgram(wallet);

  try {
    // @ts-ignore
    const data = await program.account.quizAccount.fetch(publicKey)
    console.log(data)
    if (data) {

      const data2 = await fetch(data.data)
      const json = await data2.json()
      return { error: false, questionCount: json.length, date: data.dateCreated.toNumber(), id: data.id}
    }
    return { error: "Account not found", sig: '' }

  } catch (e: any) {
    console.log(e)
    return { error: e.toString(), sig: null }
  }
}