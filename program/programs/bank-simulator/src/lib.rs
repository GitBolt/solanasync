use anchor_lang::prelude::*;

pub mod errors;
pub mod instructions;
pub mod state;

pub use errors::*;
pub use instructions::*;
pub use state::*;

declare_id!("4oQejQy9HGhDFhVWLD3yx8pAMGMxn9xBc3HxG58JQuSR");

#[program]
pub mod quiz {
    use super::*;

    pub fn create_quiz(
        ctx: Context<InitializeQuiz>,
        id: u32,
        title: String,
        options: Vec<String>,
        ending: u64,
    ) -> Result<()> {
        instructions::create_quiz::handler(ctx, id, title, options, ending)
    }

    pub fn create_quiz_user(ctx: Context<InitializeQuizUser>, quiz_id: u32) -> Result<()> {
        instructions::create_quiz_user::handler(ctx, quiz_id)
    }

    pub fn answer_quiz(
        ctx: Context<AnswerQuiz>,
        _quiz_id: u32,
        selected_option: u32,
    ) -> Result<()> {
        instructions::answer_quiz::handler(ctx, _quiz_id, selected_option)
    }

    pub fn close_quiz(ctx: Context<CloseQuiz>, _quiz_id: u32) -> Result<()> {
        instructions::close_quiz::handler(ctx, _quiz_id)
    }
}
