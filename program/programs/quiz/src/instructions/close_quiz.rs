use anchor_lang::prelude::*;
use crate::state::*;

#[derive(Accounts)]
#[instruction(quiz_id : u32)]
pub struct CloseQuiz<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        seeds = [b"quiz", quiz_id.to_le_bytes().as_ref()], 
        bump
    )]
    pub quiz_account: Account<'info, QuizAccount>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<CloseQuiz>, _quiz_id: u32) -> Result<()> {
    let quiz_account = &mut ctx.accounts.quiz_account;
    quiz_account.is_done = true;
    Ok(())
}
