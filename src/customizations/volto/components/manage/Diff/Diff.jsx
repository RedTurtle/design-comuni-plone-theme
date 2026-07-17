/**
 * Diff component.
 * @module components/manage/Diff/Diff
 */
/*
 * original: https://raw.githubusercontent.com/plone/volto/19.1.5/packages/volto/src/components/manage/Diff/Diff.jsx
 *
 * CUSTOMIZATIONS:
 * - Actually works and doesn't break down if user reloads page! Or goes back in the
 *   browser... Re-fetches content on mount when `type` is missing (recovering from a
 *   page reload), and creates an internal Redux store (via configureStore + Api),
 *   seeded from the app's current state, whenever the pathname changes - so DiffField
 *   can fully render blocks-based content while diffing.
 * - Added a nice loader (Progress from design-react-kit), history requests take up to
 *   6s to complete in local environment, which is... meh.
 * - Disable all dropdowns and buttons while loading. Fetch is long enough, we don't
 *   want users clicking everywhere and complaining.
 * - Removed the isEqual/getBlocksFieldname/getBlocksLayoutFieldname special-casing for
 *   blocks: every fieldset field (including blocks) is now rendered through the same
 *   DiffField, which receives store/history/contentOne/contentTwo and handles the
 *   equality and blocks diffing itself.
 * - Only renders the diff UI once contentLoaded and the internal store are ready
 *   (still short-circuits to Unauthorized on 401).
 * - Minor UI tweaks: responsive Grid columns, extra description text, smaller/compact
 *   buttons.
 */

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Helmet from '@plone/volto/helpers/Helmet/Helmet';
import { useSelector, useDispatch, useStore } from 'react-redux';
import filter from 'lodash/filter';
import map from 'lodash/map';
import { Container, Button, Dropdown, Grid, Table } from 'semantic-ui-react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import qs from 'query-string';
import { createBrowserHistory } from 'history';
import Api from '@plone/volto/helpers/Api/Api';
import configureStore from '@plone/volto/store';

import { getDiff } from '@plone/volto/actions/diff/diff';
import { getSchema } from '@plone/volto/actions/schema/schema';
import { getHistory } from '@plone/volto/actions/history/history';
import { getContent } from '@plone/volto/actions/content/content';
import { getBaseUrl } from '@plone/volto/helpers/Url/Url';
import FormattedDate from '@plone/volto/components/theme/FormattedDate/FormattedDate';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import Toolbar from '@plone/volto/components/manage/Toolbar/Toolbar';
import Unauthorized from '@plone/volto/components/theme/Unauthorized/Unauthorized';
import DiffField from './DiffField';
import { useClient } from '@plone/volto/hooks/client/useClient';

import backSVG from '@plone/volto/icons/back.svg';
import { Progress } from 'design-react-kit';

const messages = defineMessages({
  diff: {
    id: 'Diff',
    defaultMessage: 'Diff',
  },
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  split: {
    id: 'Split',
    defaultMessage: 'Split',
  },
  unified: {
    id: 'Unified',
    defaultMessage: 'Unified',
  },
  loadingPage: {
    id: 'Loading page...',
    defaultMessage: 'Sto caricando la pagina richiesta...',
  },
});

/**
 * Diff component.
 * @function Diff
 * @returns {JSX.Element}
 */
