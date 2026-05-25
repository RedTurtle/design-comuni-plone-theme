import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { Icon } from 'design-comuni-plone-theme/components/ItaliaTheme';
import { getSelectAriaLiveMessages } from 'design-comuni-plone-theme/helpers/react-select';
import './select-styles.css';

const messages = defineMessages({
  select_noOptionsMessage: {
    id: 'select_noOptionsMessage',
    defaultMessage: 'Nessuna opzione',
  },
  risultato: { id: 'select_risultato', defaultMessage: 'risultato' },
  risultati: { id: 'select_risultati', defaultMessage: 'risultati' },
  ay11_for_cancel: {
    id: 'ay11_select cancel',
    defaultMessage: 'Annulla',
  },
  dropwdown_indicator: {
    id: 'dropdown_indicator',
    defaultMessage: 'Apri il menu',
  },
  SelectInput_default_label: {
    id: 'SelectInput_default_label',
    defaultMessage: "Seleziona un'opzione",
  },
});

const SelectContainer = injectLazyLibs('reactSelect')(({
  children,
  ...props
}) => {
  const components = props.reactSelect.components;
  return (
    <div>
      <components.SelectContainer {...props}>
        {children}
      </components.SelectContainer>
    </div>
  );
});

SelectContainer.propTypes = {
  children: PropTypes.node,
};

const Option = injectLazyLibs('reactSelect')((props) => {
  const components = props.reactSelect.components;
  return (
    <div className="select-pill text-primary">
      <components.Option {...props} />
    </div>
  );
});

const MenuList = injectLazyLibs('reactSelect')(({ children, ...props }) => {
  const components = props.reactSelect.components;
  return (
    <div>
      <components.MenuList {...props}>{children}</components.MenuList>
    </div>
  );
});

MenuList.propTypes = {
  children: PropTypes.node,
};

const DropdownIndicator = injectLazyLibs('reactSelect')((props) => {
  const intl = useIntl();
  const components = props.reactSelect.components;
  return (
    <components.DropdownIndicator {...props}>
      <Icon
        icon="it-arrow-down-triangle"
        style={{ ariaHidden: true }}
        title={intl.formatMessage(messages.dropwdown_indicator)}
      />
    </components.DropdownIndicator>
  );
});

const GroupHeading = injectLazyLibs('reactSelect')((props) => {
  const components = props.reactSelect.components;
  return (
    <div>
      <components.GroupHeading {...props} />
    </div>
  );
});

const ClearIndicator = (props) => {
  const intl = useIntl();

  const {
    innerProps: { ref, ...restInnerProps },
  } = props;

  return (
    <div
      className="select-pill text-primary clearButton"
      {...restInnerProps}
      ref={ref}
    >
      <div
        style={{ padding: '0px 5px' }}
        title={intl.formatMessage(messages.ay11_for_cancel)}
      >
        <Icon
          icon="it-close"
          style={{ ariaHidden: true }}
          title={intl.formatMessage(messages.ay11_for_cancel)}
        />
      </div>
    </div>
  );
};

ClearIndicator.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
};

const SelectInput = ({
  id = 'design-select',
  value = null,
  placeholder = '',
  label,
  isDisabled = false,
  isSearchable = false,
  isMulti = false,
  isClearable = false,
  onChange,
  options,
  components = {},
  reactSelect,
  labelledby,
  defaultValue,
}) => {
  const intl = useIntl();
  const labelDefined =
    label || intl.formatMessage(messages.SelectInput_default_label);
  const Select = reactSelect.default;

  return (
    <div className="bootstrap-select-wrapper">
      {label && (
        <label className="active" htmlFor={!labelledby ? id : undefined}>
          {label}
        </label>
      )}
      <Select
        components={{
          MenuList,
          Option,
          SelectContainer,
          DropdownIndicator,
          ClearIndicator,
          GroupHeading,
          IndicatorSeparator: null,
          ...components,
        }}
        inputId={id}
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isSearchable={isSearchable}
        isMulti={isMulti}
        isClearable={isClearable}
        aria-label={labelDefined}
        aria-labelledby={!label ? labelledby : undefined}
        aria-live="polite"
        ariaLiveMessages={getSelectAriaLiveMessages(intl)}
        noOptionsMessage={() =>
          intl.formatMessage(messages.select_noOptionsMessage)
        }
        escapeClearsValue={true}
        screenReaderStatus={({ count }) =>
          `${count} ${
            count !== 1
              ? intl.formatMessage(messages.risultato)
              : intl.formatMessage(messages.risultati)
          }`
        }
        classNamePrefix={'react-select'}
        defaultValue={defaultValue}
      />
    </div>
  );
};

SelectInput.propTypes = {
  id: PropTypes.string,
  value: PropTypes.any.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  isDisabled: PropTypes.bool,
  isSearchable: PropTypes.bool,
  isMulti: PropTypes.bool,
  isClearable: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default injectLazyLibs('reactSelect')(SelectInput);
