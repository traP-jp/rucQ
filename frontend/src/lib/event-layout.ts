// 「イベントの開始時刻と終了時刻」の配列、そして「プランの時刻」の配列を引数として、
// それらの x 方向の配置を返す関数

// イベントを表す型
export type Event = {
  ID: number // 1 以上の整数
  StartsAt: string // ISO 標準の文字列
  EndsAt: string
}

// プラン（黒字で表示される合宿のしおり的なスケジュール）を表す型
export type Plan = {
  ID: number // 1 以上の整数
  At: string
}

export const getLayoutX = (events: Event[], plans: Plan[], campStartsAt: string) => {
  const timeStamps: [string, number, number][] = [[campStartsAt, 0, 0]]
  // 各要素が [日時を表す ISO 文字列, スタンプの種類を表す数字, ID] になっている。ID は正整数と約束する
  // スタンプの種類を表す数字は 0: プラン, 1: イベントの終了, 2: イベントの開始。これがそのまま処理の優先順位

  for (const plan of plans) {
    timeStamps.push([plan.At, 0, plan.ID])
  }

  for (const event of events) {
    timeStamps.push([event.StartsAt, 2, event.ID])
    timeStamps.push([event.EndsAt, 1, event.ID])
  }

  const epoch = (timeString: string) => new Date(timeString).valueOf()
  // ISO 文字列が与えられたとき、その時刻について UNIX 元期からの経過ミリ秒数（切り捨て整数値）を返す関数

  timeStamps.sort((a, b) => epoch(a[0]) + 0.1 * a[1] - (epoch(b[0]) + 0.1 * b[1]))
  // 時刻の早い順にソート。同時ならばプランを最初に持ってくる

  console.log(timeStamps)

  const arrange: number[][] = [[epoch(campStartsAt), 0]]
  // 各要素が [日時（UNIX 元期からの経過ミリ秒数）, あればプランの ID or 0, 開催中のイベントの ID x 複数]

  for (const stamp of timeStamps) {
    const latest = [...arrange[arrange.length - 1]]

    if (stamp[1] == 2) {
      const index = latest.slice(2).indexOf(0) // arrange[-1] の 1 番目以降のうち最初にある 0 の index が -1 （0 なし）
      if (index == -1) {
        latest.push(stamp[2])
      } else {
        latest[index + 2] = stamp[2] // index は最初の 2 つを含めない長さなので 2 を足す
      }
    }

    if (stamp[1] == 1) {
      const index = latest.slice(2).indexOf(stamp[2])
      latest[index + 2] = 0
    }

    while (latest.length > 2 && latest[latest.length - 1] == 0) {
      // 末尾の 0（イベントがない）の列を削除して幅を縮小する
      latest.pop()
    }

    if (epoch(stamp[0]) > latest[0]) {
      latest[0] = epoch(stamp[0])
      latest[1] = stamp[1] == 0 ? stamp[2] : 0 // プランの時刻だったら
      // 直前の arrange をコピーし、新しい日時とプランの情報を入力して arrange に追加
      arrange.push(latest)
    } else {
      arrange[arrange.length - 1] = latest
    }
  }

  // 場合によって末尾に 0 を含むか 何もないかのどっちか。リスト長は単調増加
  return arrange
}
