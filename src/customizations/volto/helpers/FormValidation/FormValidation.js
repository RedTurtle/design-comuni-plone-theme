/**
 * original: https://raw.githubusercontent.com/plone/volto/18.35.0/packages/volto/src/helpers/FormValidation/FormValidation.jsx
 *
 * Upstream 18.0.3 renamed this file to `FormValidation.jsx` and rewrote
 * `validateFieldsPerFieldset` around a pluggable `config.getUtilities({ type: 'validator', ... })`
 * registry (validators dispatched by `format`, `fieldType`, `widget`, `behaviorName` and
 * `blockType`), plus a new exported `extractInvariantErrors` helper. This customization predates
 * that refactor and keeps the older, self-contained per-widget-type `widgetValidation` map instead.
 *
 * CUSTOMIZATIONS:
 * - Kept the pre-refactor `widgetValidation` object (`email`/`url`/`password`/`string`/`number`/
 *   `integer` validators, backed by local `isMaxPropertyValid`/`isMinPropertyValid` helpers)
 *   instead of adopting upstream's `config.getUtilities` validator-registry architecture; the
 *   upstream `format`/`widgetOptions.frontendOptions`/`behavior`/`blockType` validators and the
 *   `extractInvariantErrors` export are not present here.
 * - `widgetValidation` is extended with `...CUSTOM_DGFIELD_VALIDATION` (imported from
 *   `design-comuni-plone-theme/helpers`): a pluggable per-datagridfield validator registry keyed
 *   by the CT schema field id (e.g. `timeline_tempi_scadenze: { isValid(value, itemObj, intlFunc) }`),
 *   letting each dataGridField widget register its own row-level validation.
 * - `validateFieldsPerFieldset`: resolves each field's validator key via `realWidgetType(field,
 *   fieldId)` and, when no built-in `widgetValidation` entry exists for it, falls back to
 *   `getSpecificDataGridFieldValidation(fieldId)` to look up the matching
 *   `CUSTOM_DGFIELD_VALIDATION` criteria (both from `design-comuni-plone-theme/helpers`).
 * - `validateRequiredFields`: also calls `serviceFormValidationHelper(schema, formData,
 *   touchedField, fields)` to make the `motivo_stato_servizio` field required only when the
 *   "Servizio" content type's `stato_servizio` marks the service as not fruibile, and
 *   `eventFormValidationHelper(schema, formData, touchedField, fields, errors, formatMessage)`
 *   for Evento-specific conditional required fields (both from `design-comuni-plone-theme/helpers`).
 * - `validateRequiredFields`: required fields with `widget === 'data_grid'` are validated by
 *   reading `dgfRequiredFields` from `schema.properties[requiredField].items.required` and
 *   flagging the field as empty if any row in `formData[requiredField]` is missing one of those
 *   sub-fields (dataGridField required-field support, e.g. `timeline_tempi_scadenze`, which only
 *   has one of five row fields actually required).
 * - Emptiness of required fields is computed via `getRealEmptyField(formData, touchedField,
 *   requiredField, type, widget)` (from `design-comuni-plone-theme/helpers`), adding support for
 *   required fields with widget `"blocks"` (checking `blocks_layout` for actual text/table
 *   content) on top of the array/richtext/integer cases.
 */
import map from 'lodash/map';
import uniq from 'lodash/uniq';
import keys from 'lodash/keys';
import intersection from 'lodash/intersection';
import isEmpty from 'lodash/isEmpty';
import { messages } from '@plone/volto/helpers/MessageLabels/MessageLabels';
import { toast } from 'react-toastify';
import Toast from '@plone/volto/components/manage/Toast/Toast';
import {
  serviceFormValidationHelper,
  eventFormValidationHelper,
  getRealEmptyField,
  getSpecificDataGridFieldValidation,
  realWidgetType,
  CUSTOM_DGFIELD_VALIDATION,
} from 'design-comuni-plone-theme/helpers';
import config from '@plone/volto/registry';

/**
 * Will return the intl message if invalid
 * @param {boolean} isValid
 * @param {string} criterion
 * @param {string | number} valueToCompare can compare '47' < 50
 * @param {Function} intlFunc
 */
const validationMessage = (isValid, criterion, valueToCompare, intlFunc) =>
  !isValid
    ? intlFunc(messages[criterion], {
        len: valueToCompare,
      })
    : null;

