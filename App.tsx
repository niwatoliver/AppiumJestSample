import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Linking,
  TextInput,
  Button,
  Image,
  TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper';
import { Video } from "expo-av";

export default function App() {
  const [text, setText] = React.useState<string>('');

  return (
    <Swiper
      style={styles.wrapper}
      dotStyle={styles.dotStyle}
      loop={false}
      activeDotStyle={styles.activeDotStyle}>
      <View style={styles.slide1} accessibilityLabel="slide1">
        <Text style={styles.text}>テキストを入力してね</Text>
        <TextInput
          accessibilityLabel="TextInput"
          style={styles.textInput}
          value={text}
          onChangeText={(text) => setText(text)}
        />
      </View>
      <View style={styles.slide2} accessibilityLabel="slide2">
        <Text style={styles.text}>👇入力されたテキスト👇</Text>
        <Text style={styles.text} accessibilityLabel={text}>{text}</Text>
        <Button
          title="ここをタップ！"
          accessibilityLabel="textChangeButton"
          onPress={() => setText("タップされたよ！")}
        />
      </View>
      <View style={styles.slide3} accessibilityLabel="slide3">
        <Text style={styles.text}>👇画像をクリックでQiitaに遷移👇</Text>
        <TouchableOpacity onPress={()=> Linking.openURL('https://qiita.com/')} accessibilityLabel="imageWrap">
          <Image
            style={{ width: 200, height: 200 }}
            source={{ uri: 'https://minakawa-daiki.github.io/AppiumJestSample/sample.png' }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.slide4} accessibilityLabel="slide4">
        <Text style={styles.text}>Page 4</Text>
      </View>
      <View style={styles.slide5} accessibilityLabel="slide5">
        <Text style={styles.text}>👇動画をクリックでQiitaに遷移👇</Text>
        <TouchableOpacity onPress={()=> Linking.openURL('https://qiita.com/')} accessibilityLabel="videoWrap">
          <Video
            source={{ uri: 'https://minakawa-daiki.github.io/AppiumJestSample/sample.mp4' }}
            rate={1.0}
            volume={1.0}
            isMuted={true}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={{ width: 320, height: 180 }}
          />
        </TouchableOpacity>
      </View>
    </Swiper>
  );
}

const styles = StyleSheet.create({
  dotStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.48)',
  },
  activeDotStyle: {
    backgroundColor: 'white',
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  slide4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  slide5: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 8,
  },
  button: {

  },
  textInput: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
  }
});
