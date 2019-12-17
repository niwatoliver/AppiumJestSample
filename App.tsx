import React from 'react';
import { StyleSheet, Text, View, Linking, TextInput } from 'react-native';
import Swiper from 'react-native-swiper';
import { WebView } from 'react-native-webview';

export default function App() {
  const [text, setText] = React.useState<string>('');
  const imageWebView = React.useRef<WebView>(null);
  const videoWebView = React.useRef<WebView>(null);

  return (
    <Swiper
      style={styles.wrapper}
      dotStyle={styles.dotStyle}
      loop={false}
      activeDotStyle={styles.activeDotStyle}>
      <View style={styles.slide1}>
        <Text style={styles.text}>テキストを入力してね</Text>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={(text) => setText(text)}
        />
      </View>
      <View style={styles.slide2}>
        <Text style={styles.text}>👇入力されたテキスト👇</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
      <WebView
        ref={imageWebView}
        source={require('./html/image.html')}
        onNavigationStateChange={async (event) => {
          if(!event.url.includes('/html/')) {
            imageWebView.current.stopLoading();
            await Linking.openURL(event.url);
          }
        }}
      />
      <View style={styles.slide4}>
        <Text style={styles.text}>Page 4</Text>
      </View>
      <WebView
        ref={videoWebView}
        source={require('./html/video.html')}
        onNavigationStateChange={async (event) => {
          if(!event.url.includes('/html/')) {
            videoWebView.current.stopLoading();
            await Linking.openURL(event.url);
          }
        }}
      />
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
  slide4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    margin: 8,
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
