import {assign} from 'lodash';

import getXY from '../utils/get-xy';

import getObject from '../utils/get-object';
import getZoomedXY from '../utils/get-zoomed-xy';

export default context => e => {
	const c = getZoomedXY(context, e);
	const actualC = getXY(e);
	const object = getObject(actualC.x, actualC.y);
	if(object && object.handlers.onDragStart){
		object.handlers.onDragStart(object.object, c.x, c.y);
	}
	if(!object || !object.handlers.onDrag) return context;
	const newContext = assign({}, context, {
		dragFlag: true,
		dragObject: object
	});
	if(!object.draggable) return newContext;
	context.canvas.style.cursor = 'move'; // eslint-disable-line
	return assign(newContext, {
		dx: c.x - object.object.coordinates.x,
		dy: c.y - object.object.coordinates.y
	});
};
