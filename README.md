## canvas-tree: Render tree structures into HTML5-canvas

You should feed the `canvas-tree` with tree-structured object, consist of next fields:

```javascript
	{
		getometry: geometyFunction,
		style: styleObject,
		children: [/* child nodes */],
		handlers: {
			onClick: function(){}
		}
	}
```
where:
- **getometry:** is a function that returns a Path2D instance. There are some
	separate modules presenting geometries:
	- [canvas-rounded-rectangle](https://www.npmjs.com/package/canvas-rounded-rectangle)
	- [canvas-label](https://www.npmjs.com/package/canvas-label)
	- canvas-circle (coming soon)
	- canvas-s-line (coming soon)
	- etc. (coming not very soon)
- **style:** a css-like style object. The properties are: `fill`, `stroke`,
	`strokeWidth`, `cursor`, `hover` (sub-object of the same type) and some
	geometry-specific properties such as `radius` for circle
- **children:** array of child nodes of the same type
- **handlers:** object with event handlers. Currently next handlers are supported:
	- `onClick`
	- `onDoubleClick`
	- `onDragStart`
	- `onDrag`
	- `onDragEnd`

### API

 - **createCanvas(element)** - creates `canvasTree` object
	- `element` canvas DOMElement
 - **canvasTree.update(tree)** - render tree on canvas
 - **canvasTree.destroy()** - remove handlers from canvas

### Install

```bash
	$ npm install --save canvas-tree
```

#### Example usage

```javascript
	import createCanvas from 'canvas-tree';
	import circle from 'circle';

	const nodeStyle = {
		radius: 10,
		fill: '#f4f4f4',
		stroke: '#122292',
		strokeWidth: 2,
		cursor: 'pointer',
		hover: {
			stroke: '#ff2292',
			strokeWidth: 4
		}
	};

	const tree = { // root node is canvas itself
		children: [],
		handlers: { // these are handlers for canvas
			onClick: addNode
		}
	};

	const $canvas = document.getElementById('canvas');

	const canvas = createCanvas($canvas);

	function dragNode(e){
		const newNode = assign({}, e.node, {
			style: Object.assign({}, e.node.style, {top: e.y, left: e.x})
		});
		const newChildren = this.tree.children.slice();
		const i = newChildren.indexOf(newChildren.find(n => n.id === e.node.id));
		newChildren[i] = newNode;
		tree = Object.assign({}, this.tree, {
			children: newChildren
		});
		canvas.update(tree);
	}

	function addNode(e) {
		const id = tree.children.length === 0 ? 0 :
			tree.children[tree.children.length - 1].id + 1;
		const newNode = {
			id,
			getometry: circle,
			style: Object.assign({}, nodeStyle, {top: e.y, left: e.x}),
			handlers: {
				onDrag: dragNode
			}
		};
		tree = Object.assign({}, tree, {
			children: tree.children.concat([newNode])
		});
		canvas.update(tree);
	}
	canvas.update(tree);
```
