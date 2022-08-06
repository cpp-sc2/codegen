const { generateBuffs } = require('generators')

test('Generates buffs', () => {
  const buffs = [
    {
      id: 17,
      name: 'FungalGrowth',
    },
    {
      id: 18,
      name: 'GuardianShield',
    },
    {
      id: 19,
      name: 'SeekerMissileTimeout',
    },
  ]

  expect(generateBuffs(buffs)).toEqual([
    { id: 17, name: 'FUNGALGROWTH' },
    { id: 18, name: 'GUARDIANSHIELD' },
    { id: 19, name: 'SEEKERMISSILETIMEOUT' },
  ])
})

test('Ignores buffs with empty names', () => {
  const buffs = [
    {
      id: 304,
      name: '',
    },
  ]

  expect(generateBuffs(buffs)).toEqual([])
})

test('Ignores dummies', () => {
  const buffs = [
    {
      id: 302,
      name: 'DummyBuff004',
    },
  ]

  expect(generateBuffs(buffs)).toEqual([])
})
