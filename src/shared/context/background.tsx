import React, {createContext, useCallback, useEffect, useState} from 'react';

interface ILayoutColors {
  bgLeft: string;
  bgRight: string;
  bgLogo: string;
  navItem: string;
  logo: string;
}

interface IClick {
  active: boolean;
  click: () => void | Promise<void>;
}

export interface IContextBackground {
  layoutColors: ILayoutColors;
  setLayoutColors: React.Dispatch<React.SetStateAction<ILayoutColors>>;
  activeZoom: boolean;
  setActiveZoom: React.Dispatch<React.SetStateAction<boolean>>;
  leftClick: IClick;
  setLeftClick: React.Dispatch<React.SetStateAction<IClick>>;
  rightClick: IClick;
  setRightClick: React.Dispatch<React.SetStateAction<IClick>>;
}

export const BackgroundContext = createContext<IContextBackground>(
  {} as IContextBackground,
);

interface IProps {
  children: React.ReactNode;
}

export const BackgroundProvider: React.FC<IProps> = ({children}) => {
  const [leftClick, setLeftClick] = useState({
    active: false,
    click: () => {},
  });
  const [rightClick, setRightClick] = useState({
    active: false,
    click: () => {},
  });
  const [layoutColors, setLayoutColors] = useState({
    bgLeft: 'white',
    bgRight: 'white',
    bgLogo: '#23222a',
    navItem: '#23222a',
    logo: 'white',
  });
  const [activeZoom, setActiveZoom] = useState(false);

  useEffect(() => {
    if (activeZoom)
      setTimeout(() => {
        setActiveZoom(false);
      }, 400);
  }, [activeZoom]);

  return (
    <BackgroundContext.Provider
      value={{
        layoutColors,
        setLayoutColors,
        activeZoom,
        setActiveZoom,
        leftClick,
        rightClick,
        setLeftClick,
        setRightClick,
      }}>
      {children}
    </BackgroundContext.Provider>
  );
};
