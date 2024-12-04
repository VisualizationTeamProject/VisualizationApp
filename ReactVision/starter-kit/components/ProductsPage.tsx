import {
  Button,
  Card,
  Icon,
  IconElement,
  IconProps,
  Layout,
  List,
  Text,
  TopNavigation,
} from "@ui-kitten/components";
import React, { useState } from "react";
import { Image, ImageBackground, ListRenderItemInfo, StyleSheet } from "react-native";
import { AppMenu } from "./AppMenu";
import {objectModel, ProductProps } from "./types";
import models from '../models/models.json';
import assetMapping from "./assets/assetMapping";



const StarIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="star" />
);

const parsedModels: objectModel[] = models.map(model => ({
  name: model.name,
  filename: model.filename,
  asset: assetMapping[model.asset],
}));
const Products:React.FC<ProductProps> = ({ menuState, selectedGlobalModel, handleObjectChange, switchMenu, ...props }) => {


  const displayItems: objectModel[] = parsedModels;
  const [selectedModel, setModel] = useState<objectModel | undefined>(selectedGlobalModel)
  const handleObjectPress = (object: objectModel) => {
    setModel(object)
    handleObjectChange(object)
    switchMenu()
  }

  const renderHorizontalItem = (
    info: ListRenderItemInfo<objectModel>
  ): React.ReactElement => (
    <Button
      accessoryLeft={StarIcon}
      style={styles.buttons}
    >{`${info.item.name}`}</Button>
  );

  const renderVerticalItem = (
    info: ListRenderItemInfo<objectModel>
  ): React.ReactElement => {
    
    return (
      <Card
      style={[info.index != displayItems.length -1 ? styles.verticalItem : styles.verticalItemLast, info.item.name === selectedModel?.name ? styles.selectedItem : '']}
      onPress={() => handleObjectPress(info.item)}
      >
          <Image
          style={styles.image}
          source={info.item.asset}/>
          <Text>{`${info.item.name}`}</Text>
      </Card>
  

  )};


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
          style={{paddingBottom: 170}}
        />
      <AppMenu switchMenu={switchMenu} menuState={menuState} />

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
  verticalItemLast: {
    borderRadius: 15,
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: 165,
  },
  selectedItem: {
    borderColor: 'red',
  },
  image: {
    height:200,
    width:200,
  }
});

export { Products };
