const React = require('react');
const { View } = require('react-native');

function Passthrough(props) {
  return React.createElement(View, props, props.children);
}

function emptyModifier() {
  return {};
}

function chainable() {
  const fn = function chained() {
    return chainable();
  };
  fn.plus = chainable;
  return fn;
}

const transition = new Proxy(
  {},
  {
    get: () => chainable,
  },
);

const stub = new Proxy(
  {
    Host: Passthrough,
    Box: Passthrough,
    Row: Passthrough,
    Icon: Passthrough,
    IconButton: Passthrough,
    HorizontalFloatingToolbar: Passthrough,
    AnimatedVisibility: Passthrough,
    RNHostView: Passthrough,
    EnterTransition: transition,
    ExitTransition: transition,
    fillMaxWidth: emptyModifier,
    fillMaxHeight: emptyModifier,
    padding: emptyModifier,
    imePadding: emptyModifier,
    height: emptyModifier,
  },
  {
    get(target, prop) {
      if (prop === '__esModule') {
        return true;
      }
      if (prop === 'default') {
        return stub;
      }
      if (prop in target) {
        return target[prop];
      }
      if (typeof prop === 'string' && prop[0] === prop[0].toLowerCase()) {
        return emptyModifier;
      }
      return Passthrough;
    },
  },
);

module.exports = stub;
