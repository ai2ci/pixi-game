import isFunction from 'lodash/isFunction';
import isNumber from 'lodash/isNumber';
import isUndefined from 'lodash/isUndefined';
// import { comp, filter, map } from 'transducers-js';
import { AxisTime, Coordinates, Chart, Equation, Axis } from '../../../types';
import { isBetween } from '../../utils';

export default function getChartCurrentPosition<A extends Axis>(
	{ chart, domain }: Chart<A>,
	args: Partial<Coordinates<A>>,
): Coordinates<A> | undefined {
	const { start, end } = domain;
	const coordinates: Partial<Coordinates<A>> = { ...args };

	try {
		if (
			(Object.keys(args) as A[]).some(
				(key) => !isBetween(args[key], start[key], end[key]),
			)
		) {
			throw new Error();
		}

		const axisList = (Object.keys(chart) as A[]).filter((key) =>
			isUndefined(coordinates[key]),
		);
		const equations = axisList.filter((axis) => isFunction(chart[axis]));

		axisList
			.filter((axis) => isNumber(chart[axis]))
			.reduce((coordinates, axis) => {
				coordinates[axis] = chart[axis] as number;
				return coordinates;
			}, coordinates);

		// comp(filter((axis: A) => !coordinates[axis])), );
		equations.forEach(() => {
			equations
				.filter((axis) => !coordinates[axis])
				.reduce((coordinates: Partial<Coordinates<A>>, axis: A) => {
					const coordinate = (chart[axis] as Equation<A>)(coordinates, domain);

					if (coordinate) {
						if (isBetween(coordinate, start[axis], end[axis])) {
							coordinates[axis] = coordinate;
						} else {
							throw new Error();
						}
					}
					return coordinates;
				}, coordinates);
		});

		return coordinates as Coordinates<A | AxisTime>;
	} catch (exception) {
		return undefined;
	}
}
