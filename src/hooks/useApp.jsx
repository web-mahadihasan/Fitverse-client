import { useContext } from "react"
import { AppProviderContext } from "../context/AppProvider"

const useApp = () => {
    const context = useContext(AppProviderContext)
    return context;
}

export default useApp;