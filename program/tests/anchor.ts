import BN from "bn.js";
import * as web3 from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import type { Quiz } from "../target/types/quiz";


describe("Quiz", async () => {
  // Configure the client to use the local cluster
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Errors as anchor.Program<Quiz>;
  
  const quizCode = 10;
  
  const [quizAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("quiz"), new BN(quizCode).toArrayLike(Buffer, "le", 4)],
    program.programId
  );

  const date = new Date();
  date.setDate(date.getDate() + 1);

  const [quizUserAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("quiz_user"),
      program.provider.publicKey.toBuffer(),
      new BN(quizCode).toArrayLike(Buffer, "le", 4),
    ],
    program.programId
  );

  console.log(
    "Poll Account: ",
    quizAccount.toBase58(),
    "\nUser Account: ",
    quizUserAccount.toBase58()
  );

  it("Created Quiz Account", async () => {
    const txHash = await program.methods
      .createQuiz(quizCode, "", "2")
      .accounts({
        quizAccount,
        authority: program.provider.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
    console.log(`Signature: ${txHash}`);
  });

  it("Created Quiz User Account", async () => {
    const txHash = await program.methods
      .createQuizUser(quizCode)
      .accounts({
        quizUserAccount,
        authority: program.provider.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
    console.log(`Signature: ${txHash}`);
  });

  it("Answer Quiz", async () => {
    const txHash = await program.methods
      .answerQuiz(quizCode, [1, 2, 3, 4])
      .accounts({
        quizAccount,
        quizUserAccount,
        authority: program.provider.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
    console.log(`Signature: ${txHash}`);
  });

  it("Close Quiz", async () => {
    const txHash = await program.methods
      .closeQuiz(quizCode)
      .accounts({
        quizAccount,
        authority: program.provider.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
    console.log(`Signature: ${txHash}`);
  });
});
