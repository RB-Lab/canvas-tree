import getXY from '../utils/get-xy';
import redraw from '../utils/redraw';
import styleCursor from '../utils/style-cursor';
import checkHandler from './check-handler';


export default function handleMove(e){
	// 1. first - handle hover
	const {x, y} = getXY(e);
	const object = this.getObject(x, y);
	styleCursor(this, object);
	if(this.hoveredObject !== object) {
		this.hoveredObject = object;
		redraw(this);
	}
	// then - handle drag and pan - if so
	if(!this.dragFlag && !this.panFlag) return;
	this.draggingFlag = true;
	if(this.panFlag){
		this.translate_((x - this.dx) / this.matrix[0], (y - this.dy) / this.matrix[3]);
		this.dx += x - this.dx;
		this.dy += y - this.dy;
		redraw(this);
		return;
	}
	checkHandler(this, 'onDrag')(this.dragObject, x, y);
}
