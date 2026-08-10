/**
 * EndField component.
 * @module components/manage/Widgets/RecurrenceWidget/EndField
 *
 * original: https://raw.githubusercontent.com/plone/volto/19.1.5/packages/volto/src/components/manage/Widgets/RecurrenceWidget/EndField.jsx
 *
 * CUSTOMIZATIONS:
 * - added local React state (occurrenceValue, untilValue) for the count/until fields, kept in sync with the count/until props via useEffect, instead of reading the props directly (see https://github.com/plone/volto/pull/5555/files)
 * - count Input onChange: parses the typed value with parseInt and only calls onChange when a (truthy) value is present, instead of always calling onChange with the raw string value (or undefined when empty)
 * - until DatetimeWidget: value is read from the local untilValue state instead of the until prop, and its onChange updates that local state, only forwarding to onChange when a value is present
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import { Form, Grid, Input, Radio } from 'semantic-ui-react';
import DatetimeWidget from '../DatetimeWidget';

const messages = defineMessages({
  recurrenceEnds: { id: 'Recurrence ends', defaultMessage: 'Ends' },
  recurrenceEndsCount: { id: 'Recurrence ends after', defaultMessage: 'after' },
  recurrenceEndsUntil: { id: 'Recurrence ends on', defaultMessage: 'on' },
  occurrences: { id: 'Occurences', defaultMessage: 'occurrence(s)' },
});
/**
 * EndField component class.
 * @function EndField
 * @returns {string} Markup of the component.
 */
const EndField = ({ value, count, until, onChange, intl }) => {
  // Give state to fields, updating logic is convoluted,
  // update only when/if needed
  const [occurrenceValue, setOccurrenceValue] = useState(count);
  const [untilValue, setUntilValue] = useState(until);
  useEffect(() => setOccurrenceValue(count), [count]);
  useEffect(() => setUntilValue(until), [until]);
  return (
    <Form.Field inline className="text">
      <Grid>
        <Grid.Row stretched>
          <Grid.Column width="4">
            <div className="wrapper">
              <label htmlFor="recurrenceEnds">
                {intl.formatMessage(messages.recurrenceEnds)}
              </label>
            </div>
          </Grid.Column>
          <Grid.Column width="8">
            <Form.Group inline>
              <Form.Field>
                <Radio
                  label=""
                  name="recurrenceEnds"
                  id="recurrenceEndsCount"
                  value="count"
                  checked={value === 'count'}
                  onChange={(e, { value }) => onChange('recurrenceEnds', value)}
                />
              </Form.Field>
              <Form.Field disabled={value !== 'count'}>
                {intl.formatMessage(messages.recurrenceEndsCount)}
              </Form.Field>
              <Form.Field disabled={value !== 'count'}>
                <Input
                  id="count"
                  name="count"
                  value={occurrenceValue || ''}
                  onChange={({ target }) => {
                    setOccurrenceValue(target.value);
                    if (target.value) {
                      onChange(target.id, parseInt(target.value));
                    }
                  }}
                />
              </Form.Field>
              <Form.Field disabled={value !== 'count'}>
                {intl.formatMessage(messages.occurrences)}
              </Form.Field>
            </Form.Group>
            <Form.Group inline>
              <Form.Field>
                <Radio
                  id="recurrenceEndsUntil"
                  label=""
                  name="recurrenceEnds"
                  value="until"
                  checked={value === 'until'}
                  onChange={(e, { value }) => onChange('recurrenceEnds', value)}
                />
              </Form.Field>

              <Form.Field disabled={value !== 'until'}>
                <DatetimeWidget
                  id="until"
                  title={intl.formatMessage(messages.recurrenceEndsUntil)}
                  dateOnly={true}
                  value={
                    untilValue
                      ? typeof untilValue === 'string'
                        ? untilValue
                        : untilValue?.toISOString()
                      : ''
                  }
                  resettable={false}
                  onChange={(id, value) => {
                    setUntilValue(value);
                    if (value) onChange(id, value === '' ? undefined : value);
                  }}
                />
              </Form.Field>
            </Form.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form.Field>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
EndField.propTypes = {
  value: PropTypes.string,
  count: PropTypes.any,
  until: PropTypes.any,
  onChange: PropTypes.func,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
EndField.defaultProps = {
  value: null,
  count: null,
  until: null,
  onChange: null,
};

export default injectIntl(EndField);
