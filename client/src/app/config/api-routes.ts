import { environment } from '../../environments/environment';

export const API_URL = environment.API_DOMAIN;

export const API_URLS = {
	WALLET_CREATE: `${API_URL}/wallets`,

	USER_LOGIN: `${API_URL}/auth/login`,
	USER_REGISTER: `${API_URL}/auth/register`,
};
