use anchor_lang::prelude::*;
use crate::state::*;

#[derive(Accounts)]
#[instruction(code : u32)]
pub struct InitializeQuiz<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        payer = authority,
        space = 8 + 4 + (4 + 4) + 1 + 1 + 32 + (4 + 30) + (4 + 100) + 8,
        seeds = [b"quiz", code.to_le_bytes().as_ref()], 
        bump
    )]
    pub quiz_account: Account<'info, QuizAccount>,

    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<InitializeQuiz>,
    code: u32,
    data: String,
    workshop_db_id: String,
) -> Result<()> {
    let quiz_account = &mut ctx.accounts.quiz_account;

    let clock = Clock::get()?;

    quiz_account.is_started = false;
    quiz_account.is_done = false;
    quiz_account.owner = *ctx.accounts.authority.key;
    quiz_account.workshop_db_id = workshop_db_id;
    quiz_account.data = data;
    quiz_account.code = code;
    quiz_account.date_created = clock.unix_timestamp as u64;

    msg!("Created a new quiz! Code: {}", code);
    Ok(())
}
