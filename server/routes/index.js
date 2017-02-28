var express = require('express');
var router = express.Router();

const Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: "multZ7Zasa_bJ0KSkTIsFQ",
  consumer_secret: "Yn2vDd_ByQDX2MXMmlfGWLqHD-s",
  token: "d700Aix09IstLeX_iCUyrpJwFn_eeiMv",
  token_secret: "a6jZAR8fiK86wpUJcgE9j3oLkZY"
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: "Hello world!" });
});

router.get('/:location', (req, res, next) => {
  yelp.search({ term: 'bar', location: req.params.location })
      .then(data => {
        res.send(data);
      })
})

module.exports = router;
