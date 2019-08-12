import { TimeRange } from './types';

export function isInRange(time: number, range: TimeRange): boolean {
	return range.from <= time && time < range.to;
}

export function getDuration(range: TimeRange): number {
	return range.to - range.from;
}

// export function filterRanges<T>(time: number, ranges: { T: TimeRange }): T[] {
// 	return Object.keys(ranges).filter((key) => isInRange(time, ranges[key])).map((key)=> key as T);
// }

export function sinusly(val: number, presious: number = 2): number {
	const sin = Math.sin((val * Math.PI) / 2);
	const mutliplier = Math.pow(10, presious);

	return Math.round(sin * mutliplier) / mutliplier;
}

export function cosinusly(val: number, precious: number = 2): number {
	const sin = Math.cos((val * Math.PI) / 2);
	const mutliplier = Math.pow(10, precious);

	return Math.round(sin * mutliplier) / mutliplier;
}
