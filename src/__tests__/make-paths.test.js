import makePaths from '../utils/make-paths';

const g1 = sinon.stub();
g1.returns('kinda path');
const tree = {
	handlers: {
		onFoo: 'bar'
	},
	children: [
		{
			geometry: g1,
			handlers: {
				onBar: 'foo'
			},
			children: [
				{
					geometry: function g3(){},
					handlers: {
						onBar: 'foo'
					}
				}
			]
		},
		{
			geometry: function g2(){},
			handlers: {
				onBar: 'foo'
			}
		}
	]
};

describe('makePaths', () => {
	it('should make flat array of objects with pathes', () => {
		const pathObjects = makePaths(tree);
		expect(pathObjects).to.be.an('array');
		expect(pathObjects.length).to.equal(4); // first one is canvas
	});
});
