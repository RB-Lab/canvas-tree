export default function scale(x, y) {
	this.matrix[0] *= x;
	this.matrix[1] *= x;
	this.matrix[2] *= y;
	this.matrix[3] *= y;
	this.ctx.scale(x, y);
	if(this.matrixListener_) this.matrixListener_(this.matrix);
}
