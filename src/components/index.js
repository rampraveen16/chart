import { createBubble } from './bubble/plugin'
import { slider } from './slider'
import { createIndustryChart } from './industry'
import { domEvents } from './dom'
import { filterContent } from './filter'

export const createChart = (data, piecharData, wholeData) => {
  createBubble(data)
  slider(data)
  createIndustryChart(data, piecharData, wholeData)
  domEvents()
  filterContent(wholeData)
}
