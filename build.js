#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var babel = require('babel-core');
var postcss = require('postcss');
var nesting = require('postcss-nesting');

var csspath = path.join(__dirname, 'src', 'lexical-pair.css');

fs.readFile(csspath, 'utf8', function(err, css) {
    if (err) {
        console.log(err);
        return;
    }
    var options = {
        from: 'lexical-pair.css',
        to: 'lexical-pair.css'
    };
    postcss([nesting]).process(css, options).then(function(res) {
        var output = path.join(__dirname, 'dist', 'lexical-pair.css');
        fs.writeFile(output, res.css, 'utf8', function(err) {
            if (err) {
                console.log(err);
            }
        });
    });
});

var filepath = path.join(__dirname, 'src', 'lexical-pair.js');

var plugins = [
    'transform-es2015-block-scoping',
    'transform-es2015-template-literals',
    'transform-es2015-classes'
];

var options = {
    filename: 'lexical-pair.js',
    plugins: plugins
};

babel.transformFile(filepath, options, function(err, res) {
    if (err) {
        console.log(err);
        return;
    }
    var output = path.join(__dirname, 'dist', 'lexical-pair.js');
    fs.writeFile(output, res.code, function(err) {
        if (err) {
            console.log(err);
        }
    });
});

[
    'umd',
    'amd',
    'commonjs',
    'systemjs'
].forEach(function(mod) {
    var options = {
        filename: 'element.js',
        plugins: plugins.concat('transform-es2015-modules-' + mod)
    };
    babel.transformFile(filepath, options, function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        var suffix = mod + '.js';
        var output = path.join(__dirname, 'dist', 'lexical-pair.' + suffix);
        fs.writeFile(output, result.code, function(err) {
            if (err) {
                console.log(err);
            }
        });
    });
});
