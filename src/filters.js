exports.isDummy = ({ name }) => {
  return name.startsWith('Dummy') || name.endsWith('Dummy')
}
