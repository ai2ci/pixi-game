import { useEffect, useRef } from 'react';
import { Application } from 'pixi.js';
import { useApp } from '@inlet/react-pixi';
import { ThrottleSettings } from 'lodash';
import throttle from 'lodash/throttle';

import { TimeRange, StepsMap, StepKey, StepCallbackBaseArgs } from './types';

function isInRange(time: number, range: TimeRange): boolean {
	return range.from <= time && time < range.to;
}

export function getDuration(range: TimeRange): number {
	return range.to - range.from;
}

export function sinusly(val: number, presious = 2): number {
	const sin = Math.sin((val * Math.PI) / 2);
	const mutliplier = Math.pow(10, presious);

	return Math.round(sin * mutliplier) / mutliplier;
}

export function cosinusly(val: number, precious = 2): number {
	const sin = Math.cos((val * Math.PI) / 2);
	const mutliplier = Math.pow(10, precious);

	return Math.round(sin * mutliplier) / mutliplier;
}

type TickFunction = (delta?: number) => void;

export function useTick(
	callback: TickFunction,
	enabled = true,
	wait?: number,
	options?: ThrottleSettings,
) {
	const app = useApp();
	if (!(app instanceof Application)) {
		throw new Error(
			'No Context found with `PIXI.Application`. Make sure to wrap component with `AppProvider`',
		);
	}

	const savedRef = useRef(callback);

	useEffect(() => {
		savedRef.current = callback;
	}, [callback]);

	useEffect(() => {
		if (enabled) {
			const tick = throttle(
				(delta: number) => savedRef.current(delta),
				wait,
				options,
			);
			app.ticker.add(tick);

			return () => {
				app.ticker.remove(tick);
			};
		}
	}, [enabled]);
}

export function getTime() {
	return new Date().getTime();
}

export default function executeSteps<T extends StepKey, P, R>(
	stepsMap: StepsMap<T>,
	stepsCallbackObject: {
		[key in T]: (args: P & StepCallbackBaseArgs) => R;
	},
	startTime: number,
	args: P,
): R[] {
	const currentTimeDelta = new Date().getTime() - startTime;

	return (Object.keys(stepsMap) as T[]).reduce((returns: R[], key) => {
		if (isInRange(currentTimeDelta, stepsMap[key])) {
			returns.push(stepsCallbackObject[key]({ ...args, currentTimeDelta }));
		}
		return returns;
	}, []);
}
