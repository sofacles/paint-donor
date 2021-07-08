import React, { useState } from 'react';
// hats off to https://wecodetheweb.com/2019/03/02/easy-modals-with-react-hooks/

export type ToggleContentProps = {
    content: (hideFxn: () => void) => React.ReactElement,
    toggle: (showFxn: () => void) => React.ReactElement,

}
const ToggleContent: React.FC<ToggleContentProps> = ({ toggle, content }: ToggleContentProps) => {
    const [isShown, setIsShown] = useState(false);
    const hide = () => setIsShown(false);
    const show = () => setIsShown(true);

    return (
        <>
            {!isShown && toggle(show)}
            {isShown && content(hide)}
        </>
    );
};

export { ToggleContent };
