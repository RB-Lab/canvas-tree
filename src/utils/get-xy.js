export default function getXY(e) {
	if(e.changedTouches){
		return {x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY};
	}
	return {x: e.offsetX, y: e.offsetY};
}
