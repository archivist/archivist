Ext.data.JsonP.Backgrid_Extension_PageHandle({
  "tagname": "class",
  "name": "Backgrid.Extension.PageHandle",
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
  "id": "class-Backgrid.Extension.PageHandle",
  "members": {
    "cfg": [

    ],
    "property": [
      {
        "name": "events",
        "tagname": "property",
        "owner": "Backgrid.Extension.PageHandle",
        "meta": {
        },
        "id": "property-events"
      },
      {
        "name": "isBack",
        "tagname": "property",
        "owner": "Backgrid.Extension.PageHandle",
        "meta": {
        },
        "id": "property-isBack"
      },
      {
        "name": "isFastForward",
        "tagname": "property",
        "owner": "Backgrid.Extension.PageHandle",
        "meta": {
        },
        "id": "property-isFastForward"
      },
      {
        "name": "isForward",
        "tagname": "property",
        "owner": "Backgrid.Extension.PageHandle",
        "meta": {
        },
        "id": "property-isForward"
      },
      {
        "name": "isRewind",
        "tagname": "property",
        "owner": "Backgrid.Extension.PageHandle",
        "meta": {
        },
        "id": "property-isRewind"
      },
      {
        "name": "tagName",
        "tagname": "property",
        "owner": "Backgrid.Extension.PageHandle",
        "meta": {
        },
        "id": "property-tagName"
      },
      {
        "name": "title",
        "tagname": "property",
        "owner": "Backgrid.Extension.PageHandle",
        "meta": {
        },
        "id": "property-title"
      }
    ],
    "method": [
      {
        "name": "changePage",
        "tagname": "method",
        "owner": "Backgrid.Extension.PageHandle",
        "meta": {
          "chainable": true
        },
        "id": "method-changePage"
      },
      {
        "name": "initialize",
        "tagname": "method",
        "owner": "Backgrid.Extension.PageHandle",
        "meta": {
        },
        "id": "method-initialize"
      },
      {
        "name": "render",
        "tagname": "method",
        "owner": "Backgrid.Extension.PageHandle",
        "meta": {
          "chainable": true
        },
        "id": "method-render"
      }
    ],
    "event": [

    ],
    "css_var": [

    ],
    "css_mixin": [

    ]
  },
  "linenr": 26,
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
  "html": "<div><div class='doc-contents'><p>PageHandle is a class that renders the actual page handles and reacts to\nclick events for pagination.</p>\n\n<p>This class acts in two modes - control or discrete page handle modes. If\none of the <code>is*</code> flags is <code>true</code>, an instance of this class is under\ncontrol page handle mode. Setting a <code>pageIndex</code> to an instance of this\nclass under control mode has no effect and the correct page index will\nalways be inferred from the <code>is*</code> flag. Only one of the <code>is*</code> flags should\nbe set to <code>true</code> at a time. For example, an instance of this class cannot\nsimultaneously be a rewind control and a fast forward control. A <code>label</code>\nand a <code>title</code> template or a string are required to be passed to the\nconstuctor under this mode. If a <code>title</code> template is provided, it <strong>MUST</strong>\naccept a parameter <code>label</code>. When the <code>label</code> is provided to the <code>title</code>\ntemplate function, its result will be used to render the generated anchor's\ntitle attribute.</p>\n\n<p>If all of the <code>is*</code> flags is set to <code>false</code>, which is the default, an\ninstance of this class will be in discrete page handle mode. An instance\nunder this mode requires the <code>pageIndex</code> to be passed from the constructor\nas an option and it <strong>MUST</strong> be a 0-based index of the list of page numbers\nto render. The constuctor will normalize the base to the same base the\nunderlying PageableCollection collection instance uses. A <code>label</code> is not\nrequired under this mode, which will default to the equivalent 1-based page\nindex calculated from <code>pageIndex</code> and the underlying PageableCollection\ninstance. A provided <code>label</code> will still be honored however. The <code>title</code>\nparameter is also not required under this mode, in which case the default\n<code>title</code> template will be used. You are encouraged to provide your own\n<code>title</code> template however if you wish to localize the title strings.</p>\n\n<p>If this page handle represents the current page, an <code>active</code> class will be\nplaced on the root list element.</p>\n\n<p>If this page handle is at the border of the list of pages, a <code>disabled</code>\nclass will be placed on the root list element.</p>\n\n<p>Only page handles that are neither <code>active</code> nor <code>disabled</code> will respond to\nclick events and triggers pagination.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-events' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.PageHandle'>Backgrid.Extension.PageHandle</span><br/></div><a href='#!/api/Backgrid.Extension.PageHandle-property-events' class='name expandable'>events</a><span> : Object</span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>{&quot;click a&quot;: &quot;changePage&quot;}</code></p></div></div></div><div id='property-isBack' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.PageHandle'>Backgrid.Extension.PageHandle</span><br/></div><a href='#!/api/Backgrid.Extension.PageHandle-property-isBack' class='name expandable'>isBack</a><span> : boolean</span></div><div class='description'><div class='short'>Whether this handle represents a back\ncontrol ...</div><div class='long'><p>Whether this handle represents a back\ncontrol</p>\n<p>Defaults to: <code>false</code></p></div></div></div><div id='property-isFastForward' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.PageHandle'>Backgrid.Extension.PageHandle</span><br/></div><a href='#!/api/Backgrid.Extension.PageHandle-property-isFastForward' class='name expandable'>isFastForward</a><span> : boolean</span></div><div class='description'><div class='short'>Whether this handle represents a fast\nforward control ...</div><div class='long'><p>Whether this handle represents a fast\nforward control</p>\n<p>Defaults to: <code>false</code></p></div></div></div><div id='property-isForward' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.PageHandle'>Backgrid.Extension.PageHandle</span><br/></div><a href='#!/api/Backgrid.Extension.PageHandle-property-isForward' class='name expandable'>isForward</a><span> : boolean</span></div><div class='description'><div class='short'>Whether this handle represents a forward\ncontrol ...</div><div class='long'><p>Whether this handle represents a forward\ncontrol</p>\n<p>Defaults to: <code>false</code></p></div></div></div><div id='property-isRewind' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.PageHandle'>Backgrid.Extension.PageHandle</span><br/></div><a href='#!/api/Backgrid.Extension.PageHandle-property-isRewind' class='name expandable'>isRewind</a><span> : boolean</span></div><div class='description'><div class='short'>Whether this handle represents a rewind\ncontrol ...</div><div class='long'><p>Whether this handle represents a rewind\ncontrol</p>\n<p>Defaults to: <code>false</code></p></div></div></div><div id='property-tagName' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.PageHandle'>Backgrid.Extension.PageHandle</span><br/></div><a href='#!/api/Backgrid.Extension.PageHandle-property-tagName' class='name expandable'>tagName</a><span> : String</span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>&quot;li&quot;</code></p></div></div></div><div id='property-title' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.PageHandle'>Backgrid.Extension.PageHandle</span><br/></div><a href='#!/api/Backgrid.Extension.PageHandle-property-title' class='name expandable'>title</a><span> : string|function(Object.&lt;string, string&gt;): string</span></div><div class='description'><div class='short'>The title to use for the title attribute of the generated page handle\nanchor elements. ...</div><div class='long'><p>The title to use for the <code>title</code> attribute of the generated page handle\nanchor elements. It can be a string or an Underscore template function\nthat takes a mandatory <code>label</code> parameter.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-changePage' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.PageHandle'>Backgrid.Extension.PageHandle</span><br/></div><a href='#!/api/Backgrid.Extension.PageHandle-method-changePage' class='name expandable'>changePage</a>( <span class='pre'>e</span> ) : <a href=\"#!/api/Backgrid.Extension.PageHandle\" rel=\"Backgrid.Extension.PageHandle\" class=\"docClass\">Backgrid.Extension.PageHandle</a><strong class='chainable signature' >chainable</strong></div><div class='description'><div class='short'>jQuery click event handler. ...</div><div class='long'><p>jQuery click event handler. Goes to the page this PageHandle instance\nrepresents. No-op if this page handle is currently active or disabled.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>e</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Backgrid.Extension.PageHandle\" rel=\"Backgrid.Extension.PageHandle\" class=\"docClass\">Backgrid.Extension.PageHandle</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-initialize' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.PageHandle'>Backgrid.Extension.PageHandle</span><br/></div><a href='#!/api/Backgrid.Extension.PageHandle-method-initialize' class='name expandable'>initialize</a>( <span class='pre'>options, pageIndex</span> )</div><div class='description'><div class='short'>Initializer. ...</div><div class='long'><p>Initializer.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>options</span> : Object<div class='sub-desc'>\n<ul><li><span class='pre'>collection</span> : Backbone.Collection<div class='sub-desc'></div></li><li><span class='pre'>label</span> : string (optional)<div class='sub-desc'><p>If provided it is used to render the\nanchor text, otherwise the normalized pageIndex will be used\ninstead. Required if any of the <code>is*</code> flags is set to <code>true</code>.</p>\n</div></li><li><span class='pre'>title</span> : string (optional)<div class='sub-desc'></div></li><li><span class='pre'>isRewind</span> : boolean (optional)<div class='sub-desc'><p>Defaults to: <code>false</code></p></div></li><li><span class='pre'>isBack</span> : boolean (optional)<div class='sub-desc'><p>Defaults to: <code>false</code></p></div></li><li><span class='pre'>isForward</span> : boolean (optional)<div class='sub-desc'><p>Defaults to: <code>false</code></p></div></li><li><span class='pre'>isFastForward</span> : boolean (optional)<div class='sub-desc'><p>Defaults to: <code>false</code></p></div></li></ul></div></li><li><span class='pre'>pageIndex</span> : number<div class='sub-desc'><p>0-based index of the page number this handle\nhandles. This parameter will be normalized to the base the underlying\nPageableCollection uses.</p>\n</div></li></ul></div></div></div><div id='method-render' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.PageHandle'>Backgrid.Extension.PageHandle</span><br/></div><a href='#!/api/Backgrid.Extension.PageHandle-method-render' class='name expandable'>render</a>( <span class='pre'></span> ) : <a href=\"#!/api/Backgrid.Extension.PageHandle\" rel=\"Backgrid.Extension.PageHandle\" class=\"docClass\">Backgrid.Extension.PageHandle</a><strong class='chainable signature' >chainable</strong></div><div class='description'><div class='short'>Renders a clickable anchor element under a list item. ...</div><div class='long'><p>Renders a clickable anchor element under a list item.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Backgrid.Extension.PageHandle\" rel=\"Backgrid.Extension.PageHandle\" class=\"docClass\">Backgrid.Extension.PageHandle</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div></div></div></div></div>"
});