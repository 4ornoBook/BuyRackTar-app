import { UserDto } from './user.dto';

export interface UserEditDto extends UserDto {
	id: number | null;
}
