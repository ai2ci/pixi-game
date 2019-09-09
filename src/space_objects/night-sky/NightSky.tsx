import React, { useState, useMemo } from 'react';
import Stars from './Stars';
import { useTick, getTime } from '../../utils';
import { Star, Axis2DInTime, Chart, Coordinates, Axis2D } from '../../types';
import getChartCurrentPosition from './utils/getChartCurrentPosition';
import getColisionPosition from './utils/getColisionPosition';

type Props<T extends Chart<Axis2DInTime>[]> = {
	movings: T;
	stickyShape?: Coordinates<Axis2D>[];
};

function NightSky<T extends Chart<Axis2DInTime>[]>({
	movings,
	stickyShape,
}: Props<T>) {
	const startTime = useMemo(getTime, []);
	const [stars, updateStars] = useState(
		movings.map(
			(item: Chart<Axis2DInTime>): Star<Axis2DInTime> => ({
				color: 0xffffff,
				radius: 14,
				currentPosition: getChartCurrentPosition(item, { time: 0 }),
			}),
		),
	);

	useTick(
		() => {
			const time = getTime() - startTime;

			updateStars(
				stars.map((star: Star<Axis2DInTime>, index: number) => {
					const currentPosition = getColisionPosition(
						getChartCurrentPosition(movings[index], {
							time,
						}),
						movings[index],
						stickyShape,
					);

					return {
						...star,
						currentPosition,
					};
				}),
			);
		},
		true,
		100,
	);

	return <Stars stars={stars} />;
}

export default NightSky;
