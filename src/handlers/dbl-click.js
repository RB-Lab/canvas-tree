import {get} from 'lodash';
import getXY from '../utils/get-xy';
import createEvent from '../utils/event';

export default function handleDblClick(e){
	let c = getXY(e);
	let object = this.getObject(c.x, c.y);
	const dblclickHandler = get(object, 'node.handlers.onDoubleClick');
	if(dblclickHandler){
		dblclickHandler(createEvent(c.x, c.y, object));
	}
}
