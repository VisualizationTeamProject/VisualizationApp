import {
  ViroARScene,
  ViroARSceneNavigator,
  Viro3DObject,
  ViroTrackingStateConstants,
  ViroAmbientLight,
  ViroARCamera,
  ViroNode,
  ViroQuad,
} from "@reactvision/react-viro";
import React, { useState, useEffect, useRef } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  Button,
  Icon,
  IconElement,
  IconProps,
  IconRegistry,
  Layout,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { Products } from "./components/ProductsPage";
import { AppMenu } from "./components/AppMenu";
import { objectModel } from "./components/types";
import modelMapping from "./components/models/modelMapping";
import { ViroSource } from "@reactvision/react-viro/dist/components/Types/ViroUtils";
import {
  ViroPinchState,
  ViroPinchStateTypes,
} from "@reactvision/react-viro/dist/components/Types/ViroEvents";
import { SceneWrapper } from "./components/SceneWrapper";
import { SceneAR } from "./components/SceneAR";
import { ARSceneProvider, useARSceneContext } from "./components/ARProvider";
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
