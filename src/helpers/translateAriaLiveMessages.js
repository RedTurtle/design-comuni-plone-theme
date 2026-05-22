import { defineMessages } from 'react-intl';

const messages = defineMessages({
  ay11_up_down: {
    id: 'ay11_Use Up and Down to choose options',
    defaultMessage: "Usa le frecce Su e Giu per scegliere un'opzione",
  },
  ay11_select_option: {
    id: 'ay11_select_press Enter to select the currently focused option',
    defaultMessage: "premi Invio per selezionare l'opzione corrente",
  },
  ay11_exit_menu: {
    id: 'ay11_select_press Escape to exit the menu',
    defaultMessage: 'premi Esc per uscire dal menu',
  },
  ay11_tab_select_and_exit: {
    id: 'ay11_select__press Tab to select the option and exit the menu',
    defaultMessage: "premi Tab per selezionare l'opzione e uscire dal menu",
  },
  ay11_is_focused: {
    id: 'ay11_select_is_focused',
    defaultMessage: 'è selezionato',
  },
  ay11_type_to_refine_list: {
    id: 'ay11_select__type to refine list',
    defaultMessage: 'digita per filtrare la lista',
  },
  ay11_open_menu: {
    id: 'ay11_select_press Down to open the menu',
    defaultMessage:
      'premi freccia giu per aprire il menu, premi Backspace per rimuovere il valore selezionato',
  },
  ay11_multi_select_focus_values: {
    id: 'ay11_select_press left to focus selected values',
    defaultMessage:
      'premi la freccia a sinistra per evidenziare i valori selezionati',
  },
  ay11_toggle_values: {
    id: 'ay11_select_Use left and right to toggle between focused values, press Backspace to remove the currently focused value',
    defaultMessage:
      'Usa le frecce destra e sinistra per attivare o disattivare i valori evidenziati, premi Backspace per rimuovere il valore corrente evidenziato',
  },
  ay11_option: {
    id: 'ay11_select option',
    defaultMessage: 'opzione',
  },
  ay11_option_deselected: {
    id: 'ay11_select deselected',
    defaultMessage: 'deselezionata',
  },
  ay11_option_disabled: {
    id: 'ay11_select is disabled. Select another option.',
    defaultMessage: "è disabilitata. Seleziona un'altra opzione",
  },
  ay11_option_selected: {
    id: 'ay11_select selected',
    defaultMessage: 'selezionata',
  },
  ay11_value: {
    id: 'ay11_select value',
    defaultMessage: 'valore',
  },
  ay11_focused: {
    id: 'ay11_select focused',
    defaultMessage: 'evidenziato',
  },
  ay11_disabled: {
    id: 'ay11_select disabled',
    defaultMessage: 'disabilitato',
  },
  ay11_for_search_term: {
    id: 'ay11_select for search term',
    defaultMessage: 'per la ricerca',
  },
});

const getSelectAriaLiveMessages = (intl) => {
  return {
    guidance: (props) => {
      const { isSearchable, isMulti, isDisabled, tabSelectsValue, context } =
        props;
      switch (context) {
        case 'menu':
          return `${intl.formatMessage(messages.ay11_up_down)}${
            isDisabled
              ? ''
              : `, ${intl.formatMessage(messages.ay11_select_option)}`
          }, ${intl.formatMessage(messages.ay11_exit_menu)}${
            tabSelectsValue
              ? `, ${intl.formatMessage(messages.ay11_tab_select_and_exit)}`
              : ''
          }.`;
        case 'input':
          return `${props['aria-label'] || 'Select'} ${intl.formatMessage(
            messages.ay11_is_focused,
          )} ${
            isSearchable
              ? `,${intl.formatMessage(messages.ay11_type_to_refine_list)}`
              : ''
          }, ${intl.formatMessage(messages.ay11_open_menu)}, ${
            isMulti
              ? ` ${intl.formatMessage(
                  messages.ay11_multi_select_focus_values,
                )}`
              : ''
          }`;
        case 'value':
          return intl.formatMessage(messages.ay11_toggle_values);
        default:
          return '';
      }
    },

    onChange: (props) => {
      const { action, label = '', isDisabled } = props;
      switch (action) {
        case 'deselect-option':
        case 'pop-value':
        case 'remove-value':
          return `${intl.formatMessage(
            messages.ay11_option,
          )} ${label}, ${intl.formatMessage(messages.ay11_option_deselected)}.`;
        case 'select-option':
          return isDisabled
            ? `${intl.formatMessage(
                messages.ay11_option,
              )} ${label} ${intl.formatMessage(messages.ay11_option_disabled)}.`
            : `${intl.formatMessage(
                messages.ay11_option,
              )} ${label}, ${intl.formatMessage(
                messages.ay11_option_selected,
              )}.`;
        default:
          return '';
      }
    },

    onFocus: (props) => {
      const {
        context,
        focused = {},
        options,
        label = '',
        selectValue,
        isDisabled,
        isSelected,
      } = props;

      const getArrayIndex = (arr, item) =>
        arr && arr.length ? `${arr.indexOf(item) + 1} di ${arr.length}` : '';

      if (context === 'value' && selectValue) {
        return `${intl.formatMessage(
          messages.ay11_value,
        )} ${label} ${intl.formatMessage(
          messages.ay11_focused,
        )}, ${getArrayIndex(selectValue, focused)}.`;
      }

      if (context === 'menu') {
        const disabled = isDisabled
          ? ` ${intl.formatMessage(messages.ay11_disabled)}`
          : '';
        const status = `${
          isSelected
            ? intl.formatMessage(messages.ay11_option_selected)
            : intl.formatMessage(messages.ay11_focused)
        }${disabled}`;
        return `${intl.formatMessage(
          messages.ay11_option,
        )} ${label} ${status}, ${getArrayIndex(options, focused)}.`;
      }
      return '';
    },

    onFilter: (props) => {
      const { inputValue, resultsMessage } = props;
      return `${resultsMessage}${
        inputValue
          ? ` ${intl.formatMessage(messages.ay11_for_search_term)} ` +
            inputValue
          : ''
      }.`;
    },
  };
};

export default getSelectAriaLiveMessages;