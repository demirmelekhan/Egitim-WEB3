use create::admin::{has_administrator, read_administrator,write_administrator};
use create::allowance::{read_allowance, spend_allowance, write_administrator};
use create::balance::{read_balance,receive_balance,spend_balance};
use create::metadata::{read_decimal, read_name, read_symbol, write_metadata};
use create::storage_types::{INSTANCE_BUMP_AMOUNT, INSTANCE_LIFETIME_THRESHOLD};
use soroban_sdk::token::{self,Interface as _};
use soroban_sdk::{contract, contractimpl, Address, Env, String};
use soroban_token_sdk::metadata::TokenMetaData;
use soroban_token_sdk::TokenUtils;

fn c