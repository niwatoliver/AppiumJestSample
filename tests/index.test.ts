import 'webdriverio';
import * as fs from 'fs';
import app from '../app.json';

// PCスペックに応じて、ここの数値を調整
jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

const platformName = browser.capabilities.platformName;
const inputText = "おりばー";
const baseResultPath = './tests/screenshots';

describe('AppiumJestSampleアプリのテスト', () => {
  // テストごとの前処理
  beforeEach(async () => await browser.pause(1000));

  beforeAll(async () => {
    try {
      await browser.startRecordingScreen({ videoType: 'mpeg4' });
    } catch (e) {}
  });

  afterAll(async () => {
    try {
      const movie = await browser.stopRecordingScreen();
      const decode = Buffer.from(movie, 'base64');
      fs.writeFileSync(
        `${baseResultPath}/result.mp4`,
        decode
      );
    } catch (e) {}
  });

  test('1ページ目が存在している', async () => {
    expect((await browser.$('~slide1')).elementId).not.toBeUndefined();
    await browser.saveScreenshot(`${baseResultPath}/page1.png`);
  });

  test('1ページ目で入力された内容が2ページ目で表示されている', async () => {
    const textInputElement = await browser.$('~TextInput');
    await textInputElement.addValue('おりばー');
    await browser.pause(2000);
    await browser.hideKeyboard();
    await swipe('left');
    // 2ページ目の存在確認
    expect((await browser.$('~slide2')).elementId).not.toBeUndefined();

    // https://github.com/appium/appium/issues/13288 をみる限り
    // iOSのバージョンによってはgetText()がaccessibilityLabelと同じ文字列を返すバグがある
    // なのでaccessibilityLabelの値をinputTextと一緒にしている
    // 最新のiOSとAndroidは問題ない
    const textInputResultElement = await browser.$(`~${inputText}`);
    expect(await textInputResultElement.getText()).toBe(inputText);
  });

  test('2ページ目のボタンをタップすると内容が変化する', async () => {
    await browser.saveScreenshot(`${baseResultPath}/page2-1.png`);
    const textChangeButtonElement = await browser.$('~textChangeButton');
    await textChangeButtonElement.click();
    const textInputResultElement = await browser.$('~タップされたよ！');
    await browser.saveScreenshot(`${baseResultPath}/page2-2.png`);
    expect(await textInputResultElement.getText()).not.toBe(inputText);
  });

  test('3ページ目が存在している', async () => {
    await swipe('left');
    expect((await browser.$('~slide3')).elementId).not.toBeUndefined();
    await browser.saveScreenshot(`${baseResultPath}/page3.png`);

    // 画像をクリックして戻ってこれることを確認
    await browser.pause(2000);
    const imageWrap = await browser.$("~imageWrap");
    await imageWrap.click();
    await browser.pause(5000);
    // アプリに戻ってくるための処理
    if (platformName === 'Android') {
      await browser.pressKeyCode(4);
    } else {
      await browser.execute('mobile: activateApp', {
        bundleId: app.expo.ios.bundleIdentifier,
      });
    }
  });

  test('4ページ目が存在している', async () => {
    await swipe('left');
    expect((await browser.$('~slide4')).elementId).not.toBeUndefined();
    await browser.saveScreenshot(`${baseResultPath}/page4.png`);
  });

  test('5ページ目が存在している', async () => {
    await swipe('left');
    expect((await browser.$('~slide5')).elementId).not.toBeUndefined();

    // 動画が再生されていることをスクショで判別する
    await browser.saveScreenshot(`${baseResultPath}/page5-1.png`);
    await browser.pause(3000);
    await browser.saveScreenshot(`${baseResultPath}/page5-2.png`);
  });
});

async function swipe(direction: 'left' | 'right') {
  if(platformName === 'iOS') {
    // iOSはswipeを呼び出せるのでそれを使う
    await browser.execute('mobile: swipe', { direction });
  } else if(platformName === 'Android') {
    // Androidは代わりにflickを利用する
    const rootElement = await browser.$('//*');
    const x = direction === 'left' ? -1000 : 1000;
    await browser.touchFlick(x, 0, rootElement.elementId, 100);

    // 現状ReactNativeはこれだとSwipeできない？（AndroidのNativeだと動くことを確認）
    // await browser.touchPerform([
    //   { action: 'press', options: { x: 1000, y: windowSize.height / 2 } },
    //   { action: 'moveTo', options: { x: 100, y: windowSize.height / 2 } },
    //   { action: 'release' },
    // ]);
  }
}
