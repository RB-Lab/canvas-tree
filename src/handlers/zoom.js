import redraw from '../utils/redraw';
import getXY from '../utils/get-xy';
import getCanvasXY from '../utils/get-canvas-xy';

const ZOOM_IN_FACTOR = 1.1;
const ZOOM_OUT_FACTOR = 2 - ZOOM_IN_FACTOR;

export default function handleZoom(e){
	const c = getXY(e);
	const {x, y} = getCanvasXY(this.matrix, c.x, c.y);
	const factor = e.deltaY > 0 ? ZOOM_OUT_FACTOR : ZOOM_IN_FACTOR;
	this.translate_(x, y); // see http://stackoverflow.com/a/5526721
	this.scale_(factor, factor);
	this.translate_(-x, -y);
	redraw(this);
}
