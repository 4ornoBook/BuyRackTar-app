import { CategoryDto } from './category.dto';

export interface CategoryEditDto extends CategoryDto {
	id: number | null;
}
