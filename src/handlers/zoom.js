import {assign} from 'lodash';

const ZOOM_FACTOR = 1.1;

export default e => {
	if(e.deltaY > 0) {
		this.ctx.scale(1 / ZOOM_FACTOR, 1 / ZOOM_FACTOR);
		const newContext = assign({}, this, {zoom: this.zoom / ZOOM_FACTOR});
		this.update(newContext);
		return newContext;
	}
	this.ctx.scale(1 * ZOOM_FACTOR, 1 * ZOOM_FACTOR);
	const newContext = assign({}, this, {zoom: this.zoom * ZOOM_FACTOR});
	this.update(newContext);
	return newContext;
};
