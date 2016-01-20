import {get} from 'lodash';
import getZoomedXY from '../utils/get-zoomed-xy';
import createEvent from '../utils/event';
import redraw from '../utils/redraw';

export default function handleMove(e){
	const c = getZoomedXY(this, e);
	const object = this.getObject(c.x, c.y);
	const cursor = get(object, 'node.style.cursor');
	this.canvas.style.cursor = cursor || 'default';
	if(this.hoveredObject !== object) {
		this.hoveredObject = object;
		redraw(this);
	}
	if(!this.dragFlag) return;
	const event = createEvent(c.x - this.dx, c.y - this.dy, this.dragObject.object);
	this.dragObject.handlers.onDrag(event);
}
