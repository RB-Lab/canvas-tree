import {get} from 'lodash';

import getXY from '../utils/get-xy';
import getCanvasXY from '../utils/get-canvas-xy';
import styleCursor from '../utils/style-cursor';
import checkHandler from './check-handler';

function getDragObject(object){
	if(!object) return false;
	if(typeof get(object, 'node.handlers.onDrag') === 'function') return object;
	return getDragObject(object.parent);
}

export default function handleStart(e){
	const {x, y} = getXY(e);
	const object = this.getObject(x, y);
	// first - call direct handler
	checkHandler(this, 'onDragStart')(object, x, y);
	// then deal with pan mode - if it is root node
	if(object.rootNode){
		this.canvas.style.cursor = 'move';
		this.panFlag = true;
		this.dragFlag = false;
		this.dx = x;
		this.dy = y;
		return;
	}
	// then - handle drag mode
	const dragObject = getDragObject(object);
	if(!dragObject) return;
	this.panFlag = false;
	this.dragFlag = true;
	styleCursor(this, dragObject);
	const top = get(dragObject, 'node.style.top', 0);
	const left = get(dragObject, 'node.style.left', 0);
	this.dragObject = dragObject;
	const canvasXY = getCanvasXY(this.matrix, x, y);
	this.dx = canvasXY.x - left;
	this.dy = canvasXY.y - top;
}
