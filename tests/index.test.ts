import 'webdriverio';

// PCスペックに応じて、ここの数値を調整
jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

const platformName = browser.capabilities.platformName;

describe('AppiumJestSampleアプリのテスト', () => {
  // テストごとの前処理
  beforeEach(async () => await browser.pause(1000));

  test('test', async () => {
    const textInputElement = await browser.$('~TextInput');
    await textInputElement.addValue('TEST!!!!');
    await browser.hideKeyboard();
    await browser.pause(2000);

    await swipe('left');
    await browser.pause(1000);
    await swipe('right');

    await browser.pause(5000);
  });
});

async function swipe(direction: 'left' | 'right') {
  if(platformName === 'iOS') {
    await browser.execute('mobile: swipe', { direction });
  } else if(platformName === 'Android') {
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
