import {get} from 'lodash';

export default function styleCursor(context, object){
	let cursor = get(object, 'node.style.cursor');
	if(context.dragFlag) cursor = get(object, 'node.style.drag.cursor');
	if(context.panFlag) cursor = get(object, 'node.style.pan.cursor');
	context.canvas.style.cursor = cursor || 'default'; // eslint-disable-line no-param-reassign
}