/**
 * Returns if based on the criterion the value is lower or equal
 * @param {string | number} value can compare '47' < 50
 * @param {string | number} valueToCompare can compare '47' < 50
 * @param {string} maxCriterion
 * @param {Function} intlFunc
 */
const isMaxPropertyValid = (value, valueToCompare, maxCriterion, intlFunc) => {
  const isValid = valueToCompare !== undefined ? value <= valueToCompare : true;
  return validationMessage(isValid, maxCriterion, valueToCompare, intlFunc);
};

/**
 * Returns if based on the criterion the value is higher or equal
 * @param {string | number} value can compare '47' < 50
 * @param {string | number} valueToCompare can compare '47' < 50
 * @param {string} minCriterion
 * @param {Function} intlFunc
 */
const isMinPropertyValid = (value, valueToCompare, minCriterion, intlFunc) => {
  const isValid = valueToCompare !== undefined ? value >= valueToCompare : true;
  return validationMessage(isValid, minCriterion, valueToCompare, intlFunc);
};

const widgetValidation = {
  email: {
    isValidEmail: (emailValue, emailObj, intlFunc) => {
      // Email Regex taken from from WHATWG living standard:
      // https://html.spec.whatwg.org/multipage/input.html#e-mail-state-(type=email)
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      const isValid = emailRegex.test(emailValue);
      return !isValid ? intlFunc(messages.isValidEmail) : null;
    },
    minLength: (emailValue, emailObj, intlFunc) =>
      isMinPropertyValid(
        emailValue.length,
        emailObj.minLength,
        'minLength',
        intlFunc,
      ),
    maxLength: (emailValue, emailObj, intlFunc) =>
      isMaxPropertyValid(
        emailValue.length,
        emailObj.maxLength,
        'maxLength',
        intlFunc,
      ),
  },
  url: {
    isValidURL: (urlValue, urlObj, intlFunc) => {
      var urlRegex = new RegExp(
        '^' +
          '(https?:\\/\\/)?' + // optional protocol
          '(' +
          '([a-z\\d]+(-[a-z\\d]+)*\\.)+[a-z]{2,}|' + // validate domain name
          '(\\d{1,3}\\.){3}\\d{1,3}|' + // OR ip (v4) address
          'localhost' + // OR localhost
          ')' +
          '(\\:\\d+)?' + // optional port
          '(\\/[-a-z\\d%_.~+@:]*)*' + // path: zero or più caratteri, include ":" per SharePoint
          // '(\\?[;&a-z\\d%_.~+\\/=-]*)?' + // validate query string
          '(\\?.*)?' + // validate query string (relaxed)
          '(\\#[-a-z\\d\\/_]*)?' + // validate fragment locator
          '$',
        'i',
      );
      const isValid = urlRegex.test(urlValue);
      return !isValid ? intlFunc(messages.isValidURL) : null;
    },
    minLength: (urlValue, urlObj, intlFunc) =>
      isMinPropertyValid(
        urlValue.length,
        urlObj.minLength,
        'minLength',
        intlFunc,
      ),
    maxLength: (urlValue, urlObj, intlFunc) =>
      isMaxPropertyValid(
        urlValue.length,
        urlObj.maxLength,
        'maxLength',
        intlFunc,
      ),
  },
  password: {
    minLength: (passwordValue, passwordObj, intlFunc) =>
      isMinPropertyValid(
        passwordValue.length,
        passwordObj.minLength,
        'minLength',
        intlFunc,
      ),
    maxLength: (passwordValue, passwordObj, intlFunc) =>
      isMaxPropertyValid(
        passwordValue.length,
        passwordObj.maxLength,
        'maxLength',
        intlFunc,
      ),
  },
  string: {
    minLength: (value, itemObj, intlFunc) =>
      isMinPropertyValid(
        value.length,
        itemObj.minLength,
        'minLength',
        intlFunc,
      ),
    maxLength: (value, itemObj, intlFunc) =>
      isMaxPropertyValid(
        value.length,
        itemObj.maxLength,
        'maxLength',
        intlFunc,
      ),
  },
  number: {
    isNumber: (value, itemObj, intlFunc) => {
      const floatRegex = /^[+-]?\d+(\.\d+)?$/;
      const isValid = !isNaN(value) && floatRegex.test(value);
      return !isValid ? intlFunc(messages.isNumber) : null;
    },
    minimum: (value, itemObj, intlFunc) =>
      isMinPropertyValid(value, itemObj.minimum, 'minimum', intlFunc),
    maximum: (value, itemObj, intlFunc) =>
      isMaxPropertyValid(value, itemObj.maximum, 'maximum', intlFunc),
  },
  integer: {
    isInteger: (value, itemObj, intlFunc) => {
      const intRegex = /^-?[0-9]+$/;
      const isValid = !isNaN(value) && intRegex.test(value);
      return !isValid ? intlFunc(messages.isInteger) : null;
    },
    minimum: (value, itemObj, intlFunc) =>
      isMinPropertyValid(value, itemObj.minimum, 'minimum', intlFunc),
    maximum: (value, itemObj, intlFunc) =>
      isMaxPropertyValid(value, itemObj.maximum, 'maximum', intlFunc),
  },
  ...CUSTOM_DGFIELD_VALIDATION,
};

