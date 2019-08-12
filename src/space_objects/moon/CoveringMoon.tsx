import React from 'react';
import * as PIXI from 'pixi.js';
import { Sprite, withPixiApp } from '@inlet/react-pixi';
import { Point } from '../../types';

import Covering from './Covering';

type Props = {
	app: PIXI.Application;
	phase?: number;
	point: Point;
	radius?: number;
	anchor?: number | { x: number; y: number };
};

const anchorObject = new PIXI.ObservablePoint(() => {}, undefined, 0.5, 0.5);

function Moon({
	app,
	anchor = 0.5,
	phase = 0.4,
	point,
	radius = app.renderer.height / 2,
}: Props) {
	if (anchor && typeof anchor === 'object') {
		anchorObject.set(anchor.x, anchor.y);
	} else {
		anchorObject.set(anchor);
	}

	const phaseVal =
		(-Math.sin(phase * 4 * Math.PI) + phase * 4 * Math.PI) / (4 * Math.PI);

	// new    D     full     C     new
	//  0 .. 0.25 .. 0.5 .. 0.75 .. 1
	//l -1    0       1      1      1
	//r  1    1       1      0     -1
	const leftPush = phase >= 0.5 ? 1 : 4 * phaseVal - 1;
	const rightPush = phase <= 0.5 ? 1 : 4 * -phaseVal + 3;

	return (
		<React.Fragment>
			<Sprite
				key={0}
				image="assets/img/moon-8bit.png"
				x={point.x}
				y={point.y}
				width={radius}
				height={radius}
				anchor={anchorObject}
			/>
			<Covering
				key={1}
				point={point}
				radius={radius / 2}
				leftPush={leftPush}
				rightPush={rightPush}
			/>
		</React.Fragment>
	);
}

export default withPixiApp(Moon);
