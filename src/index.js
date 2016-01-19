import {forEach} from 'lodash';

import handleClick from './handlers/click';
import handleDblClick from './handlers/dbl-click';
import handleStart from './handlers/start';
import handleEnd from './handlers/end';
import handleMove from './handlers/move';
import handleZoom from './handlers/zoom';

import getObject from './utils/get-object';
import clear from './utils/clear';
import makePaths from './utils/make-paths';
import canvasStyles from 'canvas-styles';

function updateCanvas(newTree) {
	const pathObjects = newTree ? makePaths(newTree) : this.pathObjects;
	clear(this);
	forEach(pathObjects, ({path, node}) => {
		if(!node.style || !path) return;
		canvasStyles.applyStyles(this.ctx, node.style);
		this.ctx.stroke(path);
		this.ctx.fill(path);
	});
	this.canvasObject = {handlers: newTree.handlers};
	this.pathObjects = pathObjects;
}

function destroyCanvas(){
	debugger;
}


export default function createCanvas(canvas_) {
	const canvas = {
		dragFlag: 0,
		dx: 0,
		dy: 0,
		zoom: 0,
		dragObject: null,
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
