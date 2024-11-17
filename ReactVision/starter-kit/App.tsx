import {
  ViroARScene,
  ViroARSceneNavigator,
  Viro3DObject,
  ViroTrackingReason,
  ViroTrackingStateConstants,
  ViroAmbientLight,
} from "@reactvision/react-viro";
import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { Home } from "./components/Home";

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

  return !isMenuActive ? (
    <>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: HelloWorldSceneAR,
        }}
        style={styles.f1}
      />
      <View>
        <Button title="+" onPress={handleMenuChange} />
      </View>
    </>
  ) : (
    <>
      <Home />
      <View>
        <Button title="+" onPress={handleMenuChange} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  f1: { flex: 1 },
});
