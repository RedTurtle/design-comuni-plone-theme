/**
 * Button component.
 * This is a wrapper for Buttons, to eventually customize Button component if you don't like to use semantic-ui, for example.
 * @module components/Widget/OTPWidget
 */

/*
 * original: https://raw.githubusercontent.com/collective/volto-form-block/v3.17.1/src/components/Widget/Button.jsx
 *
 * CUSTOMIZATIONS:
 * - replaced `Button as SemanticButton` from `semantic-ui-react` with
 *   `Button as DesignButton` from `design-react-kit`
 * - remap semantic-ui-style props to design-react-kit props before
 *   rendering `DesignButton`: `primary`/`secondary` become `color: 'primary'`
 *   / `color: 'secondary'`, `basic` becomes `outline: true`, and `size` is
 *   bucketed from the semantic-ui scale to the design-react-kit scale
 *   (`mini`/`tiny`/`small` -> `xs`, `medium`/`large` -> `sm`,
 *   `big`/`huge`/`massive` -> `lg`)
 */

import { Button as DesignButton } from 'design-react-kit';

const Button = (props) => {
  let _props = { ...props };
  if (props.primary) {
    _props.color = 'primary';
    delete _props.primary;
  }
  if (props.secondary) {
    _props.color = 'secondary';
    delete _props.secondary;
  }
  if (props.basic) {
    _props.outline = true;
    delete _props.basic;
  }
  if (props.size) {
    switch (props.size) {
      case 'mini':
      case 'tiny':
      case 'small':
        _props.size = 'xs';
        break;
      case 'medium':
      case 'large':
        _props.size = 'sm';
        break;
      case 'big':
      case 'huge':
      case 'massive':
        _props.size = 'lg';
        break;
      default:
        break;
    }
  }
  return <DesignButton {..._props} />;
};

export default Button;
