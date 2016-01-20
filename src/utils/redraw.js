import {forEach, assign, get} from 'lodash';
import canvasStyles from 'canvas-styles';
import clear from './clear';

function getStyle(context, object) {
	const style = get(object, 'node.style');
	const hoverStyle = get(object, 'node.style.hover');
	if(context.hoveredObject === object) return assign({}, style, hoverStyle);
	return style;
}
function redraw_(context) {
	clear(context);
	forEach(context.pathObjects, (obj) => {
		if(!obj.node.style || !obj.path) return;
		canvasStyles.applyStyles(context.ctx, getStyle(context, obj));
		context.ctx.stroke(obj.path);
		context.ctx.fill(obj.path);
	});
}
export default function draw(context) {
	window.requestAnimationFrame(() => redraw_(context));
}
