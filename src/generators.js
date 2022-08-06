const _ = require('lodash')
const filters = require('./filters')
const transform = require('./transform')

const generateEnum = (src) => {
  const transformed = src.map(transform.escapeName)
  return _.sortBy(transformed, ['name', 'id'])
}

exports.generateUnits = (src) => {
  const transformed = src.map(transform.renameForCompatibility).filter((it) => !filters.isDummy(it))
  return generateEnum(transformed)
}

exports.generateAbilities = (src) => {
  const transformed = src
    .filter((it) => it.buttonname || it.remapid)
    .filter((it) => !filters.isDummy(it))
    .map(transform.pickAbilityName)

  // NOTE (alkurbatov): Kept for backward compatibility.
  transformed.push({ id: 3674, name: 'ATTACK' })

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

exports.generateBuffs = (src) => {
  // NOTE (alkurbatov): Since 5.0.10 some buffs have empty name.
  const transformed = src.filter((it) => it.name).filter((it) => !filters.isDummy(it))

  return generateEnum(transformed)
}

exports.generateEffects = (src) => {
  const transformed = src.map(({ id, name, friendlyName }) => ({ id, name: friendlyName || name }))
  return generateEnum(transformed)
}
