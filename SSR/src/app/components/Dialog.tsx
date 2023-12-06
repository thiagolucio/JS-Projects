'use client' 
import { useContext } from "react";
import { DialogContext } from "./contexts/DialogContext";

function Dialog() {
    const {open, toggle} = useContext(DialogContext);
    return (
        <div>
            {open && (
                <div className="dialog">
                    Dialog
                </div>
            )}
            <button onClick={toggle} className="button" > DIALOG </button>
        </div>
    )
}

export default Dialog;