import handleClick from './handlers/click';
import handleDblClick from './handlers/dbl-click';
import handleStart from './handlers/start';
import handleEnd from './handlers/end';
import handleMove from './handlers/move';
import handleZoom from './handlers/zoom';

import getObject from './utils/get-object';
import redraw from './utils/redraw';
import makePaths from './utils/make-paths';

function updateCanvas(newTree) {
	const pathObjects = newTree ? makePaths(newTree) : this.pathObjects;
	this.canvasObject = {handlers: newTree.handlers};
	this.pathObjects = pathObjects;
	redraw(this);
}

function destroyCanvas(){
	debugger;
}


export default function createCanvas(canvas_) {
	const canvas = {
		dragFlag: 0,
		dx: 0,
		dy: 0,
		zoom: 1,
		dragObject: null,
		hoveredObject: null,
		canvas: canvas_,
		ctx: canvas_.getContext('2d')
	};
	canvas.update = updateCanvas.bind(canvas);
	canvas.destroy = destroyCanvas.bind(canvas);
	canvas.getObject = getObject.bind(canvas);
	canvas_.addEventListener('click', handleClick.bind(canvas));
	canvas_.addEventListener('doubleclick', handleDblClick.bind(canvas));
	canvas_.addEventListener('mousedown', handleStart.bind(canvas));
	canvas_.addEventListener('mouseup', handleEnd.bind(canvas));
	canvas_.addEventListener('mousemove', handleMove.bind(canvas));
	canvas_.addEventListener('wheel', handleZoom.bind(canvas));
	return canvas;
}
