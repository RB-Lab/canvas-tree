import {get} from 'lodash';
import getXY from '../utils/get-xy';
import createEvent from '../utils/event';
import redraw from '../utils/redraw';

export default function handleMove(e){
	// 1. first - handle hover
	const {x, y} = getXY(e);
	const object = this.getObject(x, y);
	if(!this.dragFlag){
		const cursor = get(object, 'node.style.cursor');
		this.canvas.style.cursor = cursor || 'default';
	}
	if(this.hoveredObject !== object) {
		this.hoveredObject = object;
		redraw(this);
	}
	// then - handle drag and pan - if so
	if(!this.dragFlag && !this.panFlag) return;
	this.draggingFlag = true;
	if(this.panFlag){
		this.translate_((x - this.dx), (y - this.dy));
		this.dx += x - this.dx;
		this.dy += y - this.dy;
		redraw(this);
		return;
	}
	const onDragHandler = get(this.dragObject, 'node.handlers.onDrag');
	const mX = x - this.dx;
	const mY = y - this.dy;
	const event = createEvent(this, mX, mY, this.dragObject);
	onDragHandler(event);
}
