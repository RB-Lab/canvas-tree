import {reduce} from 'lodash';

function drawNode(all, parent, node){
	const path = typeof node.geometry !== 'function' ? null : node.geometry(node.style);
	return reduce(
		node.children,
		(all_, node_) => drawNode(all_, node, node_),
		all.concat([{node, path, parent, rootNode: parent === null}])
	);
}

export default function makePaths(newTree){
	return drawNode([], null, newTree);
}
