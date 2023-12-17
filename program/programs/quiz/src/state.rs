use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct QuizAccount {
    pub code: u32,
    pub is_started: bool,
    pub is_done: bool,
    pub owner: Pubkey,
    pub workshop_db_id: String,
    pub data: String,
    pub date_created: u64,
}

#[account]
#[derive(Default)]
pub struct QuizUserAccount {
    pub quiz_code: u32,
    pub name: String,
    pub owner: Pubkey,
    pub points: Vec<u32>,
    pub date_created: u64,
}
