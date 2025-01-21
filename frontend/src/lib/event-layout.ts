// 「イベントの開始時刻と終了時刻」の配列、そして「プランの時刻」の配列を引数として、
// それらの x 方向の配置を返す関数

// イベントを表す型
export type Event = {
  ID: number // 1 以上の整数
  Title: string // イベントのタイトル
  Place: string // イベントの開催場所
  StartsAt: string // ISO 標準の文字列
  EndsAt: string
}

// プラン（黒字で表示される合宿のしおり的なスケジュール）を表す型
export type Plan = {
  ID: number // 1 以上の整数
  Text: string // プランのタイトル
  At: string
}

export type EventBlock = Event & {
  StartRow: number // イベントブロックの始まりが第何行か
  EndRow: number // イベントブロックの終わりが第何行か
  Column: number // イベントブロックは第何列にいるか
}

export type PlanBlock = Plan & {
  Row: number // 第何行に書かれているか
}

export type BlockGroup = {
  Events: EventBlock[] // 含まれているイベント
  Plans: PlanBlock[] // 含まれているプラン
  StartRow: number // 始まりが第何行か
  EndRow: number // 終わりが第何行か
  Columns: number // このグループの横幅（整数値）
}

const epoch = (timeString: string) => new Date(timeString).valueOf()
// ISO 文字列が与えられたとき、その時刻について UNIX 元期からの経過ミリ秒数（切り捨て整数値）を返す関数

