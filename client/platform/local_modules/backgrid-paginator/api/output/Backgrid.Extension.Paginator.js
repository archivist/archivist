Ext.data.JsonP.Backgrid_Extension_Paginator({
  "tagname": "class",
  "name": "Backgrid.Extension.Paginator",
  "extends": null,
  "mixins": [

  ],
  "alternateClassNames": [

  ],
  "aliases": {
  },
  "singleton": false,
  "requires": [

  ],
  "uses": [

  ],
  "enum": null,
  "override": null,
  "inheritable": null,
  "inheritdoc": null,
  "meta": {
  },
  "private": null,
  "id": "class-Backgrid.Extension.Paginator",
  "members": {
    "cfg": [

    ],
    "property": [
      {
        "name": "className",
        "tagname": "property",
        "owner": "Backgrid.Extension.Paginator",
        "meta": {
        },
        "id": "property-className"
      },
      {
        "name": "controls",
        "tagname": "property",
        "owner": "Backgrid.Extension.Paginator",
        "meta": {
        },
        "id": "property-controls"
      },
      {
        "name": "goBackFirstOnSort",
        "tagname": "property",
        "owner": "Backgrid.Extension.Paginator",
        "meta": {
        },
        "id": "property-goBackFirstOnSort"
      },
      {
        "name": "pageHandle",
        "tagname": "property",
        "owner": "Backgrid.Extension.Paginator",
        "meta": {
        },
        "id": "property-pageHandle"
      },
      {
        "name": "renderIndexedPageHandles",
        "tagname": "property",
        "owner": "Backgrid.Extension.Paginator",
        "meta": {
        },
        "id": "property-renderIndexedPageHandles"
      },
      {
        "name": "slideScale",
        "tagname": "property",
        "owner": "Backgrid.Extension.Paginator",
        "meta": {
        },
        "id": "property-slideScale"
      },
      {
        "name": "windowSize",
        "tagname": "property",
        "owner": "Backgrid.Extension.Paginator",
        "meta": {
        },
        "id": "property-windowSize"
      }
    ],
    "method": [
      {
        "name": "initialize",
        "tagname": "method",
        "owner": "Backgrid.Extension.Paginator",
        "meta": {
        },
        "id": "method-initialize"
      },
      {
        "name": "makeHandles",
        "tagname": "method",
        "owner": "Backgrid.Extension.Paginator",
        "meta": {
        },
        "id": "method-makeHandles"
      },
      {
        "name": "render",
        "tagname": "method",
        "owner": "Backgrid.Extension.Paginator",
        "meta": {
          "chainable": true
        },
        "id": "method-render"
      },
      {
        "name": "slideMaybe",
        "tagname": "method",
        "owner": "Backgrid.Extension.Paginator",
        "meta": {
        },
        "id": "method-slideMaybe"
      },
      {
        "name": "slideThisMuch",
        "tagname": "method",
        "owner": "Backgrid.Extension.Paginator",
        "meta": {
        },
        "id": "method-slideThisMuch"
      }
    ],
    "event": [

    ],
    "css_var": [

    ],
    "css_mixin": [

    ]
  },
  "linenr": 205,
  "files": [
    {
      "filename": "backgrid-paginator.js",
      "href": null
    }
  ],
  "html_meta": {
  },
  "statics": {
    "cfg": [

    ],
    "property": [

    ],
    "method": [

    ],
    "event": [

    ],
    "css_var": [

    ],
    "css_mixin": [

    ]
  },
  "component": false,
  "superclasses": [

  ],
  "subclasses": [

  ],
  "mixedInto": [

  ],
  "parentMixins": [

  ],
  "html": "<div><div class='doc-contents'><p>Paginator is a Backgrid extension that renders a series of configurable\npagination handles. This extension is best used for splitting a large data\nset across multiple pages. If the number of pages is larger then a\nthreshold, which is set to 10 by default, the page handles are rendered\nwithin a sliding window, plus the rewind, back, forward and fast forward\ncontrol handles. The individual control handles can be turned off.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-className' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.Paginator'>Backgrid.Extension.Paginator</span><br/></div><a href='#!/api/Backgrid.Extension.Paginator-property-className' class='name expandable'>className</a><span> : String</span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>&quot;backgrid-paginator&quot;</code></p></div></div></div><div id='property-controls' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.Paginator'>Backgrid.Extension.Paginator</span><br/></div><a href='#!/api/Backgrid.Extension.Paginator-property-controls' class='name expandable'>controls</a><span> : Object.&lt;string, Object.&lt;string, string&gt;&gt;</span></div><div class='description'><div class='short'>You can\ndisable specific control handles by setting the keys in question to\nnull. ...</div><div class='long'><p>You can\ndisable specific control handles by setting the keys in question to\nnull. The defaults will be merged with your controls object, with your\nchanges taking precedent.</p>\n<p>Defaults to: <code>{rewind: {label: &quot;《&quot;, title: &quot;First&quot;}, back: {label: &quot;〈&quot;, title: &quot;Previous&quot;}, forward: {label: &quot;〉&quot;, title: &quot;Next&quot;}, fastForward: {label: &quot;》&quot;, title: &quot;Last&quot;}}</code></p></div></div></div><div id='property-goBackFirstOnSort' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.Paginator'>Backgrid.Extension.Paginator</span><br/></div><a href='#!/api/Backgrid.Extension.Paginator-property-goBackFirstOnSort' class='name expandable'>goBackFirstOnSort</a><span> : Boolean</span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>true</code></p></div></div></div><div id='property-pageHandle' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.Paginator'>Backgrid.Extension.Paginator</span><br/></div><a href='#!/api/Backgrid.Extension.Paginator-property-pageHandle' class='name not-expandable'>pageHandle</a><span> : <a href=\"#!/api/Backgrid.Extension.PageHandle\" rel=\"Backgrid.Extension.PageHandle\" class=\"docClass\">Backgrid.Extension.PageHandle</a></span></div><div class='description'><div class='short'><p>. The PageHandle\nclass to use for rendering individual handles</p>\n</div><div class='long'><p>. The PageHandle\nclass to use for rendering individual handles</p>\n</div></div></div><div id='property-renderIndexedPageHandles' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.Paginator'>Backgrid.Extension.Paginator</span><br/></div><a href='#!/api/Backgrid.Extension.Paginator-property-renderIndexedPageHandles' class='name expandable'>renderIndexedPageHandles</a><span> : Boolean</span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>true</code></p></div></div></div><div id='property-slideScale' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.Paginator'>Backgrid.Extension.Paginator</span><br/></div><a href='#!/api/Backgrid.Extension.Paginator-property-slideScale' class='name expandable'>slideScale</a><span> : number</span></div><div class='description'><div class='short'>the number used by #slideHowMuch to scale\nwindowSize to yield the number of pages to slide. ...</div><div class='long'><p>the number used by #slideHowMuch to scale\n<code>windowSize</code> to yield the number of pages to slide. For example, the\ndefault windowSize(10) * slideScale(0.5) yields 5, which means the window\nwill slide forward 5 pages as soon as you've reached page 6. The smaller\nthe scale factor the less pages to slide, and vice versa.</p>\n\n<p>Also See:</p>\n\n<ul>\n<li><h1>slideMaybe</h1></li>\n<li><h1>slideHowMuch</h1></li>\n</ul>\n\n<p>Defaults to: <code>0.5</code></p></div></div></div><div id='property-windowSize' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.Paginator'>Backgrid.Extension.Paginator</span><br/></div><a href='#!/api/Backgrid.Extension.Paginator-property-windowSize' class='name expandable'>windowSize</a><span> : Number</span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>10</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-initialize' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.Paginator'>Backgrid.Extension.Paginator</span><br/></div><a href='#!/api/Backgrid.Extension.Paginator-method-initialize' class='name expandable'>initialize</a>( <span class='pre'>options</span> )</div><div class='description'><div class='short'>Initializer. ...</div><div class='long'><p>Initializer.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>options</span> : Object<div class='sub-desc'>\n<ul><li><span class='pre'>collection</span> : Backbone.Collection<div class='sub-desc'></div></li><li><span class='pre'>controls</span> : boolean (optional)<div class='sub-desc'></div></li><li><span class='pre'>pageHandle</span> : boolean (optional)<div class='sub-desc'><p>Defaults to: <code>Backgrid.Extension.PageHandle</code></p></div></li><li><span class='pre'>goBackFirstOnSort</span> : boolean (optional)<div class='sub-desc'><p>Defaults to: <code>true</code></p></div></li></ul></div></li></ul></div></div></div><div id='method-makeHandles' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.Paginator'>Backgrid.Extension.Paginator</span><br/></div><a href='#!/api/Backgrid.Extension.Paginator-method-makeHandles' class='name expandable'>makeHandles</a>( <span class='pre'></span> ) : Array.&lt;Object&gt;</div><div class='description'><div class='short'>Creates a list of page handle objects for rendering. ...</div><div class='long'><p>Creates a list of page handle objects for rendering.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Array.&lt;Object&gt;</span><div class='sub-desc'><p>an array of page handle objects hashes</p>\n</div></li></ul></div></div></div><div id='method-render' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.Paginator'>Backgrid.Extension.Paginator</span><br/></div><a href='#!/api/Backgrid.Extension.Paginator-method-render' class='name expandable'>render</a>( <span class='pre'></span> ) : <a href=\"#!/api/Backgrid.Extension.Paginator\" rel=\"Backgrid.Extension.Paginator\" class=\"docClass\">Backgrid.Extension.Paginator</a><strong class='chainable signature' >chainable</strong></div><div class='description'><div class='short'>Render the paginator handles inside an unordered list. ...</div><div class='long'><p>Render the paginator handles inside an unordered list.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Backgrid.Extension.Paginator\" rel=\"Backgrid.Extension.Paginator\" class=\"docClass\">Backgrid.Extension.Paginator</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-slideMaybe' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.Paginator'>Backgrid.Extension.Paginator</span><br/></div><a href='#!/api/Backgrid.Extension.Paginator-method-slideMaybe' class='name expandable'>slideMaybe</a>( <span class='pre'>firstPage, lastPage, currentPage, windowSize, slideScale</span> ) : 0|1</div><div class='description'><div class='short'>Decides whether the window should slide. ...</div><div class='long'><p>Decides whether the window should slide. This method should return 1 if\nsliding should occur and 0 otherwise. The default is sliding should occur\nif half of the pages in a window has been reached.</p>\n\n<p><strong>Note</strong>: All the parameters have been normalized to be 0-based.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>firstPage</span> : number<div class='sub-desc'>\n</div></li><li><span class='pre'>lastPage</span> : number<div class='sub-desc'>\n</div></li><li><span class='pre'>currentPage</span> : number<div class='sub-desc'>\n</div></li><li><span class='pre'>windowSize</span> : number<div class='sub-desc'>\n</div></li><li><span class='pre'>slideScale</span> : number<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>0|1</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-slideThisMuch' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.Paginator'>Backgrid.Extension.Paginator</span><br/></div><a href='#!/api/Backgrid.Extension.Paginator-method-slideThisMuch' class='name expandable'>slideThisMuch</a>( <span class='pre'>firstPage, lastPage, currentPage, windowSize, slideScale</span> ) : number</div><div class='description'><div class='short'>Decides how many pages to slide when sliding should occur. ...</div><div class='long'><p>Decides how many pages to slide when sliding should occur. The default\nsimply scales the <code>windowSize</code> to arrive at a fraction of the <code>windowSize</code>\nto increment.</p>\n\n<p><strong>Note</strong>: All the parameters have been normalized to be 0-based.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>firstPage</span> : number<div class='sub-desc'>\n</div></li><li><span class='pre'>lastPage</span> : number<div class='sub-desc'>\n</div></li><li><span class='pre'>currentPage</span> : number<div class='sub-desc'>\n</div></li><li><span class='pre'>windowSize</span> : number<div class='sub-desc'>\n</div></li><li><span class='pre'>slideScale</span> : number<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>number</span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>"
});