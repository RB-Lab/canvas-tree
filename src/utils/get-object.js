import {findLast, get} from 'lodash';

export default function getObject(x, y){
	return findLast(
		this.pathObjects,
		pathObject => {
			if(pathObject.rootNode) return true;
			const fill = get(pathObject, 'node.style.fill');
			const stroke = get(pathObject, 'node.style.stroke');
			if(fill || !stroke) return this.ctx.isPointInPath(pathObject.path, x, y);
			this.ctx.lineWidth = 6;
			return this.ctx.isPointInStroke(pathObject.path, x, y);
		}
	);
}
