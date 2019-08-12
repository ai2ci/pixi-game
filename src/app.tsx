import React from 'react';
import ReactDOM from 'react-dom';
import { Stage, Container, Sprite } from '@inlet/react-pixi';

import { PixelateFilter } from '@pixi/filter-pixelate';
import { AdjustmentFilter } from '@pixi/filter-adjustment';

import BaldMoon from './scenes/BaldMoon';

const pixelateFilter = new PixelateFilter(4);
const adjustmentFilter = new AdjustmentFilter({
	alpha: 1,
	brightness: 1,
	gamma: 1,
	contrast: 1,
	saturation: 1,
});
const adjustmentFilter2 = new AdjustmentFilter({
	alpha: 0.5,
	brightness: 0.5,
	gamma: 2,
	contrast: 4,
	saturation: 0.5,
});
const size = { width: 800, height: 600 };

const App = () => (
	<Stage {...size} options={{ backgroundColor: 0x1d2230 }}>
		<Container filters={[pixelateFilter, adjustmentFilter]}>
			{/* <Sprite
				filters={[adjustmentFilter2]}
				{...size}
				image="assets/img/bg/beautiful-night-sky-8bit.png"
			/> */}
			<BaldMoon
				size={size}
				duration={3000}
				maxBlur={40}
				blurDuration={1100}
				maxAlpha={1.1}
				alphaDuration={700}
			/>
		</Container>
	</Stage>
);

ReactDOM.render(<App />, document.getElementById('game'));
