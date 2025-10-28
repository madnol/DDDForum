import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { userService, type UserData } from "../services/userService";

const UserContext = createContext<{
    user: UserData | null;
    setUser: React.Dispatch<React.SetStateAction<UserData | null>>
}>({
    user: null,
    setUser: () => null
})

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserData | null>(() => userService.get())

    const firstRun = React.useRef(true)
    useEffect(() => {
        if (firstRun.current) {
            firstRun.current = false
            return
        }
        userService.save(user)
    }, [user])

    const value = React.useMemo(() => ({ user, setUser }), [user])

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}