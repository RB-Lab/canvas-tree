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


export default function createCanvas(canvasElement) {
	const canvas = {
		dragFlag: 0, // set on mouse downd, flag if move should drag
		draggingFlag: false, // set on mouse move, flag if click should be handled...
			// ...(when there were no mouseMove betweeen mouseDown and mouseUp)
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
		ctx: canvasElement.getContext('2d'),
		matrixListener_: null
	};

	// API methdos
	canvas.update = updateCanvas.bind(canvas);
	canvas.setMatrixListener = listener => {
		if(typeof listener === 'function') canvas.matrixListener_ = listener;
	};
	canvas.setMatrix = matirx => {
		canvas.matrix = matirx;
		canvas.ctx.setTransform.apply(canvas.ctx, matirx);
		if(this.matrixListener_) this.matrixListener_(this.matrix);
	};

	canvas.getObject_ = getObject.bind(canvas);
	canvas.translate_ = translate.bind(canvas);
	canvas.scale_ = scale.bind(canvas);

	canvas.handleClick_ = handleClick.bind(canvas);
	canvas.handleDblClick_ = handleDblClick.bind(canvas);
	canvas.handleStart_ = handleStart.bind(canvas);
	canvas.handleEnd_ = handleEnd.bind(canvas);
	canvas.handleMove_ = handleMove.bind(canvas);
	canvas.handleZoom_ = handleZoom.bind(canvas);

	canvasElement.addEventListener('click', canvas.handleClick_);
	canvasElement.addEventListener('dblclick', canvas.handleDblClick_);
	canvasElement.addEventListener('mousedown', canvas.handleStart_);
	canvasElement.addEventListener('mouseup', canvas.handleEnd_);
	canvasElement.addEventListener('mousemove', canvas.handleMove_);
	canvasElement.addEventListener('wheel', canvas.handleZoom_);

	return canvas;
}
