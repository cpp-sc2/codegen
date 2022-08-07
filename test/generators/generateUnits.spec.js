const { generateUnits } = require('generators')

test('Generates list of units', () => {
  const units = [
    {
      id: 4,
      name: 'Colossus',
    },
    {
      id: 19,
      name: 'SupplyDepot',
    },
    {
      id: 100,
      name: 'Lair',
    },
    {
      id: 146,
      name: 'RichMineralField',
    },
    {
      id: 336,
      name: 'Dog',
    },
  ]

  expect(generateUnits(units)).toEqual([
    { id: 336, name: 'DOG' },
    { id: 146, name: 'NEUTRAL_RICHMINERALFIELD' },
    { id: 4, name: 'PROTOSS_COLOSSUS' },
    { id: 19, name: 'TERRAN_SUPPLYDEPOT' },
    { id: 100, name: 'ZERG_LAIR' },
  ])
})

test('Ignores dummies except ParasiticBombDummy', () => {
  const units = [
    {
      id: 1,
      name: 'System_Snapshot_Dummy',
    },
    {
      id: 153,
      name: 'MarineACGluescreenDummy',
    },
    {
      id: 154,
      name: 'FirebatACGluescreenDummy',
    },
    {
      id: 824,
      name: 'ParasiticBombDummy',
    },
  ]

  expect(generateUnits(units)).toEqual([
    {
      id: 824,
      name: 'ZERG_PARASITICBOMBDUMMY',
    },
  ])
})
