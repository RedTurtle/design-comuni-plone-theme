import { useSelector } from 'react-redux';
import config from '@plone/volto/registry';

const SlotRenderer = ({ name, metadata, content, ...rest }) => {
  const pathname = useSelector((state) => state.router.location.pathname);
  const slots = config.slots?.[name];
  if (!slots?.length) return null;

  return slots
    .filter(
      (slot) =>
        !slot.predicates ||
        slot.predicates.every((p) => p({ name, pathname, content, metadata })),
    )
    .map((slot, idx) => {
      const Component = slot.component;
      return (
        <Component
          key={slot.id ?? idx}
          content={content}
          metadata={metadata}
          {...rest}
        />
      );
    });
};

export default SlotRenderer;
