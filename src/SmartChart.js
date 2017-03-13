import Chart from 'chartjs'
import $ from 'jquery'
import SmartModal from './SmartModal'
import { mandatory } from './utilities'

/** Wrapper class for easy chart creation using chart.js and SmartModal */
export default class SmartChart extends SmartModal {
  constructor(options = mandatory(), callback = null, boxElement = null) {
    if (typeof Chart === 'undefined') {
      throw new Error('SmartChart.constructor: Chart.js is not loaded.')
    }

    if (options.constructor !== Object) {
      throw new Error(
        'SmartChart.constructor: options needs to be an object (chart.js chart options)',
      )
    }
    super('overlay', callback, 'closebutton', boxElement)
    // save options
    this.chartOptions = $.extend(true, {}, options)

    // set dragbox title
    this.title = '<center><h5>Smart Chart</h5></center>'

    // Create canvas
    const canvasID = `chart-canvas${$('canvas').length + 1}`
    this.content = `<canvas id="${canvasID}" class="chart-canvas"></canvas>`
    this.canvas = document.getElementById(canvasID)

    if (typeof options.options.title.text !== 'undefined') {
      options.options.title.display = false
      this.title = `<center><h5>${options.options.title.text}</h5></center>`
    }

    // Create chart
    try {
      Chart.defaults.global.responsive = true
      Chart.defaults.global.maintainAspectRatio = false
      this.chart = new Chart(this.canvas, options)
    } catch (e) {
      throw new Error(
        `SmartChart.constructor: could not build the chart. Error: ${e}`,
      )
    }

    this.canvas.style.background = 'white'
    this.boxClass = 'dragbox dragbox-white-boxshadow'

    // setup footer and buttons
    this.DEFAULT_BUTTON_ROW_HTML = '<div class="col-xs-12 dragbox-row smartchart-buttonrow"><div class="col-xs-10"></div></div>'
    this.DEFAULT_BUTTON_HTML = {
      closebutton: '<button type="button" class="btn btn-secondary dragbox-button  smartchart-closebutton">Close</button>',
      savebutton: '<button type="button" class="btn btn-secondary dragbox-button smartchart-savebutton">Save</button>',
    }

    this.html('.dragbox-footer', this.DEFAULT_BUTTON_ROW_HTML)

    this.append(
      this.DEFAULT_BUTTON_HTML.savebutton,
      '.smartchart-buttonrow',
      'col-xs-1 centered',
    )
    this.append(
      this.DEFAULT_BUTTON_HTML.closebutton,
      '.smartchart-buttonrow',
      'col-xs-1 centered',
    )

    this.closeButton = $(this.boxElement).find('.smartchart-closebutton')
    this.saveButton = $(this.boxElement).find('.smartchart-savebutton')
    this.button = this.closeButton

    // event listener on the button
    $(this.closeButton).click(() => {
      this.callThenDestroy()
    })

    $(this.saveButton).click(() => {
      this.save()
    })

    this.updatePosition()
    this.updateSize()

    setTimeout(() => {
      this.chart.resize()
      this.show()
    },
      250,
    )
  }

  // eslint-disable-next-line class-methods-use-this
  callAfterConstructor() { /* Overides super */ }

  /** Overides SmartModal.callThenDestroy() function */
  callThenDestroy() {
    // look for a callback then destroy
    if (this.callback) {
      this.callback()
    }

    // if chart destroy the chart .destroy()
    if (typeof this.chart !== 'undefined' && typeof Chart !== 'undefined') {
      if (this.chart.constructor === Chart) {
        this.chart.destroy()
      }
    }
    // call Dragbox.destroy()
    this.destroy()
  }

  save() {
    // stringify summary object
    const stringified = JSON.stringify(this.chartOptions, null, 2)

    // opens a new window with the stringified json
    let height = 150 + (this.chartOptions.data.datasets.length * 150)
    if (height > 500) {
      height = 500
    }

    window.open(
      `data:application/json;${
      window.btoa ? `base64,${btoa(stringified)}` : stringified}`,
      'SmartChart.save',
      `width=400,height=${height}`,
    )
  }
}
