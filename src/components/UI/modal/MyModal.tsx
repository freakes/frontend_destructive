import React from 'react';
import cl from './MyModal.module.css'

interface MyModalProps {
    visible: boolean;
    children?: React.ReactNode;
    setVisible: (state: boolean) => void;
}

const MyModal = ({children, visible, setVisible}: MyModalProps) => {

    const rootClasses = [cl.myModal]

    if (visible) {
        rootClasses.push(cl.active)
    }


    return (
        <div onClick={() => setVisible(false)} className={rootClasses.join(' ')}>
            <div onClick={(e) => e.stopPropagation()} className={cl.myModalContent}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;