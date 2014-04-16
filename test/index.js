
var tunecore = require('../');
var debug = require('debug')('tunecore-csv-parser:test');
var assert = require('better-assert');
var record = require('csv-record-parser-stream');
var through = require('through');
var csv = require('csv-parse');
var fs = require('fs');
var join = require('path').join;

describe('tunecore', function() {
  it('date parser works', function(){
    var date = tunecore.date('2014-10-01');
    date.getDate().should.eql(10);
    date.getMonth().should.eql(0);
    date.getFullYear().should.eql(2014);
  });


  var sheet = process.env.TUNECORE_SHEET || join(__dirname, 'tunecore.csv');
  if (!fs.existsSync(sheet))
    return console.error(sheet + " tunecore sheet not found in test for testing");

  it('record parser works', function(done){
    fs.createReadStream(sheet)
    .pipe(csv())
    .pipe(record(tunecore))
    .pipe(through(function(rec){
      debug('tunecore record %j', rec);
      tunecore.assert(rec);
    }))
    .on('end', done);
  });
});
