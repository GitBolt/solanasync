import * as anchor from '@coral-xyz/anchor';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { anchorProgram } from '@/util/helper';

export const answerQuiz = async (
  wallet: anchor.Wallet,
  quizId: number,
  answers: number[]
) => {
  const program = anchorProgram(wallet);

  const [quizAccount] = PublicKey.findProgramAddressSync(
    [Buffer.from("quiz"), new anchor.BN(quizId).toArrayLike(Buffer, "le", 4)],
    program.programId
  )

  const [quizUserAccount] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("quiz_user"),
      wallet.publicKey.toBuffer(),
      new anchor.BN(quizId).toArrayLike(Buffer, "le", 4),
    ],
    program.programId
  )

  try {
    const txHash = await program.methods
      .answerQuiz(quizId, answers)
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
