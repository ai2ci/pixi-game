import isUndefined from 'lodash/isUndefined';
import { Coordinates, Chart, Axis2D, Axis2DInTime } from '../../../types';
// @ts-ignore
import { checkIntersection } from 'line-intersect';

function hasColision(
	p1: Coordinates<Axis2D>,
	p2: Coordinates<Axis2D>,
	p3: Coordinates<Axis2D>,
	p4: Coordinates<Axis2D>,
): boolean {
	return (
		checkIntersection(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y).type ===
		'intersecting'
	);
}

function getColisionCount(
	coordinates: Coordinates<Axis2DInTime>,
	colisionShape: Coordinates<Axis2DInTime>[],
): number {
	return colisionShape.filter(
		(currentPoint: Coordinates<Axis2DInTime>, index: number) => {
			const nextPoint: Coordinates<Axis2DInTime> =
				colisionShape[index >= colisionShape.length ? 0 : index + 1];
			// TODO hope for this conrer is not inside colision shape
			return hasColision({ x: 0, y: 0 }, coordinates, currentPoint, nextPoint);
		},
	).length;
}

export default function getColisionPositionAxis2DInTime(
	coordinates: Coordinates<Axis2DInTime> | undefined,
	chart: Chart<Axis2DInTime>,
	colisionShape?: Coordinates<Axis2DInTime>[],
): Coordinates<Axis2DInTime> | undefined {
	if (isUndefined(colisionShape) || isUndefined(coordinates)) {
		return coordinates;
	}

	const colisionCount: number = getColisionCount(coordinates, colisionShape);

	if (colisionCount % 2 === 0) {
		return coordinates;
	}

	// TODO return intersecting point of chart and collision shape
}
