import React, { useState, useEffect, useMemo } from 'react';
import { usePrevious } from '@plone/volto/helpers';
import { Form, FormGroup, Label } from 'design-react-kit';
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
  required: {
    id: 'feedback_field_required',
    defaultMessage: 'required',
  },
  required_hint: {
    id: 'feedback_answers_required_hint',
    defaultMessage: 'Select an option to proceed',
  },
});

const RequiredTitle = ({ children, intl, id }) => (
  <span id={id}>
    {children}
    <span className="required-marker">
      <span aria-hidden="true">*</span>{' '}
      <span className="visually-hidden">
        {intl.formatMessage(messages.required)}
      </span>
    </span>
  </span>
);

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
  const selectedAnswer = getFormFieldValue('answer');
  const getInitialState = () => {
    if (userFeedback === null) return [];
    return getFeedbackQuestions(userFeedback);
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
    updateFormData('answer', e.target.value);
  };

  return (
    <>
      <fieldset
        id="vf-more-positive"
        className="answers-step"
        data-step={step}
        data-expanded={
          userFeedback !== null && userFeedback > threshold && step === 0
        }
        aria-hidden={
          userFeedback === null || userFeedback < threshold || step !== 0
        }
        data-element={'feedback-rating-positive'}
      >
        <FormHeader
          title={
            <RequiredTitle intl={intl} id="answers-title-positive">
              {intl.formatMessage(messages.header_positive)}
            </RequiredTitle>
          }
          step={step + 1}
          totalSteps={totalSteps}
          className={'answers-header'}
          hidden={
            userFeedback === null || userFeedback < threshold || step !== 0
          }
        />

        <fieldset
          className="answers-form-group"
          role="radiogroup"
          aria-required="true"
          aria-labelledby="answers-title-positive"
          aria-describedby="answers-required-hint-positive"
        >
          <Form className="answers-form">
            {state?.map((s, i) => (
              <FormGroup
                check
                key={'positive-' + s}
                className="border-bottom border-light mb-4"
              >
                <input
                  name="answer-input-positive"
                  id={'positive-' + s}
                  type="radio"
                  checked={s === selectedAnswer}
                  value={s}
                  onChange={handleAnswerChange}
                  autocomplete="off"
                  required
                />
                <Label
                  for={'positive-' + s}
                  check
                  className="mb-4"
                  data-element="feedback-rating-answer"
                >
                  {getTranslatedQuestion(intl, s)}
                </Label>
              </FormGroup>
            ))}
          </Form>
        </fieldset>
        <p
          id="answers-required-hint-positive"
          className="answers-required-hint small mb-0"
        >
          {intl.formatMessage(messages.required_hint)}
        </p>
      </fieldset>
      <fieldset
        id="vf-more-negative"
        className="answers-step"
        data-step={step}
        data-expanded={
          userFeedback !== null && userFeedback < threshold && step === 0
        }
        aria-hidden={
          userFeedback === null || userFeedback > threshold || step !== 0
        }
        data-element={'feedback-rating-negative'}
      >
        <FormHeader
          title={
            <RequiredTitle intl={intl} id="answers-title-negative">
              {intl.formatMessage(messages.header_negative)}
            </RequiredTitle>
          }
          step={step + 1}
          totalSteps={totalSteps}
          className={'answers-header'}
          hidden={
            userFeedback === null || userFeedback > threshold || step !== 0
          }
        />

        <fieldset
          className="answers-form-group"
          role="radiogroup"
          aria-required="true"
          aria-labelledby="answers-title-negative"
          aria-describedby="answers-required-hint-negative"
        >
          <Form className="answers-form">
            {state?.map((s, i) => (
              <FormGroup
                check
                key={'negative-' + s}
                className="border-bottom border-light mb-4"
              >
                <input
                  name="answer-input-negative"
                  id={'negative-' + s}
                  type="radio"
                  checked={s === selectedAnswer}
                  value={s}
                  onChange={handleAnswerChange}
                  autocomplete="off"
                  required
                />
                <Label
                  for={'negative-' + s}
                  check
                  className="mb-4"
                  data-element="feedback-rating-answer"
                >
                  {getTranslatedQuestion(intl, s)}
                </Label>
              </FormGroup>
            ))}
          </Form>
        </fieldset>
        <p
          id="answers-required-hint-negative"
          className="answers-required-hint small mb-0"
        >
          {intl.formatMessage(messages.required_hint)}
        </p>
      </fieldset>
    </>
  );
};

export default AnswersStep;
