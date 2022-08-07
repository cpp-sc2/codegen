jest.mock('fs')
const fs = require('fs')

const generate = require('cpp')

const stableIDs4083 = require('../../assets/4.8.3-stableid.json')
const stableIDs4104 = require('../../assets/4.10.4-stableid.json')
const stableIDs4114 = require('../../assets/4.11.4-stableid.json')
const stableIDs4120 = require('../../assets/4.12.0-stableid.json')
const stableIDs5005 = require('../../assets/5.0.5-stableid.json')
const stableIDs5010 = require('../../assets/5.0.10-stableid.json')

test('Generates c++ code for Sc2 v4.8.3', () => {
  generate(stableIDs4083)
  expect(fs.generatedHeader).toMatchSnapshot()
  expect(fs.generatedCPP).toMatchSnapshot()
})

test('Generates c++ code for Sc2 v4.10.4', () => {
  generate(stableIDs4104)
  expect(fs.generatedHeader).toMatchSnapshot()
  expect(fs.generatedCPP).toMatchSnapshot()
})

test('Generates c++ code for Sc2 v4.11.4', () => {
  generate(stableIDs4114)
  expect(fs.generatedHeader).toMatchSnapshot()
  expect(fs.generatedCPP).toMatchSnapshot()
})

test('Generates c++ code for Sc2 v4.12.0', () => {
  generate(stableIDs4120)
  expect(fs.generatedHeader).toMatchSnapshot()
  expect(fs.generatedCPP).toMatchSnapshot()
})

test('Generates c++ code for Sc2 v5.0.5', () => {
  generate(stableIDs5005)
  expect(fs.generatedHeader).toMatchSnapshot()
  expect(fs.generatedCPP).toMatchSnapshot()
})

test('Generates c++ code for Sc2 v5.0.10', () => {
  generate(stableIDs5010)
  expect(fs.generatedHeader).toMatchSnapshot()
  expect(fs.generatedCPP).toMatchSnapshot()
})
