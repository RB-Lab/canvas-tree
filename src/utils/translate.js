export default function translate(x, y) {
	this.matrix[4] += this.matrix[0] * x + this.matrix[2] * y;
	this.matrix[5] += this.matrix[1] * x + this.matrix[3] * y;
	this.ctx.translate(x, y);
	if(this.matrixListener_) this.matrixListener_(this.matrix);
}
