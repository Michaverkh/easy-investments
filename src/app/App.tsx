import React from "react";
import useStore from "../shared/hooks/useStore";
import { Button } from "@mui/material";
import { observer } from "mobx-react-lite";

const App = () => {
  const store = useStore();

  return (
    <div>
      <p>My app</p>
    </div>
  );
};

export default observer(App);
