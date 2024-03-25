import type { AriaDialogProps } from 'react-aria';
import { useDialog } from 'react-aria';
import React, { useRef } from 'react';

import './Dialog.css';

interface DialogProps extends AriaDialogProps {
  title?: React.ReactNode;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({
  title,
  children,
  ...props
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { dialogProps, titleProps } = useDialog(props, ref);

  return (
    <div {...dialogProps} ref={ref} className="dialog">
      {title && (
        <h3 {...titleProps} style={{ marginTop: 0 }}>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};
