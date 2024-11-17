import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import styles from './homeStyle';

const categories = [
  {
    id: 0,
    title: 'UX Design',
    number: 36,
    isTrendy: false,
    isBestRated: true,
  },
  {
    id: 1,
    title: 'Photoshop',
    number: 22,
    isTrendy: true,
    isBestRated: true,
  },
  {
    id: 2,
    title: 'Illustrator',
    number: 40,
    isTrendy: true,
    isBestRated: false,
  },
  {
    id: 3,
    title: 'Development',
    number: 55,
    isTrendy: true,
    isBestRated: true,
  },
];

export function Home() {

  const [data, setData] = useState({
    tabs: ['New', 'Trendy', 'Best rated'],
    activeTab: 'New',
    displayedCategories: categories,
  });

  return (
    <View style={styles.homeContainer}>
      <View style={styles.homeContent}>
        <TouchableOpacity
          style={styles.headerContainer}
          >
        </TouchableOpacity>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>Hi</Text>
          <Text style={styles.usernameText}>User</Text>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search for a course"
            placeholderTextColor={'red'}
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.dropdownContainer}>

          </TouchableOpacity>
        </View>
        <View style={styles.tabHeaderContainer}>
          {data?.tabs?.map((tab) => (
            <TouchableOpacity
              style={styles.singleTab}>
              <Text
                style={[
                  styles.tabText,
                  data?.activeTab === tab
                    ? styles.activeTabText
                    : styles.inActiveTabText,
                ]}>
                {tab}
              </Text>
              {data?.activeTab === tab ? (
                <View style={styles.activeTabBottom}></View>
              ) : null}
            </TouchableOpacity>
          ))}
        </View>
        <ScrollView
          style={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.tabBodyContainer}>
            {data?.displayedCategories?.map((category, index) => (
              <TouchableOpacity
                style={[
                  styles.categoryContainer,
                  index % 2
                    ? styles.categoryLongHeight
                    : styles.categoryShortHeight,
                ]}
                >
                <ImageBackground
                  style={styles.illustrationImage}
                  imageStyle={styles.backgroundStyle}>
                  <View style={styles.transparentBg}>
                    <Text style={styles.categoryTitletext}>
                      {category?.title}
                    </Text>
                    <Text style={styles.categoryNumbertext}>
                      {category?.number}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}