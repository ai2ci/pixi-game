import React from 'react';
import StarSprite from '../star/Star';
import { Star, Axis2D } from '../../types';

type Props = {
	stars: Star<Axis2D>[];
};

function Stars({ stars }: Props) {
	return (
		<React.Fragment>
			{stars.map(
				(star, index) =>
					star.currentPosition && (
						<StarSprite
							key={index}
							radius={star.radius}
							x={star.currentPosition.x}
							y={star.currentPosition.y}
							color={star.color}
						/>
					),
			)}
		</React.Fragment>
	);
}

export default Stars;
