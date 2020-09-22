class Calc {
  /**
   * ランダムな数(float)
   * @param {number} min - 最小値(float)
   * @param {number} max - 最大値(float)
   * @return {number} - min(含む)からmax(含む)までのランダムな数(float)
   */
  static random(min: number, max: number): number {
    return Math.random() * (max - min) + min
  }

  /**
   * ランダムな数(int)
   * @param {number} min - 最小値(int)
   * @param {number} max - 最大値(int)
   * @return {number} - min(含む)からmax(含む)までのランダムな数(int)
   */
  static randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  /**
   * 配列内の値をランダムに取得
   * @param {array} arr
   * @return {any}
   */
  static randomArr(arr: number[]): number {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  /**
   * 変換前の値を変更後の値にマッピング
   * @param {number} val - マッピングする値
   * @param {number} inputMin - 変換前の最小値
   * @param {number} inputMax - 変換前の最大値
   * @param {number} outputMin - 変換後の最小値
   * @param {number} outputMax - 変換後の最大値
   * @return {number}
   */
  static map(
    val: number,
    inputMin: number,
    inputMax: number,
    outputMin: number,
    outputMax: number
  ): number {
    return (
      (outputMax - outputMin) * ((val - inputMin) / (inputMax - inputMin)) +
      outputMin
    )
  }

  /**
   * 値を範囲内におさめる
   * @param {number} val - 値
   * @param {number} min - 最小値
   * @param {number} max - 最大値
   * @return {number}
   */
  static clamp(val: number, min: number, max: number): number {
    return Math.max(Math.min(val, max), min)
  }

  /**
   * 二点間の移動を補間
   * @param {number} start - 開始位置
   * @param {number} end - 終了位置
   * @param {number} amt - 補間量 0.00 - 1.00の値が入る
   * @return {number}
   * @example
   * // 毎フレームに 5% マウス位置へ移動する x, y を計算。
   * x = lerp(x, mouseX, 0.05);
   * y = lerp(y, mouseY, 0.05);
   *
   */
  static lerp(start: number, end: number, amt: number): number {
    return start + (end - start) * amt
  }

  /**
   * ラジアンに変換
   * @param {number} degree
   */
  static degree2radian(degree: number): number {
    return (degree * Math.PI) / 180
  }

  /**
   * 角度に変換
   * @param {number} radian
   */
  static radian2degree(radian: number): number {
    return radian / Math.PI / 180
  }
}

export default Calc
