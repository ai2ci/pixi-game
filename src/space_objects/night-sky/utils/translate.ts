import {
	Vector,
	AxisTime,
	Coordinates,
	Chart,
	Axis,
	EquationSystem,
} from '../../../types';

export default function translate<A extends Axis>(vector: Vector<A>): Chart<A> {
	const { start, end } = vector;

	const dimensions: A[] = Object.keys(vector.start) as A[];
	const [requiredDimension, ...calcDimensions] = dimensions;

	const distance: Coordinates<A | AxisTime> = dimensions.reduce(
		(distance: Partial<Coordinates<A>>, axis: A) => {
			distance[axis] = end[axis] - start[axis];
			return distance;
		},
		{},
	) as Coordinates<A | AxisTime>;

	const chart: EquationSystem<A | AxisTime> = calcDimensions.reduce(
		(chart: Partial<EquationSystem<A | AxisTime>>, axis: A) => {
			chart[axis] = ({ [requiredDimension]: requiredDimensionValue = 0 }) => {
				const calcValue =
					start[axis] +
					(distance[axis] / distance[requiredDimension]) *
						(requiredDimensionValue - start[requiredDimension]);
				return calcValue;
			};
			return chart;
		},
		{},
	) as EquationSystem<A | AxisTime>;

	return {
		chart: chart as EquationSystem<A>,
		domain: vector,
	};
}
