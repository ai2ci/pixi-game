import * as PIXI from 'pixi.js';
import { PixiComponent } from '@inlet/react-pixi';
import { Point } from '../../types';
import { getCyrcleCoordinates } from '../utils';

type Props = {
	point: Point;
	radius: number;
	blurSize?: number;
	leftPush: number;
	rightPush: number;
};

const Covering = PixiComponent('Covering', {
	create() {
		return new PIXI.Graphics();
	},
	applyProps(
		g: PIXI.Graphics,
		oldProps: Props,
		{ point, radius, blurSize = 0, leftPush, rightPush }: Props,
	) {
		g.clear();
		g.beginFill(0x141414, 0.92).drawPolygon(
			getCyrcleCoordinates(
				radius - blurSize * 2,
				24,
				point,
				leftPush,
				rightPush,
			),
		);
	},
});
export default Covering;
