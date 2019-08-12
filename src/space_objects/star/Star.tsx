import React from 'react';
import * as PIXI from 'pixi.js';
import { Sprite } from '@inlet/react-pixi';

type Props = {
	x: number;
	y: number;
	radius: number;
	color: number;
};

class Star extends React.Component<Props> {
	anchor: PIXI.ObservablePoint;
	constructor(props: Props) {
		super(props);
		this.anchor = new PIXI.ObservablePoint(() => {}, undefined, 0.5, 0.5);
	}

	render() {
		const { x, y, color, radius }: Props = this.props;

		return (
			<Sprite
				image="assets/img/star.png"
				x={x}
				y={y}
				width={radius}
				height={radius}
				anchor={this.anchor}
			/>
		);
	}
}

export default Star;
