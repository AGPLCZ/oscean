'use strict';

function DatabaseNode(id,rect)
{
  Node.call(this,id,rect);

  this.glyph = "M60,60 L60,60 L240,60 L240,240 L60,240 Z M60,150 L60,150 L240,150 M60,105 L60,105 L240,105 M60,195 L60,195 L240,195 "

  this.cache = null;
  this.index = {};

  this.answer = function(q)
  {
    if(!this.cache){
      this.cache = this.request(this.cache);
      this.send(this.cache); // Send ref to Ø(MAP), for filtering.
      this.build();
    }
    return this.cache;
  }

  this.build = function()
  {
    const time = performance.now();
    const count = {indexed:0,any:0}
    for(const id in this.cache){
      const db = this.cache[id];
      for(const i in db){
        const el = db[i]
        if(!el.name){ continue; }
        if(el.index){ count.indexed += 1; }
        this.index[el.name.toUpperCase().to_alphanum()] = el
        count.any += 1
      }
    }
    console.info(this.id,`Collected ${count.any} searchables, ${count.indexed} indexed, in ${(performance.now() - time).toFixed(2)}ms.`)
  }

  this.find = function(q,deep = false)
  {
    const r = this.index[q.toUpperCase()]
    return r && r.index ? r : r && deep ? r : null;
  }
}

const DATABASE = {};