var Polyglot = require('node-polyglot');
var defaultPhrases = require('./en.json');
// Note: we use the HTML5 LocalStorage to store phrases which are defined in
// the according locale files in this directory
// To switch the language use `i18n.switchLocale('de')` and reload the page.
var storage = window.storage || window.localStorage;
var locale = storage.getItem('locale') || "en";
var phrases = JSON.parse(storage.getItem('phrases'));
if (locale === "en" || !phrases) {
  phrases = defaultPhrases;
}
var i18n = new Polyglot({locale: locale, phrases: phrases});
// Switch the loc
// i18n.switchLocale = function(locale) {
//   $.ajax("/i18n/"+locale+".json", {
//   }).done(function(phrases) {
//     storage.setItem('phrases', JSON.stringify(phrases));
//     storage.setItem('locale', locale);
//     i18n.extend(phrases);
//   }).error(function(xhr, status, error) {
//     console.error(error);
//   });
// };
global.i18n = i18n;
// always load this so that we have the latest locale in storage next time.
// i18n.switchLocale(locale);
