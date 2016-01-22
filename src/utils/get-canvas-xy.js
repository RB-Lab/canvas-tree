export default function getCanvasXY(matrix, x, y) {
	return {
		x: x / matrix[0] + y * matrix[2] - matrix[4] / matrix[0],
		y: x * matrix[1] + y / matrix[3] - matrix[5] / matrix[3]
	};
}
