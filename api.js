var express = require('express')
var app = express()
const api = express.Router()
function pigLatin(str) {
  let strl = str.toLowerCase()
  let caps = false
  if (str[0] != strl[0]) {
    caps = true
  }
  str = str.toLowerCase()
  let vowels = ['a', 'e', 'i', 'o', 'u']
  let vowelIndex = 0
  if (vowels.includes(str[0])) {
    // If first letter is a vowel
    return str + 'way'
  } else {
    // If the first letter is a consonant
    for (let char of str) {
      if (vowels.includes(char)) {
        vowelIndex = str.indexOf(char)
        break
      }
    }
    let toReturn = str.slice(vowelIndex) + str.slice(0, vowelIndex) + 'ay'
    if (caps) {
      let firstLetter = toReturn[0]
      toReturn = toReturn.slice(1)
      toReturn = firstLetter.toUpperCase() + toReturn
    }
    return toReturn
  }
}
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

api.get('/rick', (req, res) => {
  res.writeHead(302, {
    Location: 'https://rickroll.now.sh'
  })
  res.end()
})

api.get('/:param', (req, res) => {
  res.send(pigLatin(req.params.param))
})
api.get('/', (req, res) => {
  res.send(
    `
Put something after the / to change it to pig latin \n
🐷
github.com/joshkmartinez/piglatin
    `
  )
})
app.use('/', api)
app.listen(3000, () => {
  //console.log('Server running on port 3000')
})
