import React, { useState } from "react";
import { useARSceneContext } from "./ARProvider";
import { objectModel } from "./types";
import { ViroARSceneNavigator } from "@reactvision/react-viro";
import { StyleSheet } from "react-native";
import { AppMenu } from "./AppMenu";
import { Products } from "./ProductsPage";
import { SceneAR } from "./SceneAR";
const initModel: objectModel = {
  name: "bamboo_house",
  filename: "bamboo_house.obj",
  asset: "bamboo_house.png",
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

  const handleRotation = (shouldBeActive: boolean) => {
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
