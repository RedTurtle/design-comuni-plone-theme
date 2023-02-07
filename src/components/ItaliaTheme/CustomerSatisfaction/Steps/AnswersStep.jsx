import React, { useState, useEffect, useMemo } from 'react';
import { usePrevious } from '@plone/volto/helpers';
import { Form, FormGroup, Input, Label } from 'design-react-kit';
import { defineMessages } from 'react-intl';
import {
  FormHeader,
  getFeedbackQuestions,
  getFeedbackThreshold,
  getTranslatedQuestion,
} from 'volto-feedback';

const messages = defineMessages({
  header_positive: {
    id: 'feedback_answers_header_positive',
    defaultMessage: 'Which were the aspects you liked the most?',
  },
  header_negative: {
    id: 'feedback_answers_header_negative',
    defaultMessage: 'Where did you encounter the biggest problems?',
  },
});

const AnswersStep = ({
  updateFormData,
  userFeedback,
  step,
  totalSteps,
  getFormFieldValue,
  intl,
}) => {
  const initializeState = (newState) => setState(newState);
  const threshold = useMemo(() => getFeedbackThreshold(), []);
  const getInitialState = () => {
    if (userFeedback === null) return {};
    const questions = getFeedbackQuestions(userFeedback);
    return questions?.reduce(
      (acc, curr) => ({
        ...acc,
        [curr]: false,
      }),
      {},
    );
  };
  const [state, setState] = useState(getInitialState());
  const prevFeedback = usePrevious(userFeedback);
  useEffect(() => {
    if (userFeedback !== null) {
      if (
        (prevFeedback &&
          prevFeedback <= threshold &&
          userFeedback >= threshold) ||
        (prevFeedback && prevFeedback >= threshold && userFeedback <= threshold)
      ) {
        updateFormData('answer', null);
      }
      if (prevFeedback !== userFeedback) initializeState(getInitialState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userFeedback]);

  const handleAnswerChange = (e) => {
    const newState = Object.keys(state).reduce((acc, curr) => {
      if (curr === e.target.name) return { ...acc, [curr]: true };
      else return { ...acc, [curr]: false };
    }, {});
    updateFormData('answer', e.target.name);
    setState(newState);
  };
  return (
    <div
      id="vf-more"
      className="answers-step"
      data-step={step}
      aria-expanded={userFeedback !== null}
      aria-hidden={userFeedback === null}
    >
      <FormHeader
        title={
          userFeedback > threshold
            ? intl.formatMessage(messages.header_positive)
            : intl.formatMessage(messages.header_negative)
        }
        step={step + 1}
        totalSteps={totalSteps}
        className={'answers-header'}
      />
      <Form className="answers-form">
        {Object.keys(state)?.map((s) => (
          <FormGroup check key={s} className="border-bottom border-light mb-4">
            <Input
              name={s}
              id={s}
              type="radio"
              value={getFormFieldValue('answer') === s}
              onChange={handleAnswerChange}
              addon
            />
            <Label for={s} check className="mb-4">
              {getTranslatedQuestion(intl, s)}
            </Label>
          </FormGroup>
        ))}
      </Form>
    </div>
  );
};

export default AnswersStep;
