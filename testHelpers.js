export const findNodeWithTestId = (wrapper, testId) =>
  wrapper.findWhere(node => node.prop('testId') === testId)
