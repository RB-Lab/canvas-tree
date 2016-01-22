import {assign} from 'lodash';
import getCanvasXY from './get-canvas-xy';

export default function createEvent(context, x, y, object, otherStuff){
	if(typeof x !== 'number' || typeof y !== 'number') throw new Error('x and y should be numbers');
	if(typeof context !== 'object') throw new Error('context is not specified');
	if(typeof object !== 'object') throw new Error('4th arg should be an object');
	return assign(
		{},
		otherStuff,
		getCanvasXY(context.matrix, x, y),
		{node: object.node}
	);
}
