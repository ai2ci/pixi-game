export type Axis = string;
export type AxisTime = 'time';
export type Axis1D = 'x';
export type Axis2D = Axis1D | 'y';
export type Axis2DInTime = Axis2D | AxisTime;
export type Point = { [key in Axis]: number };
export type Coordinates<A extends Axis> = { [key in A]: number };
export type Size = { width: number; height: number };

export type Star<A extends Axis> = {
	color: number;
	radius: number;
	currentPosition?: Coordinates<A>;
};

export type MovingStar = {
	color: number;
	delay: number;
	radius: number;
	finalPosition: Point;
	startPosition: Point;
	currentPosition: Point;
};
export type TimeRange = {
	from: number;
	to: number;
};

export type Vector<A extends Axis> = {
	start: Coordinates<A>;
	end: Coordinates<A>;
};

export type Equation<A extends Axis> = (
	coordinates: { [key in A]?: number },
	domain: Vector<A>,
) => number | undefined;

export type EquationSystem<A extends Axis> = {
	[key in A]?: Equation<A> | number | undefined;
};
export type StepCallbackBaseArgs = { currentTimeDelta: number };
export type Chart<A extends Axis> = {
	domain: Vector<A>;
	chart: EquationSystem<A>;
};
export type StepKey = number | string;
export type StepsMap<T extends StepKey> = { [key in T]: TimeRange };
export type StepsCallback<T extends StepKey, P extends object> = {
	[key in T]: (args: P & StepCallbackBaseArgs) => void;
};
