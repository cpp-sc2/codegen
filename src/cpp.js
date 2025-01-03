const fs = require('fs')
const generators = require('./generators')

function dumpEnum(src, enumName, dst) {
  fs.appendFileSync(dst, `enum class ${enumName} {\n`)

  src.forEach(({ name, id }) => {
    fs.appendFileSync(dst, `    ${name} = ${id},\n`)
  })

  fs.appendFileSync(dst, '};\n\n')
}

function dumpSwitch(src, enumName, dst) {
  fs.appendFileSync(dst, `    switch ((${enumName})id) {\n`)

  src.forEach(({ name }) => {
    fs.appendFileSync(dst, `        case ${enumName}::${name}:\n            return "${name}";\n`)
  })

  fs.appendFileSync(dst, '        default:\n            return "UNKNOWN";\n    }\n')
}

function dumpHeader({ units, abilities, upgrades, buffs, effects }) {
  const dst = fs.openSync('./dist/sc2_typeenums.h', 'w')

  fs.appendFileSync(
    dst,
    `/*! \\file sc2_typeenums.h
\\brief A list of enums provided for your convenience.

All units and abilities are represented as unsigned numbers in the StarCraft II engine. This file aims to provide
a type safe and named way of representing various game types. Entries in it are generated by a custom
utility located at https://github.com/cpp-sc2/codegen
*/

#pragma once

#include "sc2_types.h"

namespace sc2 {
enum class UNIT_TYPEID;
enum class ABILITY_ID;
enum class UPGRADE_ID;
enum class BUFF_ID;
enum class EFFECT_ID;

using UnitTypeID = SC2Type<UNIT_TYPEID>;
using AbilityID = SC2Type<ABILITY_ID>;
using UpgradeID = SC2Type<UPGRADE_ID>;
using BuffID = SC2Type<BUFF_ID>;
using EffectID = SC2Type<EFFECT_ID>;

`
  )

  dumpEnum(units, 'UNIT_TYPEID', dst)
  dumpEnum(abilities, 'ABILITY_ID', dst)
  dumpEnum(upgrades, 'UPGRADE_ID', dst)
  dumpEnum(buffs, 'BUFF_ID', dst)
  dumpEnum(effects, 'EFFECT_ID', dst)

  fs.appendFileSync(
    dst,
    `//! Converts a UNIT_TYPEID into a string of the same name.
const char* UnitTypeToName(UnitTypeID id);

//! Converts a ABILITY_ID into a string of the same name.
const char* AbilityTypeToName(AbilityID id);

//! Converts a UPGRADE_ID into a string of the same name.
const char* UpgradeIDToName(UpgradeID id);

//! Converts a BUFF_ID into a string of the same name.
const char* BuffIDToName(BuffID id);

//! Converts a EFFECT_ID into a string of the same name.
const char* EffectIDToName(EffectID id);
}  // namespace sc2
`
  )

  fs.closeSync(dst)
}

function dumpCPP({ units, abilities, upgrades, buffs, effects }) {
  const dst = fs.openSync('./dist/sc2_typeenums.cpp', 'w')

  fs.appendFileSync(
    dst,
    `/*
Helper converter functions provided for your convenience.
Entries in it are generated by a custom utility located at https://github.com/cpp-sc2/codegen
*/

#include "sc2_typeenums.h"

namespace sc2 {
`
  )

  fs.appendFileSync(dst, 'const char* UnitTypeToName(UnitTypeID id) {\n')
  dumpSwitch(units, 'UNIT_TYPEID', dst)
  fs.appendFileSync(dst, '}\n\n')

  fs.appendFileSync(dst, 'const char* AbilityTypeToName(AbilityID id) {\n')
  dumpSwitch(abilities, 'ABILITY_ID', dst)
  fs.appendFileSync(dst, '}\n\n')

  fs.appendFileSync(dst, 'const char* UpgradeIDToName(UpgradeID id) {\n')
  dumpSwitch(upgrades, 'UPGRADE_ID', dst)
  fs.appendFileSync(dst, '}\n\n')

  fs.appendFileSync(dst, 'const char* BuffIDToName(BuffID id) {\n')
  dumpSwitch(buffs, 'BUFF_ID', dst)
  fs.appendFileSync(dst, '}\n\n')

  fs.appendFileSync(dst, 'const char* EffectIDToName(EffectID id) {\n')
  dumpSwitch(effects, 'EFFECT_ID', dst)
  fs.appendFileSync(dst, '}\n\n')

  fs.appendFileSync(dst, '}  // namespace sc2\n')
  fs.closeSync(dst)
}

module.exports = function generate(stableIDs) {
  const units = generators.generateUnits(stableIDs.Units)
  const abilities = generators.generateAbilities(stableIDs.Abilities)
  const upgrades = generators.generateUpgrades(stableIDs.Upgrades)
  const buffs = generators.generateBuffs(stableIDs.Buffs)
  const effects = generators.generateEffects(stableIDs.Effects)

  dumpHeader({ units, abilities, upgrades, buffs, effects })
  dumpCPP({ units, abilities, upgrades, buffs, effects })
}
