import { createContext } from "react";

export interface MaalumCreateContext {
  isReservationsOpen: boolean;
  setIsReservationsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MaalumContext = createContext<MaalumCreateContext>(
  {} as MaalumCreateContext
);
MaalumContext.displayName = "Maalum Context";

export default MaalumContext;
