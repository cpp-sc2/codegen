const fs = require('fs')
const generators = require('./generators')

// FIXME (alkurbatov): Works for OS X only.
/* eslint-disable-next-line import/no-absolute-path */
const stableIDs = require('/Users/alkurbatov/Library/Application Support/Blizzard/StarCraft II/stableid.json')

function dumpEnum(src, enumName, dst) {
  fs.appendFileSync(dst, `enum class ${enumName} {\n`)

  src.forEach(({ name, id }) => {
    fs.appendFileSync(dst, `    ${name} = ${id},\n`)
  })

  fs.appendFileSync(dst, '};\n\n')
}

function main() {
  const dst = fs.openSync('./sc2_typeenums.h', 'w')

  fs.appendFileSync(
    dst,
    `
/*! \\file sc2_typeenums.h
\\brief A list of enums provided for your convenience.

All units and abilities are represented as unsigned numbers in the StarCraft II engine. This file aims to provide
a type safe and named way of representing unit types and ability types. Entries in it are generated by a custom
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

typedef SC2Type<UNIT_TYPEID> UnitTypeID;
typedef SC2Type<ABILITY_ID> AbilityID;
typedef SC2Type<UPGRADE_ID> UpgradeID;
typedef SC2Type<BUFF_ID> BuffID;
typedef SC2Type<EFFECT_ID> EffectID;

`
  )

  const units = generators.generateUnits(stableIDs.Units)
  dumpEnum(units, 'UNIT_TYPEID', dst)

  const abilities = generators.generateAbilities(stableIDs.Abilities)
  dumpEnum(abilities, 'ABILITY_ID', dst)

  const upgrades = generators.generateUpgrades(stableIDs.Upgrades)
  dumpEnum(upgrades, 'UPGRADE_ID', dst)

  const buffs = generators.generateBuffs(stableIDs.Buffs)
  dumpEnum(buffs, 'BUFF_ID', dst)

  const effects = generators.generateEffects(stableIDs.Effects)
  dumpEnum(effects, 'EFFECT_ID', dst)

  fs.appendFileSync(
    dst,
    `
//! Converts a UNIT_TYPEID into a string of the same name.
const char* UnitTypeToName(UnitTypeID unit_type);

//! Converts a ABILITY_ID into a string of the same name.
const char* AbilityTypeToName(AbilityID ability_type);

//! Converts a UPGRADE_ID into a string of the same name.
const char* UpgradeIDToName(UpgradeID upgrade_id);

//! Converts a BUFF_ID into a string of the same name.
const char* BuffIDToName(BuffID buff_id);

//! Converts a EFFECT_ID into a string of the same name.
const char* EffectIDToName(EffectID buff_id);
}  // namespace sc2
`
  )

  fs.closeSync(dst)
}

if (require.main === module) main()
