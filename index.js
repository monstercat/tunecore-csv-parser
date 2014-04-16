
var assert = require('better-assert');
var moment = require('moment');
var parseNumber = require('parse-number');

var exports = module.exports = function TunecoreParser(csv) {
  return {
      period: exports.date(csv.col('sales period'))
    , posted: exports.date(csv.col('posted date'))
    , store: csv.col('store name')
    , country: csv.col('country of sale')
    , artist: csv.col('artist')
    , type: csv.col('release type')
    , releaseTitle: csv.col('release title')
    , songTitle: csv.col('song title')
    , label: csv.col('label')
    , upc: csv.col('upc')
    , optionalUpc: csv.col('optional upc')
    , tcSongId: csv.col('tc song id')
    , isrc: csv.col('optional isrc')
    , saleType: csv.col('sales type')
    , sales: parseNumber(csv.col('# units sold'))
    , perUnitPrice: parseNumber(csv.col('per unit price'))
    , net: parseNumber(csv.col('net sales'))
    , netCurrency: csv.col('net sales currency')
    , exchangeRate: csv.col('exchange rate')
    , earned: csv.col('total earned')
    , currency: csv.col('currency')
  };
};

exports.assert = function(rec) {
  assert(rec.period instanceof Date);
  assert(rec.posted instanceof Date);
  assert(rec.store);
  assert(rec.country);
  assert(rec.label);
  assert(rec.type);
  assert(rec.releaseTitle);
  assert(rec.label);
  assert(rec.upc);
  assert(rec.saleType);
  assert(rec.sales);
  assert(!isNaN(rec.perUnitPrice));
  assert(!isNaN(rec.net));
  assert(rec.netCurrency);
  assert(!isNaN(rec.exchangeRate));
  assert(rec.exchangeRate >= 0);
  assert(!isNaN(rec.earned));
  assert(rec.currency);

  if (rec.type !== 'Album') {
    assert(rec.songTitle, 'song title should not be empty for non-albums');
    assert(rec.artist, "should never have empty artist on non-albums");
  }
};

exports.date = function(str) {
  return moment(str, 'YYYY/DD/MM').toDate();
};

