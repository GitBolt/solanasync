use anchor_lang::prelude::*;
use crate::state::*;

#[derive(Accounts)]
#[instruction(quiz_code : u32)]
pub struct InitializeQuizUser<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        payer= authority,
        space = 8 + (4+10) + 4 + 32 + (4 + 4 * 4) + 8,
        seeds = [b"quiz_user", authority.key().as_ref(), quiz_code.to_le_bytes().as_ref()], 
        bump
    )]
    pub quiz_user_account: Account<'info, QuizUserAccount>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<InitializeQuizUser>, quiz_code: u32, name: String) -> Result<()> {
    let quiz_user_account = &mut ctx.accounts.quiz_user_account;

    let clock = Clock::get()?;
    quiz_user_account.quiz_code = quiz_code;
    quiz_user_account.name = name;
    quiz_user_account.owner = *ctx.accounts.authority.key;
    quiz_user_account.date_created = clock.unix_timestamp as u64;
    quiz_user_account.points = vec![];
    msg!("Created a new quiz user! quiz_code: {}", quiz_code);
    Ok(())
}
