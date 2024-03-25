export const generateFiltersProps = (
  filter,
  id,
  onChangeHandler,
  overrides = {
    date_filter: {},
    // Add others when needed, would like ts here to make it clean
  },
) => {
  const commonProps = {
    ...filter.widget?.props,
    id,
    onChange: onChangeHandler,
  };
  if (filter.type === 'date_filter')
    return {
      ...commonProps,
      ...overrides.date_filter,
    };
  else return commonProps;
};
