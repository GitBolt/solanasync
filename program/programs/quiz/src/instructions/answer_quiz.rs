use anchor_lang::prelude::*;
use crate::errors::*;
use crate::state::*;

#[derive(Accounts)]
#[instruction(quiz_id : u32)]
pub struct AnswerQuiz<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        seeds = [b"quiz", quiz_id.to_le_bytes().as_ref()], 
        bump
    )]
    pub quiz_account: Account<'info, QuizAccount>,

    #[account(
        mut,
        seeds = [b"quiz_user", authority.key().as_ref(), quiz_id.to_le_bytes().as_ref()], 
        bump
    )]
    pub quiz_user_account: Account<'info, QuizUserAccount>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<AnswerQuiz>, _quiz_id: u32, points: Vec<u32>) -> Result<()> {
    let quiz_user_account = &mut ctx.accounts.quiz_user_account;
    let quiz_account = &mut ctx.accounts.quiz_account;

    if quiz_user_account.points.len() != 0 {
        return err!(Errors::AlreadyAnsweredError);
    }
    if quiz_account.is_done {
        return err!(Errors::QuizEndedError);
    }
    quiz_user_account.points = points;

    Ok(())
}
