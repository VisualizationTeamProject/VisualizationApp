import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroButton,
  ViroText,
  ViroTrackingReason,
  ViroTrackingStateConstants,
} from "@reactvision/react-viro";
import React, { useState } from "react";
import {  StyleSheet, View } from "react-native";
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button, Icon, IconElement, IconProps, IconRegistry, Layout } from "@ui-kitten/components";
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Products } from "./components/ProductsPage";
import { AppMenu } from "./components/AppMenu";

const HelloWorldSceneAR = () => {
  const [text, setText] = useState("Initializing AR...");

  function onInitialized(state: any, reason: ViroTrackingReason) {
    console.log("onInitialized", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("Hello World!");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
      />
    </ViroARScene>
  );
};

export default () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const handleMenuChange = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      {!isMenuActive ? (
        <>
        <ViroARSceneNavigator
          autofocus={true}
          initialScene={{
            scene: HelloWorldSceneAR,
          }}
        style={styles.f1}

        />
        <AppMenu onPress={handleMenuChange} menuState={isMenuActive} />
        </>
        
      ) : (
        <Products onPress={handleMenuChange} menuState={isMenuActive}/>
      )}
        
    </ApplicationProvider>
    </>
  );


}

var styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});
