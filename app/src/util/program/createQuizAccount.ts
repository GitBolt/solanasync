import * as anchor from '@coral-xyz/anchor';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { anchorProgram } from '@/util/helper';

export const createQuizAccount = async (
  wallet: anchor.Wallet,
  data: string,
  workshopId: string,
) => {

  const code = Math.floor(1000 + Math.random() * 9000)
  const program = anchorProgram(wallet);

  const [quizAccount] = PublicKey.findProgramAddressSync(
    [Buffer.from("quiz"), new anchor.BN(code).toArrayLike(Buffer, "le", 4)],
    program.programId
  );

  try {
    const txHash = await program.methods
      .createQuiz(code, data, workshopId)
      .accounts({
        quizAccount,
        authority: wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    return { error: false, sig: txHash, quizAccount };
  } catch (e: any) {
    console.log(e);
    return { error: e.toString(), sig: null };
  }
};
