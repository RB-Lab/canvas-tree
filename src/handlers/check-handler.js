import {get} from 'lodash';
import createEvent from '../utils/event';

export default function checkHandler(context, handlerName) {
	return function checkHandler_(object, x, y) {
		if(!object) return;
		const handler = get(object, `node.handlers.${handlerName}`);
		if(typeof handler === 'function'){
			handler(createEvent(context, x, y, object));
			return;
		}
		checkHandler_(object.parent, x, y);
	};
}
