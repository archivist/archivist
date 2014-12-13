Ext.data.JsonP.Backgrid_Extension_ServerSideFilter({
  "tagname": "class",
  "name": "Backgrid.Extension.ServerSideFilter",
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
  "id": "class-Backgrid.Extension.ServerSideFilter",
  "members": {
    "cfg": [

    ],
    "property": [
      {
        "name": "className",
        "tagname": "property",
        "owner": "Backgrid.Extension.ServerSideFilter",
        "meta": {
        },
        "id": "property-className"
      },
      {
        "name": "events",
        "tagname": "property",
        "owner": "Backgrid.Extension.ServerSideFilter",
        "meta": {
        },
        "id": "property-events"
      },
      {
        "name": "name",
        "tagname": "property",
        "owner": "Backgrid.Extension.ServerSideFilter",
        "meta": {
        },
        "id": "property-name"
      },
      {
        "name": "placeholder",
        "tagname": "property",
        "owner": "Backgrid.Extension.ServerSideFilter",
        "meta": {
        },
        "id": "property-placeholder"
      },
      {
        "name": "tagName",
        "tagname": "property",
        "owner": "Backgrid.Extension.ServerSideFilter",
        "meta": {
        },
        "id": "property-tagName"
      },
      {
        "name": "template",
        "tagname": "property",
        "owner": "Backgrid.Extension.ServerSideFilter",
        "meta": {
        },
        "id": "property-template"
      }
    ],
    "method": [
      {
        "name": "clear",
        "tagname": "method",
        "owner": "Backgrid.Extension.ServerSideFilter",
        "meta": {
        },
        "id": "method-clear"
      },
      {
        "name": "clearButton",
        "tagname": "method",
        "owner": "Backgrid.Extension.ServerSideFilter",
        "meta": {
        },
        "id": "method-clearButton"
      },
      {
        "name": "initialize",
        "tagname": "method",
        "owner": "Backgrid.Extension.ServerSideFilter",
        "meta": {
        },
        "id": "method-initialize"
      },
      {
        "name": "render",
        "tagname": "method",
        "owner": "Backgrid.Extension.ServerSideFilter",
        "meta": {
          "chainable": true
        },
        "id": "method-render"
      },
      {
        "name": "search",
        "tagname": "method",
        "owner": "Backgrid.Extension.ServerSideFilter",
        "meta": {
        },
        "id": "method-search"
      },
      {
        "name": "searchBox",
        "tagname": "method",
        "owner": "Backgrid.Extension.ServerSideFilter",
        "meta": {
        },
        "id": "method-searchBox"
      },
      {
        "name": "showClearButtonMaybe",
        "tagname": "method",
        "owner": "Backgrid.Extension.ServerSideFilter",
        "meta": {
        },
        "id": "method-showClearButtonMaybe"
      }
    ],
    "event": [

    ],
    "css_var": [

    ],
    "css_mixin": [

    ]
  },
  "linenr": 30,
  "files": [
    {
      "filename": "backgrid-filter.js",
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
    "Backgrid.Extension.ClientSideFilter"
  ],
  "mixedInto": [

  ],
  "parentMixins": [

  ],
  "html": "<div><pre class=\"hierarchy\"><h4>Subclasses</h4><div class='dependency'><a href='#!/api/Backgrid.Extension.ClientSideFilter' rel='Backgrid.Extension.ClientSideFilter' class='docClass'>Backgrid.Extension.ClientSideFilter</a></div></pre><div class='doc-contents'><p>ServerSideFilter is a search form widget that submits a query to the server\nfor filtering the current collection.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-className' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.ServerSideFilter'>Backgrid.Extension.ServerSideFilter</span><br/></div><a href='#!/api/Backgrid.Extension.ServerSideFilter-property-className' class='name expandable'>className</a><span> : String</span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>&quot;backgrid-filter form-search&quot;</code></p></div></div></div><div id='property-events' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.ServerSideFilter'>Backgrid.Extension.ServerSideFilter</span><br/></div><a href='#!/api/Backgrid.Extension.ServerSideFilter-property-events' class='name expandable'>events</a><span> : Object</span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>{&quot;keyup input[type=search]&quot;: &quot;showClearButtonMaybe&quot;, &quot;click a[data-backgrid-action=clear]&quot;: &quot;clear&quot;, &quot;submit&quot;: &quot;search&quot;}</code></p></div></div></div><div id='property-name' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.ServerSideFilter'>Backgrid.Extension.ServerSideFilter</span><br/></div><a href='#!/api/Backgrid.Extension.ServerSideFilter-property-name' class='name expandable'>name</a><span> : string</span></div><div class='description'><div class='short'>Query key ...</div><div class='long'><p>Query key</p>\n<p>Defaults to: <code>&#39;q&#39;</code></p></div></div></div><div id='property-placeholder' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.ServerSideFilter'>Backgrid.Extension.ServerSideFilter</span><br/></div><a href='#!/api/Backgrid.Extension.ServerSideFilter-property-placeholder' class='name not-expandable'>placeholder</a><span> : string</span></div><div class='description'><div class='short'><p>The HTML5 placeholder to appear beneath\nthe search box.</p>\n</div><div class='long'><p>The HTML5 placeholder to appear beneath\nthe search box.</p>\n</div></div></div><div id='property-tagName' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.ServerSideFilter'>Backgrid.Extension.ServerSideFilter</span><br/></div><a href='#!/api/Backgrid.Extension.ServerSideFilter-property-tagName' class='name expandable'>tagName</a><span> : String</span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>&quot;form&quot;</code></p></div></div></div><div id='property-template' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.ServerSideFilter'>Backgrid.Extension.ServerSideFilter</span><br/></div><a href='#!/api/Backgrid.Extension.ServerSideFilter-property-template' class='name not-expandable'>template</a><span> : function(Object, ?Object=): string</span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-clear' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.ServerSideFilter'>Backgrid.Extension.ServerSideFilter</span><br/></div><a href='#!/api/Backgrid.Extension.ServerSideFilter-method-clear' class='name expandable'>clear</a>( <span class='pre'>e</span> )</div><div class='description'><div class='short'>Event handler for the clear button. ...</div><div class='long'><p>Event handler for the clear button. Clears the search box and refetch the\ncollection.</p>\n\n<p>If the collection is a PageableCollection, clearing will go back to the\nfirst page.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>e</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-clearButton' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.ServerSideFilter'>Backgrid.Extension.ServerSideFilter</span><br/></div><a href='#!/api/Backgrid.Extension.ServerSideFilter-method-clearButton' class='name expandable'>clearButton</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Returns the clear button. ...</div><div class='long'><p>Returns the clear button.</p>\n</div></div></div><div id='method-initialize' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.ServerSideFilter'>Backgrid.Extension.ServerSideFilter</span><br/></div><a href='#!/api/Backgrid.Extension.ServerSideFilter-method-initialize' class='name expandable'>initialize</a>( <span class='pre'>options</span> )</div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>options</span> : Object<div class='sub-desc'>\n<ul><li><span class='pre'>collection</span> : Backbone.Collection<div class='sub-desc'></div></li><li><span class='pre'>name</span> : string (optional)<div class='sub-desc'></div></li><li><span class='pre'>placeholder</span> : string (optional)<div class='sub-desc'></div></li><li><span class='pre'>template</span> : function(Object): string (optional)<div class='sub-desc'></div></li></ul></div></li></ul></div></div></div><div id='method-render' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.ServerSideFilter'>Backgrid.Extension.ServerSideFilter</span><br/></div><a href='#!/api/Backgrid.Extension.ServerSideFilter-method-render' class='name expandable'>render</a>( <span class='pre'></span> ) : <a href=\"#!/api/Backgrid.Extension.ServerSideFilter\" rel=\"Backgrid.Extension.ServerSideFilter\" class=\"docClass\">Backgrid.Extension.ServerSideFilter</a><strong class='chainable signature' >chainable</strong></div><div class='description'><div class='short'>Renders a search form with a text box, optionally with a placeholder and\na preset value if supplied during initializa...</div><div class='long'><p>Renders a search form with a text box, optionally with a placeholder and\na preset value if supplied during initialization.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Backgrid.Extension.ServerSideFilter\" rel=\"Backgrid.Extension.ServerSideFilter\" class=\"docClass\">Backgrid.Extension.ServerSideFilter</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-search' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.ServerSideFilter'>Backgrid.Extension.ServerSideFilter</span><br/></div><a href='#!/api/Backgrid.Extension.ServerSideFilter-method-search' class='name expandable'>search</a>( <span class='pre'>e</span> )</div><div class='description'><div class='short'>Upon search form submission, this event handler constructs a query\nparameter object and pass it to Collection#fetch f...</div><div class='long'><p>Upon search form submission, this event handler constructs a query\nparameter object and pass it to Collection#fetch for server-side\nfiltering.</p>\n\n<p>If the collection is a PageableCollection, searching will go back to the\nfirst page.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>e</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-searchBox' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.ServerSideFilter'>Backgrid.Extension.ServerSideFilter</span><br/></div><a href='#!/api/Backgrid.Extension.ServerSideFilter-method-searchBox' class='name expandable'>searchBox</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Returns the search input box. ...</div><div class='long'><p>Returns the search input box.</p>\n</div></div></div><div id='method-showClearButtonMaybe' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Backgrid.Extension.ServerSideFilter'>Backgrid.Extension.ServerSideFilter</span><br/></div><a href='#!/api/Backgrid.Extension.ServerSideFilter-method-showClearButtonMaybe' class='name expandable'>showClearButtonMaybe</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Event handler. ...</div><div class='long'><p>Event handler. Show the clear button when the search box has text, hide\nit otherwise.</p>\n</div></div></div></div></div></div></div>"
});