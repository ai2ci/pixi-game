import React, { useState } from 'react';
import { Container, useTick, Sprite } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import Moon from '../space_objects/moon/PhasingMoon';
import NightSky from '../space_objects/NightSky';
import { Size, TimeRange } from '../types';
import { isInRange, getDuration, sinusly, cosinusly } from '../utils';

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
	const [state, update] = useState({
		startTime: new Date().getTime(),
	});

	const alphaDurationPadding = (blurDuration - alphaDuration) / 2;
	const steps: { [key in number | string]: TimeRange } = {};

	steps.start = { from: 0, to: duration - blurDuration };
	steps.blurGrowing = { from: steps.start.to, to: duration - blurDuration / 2 };
	steps.blurFalling = { from: steps.blurGrowing.to, to: duration };
	steps.blending = {
		from: steps.blurGrowing.from + alphaDurationPadding,
		to: steps.blurFalling.to - alphaDurationPadding,
	};
	steps.end = { from: duration, to: Infinity };

	useTick(() => {
		const currentTimeDelta = new Date().getTime() - state.startTime;

		if (isInRange(currentTimeDelta, steps.start)) {
			blurFilter.blur = 1;
			moonAlphaFilter.alpha = 1;
			headAlphaFilter.alpha = 0;
		}
		if (isInRange(currentTimeDelta, steps.blurGrowing)) {
			const blurStep = maxBlur / getDuration(steps.blurGrowing);
			blurFilter.blur = blurStep * (currentTimeDelta - steps.blurGrowing.from);
		}
		if (isInRange(currentTimeDelta, steps.blurFalling)) {
			const blurStep = maxBlur / getDuration(steps.blurFalling);
			blurFilter.blur =
				maxBlur - blurStep * (currentTimeDelta - steps.blurFalling.from);
		}
		if (isInRange(currentTimeDelta, steps.blending)) {
			const timeDelta =
				(currentTimeDelta - steps.blending.from) / alphaDuration;

			moonAlphaFilter.alpha = maxAlpha * cosinusly(timeDelta);
			headAlphaFilter.alpha = maxAlpha * sinusly(timeDelta);
			console.log(moonAlphaFilter.alpha, headAlphaFilter.alpha);
		}
		if (isInRange(currentTimeDelta, steps.end)) {
			blurFilter.blur = 0;
		}
	});

	return (
		<React.Fragment>
			<Container
			// filters={[blurFilter, moonAlphaFilter]}
			>
				<React.Fragment>
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
				</React.Fragment>
			</Container>
			{/* <Sprite
				filters={[blurFilter, headAlphaFilter]}
				image="../assets/img/bald_head_reads.png"
				width={360}
				height={260}
				x={size.width / 2 - 130}
				y={size.height / 2 - 110}
			/> */}
			<Sprite
				// filters={[blurFilter, headAlphaFilter]}
				image="../assets/img/man_with_book.png"
				width={220}
				height={252}
				x={size.width / 2 - 130}
				y={size.height / 2 - 110}
			/>
		</React.Fragment>
	);
};

export default BaldMoon;
