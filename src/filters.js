exports.isDummy = ({ name }) => {
  // NB (alkurbatov): The only useful dummy.
  // When a unit with parasitic bomb on it dies,
  // the parasitic bomb remains active at that location.
  // This is done by attaching the parasitic bomb buff to a dummy unit.
  if (name === 'Zerg_ParasiticBombDummy') return false

  return name.startsWith('Dummy') || name.endsWith('Dummy')
}
