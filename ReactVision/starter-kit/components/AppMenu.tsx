import { Button, ButtonProps, Icon, IconProps, Layout } from "@ui-kitten/components"
import { StyleSheet } from "react-native"
import { AppMenuProps } from "./types"


const AppMenu: React.FC<AppMenuProps> = ({ menuState, switchMenu, ...props }) => {
    const PlusCircleIcon = (props: IconProps) => {
        return <Icon {...props} style={[props.style, menuState! ? styles.icon : styles.iconActive]} fill={menuState? 'black' : 'white'} name='plus-circle-outline' />
      }
      
    return (
        <Button style={!menuState ? styles.menuButton : styles.menuActive} accessoryLeft={PlusCircleIcon} onPress={switchMenu} {...props} />
    )
}
const styles = StyleSheet.create({
    menuButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        padding:0,
        borderRadius: 0,
    },
    menuActive: {
        position: 'absolute',
        height:75,
        width:200,
        bottom:0,
        marginBottom: 100,
        alignSelf: 'center',
        backgroundColor: 'rgba(243, 243, 243, 0.95)',
        borderWidth:0,
        borderRadius: 20,
    },
    layout:{
        borderWidth: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
    },
    icon: {
        width: 65,
        height: 65,
    },
    iconActive: {
        width: 30,
        height: 30,
    }
  });

export {AppMenu}