import getXY from './get-xy';

export default function getZoomedXY(context, e){
	const c = getXY(e);
	return {x: c.x / context.zoom, y: c.y / context.zoom};
}
