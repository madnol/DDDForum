import React, { createContext, useContext, useState, type ReactNode } from "react";

interface SpinnerData {
    isActive: boolean;
}

const SpinnerContext = createContext<{
    spinner: SpinnerData;
    activate: React.Dispatch<React.SetStateAction<void>>;
    deactivate: React.Dispatch<React.SetStateAction<void>>;
}>({
    spinner: { isActive: false },
    activate: () => null,
    deactivate: () => null,
})


export const useSpinner = () => useContext(SpinnerContext)


export const SpinnerProvider = ({ children }: { children: ReactNode }) => {
    const [spinner, setSpinner] = useState<SpinnerData>({ isActive: false })

    const activate = () => {
        setSpinner({ isActive: true })
    }

    const deactivate = () => {
        setSpinner({ isActive: false })
    }

    return (
        <SpinnerContext.Provider value={{ spinner, activate, deactivate }}>
            {children}
        </SpinnerContext.Provider>
    )

} 