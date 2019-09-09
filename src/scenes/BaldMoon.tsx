import React, { useMemo } from 'react';
import { Container, Sprite } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import Moon from '../space_objects/moon/PhasingMoon';
import NightSky from '../space_objects/NightSky';
import { Size } from '../types';
import { useTick } from '../utils';
import { getSteps, getStepCallbacks } from './BaldMoonTiming';
import executeSteps from '../utils';

type Props = {
	size: Size;
	duration: number;
	maxBlur: number;
	blurDuration: number;
	alphaDuration?: number;
	maxAlpha?: number;
};

const bookSize = { width: 200, height: 120 };
const blurFilter = new PIXI.filters.BlurFilter(1, 20, 1, 0);
const moonAlphaFilter = new PIXI.filters.AlphaFilter(1);
const headAlphaFilter = new PIXI.filters.AlphaFilter(0);

const BaldMoon = ({
	blurDuration,
	alphaDuration = blurDuration,
	duration,
	maxAlpha = 1,
	maxBlur,
	size,
}: Props) => {
	const startTime = useMemo(() => new Date().getTime(), []);
	const steps = useMemo(
		() => getSteps({ blurDuration, alphaDuration, duration }),
		[],
	);
	const stepCalbacks = useMemo(() => getStepCallbacks(), []);

	useTick(
		() => {
			executeSteps(steps, stepCalbacks, startTime, {
				alphaDuration,
				blurFilter,
				headAlphaFilter,
				maxAlpha,
				maxBlur,
				steps,
				moonAlphaFilter,
			});
		},
		true,
		10,
	);

	return (
		<React.Fragment>
			<Container filters={[blurFilter, moonAlphaFilter]}>
				<NightSky
					screenSize={size}
					delay={steps.start.to}
					bookSize={bookSize}
					backPoint={{ x: 105, y: 18 }}
					cornerPoint={{
						x: (size.width - bookSize.width / 2) / 2,
						y: (size.height - bookSize.height / 2) / 2,
					}}
				/>
				<Moon
					delay={steps.start.to - steps.start.to / 40}
					startPoint={{ x: size.width / 4, y: size.height / 4 }}
					endPoint={{ x: size.width / 2 - 20, y: size.height / 2 - 10 }}
					newMoonTimes={0}
					startPhase={0.2}
					endPhase={0.64}
					radius={160}
				/>
			</Container>
			<Sprite
				filters={[blurFilter, headAlphaFilter]}
				image="../assets/img/bald_head_reads.png"
				width={360}
				height={260}
				x={size.width / 2 - 130}
				y={size.height / 2 - 110}
			/>
		</React.Fragment>
	);
};

export default BaldMoon;
