'use client';

import { createPortal } from 'react-dom';
import { ReactNode } from 'react';

interface PopoverProps {
  children: ReactNode;
}

const Popover = ({ children }: PopoverProps) => {
  return <div className="popover">{createPortal(children, document.body)}</div>;
};

export default Popover;
