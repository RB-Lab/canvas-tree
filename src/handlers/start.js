import {get} from 'lodash';

import getXY from '../utils/get-xy';
import getCanvasXY from '../utils/get-canvas-xy';
import checkHandler from './check-handler';

export default function handleStart(e){
	const {x, y} = getXY(e);
	const object = this.getObject(x, y);
	const onDragHandler = get(object, 'node.handlers.onDrag');
	checkHandler(this, 'onDragStart')(object, x, y);
	if(typeof onDragHandler !== 'function' && !object.rootNode) return;
	const top = get(object, 'node.style.top', 0);
	const left = get(object, 'node.style.left', 0);
	this.panFlag = object.rootNode;
	this.dragFlag = !object.rootNode;
	this.dragObject = object;
	this.canvas.style.cursor = 'move';
	const canvasXY = getCanvasXY(this.matrix, x, y);
	this.dx = this.panFlag ? x : canvasXY.x - left;
	this.dy = this.panFlag ? y : canvasXY.y - top;
}
