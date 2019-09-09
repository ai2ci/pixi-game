import React from 'react';
import ReactDOM from 'react-dom';
import { Stage, Container } from '@inlet/react-pixi';

import { PixelateFilter } from '@pixi/filter-pixelate';
import { AdjustmentFilter } from '@pixi/filter-adjustment';

import Opening from './scenes/Opening';

const pixelateFilter = new PixelateFilter(4);
const adjustmentFilter = new AdjustmentFilter({
	alpha: 1,
	brightness: 1,
	gamma: 1,
	contrast: 1,
	saturation: 1,
});
const size = { width: 800, height: 600 };

const App = () => {
	return (
		<Stage {...size} options={{ backgroundColor: 0x1d2230 }}>
			<Container filters={[pixelateFilter, adjustmentFilter]}>
				<Opening size={size} />
			</Container>
		</Stage>
	);
};

ReactDOM.render(<App />, document.getElementById('game'));
