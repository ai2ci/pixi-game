import React, { useState } from 'react';
// import { useTick } from '@inlet/react-pixi';
// import { Ticker } from 'pixi.js';
import Star from './star/Star';
import { getBookShapePoints, mapMovingStar, reduceStars } from './utils';
import { useTick } from '../utils';
import { Size, Point } from '../types';

type Props = {
	bookSize: Size;
	screenSize: Size;
	density?: number;
	delay?: number;
	starSize?: number;
	backPoint: Point;
	cornerPoint: Point;
};

function NightSky({
	delay = 28000,
	starSize = 12,
	density = 5,
	screenSize,
	bookSize,
	backPoint,
	cornerPoint,
}: Props) {
	let startTime = new Date().getTime();
	const [state, update] = useState({
		stars: mapMovingStar(
			cornerPoint,
			screenSize,
			delay,
			getBookShapePoints(bookSize, density, backPoint),
			starSize,
		),
		startTime: startTime,
		lastTime: startTime,
	});

	useTick(
		() => {
			const currentTime = new Date().getTime();
			if (delay > currentTime - state.startTime)
				update({
					...state,
					stars: reduceStars(
						state.stars,
						state.startTime,
						state.lastTime,
						currentTime,
					),
					lastTime: currentTime,
				});
		},
		true,
		100,
	);

	return (
		<React.Fragment>
			{state.stars.map((star, index) => (
				<Star
					key={index}
					radius={star.radius}
					x={star.currentPosition.x}
					y={star.currentPosition.y}
					color={star.color}
				/>
			))}
		</React.Fragment>
	);
}

export default NightSky;