/**
 * The string that comes my not be a valid JSON
 * @param {string} requestItem
 */
export const tryParseJSON = (requestItem) => {
  let resultObj = null;
  try {
    resultObj = JSON.parse(requestItem);
  } catch (e) {
    try {
      resultObj = JSON.parse(requestItem.replace(/'/g, '"'));
    } catch (e) {
      resultObj = null;
    }
  }
  return resultObj;
};

/**
 * Returns errors if obj has unique Items
 * @param {Object} field
 * @param {*} fieldData
 * @returns {Object[string]} - list of errors
 */
const hasUniqueItems = (field, fieldData, formatMessage) => {
  const errors = [];
  if (
    field.uniqueItems &&
    fieldData &&
    uniq(fieldData).length !== fieldData.length
  ) {
    errors.push(formatMessage(messages.uniqueItems));
  }
  return errors;
};

/**
 * If required fields are undefined, return list of errors
 * @returns {Object[string]} - list of errors
 */
const validateRequiredFields = (
  schema,
  formData,
  formatMessage,
  touchedField,
) => {
  const errors = {};
  const fields = isEmpty(touchedField)
    ? // Custom: Serve creare una copia dei required
      // per poterlo modificare tre righe più giù
      schema.required.slice()
    : intersection(schema.required, keys(touchedField));

  serviceFormValidationHelper(schema, formData, touchedField, fields);
  eventFormValidationHelper(
    schema,
    formData,
    touchedField,
    fields,
    errors,
    formatMessage,
  );
  const uniqueFields = uniq(fields);
  map(uniqueFields, (requiredField) => {
    const type = schema.properties[requiredField]?.type;
    const widget = schema.properties[requiredField]?.widget;
    let isEmptyField = getRealEmptyField(
      formData,
      touchedField,
      requiredField,
      type,
      widget,
    );
    if (!isEmptyField) {
      if (type === 'array') {
        // Custom: Supporto alla validazione dei campi DataGridField
        if (widget === 'data_grid') {
          const dgfFields = schema.properties[requiredField]?.items;
          const dgfRequiredFields = dgfFields?.required;
          const dgfData = formData[requiredField];
          isEmptyField =
            dgfRequiredFields.filter((dgfRequiredField) =>
              dgfData.some((dgfField) => !!!dgfField[dgfRequiredField]),
            )?.length > 0;
        } else {
          isEmptyField = formData[requiredField]
            ? formData[requiredField].length === 0
            : true;
        }
      }
    }
    if (
      schema.properties[requiredField] &&
      schema.properties[requiredField].type !== 'boolean' &&
      !schema.properties[requiredField].readonly &&
      isEmptyField
    ) {
      errors[requiredField] = [];
      errors[requiredField].push(formatMessage(messages.required));
    }
  });
  return errors;
};
/**
 * Return list of errors if field constraints are not respected
 * (ex min, max, maxLength, email format, url format etc)
 * each potential criterion has a validation process in widgetValidation
 * !!ONLY fields with data will be tested (those undefined are ignored here)
 * @returns {Object[string]} - list of errors
 */
const validateFieldsPerFieldset = (
  schema,
  formData,
  formatMessage,
  touchedField,
) => {
  const errors = validateRequiredFields(
    schema,
    formData,
    formatMessage,
    touchedField,
  );

  map(schema.properties, (field, fieldId) => {
    const fieldWidgetType = realWidgetType(field, fieldId);
    const widgetValidationCriteria = widgetValidation[fieldWidgetType]
      ? Object.keys(widgetValidation[fieldWidgetType])
      : getSpecificDataGridFieldValidation(fieldId);
    let fieldData = formData[fieldId];
    // test each criterion ex maximum, isEmail, isUrl, maxLength etc
    const fieldErrors = widgetValidationCriteria
      .map((widgetCriterion) => {
        const errorMessage =
          fieldData === undefined || fieldData === null
            ? null
            : widgetValidation[fieldWidgetType][widgetCriterion](
                fieldData,
                field,
                formatMessage,
              );
        return errorMessage;
      })
      .filter((item) => !!item);

    const uniqueErrors = hasUniqueItems(field, fieldData, formatMessage);
    const mergedErrors = [...fieldErrors, ...uniqueErrors];

    if (mergedErrors.length > 0) {
      errors[fieldId] = [
        ...(errors[fieldId] || []),
        ...fieldErrors,
        ...uniqueErrors,
      ];
    }
  });

  return errors;
};

/**
 * Create the errors object from backend the same way it is done on Frontend validation
 * @param {string} requestError form the server
 * @returns {Object}
 */
const giveServerErrorsToCorrespondingFields = (requestError) => {
  let errorsList = tryParseJSON(requestError);
  const errors = {};

  if (Array.isArray(errorsList) && errorsList.length > 0) {
    errorsList.forEach((errorItem) => {
      errors[errorItem.field] = errors[errorItem.field]
        ? errors[errorItem.field].push(errorItem.message)
        : [errorItem.message];
    });
  }
  return errors;
};

/**
 * The first Fieldset (Tab) that has any errors
 * will be selected
 * @param {Object[]} errors
 * @param {string} errors[].field
 * @param {Object} schema
 * @returns {number} activeIndex
 */
const getIndexOfFirstTabWithErrors = (errors, schema) => {
  let activeIndex = 0;

  schema.fieldsets.some((fieldSet, index) => {
    let foundfield = fieldSet.fields.some((fieldId) => errors[fieldId]);

    activeIndex = foundfield ? index : activeIndex;
    return foundfield;
  });

  return activeIndex;
};

class FormValidation {
  /**
   * The first Fieldset (Tab) that has any errors
   * will be selected
   * @param {Object} errors
   * @param {Object} schema
   * @returns {number} activeIndex
   */
  static showFirstTabWithErrors({
    errors = {},
    schema = { properties: {}, fieldsets: [], required: [] },
  } = {}) {
    return getIndexOfFirstTabWithErrors(errors, schema);
  }
  /**
   * Create the errors object from backend the same way it is done on Frontend validation
   * @param {string} requestError form the server
   * @returns {Object}
   */
  static giveServerErrorsToCorrespondingFields(requestError = '') {
    return giveServerErrorsToCorrespondingFields(requestError);
  }
  /**
   * Return validation result
   * @param {Object} schema
   * @param {Object} formData
   * @param {function} formatMessage
   * @returns {Object} errors
   */
  static validateFieldsPerFieldset({
    schema = { properties: {}, fieldsets: [], required: [] },
    formData = {},
    formatMessage = () => {},
    touchedField = {},
  } = {}) {
    return validateFieldsPerFieldset(
      schema,
      formData,
      formatMessage,
      touchedField,
    );
  }
}

export default FormValidation;

/**
 * Check if a file upload is within the maximum size limit.
 * @param {File} file
 * @param {Function} intlFunc
 * @returns {Boolean}
 */
export const validateFileUploadSize = (file, intlFunc) => {
  const isValid =
    !config.settings.maxFileUploadSize ||
    file.size <= config.settings.maxFileUploadSize;
  if (!isValid) {
    toast.error(
      <Toast
        error
        title={intlFunc(messages.error)}
        content={intlFunc(messages.fileTooLarge, {
          limit: `${Math.floor(
            config.settings.maxFileUploadSize / 1024 / 1024,
          )}MB`,
        })}
      />,
    );
  }
  return isValid;
};
