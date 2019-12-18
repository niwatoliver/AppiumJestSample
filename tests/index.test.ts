import * as _ from 'webdriverio';

// TODO PCスペックに応じて、ここの数値を調整
jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

describe('AppiumJestSampleアプリのテスト', () => {
  // 全体で一度だけの前処理
  beforeAll(async () => await browser.pause(1000));
  // テストごとの前処理
  afterEach(async () => await browser.pause(1000));

  test('test', async () => {
    const textInputElement = await browser.$('~TextInput');
    await textInputElement.addValue('TEST!!!!');
    await browser.pause(1000);
    await textInputElement.addValue('Enter');
    await browser.pause(1000);
    await browser.execute('mobile: swipe', { direction: 'left' });
    await browser.execute('mobile: swipe', { direction: 'left' });
    await browser.pause(5000);
  });
});
