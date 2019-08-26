const axios = require('axios')

const rp = require('request-promise');
const $ = require('cheerio');

async function wikiInfo(citystr) {
  let data = await axios.get(`http://en.wikipedia.org/w/api.php?action=opensearch&search='${citystr}'&format=json`)

let urls = (data.data)
let dis = {"short" : urls[2][0] , "long" :  urls[2].join(",")  }
console.log(dis);

  return dis

}

module.exports = wikiInfo


wikiInfo("rome")