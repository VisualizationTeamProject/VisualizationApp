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
import {
  GestureResponderEvent,
  Image,
  ImageBackground,
  ListRenderItemInfo,
  StyleSheet,
} from "react-native";
import { AppMenu } from "./AppMenu";
import { objectModel, ProductProps } from "./types";
import models from "../models/models.json";
import assetMapping from "./assets/assetMapping";

const StarIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="star" />
);

const HomeIcon = (props: IconProps) => {
  return (
    <Icon
        {...props}
        style={{ width: 24, height: 24, marginLeft: 20}
      }
      fill={"white"}
      name="home-outline"
    />
  );
};

const parsedModels: objectModel[] = models.map((model) => ({
  name: model.name,
  filename: model.filename,
  asset: assetMapping[model.asset],
}));
const Products: React.FC<ProductProps> = ({
  menuState,
  selectedGlobalModel,
  handleObjectChange,
  switchMenu,
  ...props
}) => {
  const [displayItems, setDisplayItems] = useState<objectModel[]>(parsedModels)
  const [selectedModel, setModel] = useState<objectModel | undefined>(
    selectedGlobalModel
  );
  const [selectedFilter, setSelectedFilter] = useState("")
  const handleObjectPress = (object: objectModel) => {
    setModel(object);
    handleObjectChange(object);
    switchMenu();
  };
  function toTitleCase(input: string): string {
    return input
        .split('_') 
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) 
        .join(' '); 
}

function filterList( input: string): undefined {
  if(input == selectedFilter){
    setDisplayItems(parsedModels.sort())
  } else {
    let newList = parsedModels.filter(o => o.name == input)
    setDisplayItems(newList)
    setSelectedFilter(input)
  }
}
function sortWithPriority(data:objectModel[]): objectModel[] {
  let priorityString = selectedModel?.name != "" ? selectedModel.name : ""
  return data.sort((a, b) => {
      if (a.name === priorityString) return -1; 
      if (b.name === priorityString) return 1;  
      return a.name.localeCompare(b.name);          
  });
}


const renderHorizontalItem = (
  info: ListRenderItemInfo<objectModel>
): React.ReactElement => (
  <Button
    onPress={() => filterList(info.item.name)}
    accessoryLeft={HomeIcon}
    style={info.item.name == selectedFilter ? styles.selectedButton : styles.buttons}
  >
    <Text style={{ marginRight: 10 }}>{toTitleCase(info.item.name)}</Text>
  </Button>
);

  const renderVerticalItem = (
    info: ListRenderItemInfo<objectModel>,
  ): React.ReactElement => {
    return (
      <Card
        style={[
          info.index != displayItems.length - 1
            ? styles.verticalItem
            : styles.verticalItemLast,
          info.item.name === selectedModel?.name ? styles.selectedItem : "",
        ]}
        onPress={() => handleObjectPress(info.item)}
      >
        <Image style={styles.image} source={info.item.asset} />
        <Text style={styles.cardTitle}>{`${toTitleCase(info.item.name)}`}</Text>
      </Card>
    );
  };

  const renderHeader = (): React.ReactElement => (
    <>
      <List
        contentContainerStyle={styles.horizontalList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={parsedModels.sort()}
        renderItem={renderHorizontalItem}
      />
    </>
  );

  return (
    <Layout level="1" style={styles.layout}>
      <TopNavigation alignment="center" title="HomeVerse"/>
      <Card style={{ position: "relative" }}>
        <List
          contentContainerStyle={styles.list}
          data={sortWithPriority(displayItems)}
          showsVerticalScrollIndicator={true}
          ListHeaderComponent={renderHeader}
          renderItem={renderVerticalItem}
          style={{ paddingBottom: 170 }}
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
  cardTitle: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  buttons: {
    paddingRight: 15,
    paddingLeft:5,
    width: 150,
    borderColor: "rgba(66, 0, 0, 0.95)",
    borderWidth: 1,
    backgroundColor: "rgba(240, 8, 8, 0.76)",
    borderRadius: 25,
  },
  horizontalList: {
    gap: 15,
  },
  list: {
    gap: 25,
  },
  verticalItem: {
    borderRadius: 15,
    textAlign: "center",
    alignItems: "center",
  },
  verticalItemLast: {
    borderRadius: 15,
    textAlign: "center",
    alignItems: "center",
    marginBottom: 165,
  },
  selectedItem: {
    borderColor: "rgba(85, 85, 85, 0.5)",
    borderWidth: 4,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius:20,
  },
  selectedButton: {
    paddingRight: 15,
    paddingLeft:5,
    width: 150,
    borderColor: "rgba(66, 0, 0, 0.95)",
    borderWidth: 1,
    backgroundColor: "rgba(240, 82, 82, 0.86)",
    borderRadius: 25,
  }

});

export { Products };
