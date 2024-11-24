import {
  ViroARScene,
  ViroARSceneNavigator,
  Viro3DObject,
  ViroTrackingReason,
  ViroTrackingStateConstants,
  ViroAmbientLight,
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

  function onInitialized(state, reason) {
    console.log("onInitialized", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("Tracking Ready");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroAmbientLight color="#ffffff" />
      <Viro3DObject
        source={require("./models/sample-house/Bambo_House.obj")} 
        resources={[
          require("./models/sample-house/Bambo_House.mtl"), 
        ]}
        position={[0, 0, -2]} 
        scale={[0.1, 0.1, 0.1]} 
        type="OBJ" 
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

const styles = StyleSheet.create({
  f1: { flex: 1 },
});
