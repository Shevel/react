import React, { Suspense } from 'react';
import { Preloader } from '../components/common/Preloader/Preloader';

export function withSuspense<ComponentProps>(Component: React.ComponentType<ComponentProps>) {
  return (props: ComponentProps) => {
    return (
      <Suspense fallback={<Preloader />}>
        <Component {...props} />
      </Suspense>
    )
  }
}