import React from 'react';
import * as PIXI from 'pixi.js';
import { Sprite, withPixiApp } from '@inlet/react-pixi';

type Props = {
	phase: number;
	x: number;
	y: number;
	width: number;
	height: number;
	anchor?: number | { x: number; y: number };
};
type State = {
	textures?: { [key in string]: PIXI.Texture };
};

class Moon extends React.Component<Props, State> {
	anchor: PIXI.ObservablePoint;
	constructor(props: Props) {
		super(props);
		this.state = {};
		this.anchor = new PIXI.ObservablePoint(() => {}, undefined, 0.5, 0.5);
	}
	componentDidMount() {
		const loader = new PIXI.Loader();
		loader
			.add('phases', 'assets/img/moon-phases.json')
			.load(
				(
					loader: PIXI.Loader,
					resource: { [key in string]: PIXI.LoaderResource },
				) => {
					this.setState({ textures: resource.phases.textures });
				},
			);
	}

	render() {
		const { anchor, phase = 0, x, y, width, height }: Props = this.props;
		const { textures }: State = this.state;

		if (anchor && typeof anchor === 'object') {
			this.anchor.set(anchor.x, anchor.y);
		} else {
			this.anchor.set(anchor);
		}

		if (textures) {
			const phasefull = Math.floor(25 * (phase % 1));
			const name = `moonSequence${phasefull < 10 ? '0' : ''}${phasefull}.png`;
			return (
				<Sprite
					texture={textures[name]}
					x={x}
					y={y}
					width={width}
					height={height}
					anchor={this.anchor}
				/>
			);
		}
		return null;
	}
}

export default Moon;
