const { generateAbilities } = require('generators')

test('Abilities with empty buttonname are ignored unless remapid is set', () => {
  const abilities = [
    {
      id: 149,
      name: 'HallucinationColossus',
      buttonname: '',
      index: 1,
    },
    {
      id: 397,
      remapid: 3796,
      name: 'MedivacTransport',
      buttonname: '',
      friendlyname: 'UnloadUnit Medivac',
      index: 3,
    },
  ]

  expect(generateAbilities(abilities)).toEqual([
    { id: 3674, index: undefined, name: 'ATTACK' },
    { id: 397, name: 'UNLOADUNIT_MEDIVAC', index: 3 },
  ])
})

test('Only unique items kept in the list', () => {
  const abilities = [
    {
      id: 2839,
      name: 'AdvancedConstruction',
      buttonname: 'Cancel',
      index: 0,
    },
    {
      id: 2840,
      name: 'AdvancedConstruction',
      buttonname: 'Cancel',
      index: 0,
    },
    {
      id: 2841,
      name: 'AdvancedConstruction',
      buttonname: 'Cancel',
      index: 1,
    },
  ]

  expect(generateAbilities(abilities)).toEqual([
    { id: 2839, name: 'ADVANCEDCONSTRUCTION_CANCEL', index: 0 },
    { id: 3674, index: undefined, name: 'ATTACK' },
  ])
})

test('Ignores dummies', () => {
  const abilities = [
    {
      id: 4632,
      name: 'DummyAbil201',
      buttonname: '',
      index: 1,
    },
    {
      id: 3003,
      name: 'SpiderMineUnburrowRangeDummy',
      buttonname: '',
      index: 0,
    },
  ]

  expect(generateAbilities(abilities)).toEqual([{ id: 3674, index: undefined, name: 'ATTACK' }])
})
