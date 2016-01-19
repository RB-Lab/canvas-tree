
import getObject from '../utils/get-object';
import getZoomedXY from '../utils/get-zoomed-xy';

export default context => e => {
	const c = getZoomedXY(context, e);
	const object = getObject(c.x, c.y);
	if(object && object.hoverable){
		context.canvas.style.cursor = 'pointer'; // eslint-disable-line
	} else {
		context.canvas.style.cursor = 'default'; // eslint-disable-line
	}
	if(!context.dragFlag) return context;
	context.dragObject.handlers.onDrag(context.dragObject.object, c.x - context.dx, c.y - context.dy);
	return context;
};
