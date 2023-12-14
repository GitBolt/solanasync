import * as anchor from '@coral-xyz/anchor';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { anchorProgram } from '@/util/helper';

export const startQuiz = async (
  wallet: anchor.Wallet,
  quizCode: number
) => {
  const program = anchorProgram(wallet);

  const [quizAccount] = PublicKey.findProgramAddressSync(
    [Buffer.from("quiz"), new anchor.BN(quizCode).toArrayLike(Buffer, "le", 4)],
    program.programId
  );

  try {
    const txHash = await program.methods
      .startQuiz(quizCode)
      .accounts({
        quizAccount,
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
