import getXY from '../utils/get-xy';
import styleCursor from '../utils/style-cursor';
import checkHandler from './check-handler';


export default function handleClick(e){
	if(this.draggingFlag){
		this.draggingFlag = false;
		return;
	}
	const c = getXY(e);
	const object = this.getObject_(c.x, c.y);
	checkHandler(this, 'onClick')(object, c.x, c.y);
	styleCursor(this, object);
}
