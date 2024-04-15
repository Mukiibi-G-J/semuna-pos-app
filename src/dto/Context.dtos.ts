import { ReactNode } from "react";

export interface State{
    cart:{
        cartProducts:any[]
    }
}

export interface Action {
    type:string,
    payload:any[]
}

export interface StoreProviderProps {
    children: ReactNode;
  }