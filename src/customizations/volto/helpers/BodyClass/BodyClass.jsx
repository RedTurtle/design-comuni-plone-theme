/*
 * original: https://raw.githubusercontent.com/plone/volto/19.1.5/packages/volto/src/helpers/BodyClass/BodyClass.jsx
 *
 * CUSTOMIZATIONS:
 * - Added a `remove` prop (PropTypes.bool, default `false`) to `BodyClass`.
 *   `reducePropsToState` collects removals separately and applies them after
 *   the full list is built, so a `<BodyClass className="x" remove />` mounted
 *   anywhere always wins over an `add` for the same class name, regardless of
 *   which one mounted first. Needed because a `remove` instance can be mounted
 *   earlier in the tree (e.g. near the app root) than the instance whose class
 *   it needs to suppress (e.g. a Sidebar mounted deeper, later,
 *   permanently-but-hidden for a form widget).
 * - `className` (both when adding and when removing) is split into individual
 *   class tokens as soon as it is collected, and the resulting list is
 *   deduplicated, so SSR and client always produce the very same set.
 * - Dropped `react-side-effect` in favour of an equivalent registry kept in
 *   this module. Upstream registers every instance from
 *   `UNSAFE_componentWillMount`, i.e. during the RENDER phase: on React 18
 *   concurrent roots (`hydrateRoot`) a render pass can be discarded and
 *   restarted (interrupted hydration, Suspense retry, a throw caught by an
 *   error boundary), and the instances registered by the discarded pass stay
 *   in the registry forever, frozen on the props they had back then. Their
 *   classes are then merged with the ones of the live instances and the body
 *   ends up carrying, say, both `public-ui` and `cms-ui` with no way to
 *   recover. Registering from `componentDidMount` (commit phase) instead means
 *   only committed trees ever reach the registry. The server still registers
 *   while rendering, from the constructor, because `componentDidMount` is
 *   never called there and `renderToString` is synchronous and single pass.
 *   Upstream's `mountedInstances.splice(indexOf(this), 1)` is guarded too: an
 *   `indexOf` of -1 used to drop an unrelated, still mounted instance.
 * - `handleStateChangeOnClient` only touches the classes it wrote itself
 *   instead of resetting `document.body.className`, so classes set by third
 *   parties survive (e.g. the `search-modal-opened` set by
 *   ItaliaTheme/Header/HeaderSearch/SearchModal). On the first write of a
 *   document the classes already on the body (the ones rendered by the SSR)
 *   are adopted, so that they can be removed later on when they stop being
 *   part of the computed state.
 * - `canUseDOM` is exposed as a static, as `react-side-effect` did, so tests
 *   can monkeypatch it to exercise the server code path.
 */
import { Component, Children } from 'react';
import PropTypes from 'prop-types';

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

/**
 * The currently registered instances, in registration order.
 */
let mountedInstances = [];

/**
 * The last computed class list. Read on the server through `rewind()`.
 */
let state;

/**
 * The classes we last wrote on `<body>`. `null` means we never wrote on this
 * document yet, and the classes already there (the ones coming from the SSR)
 * still have to be adopted.
 */
let appliedClasses = null;

/**
 * reducePropsToState
 * @function reducePropsToState
 * @param {Array} propsList propsList
 * @returns {Array} classList
 */
function reducePropsToState(propsList) {
  const classList = [];
  const removals = new Set();

  propsList.forEach((props) => {
    if (!props.className) {
      return;
    }
    const classNames = props.className.split(' ').filter(Boolean);
    if (props.remove) {
      classNames.forEach((className) => removals.add(className));
    } else {
      classList.push(...classNames);
    }
  });

  return Array.from(new Set(classList)).filter(
    (className) => !removals.has(className),
  );
}

/**
 * handleStateChangeOnClient
 * @function handleStateChangeOnClient
 * @param {Array} classList classList
 * @returns {undefined}
 */
function handleStateChangeOnClient(classList) {
  const { body } = document;

  if (appliedClasses === null) {
    appliedClasses = new Set(body.className.split(' ').filter(Boolean));
  }

  const nextClasses = new Set(classList);

  appliedClasses.forEach((className) => {
    if (!nextClasses.has(className)) {
      body.classList.remove(className);
    }
  });
  nextClasses.forEach((className) => body.classList.add(className));

  appliedClasses = nextClasses;
}

/**
 * emitChange
 * @function emitChange
 * @returns {undefined}
 */
function emitChange() {
  state = reducePropsToState(mountedInstances.map((instance) => instance.props));

  if (BodyClass.canUseDOM) {
    handleStateChangeOnClient(state);
  }
}

/**
 * @export
 * @class BodyClass
 * @extends {Component}
 */
class BodyClass extends Component {
  constructor(props) {
    super(props);
    // On the server `componentDidMount` is never called, and `renderToString`
    // is synchronous and single pass, so registering while rendering is both
    // safe and required for `Html.jsx` to read the list through `rewind()`.
    if (!BodyClass.canUseDOM) {
      mountedInstances.push(this);
      emitChange();
    }
  }

  /**
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    mountedInstances.push(this);
    emitChange();
  }

  /**
   * @method componentDidUpdate
   * @param {Object} prevProps Previous properties
   * @returns {undefined}
   */
  componentDidUpdate(prevProps) {
    if (
      prevProps.className !== this.props.className ||
      prevProps.remove !== this.props.remove
    ) {
      emitChange();
    }
  }

  /**
   * @method componentWillUnmount
   * @returns {undefined}
   */
  componentWillUnmount() {
    const index = mountedInstances.indexOf(this);
    // Never reached in practice, but upstream's unguarded
    // `splice(indexOf(this), 1)` would drop the last, unrelated instance.
    if (index === -1) {
      return;
    }
    mountedInstances.splice(index, 1);
    emitChange();
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (this.props.children) {
      return Children.only(this.props.children);
    }
    return null;
  }
}

BodyClass.displayName = 'BodyClass';

BodyClass.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
  remove: PropTypes.bool,
};

BodyClass.defaultProps = {
  children: null,
  className: null,
  remove: false,
};

// Exposed so tests can monkeypatch it, as react-side-effect did.
BodyClass.canUseDOM = canUseDOM;

/**
 * peek
 * @function peek
 * @returns {Array} The current class list.
 */
BodyClass.peek = () => state;

/**
 * rewind
 * @function rewind
 * @returns {Array} The recorded class list, resetting the registry.
 */
BodyClass.rewind = () => {
  if (BodyClass.canUseDOM) {
    throw new Error(
      'You may only call rewind() on the server. Call peek() to read the current state.',
    );
  }

  const recordedState = state;
  state = undefined;
  mountedInstances = [];
  return recordedState;
};

export default BodyClass;
