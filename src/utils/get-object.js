import {findLast} from 'lodash';

export default function getObject(x, y){
	let object = findLast(
		this.pathObjects,
		pathObject => {
			if(pathObject.rootNode) return true;
			return this.ctx.isPointInPath(pathObject.path, x, y); // TODO add isPointInStroke
		}
	);
	return object ? object : this.canavsObject;
}
