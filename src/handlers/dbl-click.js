import getXY from '../utils/get-xy';
import checkHandler from './check-handler';

export default function handleDblClick(e){
	const {x, y} = getXY(e);
	checkHandler(this, 'onDoubleClick')(this.getObject(x, y), x, y);
}
