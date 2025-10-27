import { useEffect } from "react";
import { createPortal } from "react-dom";

const ModalDialog = ({ isOpen, children }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };

    }, [isOpen]);

    return createPortal(
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {children}
        </div>,
        // document.body
        document.getElementById('modal-root')
    );
}

export default ModalDialog;