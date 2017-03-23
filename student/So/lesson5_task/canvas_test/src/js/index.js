import can from 'canvas_utils'
let context=document.getElementById('canvas').getContext('2d')
	context.moveTo(1,1)
	context.dashedLineTo(100,100)
	context.dashedLineTo(1,100)
	context.stroke()

	alert(2)

	console.log(can)