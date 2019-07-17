import * as d3 from 'd3'
import { layout } from './bubble/layout'
import { fnum, maxX, maxDensityY } from './data/utils'
import { updateX, updateY } from './animate'

const { width, height, margin } = layout()

export const svg = d3.select('#my_dataviz')
  .append('svg')
  .attr('viewBox', '0 0 1000 400')
  .append('g')
  .attr('transform',
    'translate(' + margin.left + ',' + margin.top + ')')
let x, y, z, yAxis, xAxis
const xScale = d3.scaleSqrt()
const zscale = d3.scaleSqrt()
export const axis = (data) => {
  z = zscale
    .domain([0, d3.max(maxX(data))])
    .range([3, 50])
  x = xScale
    .domain([0, d3.max(maxX(data)) + (d3.max(maxX(data)) / 7)])
    .range([30, width])

  xAxis = svg.append('g').attr('class', 'axis-line')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x).tickFormat(function (d) {
      return fnum(d * 1000000)
    }).ticks(5))

  y = d3.scaleLinear()
    .domain([0, d3.max(maxDensityY(data)) + 100])
    .range([height - 40, 0])

  yAxis = svg.append('g').attr('class', 'axis-line')
    .call(d3.axisLeft(y))
  return {
    x,
    y,
    z,
    xAxis,
    yAxis
  }
}
var tempMax
var tempMin
export const drag = (data) => {
  const updatePlotX = (value, handle, unencoded, tap, positions) => {
    if (value[0] !== value[1]) {
      x.domain([value[0], value[1]])
      xAxis.transition().duration(200).call(d3.axisBottom(x).tickFormat(function (d) {
        return fnum(d * 1000000)
      }))
      z = zscale
        .domain([value[0], value[1]])
        .range([3, 50])
      tempMin = value[0]
      tempMax = value[1]
    } else {
      z = zscale
        .domain([tempMin, tempMax])
        .range([5, 50])
      x.domain([tempMin, tempMax])
      xAxis.transition().duration(200).call(d3.axisBottom(x).tickFormat(function (d) {
        return fnum(d * 1000000)
      }))
    }
    updateX(data, x, y, z)
  }
  const updatePlotY = (value, handle, unencoded, tap, positions) => {
    if (value[0] !== value[1]) {
      y.domain([value[0], value[1]])
      yAxis.transition().duration(300).call(d3.axisLeft(y))
      updateY(data, x, y, z)
    }
  }
  return {
    updatePlotX,
    updatePlotY
  }
}
