#![no_std]

use soroban_sdk::{contractimpl, Env, Symbol};

pub struct Contract;

#[contractimpl]
impl Contract {
    pub fn hello(env: Env, name: Symbol) -> Symbol {
        Symbol::short("Hello, ").concat(&name)
    }
}