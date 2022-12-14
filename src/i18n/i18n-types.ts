// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString, RequiredParams } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'en'

export type Locales =
	| 'en'
	| 'ru'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	/**
	 * Create a wallet
	 */
	createAWallet: string
	/**
	 * Import a wallet
	 */
	importAWallet: string
	/**
	 * Save your phrase:{phrase}
	 * @param {string} phrase
	 */
	saveYouPhrase: RequiredParams<'phrase'>
	/**
	 * Create wallet
	 */
	createWalletButton: string
	/**
	 * Creating wallet
	 */
	creatingWalletButton: string
	/**
	 * Please choose a password
	 */
	passwordError: string
	/**
	 * Please confirm a password
	 */
	passwordConfirmError: string
	/**
	 * Password
	 */
	passwordLabel: string
	/**
	 * Password Confirm
	 */
	passwordConfirmLabel: string
	/**
	 * Lock
	 */
	lock: string
	/**
	 * Unlock
	 */
	unlock: string
	/**
	 * Unlocking
	 */
	unlocking: string
	/**
	 * Authorization
	 */
	authPageHeadline: string
	/**
	 * You want create or import wallet?
	 */
	createWalletsText: string
	/**
	 * Enter you phrases
	 */
	enterYouPhrases: string
	/**
	 * Import wallet
	 */
	importWalletButton: string
	/**
	 * Importing wallet
	 */
	importingWalletButton: string
	/**
	 * Balance: {balance}
	 * @param {string} balance
	 */
	balance: RequiredParams<'balance'>
	/**
	 * Address
	 */
	transactionAddress: string
	/**
	 * Value 
	 */
	transactionAmount: string
	/**
	 * Send Transaction
	 */
	sendTransactionButtonText: string
	/**
	 * Wallet: {0}
	 * @param {unknown} 0
	 */
	walletAddres: RequiredParams<'0'>
}

export type TranslationFunctions = {
	/**
	 * Create a wallet
	 */
	createAWallet: () => LocalizedString
	/**
	 * Import a wallet
	 */
	importAWallet: () => LocalizedString
	/**
	 * Save your phrase:{phrase}
	 */
	saveYouPhrase: (arg: { phrase: string }) => LocalizedString
	/**
	 * Create wallet
	 */
	createWalletButton: () => LocalizedString
	/**
	 * Creating wallet
	 */
	creatingWalletButton: () => LocalizedString
	/**
	 * Please choose a password
	 */
	passwordError: () => LocalizedString
	/**
	 * Please confirm a password
	 */
	passwordConfirmError: () => LocalizedString
	/**
	 * Password
	 */
	passwordLabel: () => LocalizedString
	/**
	 * Password Confirm
	 */
	passwordConfirmLabel: () => LocalizedString
	/**
	 * Lock
	 */
	lock: () => LocalizedString
	/**
	 * Unlock
	 */
	unlock: () => LocalizedString
	/**
	 * Unlocking
	 */
	unlocking: () => LocalizedString
	/**
	 * Authorization
	 */
	authPageHeadline: () => LocalizedString
	/**
	 * You want create or import wallet?
	 */
	createWalletsText: () => LocalizedString
	/**
	 * Enter you phrases
	 */
	enterYouPhrases: () => LocalizedString
	/**
	 * Import wallet
	 */
	importWalletButton: () => LocalizedString
	/**
	 * Importing wallet
	 */
	importingWalletButton: () => LocalizedString
	/**
	 * Balance: {balance}
	 */
	balance: (arg: { balance: string }) => LocalizedString
	/**
	 * Address
	 */
	transactionAddress: () => LocalizedString
	/**
	 * Value 
	 */
	transactionAmount: () => LocalizedString
	/**
	 * Send Transaction
	 */
	sendTransactionButtonText: () => LocalizedString
	/**
	 * Wallet: {0}
	 */
	walletAddres: (arg0: unknown) => LocalizedString
}

export type Formatters = {}
