import {get} from 'lodash';

import getXY from '../utils/get-xy';

import getZoomedXY from '../utils/get-zoomed-xy';
import createEvent from '../utils/event';

export default function handleStart(e){
	const c = getZoomedXY(this, e);
	const actualC = getXY(e);
	const object = this.getObject(actualC.x, actualC.y);
	if(!object) return;
	const onDragStartHandler = get(object, 'node.handlers.onDragStart');
	const onDragHandler = get(object, 'node.handlers.onDrag');
	if(typeof onDragStartHandler === 'function') {
		onDragStartHandler(createEvent(c.x, c.y, object));
	}

	if(typeof onDragHandler !== 'function') return;
	const top = get(object, 'node.style.top', 0);
	const left = get(object, 'node.style.left', 0);
	this.dragFlag = true;
	this.dragObject = object;
	this.canvas.style.cursor = 'move';
	this.dx = c.x - left;
	this.dy = c.y - top;
}
