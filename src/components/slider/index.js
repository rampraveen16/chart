import * as d3 from 'd3'
import noUiSlider from 'nouislider'
import wNumb from 'wnumb/wNumb'
import { drag } from '../axis'
import { maxX, maxDensityY, fnum } from '../data/utils'

export const slider = (data) => {
  const sliderX = document.getElementById('sliderX')
  const format = wNumb({
    edit: function (d) {
      const n = fnum(d * 1000000)
      return `${n}`
    } })
  noUiSlider.create(sliderX, {
    connect: true,
    behaviour: 'tap',
    step: 1,
    start: [1, d3.max(maxX(data)) + 17000],
    tooltips: [format, format],
    range: {
      min: [1],
      max: [d3.max(maxX(data)) + 17000]
    }
  })

  const sliderY = document.getElementById('sliderY')
  noUiSlider.create(sliderY, {
    connect: true,
    direction: 'rtl',
    step: 10,
    orientation: 'vertical',
    start: [0, d3.max(maxDensityY(data)) + 100],
    range: {

      min: [0],

      max: [d3.max(maxDensityY(data)) + 100]
    }
  })
  const { updatePlotX, updatePlotY } = drag(data)
  sliderX.noUiSlider.on('slide', updatePlotX)
  sliderY.noUiSlider.on('slide', updatePlotY)
}
