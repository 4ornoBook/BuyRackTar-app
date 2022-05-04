import { Injectable, InjectionToken, Provider } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

export const ID_FROM_ROUTE = new InjectionToken<Observable<number>>(
	'A stream with current id param from route'
);

export const ID_FROM_ROUTE_PROVIDERS: Provider[] = [
	{
		provide: ID_FROM_ROUTE,
		deps: [ActivatedRoute],
		useFactory: idFromRouteFactory,
	},
];

export function idFromRouteFactory(route: ActivatedRoute): Observable<number> {
	return route.params.pipe(
		switchMap(params =>
			of(Number(convertToParamMap(params).get('id')) as unknown as number)
		)
	);
}

@Injectable()
export class RoutingHelperService {
	constructor() {}

	currentRoute(): void {}
}
