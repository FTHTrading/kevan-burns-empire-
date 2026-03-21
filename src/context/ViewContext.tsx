'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type ViewMode = 'institutional' | 'creative';

interface ViewContextType {
  viewMode: ViewMode;
  toggleView: () => void;
}

const ViewContext = createContext<ViewContextType>({
  viewMode: 'institutional',
  toggleView: () => {},
});

export function ViewProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>('institutional');

  const toggleView = () => {
    setViewMode((prev) => (prev === 'institutional' ? 'creative' : 'institutional'));
  };

  return (
    <ViewContext.Provider value={{ viewMode, toggleView }}>
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  return useContext(ViewContext);
}
