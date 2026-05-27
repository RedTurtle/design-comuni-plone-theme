import config from '@plone/volto/registry';

export const registerSlotComponent = ({ slot, name, component, predicates }) => {
  config.slots[slot] = config.slots[slot] ?? [];
  config.slots[slot].push({ id: name, component, predicates });
};
