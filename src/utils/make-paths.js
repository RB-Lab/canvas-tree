import {reduce} from 'lodash';

function drawNode(all, parent, node){
	const path = typeof node.geometry !== 'function' ? null : node.geometry(node.style);
	const node_ = {node, path, parent, rootNode: parent === null};
	return reduce(
		node.children,
		(all_, child) => drawNode(all_, node_, child),
		all.concat([node_])
	);
}

export default function makePaths(newTree){
	return drawNode([], null, newTree);
}
