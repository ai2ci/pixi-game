import React from 'react';
import { withPixiApp } from '@inlet/react-pixi';
import Star from './Star';

export type Point = { x: number; y: number };
type Props = {
	app: PIXI.Application;
	finalPosition: Point;
	startPosition: Point;
	radius: number;
	delay: number;
	color?: number;
};
type State = Point;

// const delayDelta = 30;

class MovingStar extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { ...props.startPosition };

		let counter = 0;
		props.app.ticker.add((delayDelta: number) => {
			const { delay }: Props = props;
			if (counter < delay) {
				const { finalPosition, startPosition } = this.props;
				const moveX =
					(finalPosition.x - startPosition.x) / (delay / delayDelta);
				const moveY =
					(finalPosition.y - startPosition.y) / (delay / delayDelta);

				this.setState({
					x: this.state.x + moveX,
					y: this.state.y + moveY,
				});

				counter += delayDelta;
			}
		});
	}
	render() {
		const { color = 0xffffff, radius }: Props = this.props;

		return <Star color={color} {...this.state} radius={radius} />;
	}
}

export default withPixiApp(MovingStar);
