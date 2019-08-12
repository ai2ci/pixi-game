import { Point, MovingStar, Size } from '../types';

export function getBookShapePoints(
	{ width, height }: Size,
	density: number,
	backPosition: Point,
): Point[] {
	const points: Point[] = [];
	for (let i = 0; i <= height; i += density) {
		points.push({ x: 0, y: i });
		points.push({ x: width, y: i });
		points.push({
			x: width + density / 2,
			y: i + density,
		});
	}
	for (let i = 0; i <= height - backPosition.y / 4; i += density * 2) {
		points.push({
			x: backPosition.x,
			y: i + backPosition.y,
		});
	}
	for (let i = 0; i <= width; i += density) {
		const y =
			i < backPosition.x
				? backPosition.y * (i / backPosition.x)
				: backPosition.y -
				  backPosition.y * ((i - backPosition.x) / (width - backPosition.x));
		points.push({ x: i, y });
		points.push({
			x: i,
			y: y + height - y / 4,
		});

		// if (i > backPosition.x) {
		points.push({
			x: i,
			y: y + height - y / 4 + density,
		});
		// }
	}
	return points;
}

export function isBetween(x: number, min: number, max: number): boolean {
	return x >= min && x <= max;
}

export function isSimilar(numA: number, numB: number, deviation: number) {
	return Math.round(numA / deviation) === Math.round(numB / deviation);
}

export function mapMovingStar(
	cornerPoint: Point,
	{ width, height }: Size,
	delay: number,
	points: Point[],
	starSize: number,
): MovingStar[] {
	return points.map((point) => {
		const widthMultiplier = Math.random() > 0.5 ? 4 : -3;
		const heightMultiplier = Math.random() > 0.5 ? 4 : -3;
		const startPosition: Point = {
			x: Math.round(width * widthMultiplier * Math.random()),
			y: Math.round(height * heightMultiplier * Math.random()),
		};
		return {
			color: 0xffffff,
			delay: delay, // / 4 + ((3 * delay) / 4) * Math.random(),
			radius: Math.ceil(starSize * Math.pow(Math.random(), 5)),
			finalPosition: {
				x: point.x + cornerPoint.x,
				y: point.y + cornerPoint.y,
			},
			startPosition,
			currentPosition: startPosition,
		};
	});
}

export function reduceStars(
	stars: MovingStar[],
	startTime: number,
	lastTime: number,
	currentTime: number,
): MovingStar[] {
	return stars.map((star) => {
		const elapsedTime = currentTime - startTime;
		if (elapsedTime > star.delay) {
			return star;
		}

		const { finalPosition, startPosition, currentPosition } = star;
		const newCurrentPosition = { ...currentPosition };

		const deviation = (currentTime - lastTime) / star.delay;
		const fullDeviation = elapsedTime / star.delay;

		const deltaX = Math.floor(finalPosition.x - startPosition.x);
		const deltaY = Math.floor(finalPosition.y - startPosition.y);

		if (!isSimilar(finalPosition.x, currentPosition.x, deltaX * deviation)) {
			newCurrentPosition.x = startPosition.x + deltaX * fullDeviation;
		}

		if (!isSimilar(finalPosition.y, currentPosition.y, deltaY * deviation)) {
			newCurrentPosition.y = startPosition.y + deltaY * fullDeviation;
		}

		return { ...star, currentPosition: newCurrentPosition };
	});
}

export function getCyrcleCoordinates(
	radius: number,
	steps: number,
	point: Point,
	leftPush: number,
	rightPush: number,
) {
	const { x, y } = point;
	const points: number[] = [];
	for (var i = 0; i < steps; i++) {
		let pointX;
		const pointY = y + radius * Math.sin((2 * Math.PI * i) / steps);

		if (Math.cos((2 * Math.PI * i) / steps) > 0) {
			pointX = x + rightPush * radius * Math.cos((2 * Math.PI * i) / steps);
		} else {
			pointX = x + leftPush * radius * Math.cos((2 * Math.PI * i) / steps);
		}

		points.push(pointX);
		points.push(pointY);
	}
	return points;
}
