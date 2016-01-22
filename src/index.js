import handleClick from './handlers/click';
import handleDblClick from './handlers/dbl-click';
import handleStart from './handlers/start';
import handleEnd from './handlers/end';
import handleMove from './handlers/move';
import handleZoom from './handlers/zoom';

import getObject from './utils/get-object';
import redraw from './utils/redraw';
import makePaths from './utils/make-paths';
import translate from './utils/translate';
import scale from './utils/scale';

function updateCanvas(newTree) {
	const pathObjects = newTree ? makePaths(newTree) : this.pathObjects;
	this.canvasObject = {handlers: newTree.handlers};
	this.pathObjects = pathObjects;
	redraw(this);
	this.redraw = redraw.bind(null, this);
}

function destroyCanvas(){
	debugger;
}


export default function createCanvas(canvasElement) {
	const canvas = {
		dragFlag: 0, // set on mouse downd, flag if move should drag
		draggingFlag: false, // set on mouse move, flag if click should be handled
		panFlag: false,
		dx: 0,
		dy: 0,
		matrix: [ // usual transormation matrix e.g.: https://goo.gl/SLKWk7
			1, // Horizontal scaling.
			0, // Horizontal skewing.
			0, // Vertical skewing.
			1, // Vertical scaling.
			0, // Horizontal moving.
			0  // Vertical moving.
		],
		dragObject: null,
		hoveredObject: null,
		canvas: canvasElement,
		ctx: canvasElement.getContext('2d')
	};

	window.c = canvas;
	canvas.update = updateCanvas.bind(canvas);
	canvas.destroy = destroyCanvas.bind(canvas);
	canvas.getObject = getObject.bind(canvas);
	canvas.translate_ = translate.bind(canvas);
	canvas.scale_ = scale.bind(canvas);
	canvas.translate_ = translate.bind(canvas);

	canvasElement.addEventListener('click', handleClick.bind(canvas));
	canvasElement.addEventListener('dblclick', handleDblClick.bind(canvas));
	canvasElement.addEventListener('mousedown', handleStart.bind(canvas));
	canvasElement.addEventListener('mouseup', handleEnd.bind(canvas));
	canvasElement.addEventListener('mousemove', handleMove.bind(canvas));
	canvasElement.addEventListener('wheel', handleZoom.bind(canvas));

	return canvas;
}
