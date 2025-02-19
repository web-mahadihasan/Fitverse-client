import { createContext, useState } from "react";

export const AppProviderContext = createContext(null)

const AppProvider = ({children}) => {
    const [openMenu, setOpenMenu] = useState(false);
    const [isInvitedModalOpen, setIsInvitedModalOpen] = useState(false);
    const appInfo = {
        openMenu,
        setOpenMenu,
        isInvitedModalOpen, 
        setIsInvitedModalOpen
    }
    return (
        <AppProviderContext.Provider value={appInfo}>
            {children}
        </AppProviderContext.Provider>
    );
};

export default AppProvider;