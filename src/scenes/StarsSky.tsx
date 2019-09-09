import React from 'react';
import NightSky from '../space_objects/night-sky/NightSky';
import { Axis2DInTime } from '../types';
import translate from '../space_objects/night-sky/utils/translate';

type Props = { length: number };

const StarSky = ({ length = 1000 }: Props) => {
	console.log(length);

	return (
		<NightSky
			movings={[
				{
					domain: {
						start: { x: 0, y: 0, time: 2000 },
						end: { x: 700, y: 400, time: 7000 },
					},
					chart: {
						x: ({ time = 0 }) => Math.pow((time - 2000) / 1000, 2) * 10,
						y: ({ time = 0, x = 0 }) => Math.pow((time / 70 + x / 3) / 10, 2),
					},
				},
				translate<Axis2DInTime>({
					start: { time: 2000, x: 400, y: 300 },
					end: { time: 5000, x: 100, y: 100 },
				}),
				translate<Axis2DInTime>({
					start: { time: 0, x: 0, y: 20 },
					end: { time: 5000, x: 1000, y: 1000 },
				}),
				translate<Axis2DInTime>({
					start: { time: 500, x: 0, y: 20 },
					end: { time: 3000, x: 400, y: 100 },
				}),
			]}
			stickyShape={[
				{ x: 200, y: 0 },
				{ x: 200, y: 400 },
				{ x: 400, y: 400 },
				{ x: 400, y: 0 },
			]}
		/>
	);
};

export default StarSky;
