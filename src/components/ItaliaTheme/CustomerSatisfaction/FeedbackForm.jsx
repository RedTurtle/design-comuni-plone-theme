import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useIntl, defineMessages } from 'react-intl';
import { isCmsUi } from '@plone/volto/helpers';
import {
  Container,
  Row,
  Col,
  Spinner,
  Card,
  Button,
  CardHeader,
} from 'design-react-kit';
import {
  getNumberOfSteps,
  getTranslatedQuestion,
  HoneypotWidget,
  GoogleReCaptchaWidget,
  submitFeedback,
  resetSubmitFeedback,
  getFeedbackThreshold,
} from 'volto-feedback';
import cx from 'classnames';
import AnswersStep from './Steps/AnswersStep';
import CommentsStep from './Steps/CommentsStep';
import RTRating from './Steps/Commons/Rating';
import { PropTypes } from 'prop-types';

const messages = defineMessages({
  title: {
    id: 'feedback_form_title',
    defaultMessage: 'How clear is the information on this page?',
  },
  service_title: {
    id: 'feedback_form_title_service',
    defaultMessage: 'How easy was it to use this service?',
  },
  yes: {
    id: 'feedback_form_yes',
    defaultMessage: 'Yes',
  },
  no: {
    id: 'feedback_form_no',
    defaultMessage: 'No',
  },
  suggestions_placeholder: {
    id: 'feedback_form_suggestions_placeholder',
    defaultMessage:
      'Explain us why, and help us improve the quality of the site',
  },
  submit: {
    id: 'feedback_form_submit',
    defaultMessage: 'Submit your comment',
  },
  thank_you: {
    id: 'feedback_form_thank_you',
    defaultMessage: 'Thank you for your feedback!',
  },
  next: {
    id: 'feedback_form_button_next',
    defaultMessage: 'Next',
  },
  next_disabled: {
    id: 'feedback_form_button_next_disabled',
    defaultMessage: 'Avanti, disabilitato',
  },
  prev: {
    id: 'feedback_form_button_prev',
    defaultMessage: 'Previous',
  },
  prev_disabled: {
    id: 'feedback_form_button_prev_disabled',
    defaultMessage: 'Indietro, disabilitato',
  },
  feedback_sent: {
    id: 'feedback_sent',
    defaultMessage: 'Your feedback was sent!',
  },
  unclear_instructions: {
    id: 'feedback_unclear_instructions',
    defaultMessage: 'Some instructions were not clear and confusin',
  },
  incomplete_instructions: {
    id: 'feedback_incomplete_instructions',
    defaultMessage: 'Some instructions were incomplete',
  },
  unclear_proceeding: {
    id: 'feedback_unclear_proceeding',
    defaultMessage:
      "Sometimes I couldn't understand if I was proceeding correctly",
  },
  technical_problems: {
    id: 'feedback_technical_problems',
    defaultMessage: 'I ran into technical problems',
  },
  other_negative: {
    id: 'feedback_other_negative',
    defaultMessage: 'Other',
  },
  clear_instructions: {
    id: 'feedback_clear_instructions',
    defaultMessage: 'The instructions were clear',
  },
  complete_instructions: {
    id: 'feedback_complete_instructions',
    defaultMessage: 'The instructions were complete',
  },
  clear_proceeding: {
    id: 'feedback_clear_proceeding',
    defaultMessage: 'I always understood that I was proceeding correctly',
  },
  no_technical_problems: {
    id: 'feedback_no_technical_problems',
    defaultMessage: 'I had no technical problems',
  },
  other_positive: {
    id: 'feedback_other_positive',
    defaultMessage: 'Other',
  },
});

