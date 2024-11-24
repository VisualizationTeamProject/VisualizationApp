import {
  Button,
  ButtonProps,
  Card,
  Icon,
  IconElement,
  IconProps,
  Layout,
  List,
  Text,
  TopNavigation,
} from "@ui-kitten/components";
import React from "react";
import { Image, ImageBackground, ListRenderItemInfo, StyleSheet } from "react-native";
import { AppMenu } from "./AppMenu";

const StarIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="star" />
);
const items: String[] = ["Modern", "Simple", "Gothic"];
export interface AppMenuProps extends ButtonProps {
  menuState: boolean;
}
const Products:React.FC<AppMenuProps> = ({ menuState, ...props }) => {
  const displayItems: String[] = items;

  const renderHorizontalItem = (
    info: ListRenderItemInfo<String>
  ): React.ReactElement => (
    <Button
      accessoryLeft={StarIcon}
      style={styles.buttons}
    >{`${info.item}`}</Button>
  );

  const renderVerticalItem = (
    info: ListRenderItemInfo<String>
  ): React.ReactElement => (
    <Card
    style={styles.verticalItem}
    >
        <Image
        style={styles.image}
        source={require('./assets/isometric-1.png')}/>
        <Text>{`${info.item}`}</Text>
    </Card>
  );


  const renderHeader = (): React.ReactElement => (
    <>
      <List
        contentContainerStyle={styles.horizontalList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={displayItems.reverse()}
        renderItem={renderHorizontalItem}
      />
    </>
  );

  return (
    <Layout level="1" style={styles.layout}>
      <TopNavigation alignment="center" title="ReactVision" />
      <Card  style={{position: 'relative'}}>

        <List
          contentContainerStyle={styles.list}
          data={displayItems}
          showsVerticalScrollIndicator={true}
          ListHeaderComponent={renderHeader}
          renderItem={renderVerticalItem}
        />
      <AppMenu onPress={props.onPress} menuState={menuState} />

      </Card>

    </Layout>
  );
};
const styles = StyleSheet.create({
  layout: {
    flex: 1,
    height: 1000,
  },
  buttons: {
    width: 110,
  },
  horizontalList: {
    gap:15,
  },
  list: {
    gap:25,
  },
  verticalItem: {
    borderRadius: 15,
    textAlign: 'center',
    alignItems: 'center',
  },
  image: {
    height:200,
    width:200,
  }
});

export { Products };
