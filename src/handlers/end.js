import {get} from 'lodash';

import getXY from '../utils/get-xy';
import createEvent from '../utils/event';

export default function handleEnd(e){
	this.panFlag = false;
	if(!this.dragFlag) return;
	const {x, y} = getXY(e);
	const object = this.getObject(x, y);
	const onDragEndHandler = get(object, 'node.handlers.onDragEnd');
	const selfDragEndHandler = get(this.dragObject, 'node.handlers.onDragEnd');
	if(typeof onDragEndHandler === 'function'){
		onDragEndHandler(createEvent(this, x, y, object, {dragged: this.dragObject}));
	} else
	if (typeof selfDragEndHandler === 'function'){
		selfDragEndHandler(createEvent(this, x, y, object, {dragged: this.dragObject}));
	}
	this.canvas.style.cursor = 'default';
	this.dragFlag = false;
	this.panFlag = false;
	this.dx = 0;
	this.dy = 0;
	this.dragObject = null;
}
