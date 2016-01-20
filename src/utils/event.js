import {assign} from 'lodash';

export default function createEvent(x, y, object, otherStuff){
	if(typeof x !== 'number' || typeof y !== 'number') throw new Error('x and y should be numbers');
	if(typeof object !== 'object') throw new Error('3rd arg should be an object');
	return assign({}, otherStuff, {x, y, node: object.node});
}
