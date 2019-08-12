export type Point = { x: number; y: number };
export type Size = { width: number; height: number };
export type MovingStar = {
	color: number;
	delay: number;
	radius: number;
	finalPosition: Point;
	startPosition: Point;
	currentPosition: Point;
};
export type TimeRange = {
	from: number;
	to: number;
};
