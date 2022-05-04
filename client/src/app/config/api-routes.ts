import { environment } from '../../environments/environment';

export const API_URL = environment.API_DOMAIN;

export const API_URLS = {
	WALLET_CREATE: `${API_URL}/wallets`,

	ACCOUNT_REFRESH_TOKEN: `${API_URL}/auth/refresh`,
	ACCOUNT_LOGIN: `${API_URL}/auth/login`,
	ACCOUNT_REGISTER: `${API_URL}/auth/register`,
	ACCOUNT_USERS: `${API_URL}/accounts/:id`,
	ACCOUNT_CATEGORIES: `${API_URL}/accounts/categories`,

	CURRENCIES_GET: `${API_URL}/currencies`,
};
