/**
 * Experiment-boxes
 * Created. 2016
 *
 * Plug and play tools for easy development in js. Part of the experiment.js toolbox.
 *
 * Authors. Albert Buchard
 *
 * Requires: bootstrap and jQuery
 *
 * LICENSE MIT
 */

import DragBox from './src/DragBox'
import ParamBox from './src/ParamBox'
import SmartModal from './src/SmartModal'
import SmartChart from './src/SmartChart'
import SmartForm from './src/SmartForm'
import BindedProperty from './src/BindedProperty'
import BindedField from './src/BindedField'
import { findAllIndices } from './src/utilities'

if (typeof window !== 'undefined') {
  window.DragBox = DragBox
  window.ParamBox = ParamBox
  window.SmartModal = SmartModal
  window.SmartChart = SmartChart
  window.SmartForm = SmartForm
  window.BindedProperty = BindedProperty
  window.BindedField = BindedField

  /* === Get the absolute path of the library === */
  let paramBoxFullpath = './'
  const scripts = document.getElementsByTagName('script')
  if (scripts.length) {
    paramBoxFullpath = scripts[scripts.length - 1].src
    const delimiterIndices = findAllIndices('/', paramBoxFullpath)
    paramBoxFullpath = paramBoxFullpath.substr(0, delimiterIndices[delimiterIndices.length - 1])
  }

/* === Add the paramBox css once the page is loaded === */
  document.addEventListener('DOMContentLoaded', () => {
    const head = document.getElementsByTagName('head')[0]
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = `${paramBoxFullpath}/experimentBoxes.css`
    head.appendChild(link)
  })
}

export {
  DragBox,
  ParamBox,
  SmartModal,
  SmartForm,
  SmartChart,
  BindedProperty,
  BindedField,
}
