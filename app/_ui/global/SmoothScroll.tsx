'use client';

import React, { PropsWithChildren } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';

function SmoothScroll({ children }: PropsWithChildren): JSX.Element {
  return (
    <ReactLenis options={{ duration: 1 }} root>
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;
