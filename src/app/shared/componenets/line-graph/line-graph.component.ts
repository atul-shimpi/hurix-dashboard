import { 
  Component, 
  Input
 } from '@angular/core';
import * as D3 from 'd3';

@Component({
  selector: 'hurix-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.css']
})
export class LineGraphComponent  {
  @Input()
  set series(val: any[]) {
    if(val === undefined) return;
    this.series_ = val;
    this.draw();
  }
  @Input() title: string = '';
  series_: any[];

  constructor() { }
  
  private async draw() {
    const d3:any = D3;
    const margin = { top: 10, right: 100, bottom: 30, left: 30 };
    const width = +d3.select('#graphContainer').style('width').slice(0, -2) - margin.left - margin.right;
    const height = +d3.select('#graphContainer').style('height').slice(0, -2) - margin.top - margin.bottom;
    const svg = d3.select("#graphContainer")
              .append("svg")
              .style("background-color", "whitesmoke")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    const allGroup = this.series_.map(series__ => series__.name);
    const dataReady = this.series_;
    const myColor = d3.scaleOrdinal()
                      .domain(allGroup)
                      .range(d3.schemeSet2);

    const x = d3.scaleLinear()
      .domain([d3.min(dataReady[0].values.map(data__ => data__.time)), d3.max(dataReady[0].values.map(data__ => data__.time))])
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat(d3.format('0')));
    
    let allValues = [];

    for(const data of dataReady) {
      allValues = allValues.concat(data.values.map(data__ => data__.value));
    }

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([d3.min(allValues), d3.max(allValues)])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Add the lines
    const line = d3.line()
      .x(function(d) { return x(+d.time) })
      .y(function(d) { return y(+d.value) })
    svg.selectAll("myLines")
      .data(dataReady)
      .enter()
      .append("path")
        .attr("d", function(d){ return line(d.values) } )
        .attr("stroke", function(d){ return myColor(d.name) })
        .style("stroke-width", 4)
        .style("fill", "none")

    // Add the points
    svg
      // step 1) enter group
      .selectAll("myDots")
      .data(dataReady)
      .enter()
        .append('g')
        .style("fill", function(d){ return myColor(d.name) })
      // step 2) enter values of group
      .selectAll("myPoints")
      .data(function(d){ return d.values })
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d.time) } )
        .attr("cy", function(d) { return y(d.value) } )
        .attr("r", 5)
        .attr("stroke", "white")

    // draw legends
    svg
      .selectAll("myLabels")
      .data(dataReady)
      .enter()
        .append('g')
        .append("text")
          .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
          .attr("transform", function(d) { return "translate(" + x(d.value.time) + "," + y(d.value.value) + ")"; }) 
          .attr("x", 12) // shift the text a bit more right
          .text(function(d) { return d.name; })
          .style("fill", function(d){ return myColor(d.name) })
          .style("font-size", 15)
      }
}


