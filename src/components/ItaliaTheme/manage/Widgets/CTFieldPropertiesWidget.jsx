import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';

const CTFieldPropertiesWidget = (props) => {
  const { onChange, id, value, objectvalue } = props;
  const { ct, field } = objectvalue ?? {};
  const ct_schema = useSelector(
    (state) => state.ct_schema?.subrequests?.[ct]?.result,
  );

  useEffect(() => {
    const field_properties = ct_schema?.properties?.[field];
    if (field_properties && !isEqual(field_properties, value)) {
      onChange(id, field_properties);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objectvalue?.title, ct_schema]);

  return null;
};

export default CTFieldPropertiesWidget;
