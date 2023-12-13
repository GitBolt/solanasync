import * as anchor from '@coral-xyz/anchor';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { anchorProgram } from '@/util/helper';

export const createQuizUserAccount = async (
  wallet: anchor.Wallet,
  quizId: number
) => {
  const program = anchorProgram(wallet);

  const [quizUserAccount] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("quiz_user"),
      wallet.publicKey.toBuffer(),
      new anchor.BN(quizId).toArrayLike(Buffer, "le", 4),
    ],
    program.programId
  );

  try {
    const txHash = await program.methods
      .createQuizUser(quizId)
      .accounts({
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
