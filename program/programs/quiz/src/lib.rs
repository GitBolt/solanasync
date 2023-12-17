use anchor_lang::prelude::*;

pub mod errors;
pub mod instructions;
pub mod state;

pub use errors::*;
pub use instructions::*;
pub use state::*;

declare_id!("4UoU2k2tnb6rEF2DXJ2JTksexA7jiK3Yq8WgWfwK6mSh");

#[program]
pub mod quiz {
    use super::*;

    pub fn create_quiz(
        ctx: Context<InitializeQuiz>,
        code: u32,
        data: String,
        workshop_db_id: String,
    ) -> Result<()> {
        instructions::create_quiz::handler(ctx, code, data, workshop_db_id)
    }

    pub fn create_quiz_user(ctx: Context<InitializeQuizUser>, quiz_code: u32, name: String) -> Result<()> {
        instructions::create_quiz_user::handler(ctx, quiz_code, name)
    }

    pub fn answer_quiz(ctx: Context<AnswerQuiz>, _quiz_id: u32, points: Vec<u32>) -> Result<()> {
        instructions::answer_quiz::handler(ctx, _quiz_id, points)
    }

    pub fn start_quiz(ctx: Context<StartQuiz>, _quiz_id: u32) -> Result<()> {
        instructions::start_quiz::handler(ctx, _quiz_id)
    }

    pub fn close_quiz(ctx: Context<CloseQuiz>, _quiz_id: u32) -> Result<()> {
        instructions::close_quiz::handler(ctx, _quiz_id)
    }
}
