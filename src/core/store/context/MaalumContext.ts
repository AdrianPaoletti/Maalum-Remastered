import { createContext } from "react";

export interface MaalumCreateContext {
  isReservationsOpen: boolean;
  setIsReservationsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isImageLoaded: boolean;
  setIsImageLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuExpanded: boolean;
  setIsMenuExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  handleBurgerMenuClick: () => void;
}

const MaalumContext = createContext<MaalumCreateContext>(
  {} as MaalumCreateContext
);
MaalumContext.displayName = "Maalum Context";

export default MaalumContext;
