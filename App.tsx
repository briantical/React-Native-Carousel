import React, {useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Image,
  Dimensions,
  Animated,
  ImageBackground,
  Pressable,
  Text,
} from 'react-native';
import faker from 'faker';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const getLogoHeight = (w: number) => (756 / 1800) * w;

const OFFSET = 40;
const ITEM_WIDTH = (width > height ? height : width) - OFFSET * 2;
const ITEM_HEIGHT = 200;

const cards = [
  {title: 'BirdBox', image: require('./assets/Movies/birdbox.jpeg')},
  {title: 'Dont Look Up', image: require('./assets/Movies/dontlookup.jpeg')},
  {title: 'Fatherhood', image: require('./assets/Movies/fatherhood.jpeg')},
  {title: 'I Care Alot', image: require('./assets/Movies/icarealot.jpeg')},
  {title: 'Spider-Man', image: require('./assets/Movies/spiderman.jpeg')},
  {title: 'The Old Guard', image: require('./assets/Movies/theoldguard.jpeg')},
  {
    title: 'The Power of The Dog',
    image: require('./assets/Movies/thepowerofthedog.jpeg'),
  },
  {
    title: 'The Social Dilemma',
    image: require('./assets/Movies/thesocialdilema.jpeg'),
  },
  {
    title: 'The Unforgivable',
    image: require('./assets/Movies/theunforgiveable.jpeg'),
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: '#000',
  },
  navbar: {
    maxHeight: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  logo: {
    width: 100,
    height: getLogoHeight(100),
  },
  icon: {
    fontSize: 25,
    color: '#fff',
  },
  content: {
    flex: 9,
    paddingHorizontal: 0,
  },
  poster: {
    height: ITEM_HEIGHT,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  posterImage: {
    borderRadius: 6,
  },
  about: {
    marginTop: 10,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    color: '#fff',
    fontSize: 18,
    marginVertical: 10,
  },
  cast: {
    fontSize: 16,
    lineHeight: 25,
    color: '#747474',
  },
  creator: {
    fontSize: 16,
    lineHeight: 25,
    color: '#747474',
  },
  actionsContainer: {
    maxHeight: 100,
    width: '100%',
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  actions: {
    color: '#fff',
    fontSize: 30,
  },
  actionsText: {
    fontSize: 13,
    lineHeight: 30,
    color: '#747474',
  },
});

const Carousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <View />

        <Image
          source={require('./assets/Logos/official.png')}
          style={styles.logo}
        />

        <Pressable style={({pressed}) => ({opacity: pressed ? 0.5 : 1})}>
          <Icon name="cast" style={styles.icon} />
        </Pressable>
      </View>

      <ScrollView
        style={styles.content}
        horizontal={true}
        decelerationRate={'normal'}
        snapToInterval={ITEM_WIDTH}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        disableIntervalMomentum
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={12}>
        {cards.map((item, idx) => {
          const {image, title} = item;

          const inputRange = [
            (idx - 1) * ITEM_WIDTH,
            idx * ITEM_WIDTH,
            (idx + 1) * ITEM_WIDTH,
          ];

          const translate = scrollX.interpolate({
            inputRange,
            outputRange: [0.85, 1, 0.85],
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
          });

          return (
            <Animated.View
              key={idx}
              style={{
                width: ITEM_WIDTH,
                marginLeft: idx === 0 ? OFFSET : undefined,
                marginRight: idx === cards.length - 1 ? OFFSET : undefined,
                opacity: opacity,
                transform: [{scale: translate}],
              }}>
              <ImageBackground
                source={image}
                style={styles.poster}
                imageStyle={styles.posterImage}
              />

              <ScrollView style={styles.about}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>
                  {faker.lorem.sentences(3)}
                </Text>

                <Text style={styles.cast}>
                  {`Cast: ${faker.fake(
                    '{{name.lastName}} {{name.firstName}}, {{name.lastName}} {{name.firstName}}, {{name.lastName}} {{name.firstName}}',
                  )}`}
                </Text>

                <Text style={styles.creator}>
                  {`Creator: ${faker.fake(
                    '{{name.lastName}} {{name.firstName}} {{name.suffix}}',
                  )}`}
                </Text>

                <View style={styles.actionsContainer}>
                  <Pressable
                    style={({pressed}) => ({
                      opacity: pressed ? 0.5 : 1,
                    })}>
                    <Icon name="add" style={styles.actions} />
                    <Text style={styles.actionsText}>My List</Text>
                  </Pressable>

                  <Pressable
                    style={({pressed}) => ({
                      opacity: pressed ? 0.5 : 1,
                    })}>
                    <Icon name="thumb-up" style={styles.actions} />
                    <Text style={styles.actionsText}>Liked</Text>
                  </Pressable>

                  <Pressable
                    style={({pressed}) => ({
                      opacity: pressed ? 0.5 : 1,
                    })}>
                    <Icon name="ios-share" style={styles.actions} />
                    <Text style={styles.actionsText}>Share</Text>
                  </Pressable>
                </View>
              </ScrollView>
            </Animated.View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Carousel;
