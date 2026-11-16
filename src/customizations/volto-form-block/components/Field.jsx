/**
 * Field
 * @module components/manage/Blocks/IconsBlocks/View
 */

/*
 * original: https://raw.githubusercontent.com/collective/volto-form-block/v3.17.1/src/components/Field.jsx
 *
 * CUSTOMIZATIONS:
 * - replaced the upstream `volto-form-block/components/Widget/*` widgets
 *   (TextWidget, TextareaWidget, NumberWidget, SelectWidget, RadioWidget,
 *   CheckboxListWidget, CheckboxWidget, DatetimeWidget, EmailWidget,
 *   WysiwygWidget) with design-react-kit `Input`, `FormGroup` and `Label`
 * - removed the `field_type === 'hidden'` case (HiddenWidget is no longer
 *   rendered)
 * - `select` field type renders a `react-select` `Select` directly instead of
 *   `SelectWidget`, with a custom `DropdownIndicator` showing an `Icon`
 *   "chevron-down" (design-comuni-plone-theme) and manual
 *   `.bootstrap-select-wrapper` / `<label>` / `aria-labelledby` markup; the
 *   `reactSelect` lib is read via `useLazyLibs(['reactSelect'])` scoped to
 *   just this branch, guarded by a post-mount `mounted` flag (the lib's
 *   "loaded" Redux flag can already be true on the client's first hydration
 *   pass, e.g. from a warm chunk cache, while SSR never has it loaded) —
 *   NOT by wrapping the whole `Field` export in `injectLazyLibs`, which is
 *   what an earlier version of this customization did and caused every
 *   field type (not just `select`) to render `null` during SSR, producing a
 *   hydration mismatch on every form field
 * - `single_choice`, `multiple_choice` and `checkbox` field types use manual
 *   `<fieldset>`/`<legend>` markup with design-react-kit `FormGroup check` +
 *   `Input`/`Label for=... check` (with `addon` to avoid the `form-control`
 *   class added by kit v4.0.2) and a hand-rolled `invalid-feedback` block for
 *   `errorMessage`, instead of `RadioWidget`/`CheckboxListWidget`/
 *   `CheckboxWidget`
 * - `date` field type uses design-react-kit `Input type="date"` instead of
 *   `DatetimeWidget`
 * - `attachment` field type uses
 *   `design-comuni-plone-theme/components/ItaliaTheme/manage/Widgets/FileWidget`
 *   instead of the upstream `volto-form-block/components/Widget/FileWidget`
 * - `email`/`from` field types use design-react-kit `Input type="email"` and
 *   force `required={true}` regardless of the field's own `required` prop,
 *   instead of `EmailWidget`
 * - `static_text` field type uses `TextEditorWidget`
 *   (design-comuni-plone-theme) in edit mode and `TextBlockView`
 *   (`@plone/volto-slate/blocks/Text`) in view mode, instead of
 *   `WysiwygWidget`/`dangerouslySetInnerHTML`; added `fromHtml` conversion for
 *   backward compatibility with the old draftjs-based value
 * - added `getLabel()` (appends " *" to the label when `required`) and an
 *   `infoText` helper combining `description`/`errorMessage`, since
 *   design-react-kit `Input` takes a single `label`/`infoText` prop instead of
 *   the separate `title`/`description`/`error` props used by the upstream
 *   widgets
 * - added a numeric-only `onKeyDown` filter on the `number` field
 * - added an `autocomplete`/`autoComplete` prop threaded through the text,
 *   textarea, number, select, date and email inputs (not present upstream)
 * - translated the `select_a_value` default message to Italian ("Seleziona un
 *   valore") and added the `static_field_placeholder`/`open_menu` messages
 * - removed the `import 'volto-form-block/components/Field.css'` stylesheet
 *   import
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl, defineMessages } from 'react-intl';
import { Input, FormGroup, Label } from 'design-react-kit';
import { Icon } from 'design-comuni-plone-theme/components/ItaliaTheme';

import FileWidget from 'design-comuni-plone-theme/components/ItaliaTheme/manage/Widgets/FileWidget';
import {
  injectLazyLibs,
  useLazyLibs,
} from '@plone/volto/helpers/Loadable/Loadable';
import { TextBlockView } from '@plone/volto-slate/blocks/Text';
import { TextEditorWidget } from 'design-comuni-plone-theme/components/ItaliaTheme';
import config from '@plone/volto/registry';

import { fromHtml } from 'design-comuni-plone-theme/config/Slate/utils';

const messages = defineMessages({
  select_a_value: {
    id: 'form_select_a_value',
    defaultMessage: 'Seleziona un valore',
  },
  static_field_placeholder: {
    id: 'form_static_field_placeholder',
    defaultMessage: 'Inserisci qui il testo statico da mostrare.',
  },
  open_menu: {
    id: 'open_menu',
    defaultMessage: 'Apri il menu',
  },
});

const DropdownIndicator = injectLazyLibs('reactSelect')((props) => {
  const intl = useIntl();
  const components = props.reactSelect.components;
  return (
    <components.DropdownIndicator {...props}>
      <Icon
        icon="chevron-down"
        style={{ ariaHidden: true }}
        title={intl.formatMessage(messages.open_menu)}
      />
    </components.DropdownIndicator>
  );
});

/**
 * Field class.
 * @class View
 * @extends Component
 */
