/**
 * @function applyStyle - apply css-like styles that will be allied to all figures
 *           drawn on ctx after this application
 * @param {CanvasRenderingContext2D} ctx - canvas 2D context
 * @param {Object} style - CSSStyleDeclaration-alike object with styles
 * @param {String} style.fill - fill color e.g. "#f2f2f2"
 * @param {String} style.stroke - stroke color e.g. "#f2f2f2"
 * @param {Number} style.strokeWidth - stroke width in pixels
 * @param {String} style.strokeStyle - may be 'dashed' or 'dotted'
 */

/* eslint-disable no-param-reassign */
export default function applyStyles(ctx,
	{
		fill,
		color,
		fontSize = 16,
		fontFamily = 'sans-serif',
		textAlign = 'left',
		stroke,
		strokeWidth,
		strokeStyle
	}
){
	if(fill || color){
		ctx.fillStyle = fill || color;
	}

	ctx.font = `${fontSize}px ${fontFamily}`;
	ctx.textAlign = textAlign;

	if(stroke){
		ctx.strokeStyle = stroke;
	}

	if(strokeWidth){
		ctx.lineWidth = strokeWidth;
		if(strokeStyle === 'dashed'){
			ctx.setLineDash([strokeWidth * 5, strokeWidth * 2]);
		} else
		if(strokeStyle === 'dotted'){
			ctx.setLineDash([strokeWidth]);
		} else {
			ctx.setLineDash([]);
		}
	}
}
/* eslint-enable no-param-reassign */
