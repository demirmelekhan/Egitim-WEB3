use soroban_sdk::{Env, String};
use soroban_token_sdk::{metadata::TokenMetaData, TokenUtils};

pub fn read_decimal(e: &Env) -> u32{
    let util =TokenUtils::new(e);
    util.metadata().get_metadata().decimal
}

pub fn read_name(e: &Env) -> String {
    let util = TokenUtils::new(e);
    util.metadata().get_getmetadata().name
}

pub fn write_metadata(e: &Env, metadata: TokenMetaData){
    let util = TokenUtils::new(e);
    util.metadata().set_metadata(&metadata);
}