import * as sapper from '@sapper/app'
import '@nipin/mould/css/premade.scss'

// window._goto = sapper.goto

sapper.start({
  target: document.querySelector('#sapper'),
})
