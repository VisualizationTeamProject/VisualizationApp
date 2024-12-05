import React, { useState } from "react";
import { useARSceneContext } from "./ARProvider";
import { objectModel } from "./types";
import { ViroARSceneNavigator } from "@reactvision/react-viro";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { AppMenu } from "./AppMenu";
import { Products } from "./ProductsPage";
import { SceneAR } from "./SceneAR";
const initModel: objectModel = {
  name: "building_04",
  filename: "Bambo_House.obj",
  asset: "Bambo_House.png",
};
export const NavigatorApp = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const handleMenuChange = () => {
    setIsMenuActive(!isMenuActive);
  };
  const [globalModel, setGlobalModel] = useState<objectModel>(initModel);
  const handleObjectChange = (object: objectModel) => setGlobalModel(object);
  const [isRotationActive, setRotation] = useState<boolean>(true);
  const { sceneState, setSceneState } = useARSceneContext();
  console.log(sceneState, "to scene stejt w APp");

  const handleRotation = (shouldBeActive: boolean) => {
    console.log(shouldBeActive);
    setRotation(shouldBeActive);
    setSceneState((prev) => ({
      ...prev,
      isRotationActive: !prev.isRotationActive,
    }));
  };

  const [isLoading, setIsLoading] = useState(false);
  const handleLoading = (isLoadingObj) => {
    setIsLoading(isLoadingObj);
  };
  return (
    <>
      {!isMenuActive ? (
        <>
          <ViroARSceneNavigator
            autofocus={true}
            initialScene={{
              scene: () => (
                <SceneAR
                  modelName={globalModel.name}
                  isRotationActive={isRotationActive}
                  handleLoading={handleLoading}
                />
              ),
            }}
            initialSceneKey={`${globalModel.name}-${isRotationActive}`}
            viroAppProps={{ isRotationActive }}
            style={styles.f1}
          />
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator
              size="large"
              animating={isLoading}
              color="#ffffff"
            />
          </View>
          <AppMenu
            switchMenu={handleMenuChange}
            switchRotation={handleRotation}
            menuState={isMenuActive}
          />
        </>
      ) : (
        <Products
          switchRotation={null}
          switchMenu={handleMenuChange}
          selectedGlobalModel={globalModel}
          handleObjectChange={handleObjectChange}
          menuState={isMenuActive}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  f1: { flex: 1 },
});
