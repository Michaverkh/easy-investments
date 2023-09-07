import React from "react";
import useStore from "../shared/hooks/useStore";
import { Button } from "@mui/material";
import { observer } from "mobx-react-lite";

const App = () => {
  const store = useStore();

  console.log(store.portfolioStore.assetsTree);

  return (
    <div>
      <p>My app</p>
      <Button onClick={() => store.portfolioStore.addCathegory("s")}>
        Пуньк
      </Button>
    </div>
  );
};

export default observer(App);
