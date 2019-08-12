import React, { useState } from 'react';
import { Ticker } from 'pixi.js';
import { useTick } from '@inlet/react-pixi';
import Moon from './CoveringMoon';
import { Point } from '../../types';

type Props = {
	startPhase: number;
	endPhase: number;
	newMoonTimes: number;
	startPoint: Point;
	endPoint: Point;
	delay: number;
	radius?: number;
};

export function PhasingMoon({
	delay,
	endPhase,
	endPoint,
	newMoonTimes,
	radius,
	startPhase,
	startPoint,
}: Props) {
	const startTime = new Date().getTime();
	const [state, update] = useState({
		phase: startPhase,
		point: startPoint,
		radius,
		newMoonPassed: 0,
		startTime,
		lastTime: startTime,
	});

	const wholePhaseDuration =
		newMoonTimes + (endPhase > startPhase ? 0 : 1) + endPhase - startPhase;
	const phaseByTime = wholePhaseDuration / delay;
	const xByTime = (endPoint.x - startPoint.x) / delay;
	const yByTime = (endPoint.y - startPoint.y) / delay;

	useTick((delta = 0) => {
		const lastTime = new Date().getTime();
		const timeDelta = lastTime - state.startTime;

		if (timeDelta < delay) {
			update({
				...state,
				lastTime,
				phase: (startPhase + phaseByTime * timeDelta) % 1,
				point: {
					x: startPoint.x + xByTime * timeDelta,
					y: startPoint.y + yByTime * timeDelta,
				},
			});
		}
	});

	return <Moon {...state} anchor={0.5} />;
}

export default PhasingMoon;
