import React from 'react';
import { Link, ChevronrightIcon, Popover } from '@plone/components';

interface Props {
  addableTypes: {
    '@id': string;
    id: string;
    title: string;
  }[];
}

export const AddContentPopover = ({ addableTypes }: Props) => {
  // const page = addableTypes.find((type) => type.id === 'Document');

  return (
    <Popover className="react-aria-Popover add-content-popover">
      <ul className="add-content-list">
        {addableTypes.map((type) => (
          <li key={type.id} className="add-content-list-item">
            <Link href={type['@id']}>
              {type.title}
              <ChevronrightIcon />
            </Link>
          </li>
        ))}
      </ul>
    </Popover>
  );
};