const FeedbackForm = ({ contentType, pathname }) => {
  const intl = useIntl();
  const location = useLocation();
  const path = pathname ?? location.pathname ?? '/';
  const dispatch = useDispatch();
  const [satisfaction, setSatisfaction] = useState(null);
  const [step, setStep] = useState(0);
  const [invalidForm, setInvalidForm] = useState(true);
  const [formData, setFormData] = useState({});
  const captcha = !!process.env.RAZZLE_RECAPTCHA_KEY ? 'GoogleReCaptcha' : null;
  const submitResults = useSelector((state) => state.submitFeedback);
  const [validToken, setValidToken] = useState(null);
  const threshold = getFeedbackThreshold();
  const fieldHoney = __CLIENT__
    ? window.env.RAZZLE_HONEYPOT_FIELD
    : process.env.RAZZLE_HONEYPOT_FIELD;

  const numberOfSteps = useMemo(() => getNumberOfSteps(), []);

  const changeSatisfaction = (e) => {
    setSatisfaction(e);
  };

  const updateFormData = (field, value) => {
    if (field === 'comment') {
      if (value?.length > 200) setInvalidForm(true);
      else setInvalidForm(false);
    }
    if (field === 'answer') {
      if (!value) setInvalidForm(true);
      else setInvalidForm(false);
    }
    setFormData({
      ...formData,
      [field]: value,
    });
  };
  const getFormFieldValue = (field) => formData?.[field] ?? undefined;

  const nextStep = () => {
    if (!invalidForm) setStep(step + 1);
  };

  const prevStep = () => {
    if (!invalidForm && step !== 0) setStep(step - 1);
  };

  useEffect(() => {
    setValidToken(null);
    setSatisfaction(null);
    return () => {
      dispatch(resetSubmitFeedback());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  useEffect(() => {
    updateFormData('vote', satisfaction ?? null);
    setStep(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [satisfaction]);

  // initialized honeypot field
  useEffect(() => {
    updateFormData(fieldHoney, '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldHoney]);

  const onVerifyCaptcha = useCallback(
    (token) => {
      if (satisfaction !== null && !validToken) {
        setValidToken(token);
      }
    },
    [satisfaction, setValidToken, validToken],
  );

  const resetFormData = () => {
    setFormData({
      [fieldHoney]: '',
    });
  };

  const sendFormData = () => {
    if (invalidForm) return;
    setStep(2);
    const data = {
      ...formData,
      ...(captcha && { 'g-recaptcha-response': validToken }),
      answer: getTranslatedQuestion(intl, formData.answer),
    };
    dispatch(submitFeedback(path, data));
    resetFormData();
  };

  let action = path?.length > 1 ? path.replace(/\//g, '') : path;
  if (action?.length > 0) {
    action = action?.replace(/-/g, '_');
  } else {
    action = 'homepage';
  }

  if (isCmsUi(path)) {
    return null;
  }
  return (
    <div className="bg-primary customer-satisfaction">
      <Container>
        <Row className="d-flex justify-content-center bg-primary">
          <Col className="col-12 col-lg-6">
            <div className="feedback-form" role="form" aria-live="polite">
              <Card
                className="shadow card-wrapper py-4 px-4"
                data-element="feedback"
              >
                {!submitResults?.loading &&
                  !submitResults.loaded &&
                  step !== 2 && (
                    <>
                      <h2
                        id="vf-radiogroup-label"
                        className="title-medium-2-semi-bold mb-0"
                        data-element="feedback-title"
                      >
                        {/* Il validatore a quanto pare fa il check per titolo.
                            Il titolo da specifiche deve essere diverso per Servizi, ma loro non lo sanno
                            https://github.com/italia/pa-website-validator/blob/main/src/storage/municipality/feedbackComponentStructure.ts#L8
                        */}
                        {/* {contentType === 'Servizio'
                          ? intl.formatMessage(messages.service_title)
                          : intl.formatMessage(messages.title)} */}

                        {/* Aggiunto titolo per compatibilità modello AGID di io-cittadino */}
                        {contentType === 'ModelloPratica'
                          ? intl.formatMessage(messages.service_title)
                          : intl.formatMessage(messages.title)}
                      </h2>
                      <div className="rating-container mb-0">
                        <RTRating
                          name="satisfaction"
                          value={satisfaction}
                          // Qui l'implementazione di design react kit sta su con gli stecchini, fatta funzionare a pugni
                          inputs={[
                            {
                              name: 'star1b',
                              value: 1,
                            },
                            {
                              name: 'star2b',
                              value: 2,
                            },
                            {
                              name: 'star3b',
                              value: 3,
                            },
                            {
                              name: 'star4b',
                              value: 4,
                            },
                            {
                              name: 'star5b',
                              value: 5,
                            },
                          ]}
                          aria-controls={
                            satisfaction > threshold
                              ? 'vf-more-positive'
                              : 'vf-more-negative'
                          }
                          className="volto-feedback-rating mb-0"
                          onChangeRating={changeSatisfaction}
                          legend=" "
                          wrapperClassName={'rating'}
                        />
                      </div>
                      <AnswersStep
                        updateFormData={updateFormData}
                        userFeedback={satisfaction}
                        intl={intl}
                        step={step}
                        totalSteps={numberOfSteps}
                        getFormFieldValue={getFormFieldValue}
                      />
                      <CommentsStep
                        updateFormData={updateFormData}
                        userFeedback={satisfaction}
                        intl={intl}
                        step={step}
                        totalSteps={numberOfSteps}
                        getFormFieldValue={getFormFieldValue}
                      />
                      <HoneypotWidget
                        updateFormData={updateFormData}
                        field={fieldHoney}
                      />
                      <GoogleReCaptchaWidget
                        key={action}
                        onVerify={onVerifyCaptcha}
                        action={action}
                      />
                      <div
                        className={cx(
                          'form-step-actions d-flex flex-nowrap w100 justify-content-center button-shadow',
                          {
                            'pt-4': satisfaction,
                          },
                        )}
                        aria-hidden={!satisfaction}
                      >
                        {/* Bug bottoni del kit. Disabled e' settato anche se compare la prop aria-disabled,
                        quando lo scopo sarebbe continuare a poter usufruire dei focus anche in screen reader */}
                        <Button
                          type="button"
                          color="primary"
                          onClick={prevStep}
                          outline
                          aria-labelledby={
                            !invalidForm && step !== 0
                              ? intl.formatMessage(messages.prev)
                              : intl.formatMessage(messages.prev_disabled)
                          }
                          className={cx('prev-action', {
                            disabled: step === 0,
                          })}
                          aria-disabled={!(!invalidForm && step !== 0)}
                        >
                          {intl.formatMessage(messages.prev)}
                        </Button>

                        {step !== numberOfSteps - 1 && (
                          <Button
                            type="button"
                            onClick={nextStep}
                            aria-labelledby={
                              !invalidForm
                                ? intl.formatMessage(messages.next)
                                : intl.formatMessage(messages.next_disabled)
                            }
                            className={cx('next-action fw-bold', {
                              disabled: invalidForm,
                            })}
                          >
                            {intl.formatMessage(messages.next)}
                          </Button>
                        )}
                        {step === numberOfSteps - 1 && (
                          <Button
                            className={cx('next-action fw-bold', {
                              disabled: invalidForm,
                            })}
                            color="primary"
                            aria-labelledby={
                              !invalidForm
                                ? intl.formatMessage(messages.next)
                                : intl.formatMessage(messages.next_disabled)
                            }
                            type={'button'}
                            onClick={sendFormData}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !invalidForm)
                                sendFormData();
                            }}
                          >
                            {intl.formatMessage(messages.next)}
                          </Button>
                        )}
                      </div>
                    </>
                  )}
                {submitResults?.loading && (
                  <div className="d-flex justify-content-center align-items-center">
                    <Spinner double active />
                  </div>
                )}
                {submitResults?.loaded && step === 2 && (
                  <CardHeader className="border-0 mb-0 px-0">
                    <h4
                      id="rating-feedback"
                      className="title-medium-2-semi-bold mb-0"
                    >
                      {intl.formatMessage(messages.thank_you)}
                    </h4>
                  </CardHeader>
                )}
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

FeedbackForm.propTypes = {
  contentType: PropTypes.string,
  pathname: PropTypes.string,
};

export default FeedbackForm;
