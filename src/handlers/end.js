import {assign} from 'lodash';

import getXY from '../utils/get-xy';
import getObject from '../utils/get-object';

export default context => e => {
	if(!context.dragFlag) return context;
	let c = getXY(e);
	let object = getObject(c.x, c.y);
	if(object && object.handlers.onDragEnd){
		object.handlers.onDragEnd(
			c.x - context.dx,
			c.y - context.dy,
			context.dragObject.object,
			object.object
		);
	} else
	if (context.dragObject.handlers.onDragEnd){
		context.dragObject.handlers.onDragEnd(
			c.x - context.dx,
			c.y - context.dy,
			context.dragObject.object,
			null
		);
	}
	context.canvas.style.cursor = 'default'; // eslint-disable-line 
	return assign({}, context, {
		dragFlag: false,
		dx: 0,
		dy: 0,
		dragObject: null
	});
};
