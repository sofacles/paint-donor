import React, { useState } from 'react';
// hats off to https://wecodetheweb.com/2019/03/02/easy-modals-with-react-hooks/

const ToggleContent = ({ toggle, content }) => {
    const [isShown, setIsShown] = useState(false);
    const hide = () => setIsShown(false);
    const show = () => setIsShown(true);
  
    return (
      <>
        {toggle(show)}
        {isShown && content(hide)}
      </>
    );
  };

  export { ToggleContent };