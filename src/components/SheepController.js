import Sheep from './Sheep.js';
import sheepImg from '../asset/sheep.png';

export default class SheepController {
  constructor() {
    // 이미지 로드
    this.img = new Image();
    this.img.onload = () => {
      this.loaded();
    };
    this.img.src = sheepImg;

    this.items = [];

    this.cur = 0;
    this.isLoaded = false;
  }

  /**
   * 양 추가
   */
  addSheep() {
    this.items.push(new Sheep(this.img, this.stageWidth));
  }

  /**
   * 이미지가 로드되면 양을 추가
   */
  loaded() {
    this.isLoaded = true;
    this.addSheep();
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  /**
   * 양들을 렌더링
   */
  draw(ctx, t, dots) {
    if (this.isLoaded) {
      this.cur += 1;
      if (this.cur > 200) {
        this.cur = 0;
        this.addSheep();
      }
    }

    // Sheep draw
    for (let i = this.items.length - 1; i >= 0; i--) {
      const item = this.items[i];
      if (item.x < -item.width) {
        this.items.splice(i, 1);
      } else {
        item.draw(ctx, t, dots);
      }
    }
  }
}
