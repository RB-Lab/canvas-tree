export default function createEvent(x, y, node){
	if(!x || !y || !node) throw new Error('attempt to make invalid event');
	return {x, y, node};
}
