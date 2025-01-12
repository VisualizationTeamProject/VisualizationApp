import {
  ViroTrackingStateConstants,
  ViroPinchStateTypes,
  ViroARScene,
  ViroNode,
  ViroAmbientLight,
  Viro3DObject,
  ViroQuad,
} from "@reactvision/react-viro";
import { ViroPinchState, ViroRotateState } from "@reactvision/react-viro/dist/components/Types/ViroEvents";
import { ViroSource } from "@reactvision/react-viro/dist/components/Types/ViroUtils";
import React, { useState } from "react";
import modelMapping from "./models/modelMapping";
import { useARSceneContext } from "./ARProvider";


export const SceneAR = ({ modelName, isRotationActive, handleLoading }) => {
  const { sceneState, setSceneState } = useARSceneContext();
  console.log(sceneState, "to scene stejt");
  const [scaleObject, setScale] = useState([0.2, 0.2, 0.2]);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [isActive, setIsActive] = useState<boolean>(isRotationActive);
  function onInitialized(state: any, reason: any) {
    console.log("onInitialized", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
    }
  }

  const onPinchHandle = (
    pinchState: ViroPinchState,
    scaleFactor: number,
    source: ViroSource
  ) => {
    if (pinchState == ViroPinchStateTypes.PINCH_MOVE) {
      if (
        scaleObject[0] * scaleFactor * 0.5 < 0.5 &&
        scaleObject[0] * scaleFactor * 0.5 > 0.01
      ) {
        setScale(scaleObject.map((value) => value * scaleFactor));
      }
    }
  };
  const onRotateHandler = (rotateState: ViroRotateState, rotationFactor: number, source: ViroSource) => {
    if (rotateState === 2) {
      setRotation((prevRotation) => [
        prevRotation[0],
        prevRotation[1] + rotationFactor * 0.1,
        prevRotation[2],
      ]);
    }
  };

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroNode
        dragType="FixedToWorld"
        {...(!sceneState.isRotationActive ? { onDrag: () => {} } : {})}
        scale={scaleObject}
        key={modelName}
        rotation={rotation}
      >
        <ViroAmbientLight color="#FFFFF0" />
        <Viro3DObject
          onLoadStart={() => handleLoading(true)}
          onLoadEnd={() => handleLoading(false)}
          lightReceivingBitMask={3}
          shadowCastingBitMask={2}
          source={modelMapping[modelName]}
          position={[0, 0, -3]}
          type="OBJ"
          onRotate={onRotateHandler}
          onPinch={onPinchHandle}
        />
        <ViroQuad
          rotation={[-90, 0, 0]}
          position={[0, -0.001, 0]}
          width={2.5}
          height={2.5}
          arShadowReceiver={true}
          ignoreEventHandling={true}
        />
      </ViroNode>
    </ViroARScene>
  );
};