export const getLayout = (events: Event[], plans: Plan[], campStartsAt: string) => {
  const timeStamps: { timeText: string; kind: number; id: number }[] = [
    { timeText: campStartsAt, kind: 0, id: 0 },
  ]
  // timeText は日時を表す ISO 文字列、kind はスタンプの種類を表す数字
  // スタンプの種類を表す数字は 0: その他, 1: イベントの終了, 2: プラン,  3: イベントの開始。これがそのまま処理の優先順位
  // ID は正整数と約束するが、時系列に沿って昇順である必要も、連番である必要もない
  // あとで ID を文字列の仕様に変更することもおそらくさほど難しくない

  const plansDic: { [id: number]: PlanBlock } = {} // あとで使う。ID は一意なので連想配列（辞書）を定義できる
  for (const plan of plans) {
    plansDic[plan.ID] = { ...plan, Row: 0 }
    timeStamps.push({ timeText: plan.At, kind: 2, id: plan.ID })
  }

  const eventsDic: { [id: number]: EventBlock } = {}
  for (const event of events) {
    eventsDic[event.ID] = { ...event, StartRow: 0, EndRow: 0, Column: 0 }
    timeStamps.push({ timeText: event.StartsAt, kind: 3, id: event.ID })
    timeStamps.push({ timeText: event.EndsAt, kind: 1, id: event.ID })
  }

  timeStamps.sort((a, b) => epoch(a.timeText) + 0.1 * a.kind - (epoch(b.timeText) + 0.1 * b.kind))
  // 時刻の早い順にソート。同時ならば「イベントの終了」「プラン」「イベントの開始」の順

  console.log(timeStamps)

  // ここまでで配列 timeStamp が完成
  // timeStamp は各要素が「イベントの開始」「イベントの終了」「プラン」のいずれかに対応し、起こったことの情報を持つ

  const arrange: { time: number; blocks: { isPlan: boolean; id: number }[] }[] = [
    { time: epoch(campStartsAt), blocks: [] },
  ]
  // time は 日時（UNIX 元期からの経過ミリ秒数）、blocks は左から順に並べられているブロック

  for (const stamp of timeStamps) {
    const latest = { ...arrange[arrange.length - 1] }
    let index = 0 // 変数の定義のみ

    // stamp = イベントの終了
    if (stamp.kind === 1) {
      index = latest.slice(2).indexOf(stamp.id)
      latest[index + 2] = 0
      while (latest.length > 2 && latest[latest.length - 1] === 0) {
        latest.pop() // 末尾の 0（イベントがない）の列を削除して幅を縮小
      }
      if (epoch(stamp.timeText) > latest[0]) {
        latest[0] = epoch(stamp.timeText) // 新しい時間の話だったなら
        arrange.push(latest) // latest の時間を更新して arrange に追加
      } else {
        arrange[arrange.length - 1] = latest // arrange の最後番目を置き換える
      }
      eventsDic[stamp.id].EndRow = arrange.length - 1
    }

    // stamp = プラン
    if (stamp.kind === 2) {
      latest[1] = stamp.id
      arrange.push(latest)
      plansDic[stamp.id].Row = arrange.length - 1 // プランの位置を辞書に登録
    }

    // stamp = イベントの開始
    if (stamp.kind === 3) {
      // プランを必ず先頭（左端）に表示するために、まず場所取りをさせる
      // どうやって？

      index = latest.slice(2).indexOf(0)
      if (index === -1) {
        // latest の 3 番目以降のうち最初にある 0 の index が -1、すなわち 0 がない
        latest.push(stamp.id)
        eventsDic[stamp.id].Column = latest.length - 1
      } else {
        latest[index + 2] = stamp.id // index は最初の 2 つを含めない長さなので 2 を足す
        eventsDic[stamp.id].Column = index + 2
      }
      if (epoch(stamp.timeText) > latest[0]) {
        latest[0] = epoch(stamp.timeText)
        arrange.push(latest)
      } else {
        arrange[arrange.length - 1] = latest
      }
      eventsDic[stamp.id].StartRow = arrange.length - 1
    }
  }

  // ここまでで配列 arrange と 辞書 eventsDic. plansDic が完成
  // arrange は各要素が区切り時間に対応し、プランと開催中のイベントの情報を持つ
  // eventsDic, plansDic はそれぞれ各 ID のイベントの情報と表示方法の情報を持つ

  console.log(arrange)
  console.log(eventsDic)
  console.log(plansDic)

  // // 最終的な表示は、縦に複数のグループが並んでいて、それぞれが固有の列数を持つ形式になる
  // // グループ同士の境は「何もプランやタスクがない時間帯」、arrange の要素でいえば [(日時), 0] の状態
  // // この境にあたる arrange 要素自体は直前のグループの末尾につく。その日時の直前まで開催されていたイベントがあるかも知れないので

  // const groups: BlockGroup[] = [{ Events: [], Plans: [], StartRow: 0, EndRow: 0, Columns: 0 }]
  // const affiliation: number[] = [] // それぞれの時刻がどのグループに所属しているか

  // // まず StartRow と EndRow を埋めていく
  // for (let i = 0; i < arrange.length; i++) {
  //   affiliation.push(groups.length - 1)
  //   if (arrange[i].length === 2) {
  //     groups[groups.length - 1].EndRow = i
  //     groups.push({ Events: [], Plans: [], StartRow: i + 1, EndRow: 0, Columns: 0 })
  //   }
  // }
  // groups[groups.length - 1].EndRow = groups[groups.length - 1].StartRow

  // for (const idText in plansDic) {
  //   const id = Number(idText) // 強制的に string として列挙されるという謎の仕様
  //   const groupNum = affiliation[plansDic[id].Row] // id のプランがどのグループに属するか
  //   groups[groupNum].Plans.push(plansDic[id])
  // }

  // for (const idText in eventsDic) {
  //   const id = Number(idText)
  //   const groupNum = affiliation[eventsDic[id].StartRow]
  //   groups[groupNum].Events.push(eventsDic[id])
  // }

  // for (let i = 0; i < groups.length - 1; i++) {
  //   const arr = arrange.slice(groups[i].StartRow, groups[i].EndRow + 1)
  //   groups[i].Columns = Math.max(...arr.map((t) => t.length)) - 1
  // }
  // groups[0].Columns = 0

  // console.log(groups)

  // return groups
}
