import React, { useState } from 'react';
import { Sprite, withPixiApp, useTick } from '@inlet/react-pixi';

// Use the custom renderer to render a valid PIXI object into a PIXI container.
export default withPixiApp(function Background({ app }) {
	const [motion, update] = useState({
		height: app.renderer.height,
		width: app.renderer.width,
	});

	useTick(() => {
		update({
			height: motion.height * 1.0001,
			width: motion.width * 1.0001,
		});
	});

	return (
		<Sprite
			image="assets/img/bg/beautiful-night-sky-8bit.png"
			x={app.renderer.width / 2}
			y={app.renderer.height / 2}
			{...motion}
			anchor={0.5}
		/>
	);
});
