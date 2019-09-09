import { StepsMap, StepsCallback } from '../types';
import { getDuration, sinusly, cosinusly } from '../utils';

export type BaldMoonTimingArgs = {
	blurFilter: PIXI.filters.BlurFilter;
	moonAlphaFilter: PIXI.filters.AlphaFilter;
	headAlphaFilter: PIXI.filters.AlphaFilter;
	maxBlur: number;
	alphaDuration: number;
	maxAlpha: number;
	steps: StepsMap<BaldMoonSteps>;
};

export type BaldMoonSteps =
	| 'start'
	| 'blurGrowing'
	| 'blurFalling'
	| 'blending'
	| 'end';

export function getSteps({
	blurDuration,
	alphaDuration,
	duration,
}: {
	blurDuration: number;
	alphaDuration: number;
	duration: number;
}): StepsMap<BaldMoonSteps> {
	const alphaDurationPadding = (blurDuration - alphaDuration) / 2;

	const start = { from: 0, to: duration - blurDuration };
	const blurGrowing = { from: start.to, to: duration - blurDuration / 2 };
	const blurFalling = { from: blurGrowing.to, to: duration };
	const blending = {
		from: blurGrowing.from + alphaDurationPadding,
		to: blurFalling.to - alphaDurationPadding,
	};
	const end = { from: duration, to: Infinity };

	return {
		start,
		blurGrowing,
		blurFalling,
		blending,
		end,
	};
}

export function getStepCallbacks(): StepsCallback<
	BaldMoonSteps,
	BaldMoonTimingArgs
> {
	return {
		start({ blurFilter, moonAlphaFilter, headAlphaFilter }) {
			blurFilter.blur = 1;
			moonAlphaFilter.alpha = 1;
			headAlphaFilter.alpha = 0;
		},
		blurGrowing({ blurFilter, maxBlur, currentTimeDelta, steps }) {
			const blurStep = maxBlur / getDuration(steps.blurGrowing);
			blurFilter.blur = blurStep * (currentTimeDelta - steps.blurGrowing.from);
		},
		blurFalling({ blurFilter, maxBlur, currentTimeDelta, steps }) {
			const blurStep = maxBlur / getDuration(steps.blurFalling);
			blurFilter.blur =
				maxBlur - blurStep * (currentTimeDelta - steps.blurFalling.from);
		},
		blending({
			moonAlphaFilter,
			headAlphaFilter,
			currentTimeDelta,
			steps,
			alphaDuration,
			maxAlpha,
		}) {
			const timeDelta =
				(currentTimeDelta - steps.blending.from) / alphaDuration;

			moonAlphaFilter.alpha = maxAlpha * cosinusly(timeDelta);
			headAlphaFilter.alpha = maxAlpha * sinusly(timeDelta);
		},
		end({ blurFilter }) {
			blurFilter.blur = 0;
		},
	};
}
