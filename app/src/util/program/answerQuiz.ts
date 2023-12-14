import * as anchor from '@coral-xyz/anchor';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { anchorProgram } from '@/util/helper';

export const answerQuiz = async (
  wallet: anchor.Wallet,
  quizCode: number,
  answers: number[]
) => {
  const program = anchorProgram(wallet);
  console.log("QUIZ ANSWERS: ", answers)
  const [quizAccount] = PublicKey.findProgramAddressSync(
    [Buffer.from("quiz"), new anchor.BN(quizCode).toArrayLike(Buffer, "le", 4)],
    program.programId
  )

  const [quizUserAccount] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("quiz_user"),
      wallet.publicKey.toBuffer(),
      new anchor.BN(quizCode).toArrayLike(Buffer, "le", 4),
    ],
    program.programId
  )

  try {
    const txHash = await program.methods
      .answerQuiz(quizCode, answers)
      .accounts({
        quizAccount,
        quizUserAccount,
        authority: wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    return { error: false, sig: txHash };
  } catch (e: any) {
    console.log(e);
    return { error: e.toString(), sig: null };
  }
};
