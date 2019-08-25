const axios= require ('axios')

async function  wikiInfo( citystr) {  
  let data= await axios.get(`http://en.wikipedia.org/w/api.php?action=opensearch&search='${citystr}'&format=json`)
  return data.data

}

module.exports = wikiInfo