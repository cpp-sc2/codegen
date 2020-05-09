const _ = require('lodash')
const transform = require('./transform')

const generateEnum = (src) => {
  const transformed = src.map(transform.escapeName)
  return _.sortBy(transformed, ['name', 'id'])
}

exports.generateUnits = (src) => {
  const transformed = src.map(transform.renameForCompatibility)
  return generateEnum(transformed)
}

exports.generateAbilities = (src) => {
  const transformed = src
    .filter((it) => it.buttonname || it.remapid)
    .map(transform.pickAbilityName)
  const generated = generateEnum(transformed)

  // NOTE (alkurbatov): Some abilities have equal names, but different IDs.
  // Usually we need the very first occurence in the list.
  return _.uniqWith(generated, (arrVal, othVal) => arrVal.name === othVal.name)
}

exports.generateUpgrades = (src) => {
  const upgrades = generateEnum(src)

  // NOTE (alkurbatov): Some upgrades have equal names, but different IDs.
  // Usually we need the very first occurence in the list.
  return _.uniqBy(upgrades, 'name')
}

exports.generateBuffs = (src) => generateEnum(src)

exports.generateEffects = (src) => generateEnum(src)
