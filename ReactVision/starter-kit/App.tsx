import React, {  } from "react";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  IconRegistry,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { ARSceneProvider } from "./components/ARProvider";
import { NavigatorApp } from "./components/Navigator";

export default () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />

      <ApplicationProvider {...eva} theme={eva.light}>
        <ARSceneProvider>
          <NavigatorApp />
        </ARSceneProvider>
      </ApplicationProvider>
    </>
  );
};
