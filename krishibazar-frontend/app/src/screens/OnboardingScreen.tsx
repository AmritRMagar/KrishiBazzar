import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Video, ResizeMode } from 'expo-av';


type RootStackParamList = {
  Login: undefined;
  Onboarding: undefined;
};

type OnboardingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

interface Props {
  navigation: OnboardingScreenNavigationProp;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const slides = [
  {
    video: require('../../../assets/logoanimation.mp4'), // MP4 video slide
  },
  {
    title: 'Welcome to Krishibazar!',
    subtitle: 'Discover fresh local produce and more.',
    image: require('../../../assets/mark.jpg'),
  },
  {
    title: 'Connect with Farmers',
    subtitle: 'Directly interact with local farmers and get the best produce.',
    image: require('../../../assets/fruits.jpg'),
  },
  {
    title: 'Enjoy Freshness',
    subtitle: 'Experience the difference of fresh and high-quality produce.',
    image: require('../../../assets/krishi.jpg'),
  },
];

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSkip = () => {
    navigation.navigate('Login');
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({ x: nextIndex * screenWidth, animated: true });
    }
  };

  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.floor(contentOffsetX / screenWidth);
    setCurrentIndex(newIndex);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            {slide.video ? (
              <View style={styles.videoContainer}>
                <Video
                  source={slide.video}
                  style={styles.video}
                  isLooping // Loop the video
                  resizeMode={ResizeMode.COVER}
                  shouldPlay
                />
              </View>
            ) : (
              <View style={styles.imageContainer}>
                <Image source={slide.image} style={styles.image} />
              </View>
            )}
            {slide.title && (
              <View style={styles.textContainer}>
                <Text style={styles.title}>{slide.title}</Text>
                <Text style={styles.subtitle}>{slide.subtitle}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
      <View style={styles.paginationContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              currentIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
      <View style={[styles.buttonContainer, currentIndex === slides.length - 1 && styles.centeredButtonContainer]}>
        {currentIndex < slides.length - 1 && (
          <>
            <TouchableOpacity
              style={[styles.button, styles.skipButton]}
              onPress={handleSkip}
            >
              <Text style={styles.buttonText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handleNext}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </>
        )}
        {currentIndex === slides.length - 1 && (
          <TouchableOpacity
            style={[styles.button, styles.getStartedButton]}
            onPress={handleGetStarted}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbf0', 
  },
  scrollView: {
    flex: 1,
    width: screenWidth,
  },
  slide: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    width: screenWidth,
    paddingTop: screenHeight * 0.1,
    paddingHorizontal: 20,
  },
  videoContainer: {
    marginLeft : '5%' ,
    marginTop : '40%',
    width: screenWidth * 0.7 ,
    height: screenHeight * 0.4,
    justifyContent : 'center' ,
    alignItems : 'center',
  },
  video: {
    width: '200%',
    height: '90%',
  },
  imageContainer: {
    width: screenWidth,
    height: screenHeight * 0.5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    width: screenWidth,
    height: screenHeight * 0.4,
    backgroundColor: '#fbfbf0', 
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 30,
    paddingHorizontal: 20,
    position: 'relative',
    top: -30,
    overflow: 'visible',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50', // Green color for title
    textAlign: 'center',
    fontFamily: 'Open Sans', // Open Sans for title
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8D6E63', // Brown color for subtitle
    textAlign: 'center',
    fontFamily: 'Open Sans', // Open Sans for subtitle
    paddingHorizontal: 20,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#BDBDBD', // Grey color for inactive dots
    marginHorizontal: 8,
  },
  activeDot: {
    width: 12,
    height: 12,
    backgroundColor: '#388E3C', // Green color for active dot
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 40,
  },
  centeredButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  button: {
    backgroundColor: '#4CAF50', // Green color for buttons
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  skipButton: {
    backgroundColor: '#8D6E63', // Brown color for skip button
  },
  getStartedButton: {
    backgroundColor: '#1976D2', // Bright blue for get started button
  },
  buttonText: {
    color: '#fff', // White color for button text
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Open Sans', // Open Sans for button text
  },
});

export default OnboardingScreen;