const Field = ({
  label,
  description,
  name,
  required,
  field_type,
  field_id,
  input_values,
  value,
  onChange,
  isOnEdit,
  valid,
  disabled = false,
  formHasErrors = false,
  errorMessage,
  id,
  autocomplete,
}) => {
  const intl = useIntl();
  // reactSelect is only needed by the 'select' field type below: reading it
  // via the hook (instead of wrapping the whole Field export in
  // injectLazyLibs) keeps every other field type rendering immediately and
  // identically on the server and on the client's first hydration pass.
  // `mounted` additionally guards the 'select' branch itself, since
  // `reactSelect`'s "loaded" flag can already be true by the client's first
  // render (e.g. warm chunk cache) while SSR never has it loaded.
  const { reactSelect } = useLazyLibs(['reactSelect']);
  const Select = reactSelect?.default;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [selected, setSelected] = useState(false);

  const getLabel = () => {
    return required ? label + ' *' : label;
  };

  const isInvalid = () => {
    return !isOnEdit && !valid;
  };

  const infoText = errorMessage ? (
    <>
      <div className="form-text">{description}</div>
      {errorMessage}
    </>
  ) : (
    description
  );

  let static_text_value = value;
  if (field_type === 'static_text') {
    if (value?.data) {
      static_text_value = fromHtml(value);
    } //per retrocompatibilità con il vecchio widget che usava draftjs
  }
  return (
    <div className="field">
      {field_type === 'text' && (
        <Input
          id={name}
          name={name}
          label={getLabel()}
          type="text"
          required={required}
          infoText={infoText}
          disabled={disabled}
          readOnly={disabled}
          invalid={isInvalid() ? 'true' : null}
          onChange={(e) => {
            onChange(name, e.target.value);
          }}
          value={value ?? ''}
          autoComplete={autocomplete}
        />
      )}
      {field_type === 'textarea' && (
        <Input
          id={name}
          name={name}
          label={getLabel()}
          tag="textarea"
          rows={10}
          required={required}
          infoText={infoText}
          disabled={disabled}
          readOnly={disabled}
          invalid={isInvalid() ? 'true' : null}
          onChange={(e) => {
            onChange(name, e.target.value);
          }}
          value={value ?? undefined}
          autoComplete={autocomplete}
        />
      )}
      {field_type === 'number' && (
        <Input
          id={name}
          name={name}
          label={getLabel()}
          type="number"
          required={required}
          infoText={infoText}
          disabled={disabled}
          readOnly={disabled}
          invalid={isInvalid() ? 'true' : null}
          onChange={(e) => {
            onChange(name, e.target.value);
          }}
          onKeyDown={(e) => {
            if (
              !/[0-9eE+\-.,]/.test(e.key) &&
              e.key !== 'Backspace' &&
              e.key !== 'Tab' &&
              e.key !== 'ArrowLeft' &&
              e.key !== 'ArrowRight' &&
              e.key !== 'Delete'
            ) {
              e.preventDefault();
            }
          }}
          value={value ?? ''}
          autoComplete={autocomplete}
        />
      )}
      {field_type === 'select' && (
        <div className="form-group">
          <div
            className={`bootstrap-select-wrapper ${isInvalid() ? 'is-invalid' : ''
              }`}
          >
            <label id={`${name}-label`} htmlFor={name}>
              {getLabel()}
            </label>
            {mounted && Select && (
              <Select
                components={{
                  IndicatorSeparator: null,
                  DropdownIndicator,
                }}
                inputId={name}
                isSearchable={true}
                onChange={(v) => {
                  onChange(name, v.value);
                }}
                options={[
                  ...(input_values?.map((v) => ({ value: v, label: v })) ?? []),
                ]}
                aria-live="polite"
                isDisabled={disabled}
                placeholder={intl.formatMessage(messages.select_a_value)}
                aria-labelledby={`${name}-label`}
                classNamePrefix="react-select"
                className={isInvalid() ? 'is-invalid' : ''}
                value={value ? [{ value: value, label: value }] : []}
                autoComplete={autocomplete}
              />
            )}
            {description && <small className="form-text">{description}</small>}
            {errorMessage && (
              <div className="invalid-feedback form-feedback just-validate-error-label form-text form-feedback just-validate-error-label">
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      )}
      {field_type === 'single_choice' && (
        <div className="form-group">
          <div
            className={`bootstrap-checkbox-radio-wrapper ${isInvalid() ? 'is-invalid' : ''
              }`}
          >
            <fieldset className="radio-group">
              <legend>{getLabel()}</legend>
              {input_values?.map((v, index) => (
                <FormGroup check key={v + name + index}>
                  <Input
                    id={v + name}
                    name={name}
                    type="radio"
                    disabled={disabled}
                    readOnly={disabled}
                    onChange={(e) => {
                      onChange(name, v);
                    }}
                    addon // Needed to avoid application of form-control class as of kit v4.0.2
                    checked={value === v}
                  />
                  <Label for={v + name} check>
                    {v}
                  </Label>
                </FormGroup>
              ))}
              {description && (
                <small className="form-text">{description}</small>
              )}
              {errorMessage && (
                <div className="invalid-feedback form-feedback just-validate-error-label form-text form-feedback just-validate-error-label">
                  {errorMessage}
                </div>
              )}
            </fieldset>
          </div>
        </div>
      )}
      {field_type === 'multiple_choice' && (
        <div className="form-group">
          <div
            className={`bootstrap-checkbox-radio-wrapper ${isInvalid() ? 'is-invalid' : ''
              }`}
          >
            <fieldset className="checkbox-group">
              <legend>{getLabel()}</legend>
              {input_values?.map((v, index) => (
                <FormGroup check key={v + name + index}>
                  <Input
                    id={v + name}
                    name={name}
                    type="checkbox"
                    checked={value?.indexOf(v) > -1}
                    onChange={(e) => {
                      let values = JSON.parse(JSON.stringify(value ?? []));
                      if (e.target.checked) {
                        values.push(v);
                      } else {
                        values.splice(values.indexOf(v), 1);
                      }
                      onChange(name, values);
                    }}
                    invalid={isInvalid() ? 'true' : null}
                    addon // Needed to avoid application of form-control class as of kit v4.0.2
                  />
                  <Label for={v + name} check>
                    {v}
                  </Label>
                </FormGroup>
              ))}
              {description && (
                <small className="form-text">{description}</small>
              )}
              {errorMessage && (
                <div className="invalid-feedback form-feedback just-validate-error-label form-text form-feedback just-validate-error-label">
                  {errorMessage}
                </div>
              )}
            </fieldset>
          </div>
        </div>
      )}
      {field_type === 'checkbox' && (
        <div className="form-group">
          <div
            className={`bootstrap-checkbox-radio-wrapper ${isInvalid() ? 'is-invalid' : ''
              }`}
          >
            <FormGroup check key={name}>
              <Input
                id={name}
                name={name}
                type="checkbox"
                checked={!!value}
                onChange={(e) => {
                  onChange(name, e.target.checked);
                }}
                invalid={isInvalid() ? 'true' : null}
                required={required}
                addon // Needed to avoid application of form-control class as of kit v4.0.2
              />
              <Label for={name} check>
                {getLabel()}
              </Label>
            </FormGroup>
            {description && <small className="form-text">{description}</small>}
            {errorMessage && (
              <div className="invalid-feedback form-feedback just-validate-error-label form-text form-feedback just-validate-error-label">
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      )}
      {field_type === 'date' && (
        <Input
          id={name}
          name={name}
          label={getLabel()}
          type="date"
          required={required}
          infoText={infoText}
          disabled={disabled}
          readOnly={disabled}
          invalid={isInvalid() ? 'true' : null}
          onChange={(e) => {
            onChange(name, e.target.value);
          }}
          value={value ?? ''}
          autoComplete={autocomplete}
        />
      )}
      {field_type === 'attachment' && (
        <FileWidget
          id={name}
          name={name}
          label={getLabel()}
          type="file"
          required={required}
          infoText={infoText}
          disabled={disabled}
          readOnly={disabled}
          invalid={isInvalid() ? 'true' : null}
          onChange={onChange}
          onEdit={isOnEdit}
          value={value}
        />
      )}
      {(field_type === 'from' || field_type === 'email') && (
        <Input
          id={name}
          name={name}
          label={getLabel()}
          type="email"
          required={true}
          infoText={infoText}
          disabled={disabled}
          readOnly={disabled}
          invalid={isInvalid() ? 'true' : null}
          validationText={errorMessage}
          onChange={(e) => {
            onChange(name, e.target.value);
          }}
          value={value ?? ''}
          autoComplete={autocomplete}
        />
      )}

      {field_type === 'static_text' && (
        <>
          {isOnEdit ? (
            <div className="mb-2">
              <TextEditorWidget
                value={static_text_value}
                selected={selected}
                setSelected={setSelected}
                placeholder={intl.formatMessage(
                  messages.static_field_placeholder,
                )}
                showToolbar={true}
                onChangeBlock={(block, data) => {
                  onChange(name, data.value);
                }}
              />
            </div>
          ) : value ? (
            <div className="static-text">
              <TextBlockView id={name} data={{ value: static_text_value }} />
            </div>
          ) : (
            <br />
          )}
        </>
      )}
      {config.blocks.blocksConfig.form.additionalFields?.reduce((acc, val) => {
        if (val.id === field_type)
          return [
            ...acc,
            <val.component
              id={name}
              name={name}
              title={label}
              description={description}
              infoText={infoText}
              required={required}
              onChange={onChange}
              value={value}
              isDisabled={disabled}
              formHasErrors={formHasErrors}
              invalid={isInvalid().toString()}
              {...(isInvalid() ? { className: 'is-invalid' } : {})}
            />,
          ];

        return acc;
      }, []) ?? []}
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Field.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  required: PropTypes.bool,
  field_type: PropTypes.string,
  input_values: PropTypes.any,
  value: PropTypes.any,
  formHasErrors: PropTypes.bool,
  onChange: PropTypes.func,
  autoComplete: PropTypes.string,
};

export default Field;
