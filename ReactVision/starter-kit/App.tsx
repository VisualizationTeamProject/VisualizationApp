import {
  ViroARScene,
  ViroARSceneNavigator,
  Viro3DObject,
  ViroTrackingStateConstants,
  ViroAmbientLight,
  ViroARCamera,
} from "@reactvision/react-viro";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
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

const initModel: objectModel = {
  name: "building_04",
  filename: "Bambo_House.obj",
  asset: "Bambo_House.png",
};

const HelloWorldSceneAR = (modelName: string) => {
  const [text, setText] = useState("Initializing AR...");
  const [scaleObject, setScale] = useState([0.2, 0.2, 0.2]);
  function onInitialized(state: any, reason: any) {
    console.log("onInitialized", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("Tracking Ready");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
    }
  }

  const onPinchHandle = (
    pinchState: ViroPinchState,
    scaleFactor: number,
    source: ViroSource
  ) => {
    if (pinchState == ViroPinchStateTypes.PINCH_MOVE) {
      console.log(scaleObject);
      if (
        scaleObject[0] * scaleFactor < 0.5 &&
        scaleObject[0] * scaleFactor > 0.12
      ) {
        setScale(scaleObject.map((value) => value * scaleFactor));
      }
    }
  };

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroAmbientLight color="#FFFFF0" />
      <Viro3DObject
        source={modelMapping[modelName]}
        position={[0, 0, -3]}
        scale={scaleObject}
        type="OBJ"
        onPinch={onPinchHandle}
      />
    </ViroARScene>
  );
};

export default () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const handleMenuChange = () => {
    setIsMenuActive(!isMenuActive);
  };
  const [globalModel, setGlobalModel] = useState<objectModel>(initModel);
  const handleObjectChange = (object: objectModel) => setGlobalModel(object);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        {!isMenuActive ? (
          <>
            <ViroARSceneNavigator
              autofocus={true}
              initialScene={{
                scene: () => HelloWorldSceneAR(globalModel.name),
              }}
              style={styles.f1}
            />
            <AppMenu switchMenu={handleMenuChange} menuState={isMenuActive} />
          </>
        ) : (
          <Products
            switchMenu={handleMenuChange}
            selectedGlobalModel={globalModel}
            handleObjectChange={handleObjectChange}
            menuState={isMenuActive}
          />
        )}
      </ApplicationProvider>
    </>
  );
};

const styles = StyleSheet.create({
  f1: { flex: 1 },
});
