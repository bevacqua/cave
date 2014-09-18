'use strict';

var _ = require('lodash');
var fs = require('fs');
var css = require('css');

function api (stylesheet, options, done) {
  var sheet = css.parse(read(stylesheet));
  var removables = css.parse(options.css);

  cleanup();
  done(null, result());

  function cleanup () {
    removables.stylesheet.rules.forEach(matchRule);
  }

  function matchRule (rule) {
    match(rule);
  }

  function match (node, parent) {
    var rquery, mquery;
    if (node.type === 'rule') {
      rquery = {
        type: 'rule',
        selectors: node.selectors,
        declarations: node.declarations.map(omitPosition)
      };
      if (parent) {
        mquery = {
          type: 'media',
          media: parent.media
        };
        _(sheet.stylesheet.rules).where(mquery).pluck('rules').value().forEach(remove);
      } else {
        remove(sheet.stylesheet.rules);
      }
    } else if (node.type === 'media') {
      node.rules.forEach(matchMedia);
    }

    function omitPosition (declaration) {
      return _.omit(declaration, 'position');
    }

    function matchMedia (rule) {
      match(rule, node);
    }

    function remove (from) {
      _.remove(from, rquery).length;
    }
  }

  function result () {
    return css.stringify(sheet);
  }
}

function read (file) {
  return fs.readFileSync(file, { encoding: 'utf8' });
}

module.exports = api;
