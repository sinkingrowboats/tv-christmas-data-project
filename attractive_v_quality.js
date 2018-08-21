var LOG_SEVERE = 1;
var LOG_ERROR = 2;
var LOG_WARNING = 3;
var LOG_INFO = 4;
var LOG_DEBUG = 5;
var LOG_ENTRY = 6;
var LOG_EXIT = 7;
var LOG_TRACE = 8; 

var LOG_LEVEL = LOG_WARNING;

function debug(level, string) {
	if(level <= LOG_LEVEL) {
		var prefix = '';
		var postfix = '';
		switch(level) {
			case LOG_SEVERE:
				prefix = 'LOG_SEVERE: !!!! ';
				postfix = '! !!!!';
				break;
			case LOG_ERROR:
				prefix = 'LOG_ERROR: !!!! ';
				postfix = '! !!!!';
				break;
			case LOG_WARNING:
				prefix = 'LOG_WARNING: ';
				postfix = '!';
				break;
			case LOG_INFO:
				prefix = 'LOG_INFO: ';
				break;
			case LOG_DEBUG:
				prefix = 'LOG_EXIT: ';
				break;
			case LOG_ENTRY:
				prefix = 'LOG_ENTRY: ';
				break;
			case LOG_EXIT:
				prefix = 'LOG_EXIT: ';
				break;
			case LOG_TRACE:
				prefix = 'LOG_EXIT: ';
				break;

		}
		console.log(prefix + string + postfix);

	}
}


var dataset = [];


var graphWidth = 900,
	graphHeight = 500;


var xScale = d3.scaleLinear()
					.domain([-10,10])
					.range([0, graphWidth]);

var yScale = d3.scaleLinear()
					.domain([-10,10])
					.range([graphHeight, 0]);



var xAxisT = d3.axisBottom(xScale)
				.ticks(20, '.1f')
				.tickValues([1, 2, -5, 3.5])
				.tickSizeInner([3])
				.tickSizeOuter([95])
				.tickPadding([55]);


var xAxis = d3.axisBottom(xScale)
				.ticks(20, '.1f')
				.tickPadding([8]);


var yAxis = d3.axisRight(yScale)
				.ticks(20, '.1f')
				.tickPadding([8]);


var svg = d3.select('#graph').append('svg')
			.attr('width', graphWidth)
   			.attr('height', graphHeight)
    		.style('padding', '50px');


var defs = svg.append('defs');


var tooltip = d3.select('#content-container'). append('div')
				.attr('id', 'tooltip');



d3.selection.prototype.moveToFront = function() {  
      return this.each(function(){
        this.parentNode.appendChild(this);
      });
 };



$('#xbox').click( function() {
	debug(LOG_ENTRY, 'entering onclick function for exit button overlay div');

	$('#fade-div').hide();

	$('#animate2')[0].beginElement();	

	debug(LOG_EXIT, 'exiting onclick function for exit button overlay div');
})



function drawGraph() {
	// Add xAxis to graph
	svg.append('g')
		.attr('class', 'xAxis')
		.attr('transform', 'translate(0,' + graphHeight/2.0 + ')').call(xAxis);


	// Add yAxis to graph
	svg.append('g')
		.attr('class', 'yAxis')
		.attr('transform', 'translate('+ graphWidth/2.0 + ',0)').call(yAxis);


	// Add text to every 5th label
	svg.selectAll('.tick:nth-child(5n + 2) text')
		.style('display', 'initial');


	// Remove a 0
	svg.selectAll('.xAxis .tick:nth-child(12) text')
		.text('');


	// Relabel the 0
	svg.selectAll('.yAxis .tick:nth-child(12) text')
		.text('0');


	// Move the 0 label
	svg.selectAll('.yAxis .tick text')
		.attr('transform', function(d) {
			if(d == 0) {
				return 'translate(-5, -8)';
			}
		});


	// Redraw tick marks so they cover both sides of the axis
	svg.selectAll('.xAxis .tick line')
		.attr('y1', '-3')
		.attr('y2', '3');

	svg.selectAll('.xAxis .tick:nth-child(5n + 2) line')
		.attr('y1', '-6')
		.attr('y2', '6');

	svg.selectAll('.yAxis .tick line')
		.attr('x1', '-4')
		.attr('x2', '4');

	svg.selectAll('.yAxis .tick:nth-child(5n + 2) line')
		.attr('x1', '-8')
		.attr('x2', '8');
}



