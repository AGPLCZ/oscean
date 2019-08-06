'use strict'

function Library (ronin) {
  // Modularity: Write simple parts connected by clean interfaces.
  // Composition: Design programs to be connected to other programs.
  // Parsimony: Write a big program only when it is clear by demonstration that nothing else will do.

  this.dom = {
    create: (id, type = 'div') => {
      const el = document.createElement(type)
      el.id = id
      return el
    },
    text: (el, s) => {
      el.textContent = s
    },
    append: (host, children) => {
      for (const child of children) {
        host.appendChild(child)
      }
    },
    'set-html': (host, html) => {
      host.innerHTML = html
    },
    'set-attr': (host, attr, value) => {
      host.setAttribute(attr, value)
    },
    body: document.body
  }

  this.debug = (arg) => {
    console.log(arg)
    return arg
  }
}