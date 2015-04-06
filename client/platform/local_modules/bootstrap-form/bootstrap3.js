var Backbone = require('backbone'),
    _ = require('underscore');

/** 
 * Include this template file after backbone-forms.amd.js to override the default templates
 * 
 * 'data-*' attributes control where elements are placed
 */
;(function(Form) {
  
  /**
   * Bootstrap 3 templates
   */
  Form.template = _.template('\
    <form class="form-horizontal" role="form" data-fieldsets></form>\
  ');


  Form.Fieldset.template = _.template('\
    <fieldset data-fields>\
      <% if (legend) { %>\
        <legend><%= legend %></legend>\
      <% } %>\
    </fieldset>\
  ');


  Form.Field.template = _.template('\
    <div class="form-group field-<%= key %>">\
      <div class="field">\
        <span data-editor></span>\
        <p class="help-block" data-error></p>\
      </div>\
      <div class="details">\
        <p class="help-block"><%= help %></p>\
      </div>\
    </div>\
  ');


  Form.NestedField.template = _.template('\
    <div class="field-<%= key %> nested-item">\
      <div class="input-xlarge">\
        <% if (key == "phones"){ %>\
          <label><%= title %></label>\
        <% } %>\
        <span data-editor></span>\
        <div class="help-inline" data-error></div>\
      </div>\
      <div class="help-block"><%= help %></div>\
    </div>\
  ');

  Form.editors.Base.prototype.className = 'form-control';
  Form.editors.Object.prototype.className = '';

  Form.Field.errorClassName = 'has-error';


  if (Form.editors.List) {

    Form.editors.List.template = _.template('\
      <div class="bbf-list">\
        <ul class="unstyled clearfix" data-items></ul>\
        <button type="button" class="btn bbf-add" data-action="add">+ добавить</button>\
      </div>\
    ');


    Form.editors.List.Item.template = _.template('\
      <li class="clearfix">\
        <div class="pull-left" data-editor></div>\
        <button type="button" class="btn bbf-del" data-action="remove">&times;</button>\
      </li>\
    ');
    

    Form.editors.List.Object.template = Form.editors.List.NestedModel.template = _.template('\
      <div class="bbf-list-modal"><%= summary %></div>\
    ');

  }


})(Backbone.Form);
