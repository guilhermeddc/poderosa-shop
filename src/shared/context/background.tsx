import React, {createContext, useEffect, useState} from 'react';

interface ILayoutColors {
  bgLayout: string;
  colorNavItem: string;
  bgContent: string;
  bgLogo: string;
  colorLogo: string;
}

export interface IContextBackground {
  layoutColors: ILayoutColors;
  setLayoutColors: React.Dispatch<React.SetStateAction<ILayoutColors>>;
  activeZoom: boolean;
  setActiveZoom: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BackgroundContext = createContext<IContextBackground>(
  {} as IContextBackground,
);

interface IProps {
  children: React.ReactNode;
}

export const BackgroundProvider: React.FC<IProps> = ({children}) => {
  const [layoutColors, setLayoutColors] = useState({
    bgLayout: 'white',
    colorNavItem: 'black',
    bgContent: 'white',
    bgLogo: 'black',
    colorLogo: 'white',
  });
  const [activeZoom, setActiveZoom] = useState(false);

  useEffect(() => {
    if (activeZoom)
      setTimeout(() => {
        // eslint-disable-next-line
        console.log('*** activeZoom', activeZoom);
        setActiveZoom(false);
      }, 300);

    // eslint-disable-next-line
    console.log('*** activeZoom', activeZoom);
  }, [activeZoom]);

  // eslint-disable-next-line
  console.log('*** activeZoom', activeZoom);

  return (
    <BackgroundContext.Provider
      value={{layoutColors, setLayoutColors, activeZoom, setActiveZoom}}>
      {children}
    </BackgroundContext.Provider>
  );
};
