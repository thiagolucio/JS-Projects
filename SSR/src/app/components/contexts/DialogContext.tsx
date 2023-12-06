'use client'

import { createContext, useState } from "react";

interface DialogCOntextType {
    open:boolean
    toggle: () => void
}

export const DialogContext = createContext({} as DialogCOntextType);


export function DialogProvider({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);

    function toggle() {
        setOpen(state => !state);
    }

    return (
        <DialogContext.Provider value={{ open, toggle}}>
            {children}
        </DialogContext.Provider>
    )
}


