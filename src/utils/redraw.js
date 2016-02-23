import {forEach, assign, get} from 'lodash';
import applyStyles from './apply-styles';
import clear from './clear';

function getStyle(context, object) {
	const style = get(object, 'node.style');
	const hoverStyle = get(object, 'node.style.hover');
	// fixme but you'll never have dragging object that way, because dragging cause rebuild whole tree
	if(context.hoveredObject === object) return assign({}, style, hoverStyle);
	return style;
}
function redraw_(context) {
	clear(context);
	forEach(context.pathObjects, (obj) => {
		if(!obj.node.style || !obj.path) return;
		applyStyles(context.ctx, getStyle(context, obj), obj.path);
	});
}
export default function draw(context) {
	window.requestAnimationFrame(() => redraw_(context));
}
