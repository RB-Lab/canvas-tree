import getXY from '../utils/get-xy';
import checkHandler from './check-handler';

export default function handleEnd(e){
	this.panFlag = false;
	if(!this.dragFlag) return;
	const {x, y} = getXY(e);
	const object = this.getObject(x, y);
	checkHandler(this, 'onDragEnd')(object, x, y);
	checkHandler(this, 'onDragEnd')(this.dragObject, x, y);
	this.canvas.style.cursor = 'default';
	this.dragFlag = false;
	this.panFlag = false;
	this.dx = 0;
	this.dy = 0;
	this.dragObject = null;
}
