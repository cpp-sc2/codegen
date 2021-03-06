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
