/*
 * original: https://raw.githubusercontent.com/plone/volto/18.35.0/packages/volto/src/components/manage/Controlpanels/Groups/RenderGroups.jsx
 *
 * CUSTOMIZATIONS:
 * - Converted the component from a functional component to a class component (extends Component, uses this.props instead of props).
 * - Removed the canAssignRole check: the Checkbox is no longer disabled based on canAssignRole(isUserManager, role); it is now always enabled.
 * - Removed the canDeleteGroup() gating: the "Delete" dropdown action is always rendered, instead of only when isUserManager is true or the group does not include the 'Manager' role.
 * - Simplified the Checkbox "checked" logic: removed the special-case handling for the 'AuthenticatedUsers' group (isAuthGroup()); it now always uses group.roles.includes(role.id) to change condition to check or uncheck Checkboxes.
 * - Changed the onChange value format from "${group.id}.${role.id}" (split on ".") to "${group.id}&role=${role.id}" (split on "&role=").
 */
/**
 * Users controlpanel groups.
 * @module components/manage/Controlpanels/UsersControlpanelGroups
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Dropdown, Table, Checkbox } from 'semantic-ui-react';
import trashSVG from '@plone/volto/icons/delete.svg';
import ploneSVG from '@plone/volto/icons/plone.svg';
import Icon from '@plone/volto/components/theme/Icon/Icon';

/**
 * UsersControlpanelGroups class.
 * @class UsersControlpanelGroups
 * @extends Component
 */
class RenderGroups extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    //single group
    group: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      email: PropTypes.string,
      groupname: PropTypes.string,
      roles: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,

    roles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
      }),
    ).isRequired,
    inheritedRole: PropTypes.array,
    onDelete: PropTypes.func.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Sharing
   */
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * @param {*} event
   * @param {*} { value }
   * @memberof UsersControlpanelUser
   */
  onChange(event, { value }) {
    const [group, role] = value.split('&role=');
    this.props.updateGroups(group, role);
  }

  /**
   *@param {*}
   *@returns {Boolean}
   *@memberof RenderGroups
   */
  isAuthGroup = (roleId) => {
    return this.props.inheritedRole.includes(roleId);
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <Table.Row key={this.props.group.title}>
        <Table.Cell>{this.props.group.groupname}</Table.Cell>
        {this.props.roles.map((role) => (
          <Table.Cell key={role.id}>
            {this.props.inheritedRole &&
            this.props.inheritedRole.includes(role.id) &&
            this.props.group.roles.includes('Authenticated') ? (
              <Icon
                name={ploneSVG}
                size="20px"
                color="#007EB1"
                title={'plone-svg'}
              />
            ) : (
              <Checkbox
                checked={this.props.group.roles.includes(role.id)}
                onChange={this.onChange}
                value={`${this.props.group.id}&role=${role.id}`}
              />
            )}
          </Table.Cell>
        ))}
        <Table.Cell textAlign="right">
          <Dropdown icon="ellipsis horizontal">
            <Dropdown.Menu className="left">
              <Dropdown.Item
                onClick={this.props.onDelete}
                value={this.props.group['@id']}
              >
                <Icon name={trashSVG} size="15px" />
                <FormattedMessage id="Delete" defaultMessage="Delete" />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default injectIntl(RenderGroups);
