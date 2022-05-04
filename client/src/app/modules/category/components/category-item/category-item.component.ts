import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CategoryInterface } from '../../+state';

enum BarColors {
	NO_COLOR = '#ffffff',
	OK = '#8fe346',
	WARNING = '#ffa889',
	CLOSE_TO_LIMIT = '#ff8791',
}

@Component({
	selector: 'app-category-item',
	templateUrl: './category-item.component.html',
	styleUrls: ['./category-item.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryItemComponent {
	@Input() category!: CategoryInterface;
	@Input() categorySpending: number = 134;
	@Input() includeShowButton: boolean = false;

	constructor() {}

	public getBarColor(): BarColors {
		if (!this.category || !this.categorySpending) {
			return BarColors.NO_COLOR;
		}

		const percentage = (this.categorySpending / this.category.limit) * 100;

		if (percentage < 50) {
			return BarColors.OK;
		} else if (percentage < 80) {
			return BarColors.WARNING;
		} else {
			return BarColors.CLOSE_TO_LIMIT;
		}
	}
}
