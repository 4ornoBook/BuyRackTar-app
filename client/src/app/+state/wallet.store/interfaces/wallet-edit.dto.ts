import { WalletDto } from './wallet.dto';

export interface WalletEditDto extends WalletDto {
	id: number | null;
}
