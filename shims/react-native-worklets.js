const identity = (fn) => fn;

module.exports = {
  createSerializable: (value) => value,
  isWorkletFunction: () => false,
  runOnJS: identity,
  runOnUI: identity,
  executeOnUIRuntimeSync: identity,
  scheduleOnRN: identity,
  scheduleOnUI: identity,
  makeShareableCloneRecursive: (value) => value,
  createWorkletRuntime: () => ({}),
};
