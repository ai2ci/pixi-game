import React from 'react';
import { Sprite } from '@inlet/react-pixi';
import { AdjustmentFilter } from '@pixi/filter-adjustment';

import BaldMoon from './BaldMoon';
import { Size } from '../types';

const adjustmentFilter2 = new AdjustmentFilter({
	alpha: 0.5,
	brightness: 0.5,
	gamma: 2,
	contrast: 4,
	saturation: 0.5,
});

export default function Opening({ size }: { size: Size }) {
	return (
		<React.Fragment>
			<Sprite
				filters={[adjustmentFilter2]}
				{...size}
				image="assets/img/bg/beautiful-night-sky-8bit.png"
			/>
			<BaldMoon
				size={size}
				duration={10000}
				maxBlur={60}
				blurDuration={1100}
				maxAlpha={1.1}
				alphaDuration={700}
			/>
		</React.Fragment>
	);
}