function loadPatterns() {
	// console.log("is this cached?")

	// defs.selectAll('pattern').data(data).enter()
	// 	.append('pattern')
	// 		.attr('id', function(d,i) {
	// 			return 'pattern' + i;
	// 		})
	// 		.attr('height', '100%')
	// 		.attr('width', '100%')
	// 		.attr('patternContentUnits', 'objectBoundingBox')
	// 		.attr('viewBox', '0 0 1 1')
	// 		.attr('preserveAspectRatio','xMidYMid slice')
	// 		.append('image')
	// 			.attr('height', '1')
	// 			.attr('width', '1')
	// 			.attr('preserveAspectRatio', 'xMidYMid slice')
	// 			.attr('xlink:href', function(d,i) {
	// 				return 'img/' + d[2];
	// 			})


	for (i = 0; i < dataset.length; i++) {
		defs.append('pattern')
			.attr('id', function() {
				return 'pattern' + i;

			})
			.attr('height', '100%')
			.attr('width', '100%')
			.attr('patternContentUnits', 'objectBoundingBox')
			.attr('viewBox', '0 0 1 1')
			.attr('preserveAspectRatio','xMidYMid slice')
			.append('image')
				.attr('height', '1')
				.attr('width', '1')
				.attr('preserveAspectRatio','xMidYMid slice')
				.attr('xlink:href', function() {
					return dataset[i].filepath + '/male_lead_square_512.png';

				})
	}
}



function drawPoints() {
	var points = svg.selectAll('circle').data(dataset).enter()
				 	.append('circle')
				 		.attr('cx', function (d) {
				 			return xScale(Number(d.quality));
				 		})
				 		.attr('cy', function(d) {
				 			return yScale(Number(d.attractiveness));
				 		})
				 		.attr('r', '0')
				 		.attr('stroke', '#8c1e15')
				 		.attr('stroke-width', '4')
				 		.attr('opacity', '.85')
				 		.attr('fill', function (d,i) {
				 			return 'url(#pattern' + i + ')';
				 		})
				 		.on('mouseover', function(d) {
				 			d3.select(this)
				 				.moveToFront()
				 				.transition()
				 				.attr('opacity', '1')
				 				.attr('r', 40);

				 			tooltip.html(d.maleLead + " in " + d.title);

				 			if(Number(this.cx.baseVal.value) <= (graphWidth/2.0)) {
				 				tooltip.style('left', ($('#graph svg').position().left + this.cx.baseVal.value + 100) + 'px')
				 					.style('right', 'auto')
				 					.style('top', (d3.event.pageY) + 'px')
				 					.transition()
				 					.style('opacity', 1);

				 			}

				 			else {
				 				tooltip.style('left', 'auto')
				 					.style('right', (($(window).width()) - ($('#graph svg').position().left)) - this.cx.baseVal.value + 'px')
				 					.style('top', (d3.event.pageY) + 'px')
				 					.transition()
				 					.style('opacity', 1);
				 					
				 			}
				 		})
				 		.on('mouseout', function(d) {
				 			d3.select(this)
				 				.transition()
				 				.attr('r', 20)
				 				.attr('opacity', '.85')
				 				.duration(150);

				 			tooltip.transition()
				 					.style('opacity', 0);

				 		})
				 		.on('click', function(d) {
				 			d3.select('#plate-banner img').attr('src', (d.filepath) + '/banner_thumb_512.png');
				 			d3.select('#plate-title').html(d.title);
				 			d3.select('#quality-grade h3').html(d.quality);
				 			d3.select('#attractive-grade h3').html(d.attractiveness);


				 			$('#animate1')[0].beginElement();

				 			$('#fade-div').show();
				 		});


	points.transition()
		.attr('r', 20)
		.ease(d3.easeElastic)
		.delay(function(d,i) {
			return (i * 100) + 100;

		})
		.duration(1000);
}

d3.csv('movie_data.csv').then(function(data) {
	dataset = data;

	drawGraph();
	loadPatterns();
	drawPoints();

});
	
