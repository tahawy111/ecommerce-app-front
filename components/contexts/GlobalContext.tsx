import { IProduct } from "@/models/Product";
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

export interface GlobalContextInteface {
    isLoading: boolean;
    startloading: () => void;
    stopLoading: () => void;
}

const defaultValue = {
    isLoading: false
} as GlobalContextInteface;

// export const GlobalContext = createContext<Partial<GlobalContextInteface>>({}); use <Partial<GlobalContextInteface>> if you don't know the inital value
export const GlobalContext = createContext<GlobalContextInteface>(defaultValue);

export function GlobalContextProvider({ children }: { children: ReactNode; }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    function startloading() {
        setIsLoading(false);
    }
    function stopLoading() {
        setIsLoading(false);
    }


    return <GlobalContext.Provider value={{ isLoading, startloading, stopLoading }}>
        {children}
    </GlobalContext.Provider>;
}
