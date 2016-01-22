import {get} from 'lodash';

export default function styleCursor(context, object){
	if(!context.dragFlag && !context.panFlag){
		const cursor = get(object, 'node.style.cursor');
		context.canvas.style.cursor = cursor || 'default'; // eslint-disable-line no-param-reassign
	}
}
