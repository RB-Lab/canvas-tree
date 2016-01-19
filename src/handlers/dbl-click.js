import getXY from '../utils/get-xy';
import getObject from '../utils/get-object';

export default context => e => {
	let c = getXY(e);
	let object = getObject(context, c.x, c.y);
	if(object && object.handlers.onDoubleClick){
		object.handlers.onDoubleClick(object.object);
	}
	return context;
};
