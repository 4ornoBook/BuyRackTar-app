import { environment } from '../../environments/environment';

export const API_URL = environment.API_DOMAIN;

export const API_URLS = {
	ACCOUNT_REFRESH_TOKEN: `${API_URL}/auth/refresh`,
	ACCOUNT_LOGIN: `${API_URL}/auth/login`,
	ACCOUNT_REGISTER: `${API_URL}/auth/register`,
	ACCOUNT_GET: `${API_URL}/accounts/:id`,
	ACCOUNT_USERS: `${API_URL}/accounts/:id/users`, //-- original
	// ACCOUNT_USERS: `${API_URL}/users`,
	ACCOUNT_CATEGORIES: `${API_URL}/accounts/categories`, //-- original
	// ACCOUNT_CATEGORIES: `${API_URL}/categories`,

	USER_GET_WALLETS: `${API_URL}/users/:userId/wallets`, //-- original
	// USER_GET_WALLETS: `${API_URL}/wallets`,

	CURRENCIES_GET: `${API_URL}/currencies`,

	CATEGORY_GET_ONE: `${API_URL}/categories/:id`,
	CATEGORY_CREATE: `${API_URL}/categories`,
	CATEGORY_UPDATE: `${API_URL}/categories/:id`,
	CATEGORY_TRANSACTIONS: `${API_URL}/categories/:id/transactions`, //-- original
	// CATEGORY_TRANSACTIONS: `${API_URL}/category-transactions`,

	WALLET_GET_ONE: `${API_URL}/users/:userId/wallets/:walletId`, //	-- original
	WALLET_CREATE: `${API_URL}/users/:userId/wallets`,  		//-- original
	WALLET_UPDATE: `${API_URL}/users/:userId/wallets/:walletId`, //    -- original
	// WALLET_GET_ONE: `${API_URL}/wallets/:id`,
	// WALLET_CREATE: `${API_URL}/wallets`,
	// WALLET_UPDATE: `${API_URL}/wallets/:id`,
	WALLET_TRANSACTIONS: `${API_URL}/wallets/:id/transactions`, //-- original
	// WALLET_TRANSACTIONS: `${API_URL}/wallet-transactions`,
};
