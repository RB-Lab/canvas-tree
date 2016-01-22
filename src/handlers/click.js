import getXY from '../utils/get-xy';
import createEvent from '../utils/event';
import styleCursor from '../utils/style-cursor';

export default function handleClick(e){
	if(this.draggingFlag){
		this.draggingFlag = false;
		return;
	}
	const c = getXY(e);
	const object = this.getObject(c.x, c.y);
	if(object && typeof object.node.handlers.onClick === 'function'){
		object.node.handlers.onClick(createEvent(this, c.x, c.y, object));
	}
	styleCursor(this, object);
}
