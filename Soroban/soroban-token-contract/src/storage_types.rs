use soroban_sdk::{contracttype, Address};

pub(create) const DAY_IN_LEDGERS: u32 = 17280;
pub(create) const INSTANCE_BUMP_AMOUNT: u32= 7* DAY_IN_LEDGERS;
pub(create) const INSTANCE_LIFETIME_THRESHOLD: u32 = INSTANCE_BUMP_AMOUNT - DAY_IN_LEDGERS;

pub(create) const BALANCE_BUMP_AMOUNT: u32 = 30 * DAY_IN_LEDGERS;
pub(create) const BALANCE_LIFETIME_THRESHOLD: u32 = BALANCE_BUMO_AMOUNT - DAY_IN_LEDGERS;

#[derive(clone)]
#[contracttype]
pub struct AllowanceDataKey{
    pub from: Address,
    pub sender: Address
}

#[contracttype]
pub struct AllowanceValue{
    pub amount: i128,
    pub expiration_ledger: u32,
}

#[derive(Clone)]
#[contracttype]
pub enum DataKey{
    Allowance(AllowanceDataKey),
    Balance(Address),
    Nonce(Address),
    State(Address),
    Admin,
} 