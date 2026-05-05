import { convertFromRaw } from 'draft-js';

export const getPlainText = (field) => {
  if (!field) return null;
  if (typeof field === 'object') {
    return convertFromRaw(field).getPlainText() || null;
  }
  return field;
};
