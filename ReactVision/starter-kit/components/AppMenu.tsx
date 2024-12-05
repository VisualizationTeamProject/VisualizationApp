import {
  Button,
  ButtonProps,
  Icon,
  IconProps,
  Layout,
} from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { AppMenuProps } from "./types";
import { useARSceneContext } from "./ARProvider";

const AppMenu: React.FC<AppMenuProps> = ({
  menuState,
  switchMenu,
  switchRotation,
  ...props
}) => {
    const { sceneState, setSceneState } = useARSceneContext();
  const PlusCircleIcon = (props: IconProps) => {
    return (
      <Icon
        {...props}
        style={[props.style, menuState! ? styles.icon : styles.mainIcon]}
        fill={menuState ? "black" : "white"}
        name="plus-circle-outline"
      />
    );
  };

  const MoveIcon = (props: IconProps) => {
    return (
      <Icon
        {...props}
        style={[props.style, menuState! ? styles.icon : styles.iconActive]}
        fill={menuState ? "black" : "white"}
        name="move-outline"
      />
    );
  };

  const FlipIcon = (props: IconProps) => {
    return (
      <Icon
        {...props}
        style={[props.style, menuState! ? styles.icon : styles.iconActive]}
        fill={menuState ? "black" : "white"}
        name="flip-outline"
      />
    );
  };

  return (
    <View
      style={[styles.menu, !menuState ? styles.menuButton : styles.menuActive]}
    >
      <Button
        style={[
          styles.button,
          !menuState ? styles.button : styles.buttonActive,
          !sceneState.isRotationActive ? styles.activeEdit : null
        ]}
        accessoryLeft={MoveIcon}
        onPress={() => switchRotation(true)}
        {...props}
      />
      <Button
        style={[
          styles.button,
          !menuState ? styles.button : styles.buttonActive,
        ]}
        accessoryLeft={PlusCircleIcon}
        onPress={switchMenu}
        {...props}
      />
      <Button
        style={[
          styles.button,
          !menuState ? styles.button : styles.buttonActive,
          sceneState.isRotationActive ? styles.activeEdit : null
        ]}
        accessoryLeft={FlipIcon}
        onPress={() => switchRotation(false)}
        {...props}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgba(243, 243, 243, 0.0)",
    borderWidth: 0,
    borderRadius: 20,
    alignSelf: "center",
  },
  activeEdit: {
    backgroundColor: 'red'
  },
  menu: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonActive: {
    backgroundColor: "rgba(243, 243, 243, 0.95)",
  },
  menuButton: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 25,
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    padding: 0,
    borderRadius: 0,
  },
  menuActive: {
    position: "absolute",
    height: 75,
    width: 200,
    bottom: 0,
    marginBottom: 100,
    alignSelf: "center",
  },
  layout: {
    borderWidth: 0,
    backgroundColor: "rgba(0, 0, 0, 0.0)",
  },
  icon: {
    width: 65,
    height: 65,
  },
  iconActive: {
    width: 30,
    height: 30,
  },
  mainIcon: {
    width: 65,
    height: 65,
  },
});

export { AppMenu };
