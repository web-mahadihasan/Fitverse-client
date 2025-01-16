import { createContext, useState } from "react";

export const AppProviderContext = createContext(null)

const AppProvider = ({children}) => {
    const [openMenu, setOpenMenu] = useState(false);

    const appInfo = {
        openMenu,
        setOpenMenu
    }
    return (
        <AppProviderContext.Provider value={appInfo}>
            {children}
        </AppProviderContext.Provider>
    );
};

export default AppProvider;