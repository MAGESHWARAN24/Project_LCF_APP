import React from "react";

const DesignerContext = React.createContext();

export default function DesignerProvider({children}) {
  const [toggle, SetToggle] = React.useState({
    id: null,
    state: false,
  });
  return (
    <DesignerContext.Provider value={{toggle, SetToggle}}>
      {children}
    </DesignerContext.Provider>
  );
}

export function useDesginer() {
  return React.useContext(DesignerContext);
}
