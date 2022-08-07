const fs = jest.createMockFromModule('fs')

let marker

fs.generatedHeader = []
fs.generatedCPP = []

fs.openSync = function openSync(src) {
  if (src.endsWith('.cpp')) {
    fs.generatedCPP = []
    marker = fs.generatedCPP
    return
  }

  fs.generatedHeader = []
  marker = fs.generatedHeader
}

fs.appendFileSync = function appendFileSync(dst, data) {
  marker.push(data)
}

module.exports = fs
