'use client';

import { Device, useDevice } from '@/hooks/use-device';
import React, { createContext, useContext } from 'react';
import LenisScrollProvider from './lenis-provider';


export interface UiContextProps {
  device: Device;
}

const UIContext = createContext<UiContextProps | undefined>(undefined);

export const UIProvider = ({
  children,
} : {
  children: React.ReactNode;
}) => {
  const device = useDevice();
  return (
    <UIContext.Provider
      value={{
        device,
      }}
    >
      <LenisScrollProvider>
        {children}
      </LenisScrollProvider>
    </UIContext.Provider>
  );
}

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIContext');
  }
  return context;
}