function Diff() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const outerStore = useStore();
  const isClient = useClient();
  const intl = useIntl();

  const data = useSelector((state) => state.diff.data);
  const historyEntries = useSelector((state) => state.history.entries);
  const schema = useSelector((state) => state.schema.schema);
  const error = useSelector((state) => state.diff.error);
  const title = useSelector((state) => state.content.data?.title);
  const type = useSelector((state) => state.content.data?.['@type']);
  const contentLoaded = useSelector((state) => state.content?.get.loaded);
  const historyLoading = useSelector((state) => state.diff.loading);
  const historyLoaded = useSelector((state) => state.diff.loaded);

  const pathname = location.pathname;
  const searchParams = qs.parse(location.search);
  const one = searchParams.one;
  const two = searchParams.two;
  const view = searchParams.view || 'split';

  const [store, setStore] = useState(null);
  const [internalHistory, setInternalHistory] = useState(null);

  useEffect(() => {
    const api = new Api();
    const browserHistory = createBrowserHistory();
    const newStore = configureStore(outerStore.getState(), browserHistory, api);
    if (newStore) {
      setStore(newStore);
      setInternalHistory(browserHistory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!type) {
      // need to refetch content, we lost it in reload
      dispatch(getContent(location.pathname.split('/diff')[0]));
    } else {
      dispatch(getSchema(type));
      dispatch(getHistory(getBaseUrl(pathname)));
      dispatch(getDiff(getBaseUrl(pathname), one, two));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, one, two, type]);

  /**
   * On select view handler
   * @method onSelectView
   * @param {object} event Event object
   * @param {string} value Value
   * @returns {undefined}
   */
  const onSelectView = (event, { value }) => {
    history.push(`${pathname}?one=${one}&two=${two}&view=${value}`);
  };

  /**
   * On change one handler
   * @method onChangeOne
   * @param {object} event Event object
   * @param {string} value Value
   * @returns {undefined}
   */
  const onChangeOne = (event, { value }) => {
    history.push(`${pathname}?one=${value}&two=${two}&view=${view}`);
  };

  /**
   * On change two handler
   * @method onChangeTwo
   * @param {object} event Event object
   * @param {string} value Value
   * @returns {undefined}
   */
  const onChangeTwo = (event, { value }) => {
    history.push(`${pathname}?one=${one}&two=${value}&view=${view}`);
  };

  const versions = map(
    filter(historyEntries, (entry) => 'version' in entry),
    (entry, index) => ({
      text: (
        <>
          {index === 0 ? 'Current' : entry.version}&nbsp;(
          <FormattedDate date={entry.time} long className="text" />, &nbsp;
          {entry.actor.fullname})
        </>
      ),
      value: `${entry.version}`,
      key: `${entry.version}`,
    }),
  );

  if (error?.status === 401) return <Unauthorized />;

  return (
    !error &&
    contentLoaded &&
    store && (
      <Container id="page-diff">
        <Helmet title={intl.formatMessage(messages.diff)} />
        <h1>
          <FormattedMessage
            id="Difference between revision {one} and {two} of {title}"
            defaultMessage="Difference between revision {one} and {two} of {title}"
            values={{
              one,
              two,
              title,
            }}
          />
        </h1>
        <Grid>
          <Grid.Column computer={9} tablet={12} mobile={12}>
            <p className="description">
              <FormattedMessage
                id="You can view the difference of the revisions below."
                defaultMessage="You can view the difference of the revisions below."
              />
            </p>
            <p className="description">
              <FormattedMessage
                id="Some blocks cannot be rendered in this view and placeholders will be visible. Use `See content at specific revision` tool to see ar complete render of this content."
                defaultMessage="Alcuni blocchi non possono essere renderizzati correttamente in questa vista e verranno mostrati dei placeholder al loro posto o delle informazioni incomplete. Per visualizzare un render completo di un contenuto ad una specifica versione, usa lo strumento Mostra questa revisione nella pagina della cronologia del contenuto."
              />
            </p>
          </Grid.Column>
          <Grid.Column computer={3} tablet={12} mobile={12} textAlign="right">
            <Button.Group size="small">
              {map(
                [
                  {
                    id: 'split',
                    label: intl.formatMessage(messages.split),
                  },
                  {
                    id: 'unified',
                    label: intl.formatMessage(messages.unified),
                  },
                ],
                (viewOption) => (
                  <Button
                    type="button"
                    key={viewOption.id}
                    value={viewOption.id}
                    active={view === viewOption.id}
                    onClick={onSelectView}
                    disabled={historyLoading && !historyLoaded}
                    className="primary"
                    size="tiny"
                    compact
                  >
                    {viewOption.label}
                  </Button>
                ),
              )}
            </Button.Group>
          </Grid.Column>
        </Grid>
        {historyEntries.length > 0 && (
          <Table basic="very">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={6}>
                  <FormattedMessage id="Base" defaultMessage="Base" />
                  <Dropdown
                    onChange={onChangeOne}
                    value={one}
                    selection
                    fluid
                    options={versions}
                    disabled={historyLoading && !historyLoaded}
                  />
                </Table.HeaderCell>
                <Table.HeaderCell width={6}>
                  <FormattedMessage id="Compare" defaultMessage="Compare" />
                  <Dropdown
                    onChange={onChangeTwo}
                    value={two}
                    selection
                    fluid
                    options={versions}
                    disabled={historyLoading && !historyLoaded}
                  />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          </Table>
        )}
        {historyLoading && !historyLoaded && (
          <Progress
            indeterminate
            label={intl.formatMessage(messages.loadingPage)}
          />
        )}
        {!historyLoading &&
          historyLoaded &&
          schema &&
          data.length > 0 &&
          map(schema.fieldsets, (fieldset) =>
            map(fieldset.fields, (field) => {
              return (
                <DiffField
                  key={field}
                  one={data?.[0]?.[field]}
                  two={data?.[1]?.[field]}
                  schema={schema.properties[field]}
                  view={view}
                  field={field}
                  store={store}
                  history={internalHistory}
                  contentOne={data?.[0]}
                  contentTwo={data?.[1]}
                />
              );
            }),
          )}

        {isClient &&
          createPortal(
            <Toolbar
              pathname={pathname}
              hideDefaultViewButtons
              inner={
                <Link
                  to={`${getBaseUrl(pathname)}/historyview`}
                  className="item"
                >
                  <Icon
                    name={backSVG}
                    className="contents circled"
                    size="30px"
                    title={intl.formatMessage(messages.back)}
                  />
                </Link>
              }
            />,
            document.getElementById('toolbar'),
          )}
      </Container>
    )
  );
}

export default Diff;
