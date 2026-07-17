/*
 * original: https://raw.githubusercontent.com/plone/volto/19.1.5/packages/volto/src/components/manage/Sidebar/ObjectBrowser.jsx
 *
 * CUSTOMIZATIONS:
 * - Gestione di onBlur del campo alla chiusura del widget: se l'ObjectBrowser
 *   è aperto e i dati non sono vuoti, viene invocato this.props.onBlur con i
 *   dati correnti prima di chiudere il popup
 * - Semplificata la condizione che sceglie i dati da passare a
 *   ObjectBrowserBody, rimuovendo il controllo aggiuntivo su
 *   this.props[this.state.propDataName] (si usa solo this.state.propDataName)
 */

import React from 'react';
import ObjectBrowserBody from '@plone/volto/components/manage/Sidebar/ObjectBrowserBody';
import SidebarPopup from '@plone/volto/components/manage/Sidebar/SidebarPopup';
import { getBaseUrl } from '@plone/volto/helpers/Url/Url';
import isEmpty from 'lodash/isEmpty';

const withObjectBrowser = (WrappedComponent) =>
  class extends React.Component {
    /**
     * Default properties
     * @property {Object} defaultProps Default properties.
     * @static
     */
    static defaultProps = {
      onChangeBlock: () => {},
      data: {},
      block: new Date().getTime() + '',
    };

    constructor() {
      super();
      this.state = { isObjectBrowserOpen: false };
    }

    /**
     * openObjectBrowser
     * @function openObjectBrowser
     * @param {Object} object ObjectBrowser configuration.
     * @param {string} object.mode Quick mode, defaults to `image`. Values: link, image, multiple
     * @param {string} object.dataName Name of the block data property to write the selected item.
     * @param {string} object.onSelectItem Function that will be called on item selection.
     * @param {string} object.overlay Boolean to show overlay background on content when opening objectBrowser.
     *
     * Usage:
     *
     * this.props.openObjectBrowser();
     *
     * this.props.openObjectBrowser({mode: 'link'});
     *
     * this.props.openObjectBrowser({
     *   dataName: 'myfancydatafield'
     *   });
     *
     * this.props.openObjectBrowser({
     *   onSelectItem: url =>
     *     this.props.onChangeBlock(this.props.block, {
     *       ...this.props.data,
     *       myfancydatafield: url,
     *     }),
     *   });
     */
    openObjectBrowser = ({
      mode = 'image',
      onSelectItem = null,
      dataName = null,
      overlay = null,
      propDataName = null,
      searchableTypes,
      selectableTypes,
      maximumSelectionSize,
      currentPath,
      initialPath,
      onlyFolderishSelectable,
    } = {}) =>
      this.setState(() => ({
        isObjectBrowserOpen: true,
        mode,
        onSelectItem,
        dataName,
        overlay,
        propDataName,
        searchableTypes,
        selectableTypes,
        maximumSelectionSize,
        currentPath,
        initialPath,
        onlyFolderishSelectable,
      }));

    closeObjectBrowser = () => {
      if (
        this.state.isObjectBrowserOpen &&
        this.props.onBlur &&
        !isEmpty(this.props.data)
      ) {
        this.props.onBlur(this.props.id, { ...this.props.data });
      }
      if (this.state.isObjectBrowserOpen)
        this.setState({ isObjectBrowserOpen: false });
    };

    render() {
      let contextURL =
        this.state?.currentPath ||
        this.props.pathname ||
        this.props.location?.pathname;

      let initialPath = this.state?.initialPath
        ? getBaseUrl(this.state.initialPath)
        : null;

      return (
        <>
          <WrappedComponent
            {...this.props}
            isObjectBrowserOpen={this.state.isObjectBrowserOpen}
            openObjectBrowser={this.openObjectBrowser}
            closeObjectBrowser={this.closeObjectBrowser}
          />

          <>
            <SidebarPopup
              open={this.state.isObjectBrowserOpen}
              onClose={this.closeObjectBrowser}
              overlay={this.state.overlay}
            >
              <ObjectBrowserBody
                {...this.props}
                data={
                  this.state.propDataName
                    ? this.props[this.state.propDataName]
                    : this.props.data
                }
                contextURL={getBaseUrl(contextURL)}
                initialPath={initialPath}
                closeObjectBrowser={this.closeObjectBrowser}
                mode={this.state.mode}
                onSelectItem={this.state.onSelectItem}
                dataName={this.state.dataName}
                searchableTypes={this.state.searchableTypes}
                selectableTypes={this.state.selectableTypes}
                maximumSelectionSize={this.state.maximumSelectionSize}
                onlyFolderishSelectable={this.state.onlyFolderishSelectable}
              />
            </SidebarPopup>
          </>
        </>
      );
    }
  };

export default withObjectBrowser;
