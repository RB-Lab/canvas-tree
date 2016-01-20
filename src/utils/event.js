export default function createEvent(x, y, object){
	if(!x || !y || !object) throw new Error('attempt to make invalid event');
	return {x, y, node: object.node};
}
