// 「イベントの開始時刻と終了時刻」の配列、そして「プランの時刻」の配列を引数として、
// それらの x 方向の配置を返す関数

// イベントを表す型
export type Event = {
  ID: number // 1 以上の整数
  Title: string // イベントのタイトル
  Place: string // イベントの開催場所
  StartsAt: string // ISO 標準の文字列
  EndsAt: string
  Color: string // イベントブロックの色
}

// プラン（黒字で表示される合宿のしおり的なスケジュール）を表す型
export type Plan = {
  ID: number // 1 以上の整数
  Text: string // プランのタイトル
  At: string
}

export type EventBlock = Event & {
  Start: number // イベントブロックの始まりが第何行か
  End: number // イベントブロックの終わりが第何行か
  Column: number // イベントブロックは第何列にいるか
}

export type PlanBlock = Plan & {
  Row: number // 第何行に書かれているか
}

export type TimeHead = {
  Line: number // 第何行の時刻表示か
  Time: number // 時刻（UNIX 元期からの経過ミリ秒数）
}

export type BlockGroup = {
  Events: EventBlock[] // 含まれているイベント
  Plans: PlanBlock[] // 含まれているプラン
  Start: number // 始まりが第何行か
  End: number // 終わりが第何行か
  Columns: number // このグループの横幅（整数値）
  TimeTable: TimeHead[] // グループに含まれる時刻
}

export const epoch = (timeString: string) => new Date(timeString).valueOf()
// ISO 文字列が与えられたとき、その時刻について UNIX 元期からの経過ミリ秒数（切り捨て整数値）を返す関数

export const getLayout = (events: Event[], plans: Plan[]) => {
  plans.sort((a, b) => epoch(a.At) - epoch(b.At))
  const plansDic: { [id: number]: PlanBlock } = {} // あとで使う。ID は一意なので連想配列（辞書）を定義できる
  for (const plan of plans) {
    plansDic[plan.ID] = { ...plan, Row: 0 }
  }

  events.sort((a, b) => {
    if (epoch(a.StartsAt) > epoch(b.StartsAt)) {
      return 1
    } else if (epoch(a.StartsAt) < epoch(b.StartsAt)) {
      return -1
    } else {
      return epoch(a.EndsAt) - epoch(b.EndsAt)
    }
  })
  const eventsDic: { [id: number]: EventBlock } = {}
  for (const event of events) {
    eventsDic[event.ID] = { ...event, Start: 0, End: 0, Column: 0 }
  }

  type TimeStatus = {
    time: number // 日時（UNIX 元期からの経過ミリ秒数）
    before: { isPlan: boolean; id: number | null }[] // その時刻に開始するイベント終了直後の状態と、その時刻ちょうどのプラン
    after: { isPlan: boolean; id: number | null }[] // その時刻に開始するイベント開始直後の状態
  }

  const arrange: TimeStatus[] = []
  const arrangeTimes: number[] = [] // arrange に登録されている日時のみの配列

  for (const plan of plans) {
    arrange.push({
      time: epoch(plan.At),
      before: [{ isPlan: true, id: plan.ID }],
      after: [],
    })
    arrangeTimes.push(epoch(plan.At))
  }

  for (const event of events) {
    if (!arrangeTimes.includes(epoch(event.StartsAt))) {
      arrange.push({
        time: epoch(event.StartsAt),
        before: [],
        after: [],
      })
      arrangeTimes.push(epoch(event.StartsAt))
    }
    if (!arrangeTimes.includes(epoch(event.EndsAt))) {
      arrange.push({
        time: epoch(event.EndsAt),
        before: [],
        after: [],
      })
      arrangeTimes.push(epoch(event.EndsAt))
    }
  }

  arrange.sort((a, b) => a.time - b.time)
  arrangeTimes.sort((a, b) => a - b)

  // 以上で全てのプラン及び全てのタイムスタンプ（プラン、イベントの開始・終了）の情報を格納した配列 arrange が得られた
  // ここから arrange において実際にイベントの配置を決める処理をする

  for (const event of events) {
    // 1. イベント全体が収まる列を探す
    // 2. イベントを arrange に収める

    // arrange からイベントが新たに入る部分（開催時刻 <= arr.time < 終了時刻）の行を抽出
    const filtered = arrange.filter(
      (arr) => epoch(event.StartsAt) <= arr.time && arr.time < epoch(event.EndsAt),
    )

    // イベント期間に真に含まれる arr の before[0] にプランが含まれるなら column > 0
    // イベント期間に含まれる（先頭を含む）arr の after[0] から after[n] までにイベントが含まれるなら column > n

    let column = 0 // イベントを挿入可能な列
    const hasPlan = (arr: TimeStatus) => {
      if (arr.before.length === 0) {
        arr.before.push({ isPlan: false, id: null })
      }
      return arr.before[0].isPlan
    }
    if (filtered.slice(1).map(hasPlan).includes(true)) {
      column++ // 第 0 列を抽出して、プランが一つでも含まれていれば第 1 列に移る
    }
    const hasEvent = (arr: TimeStatus) => {
      while (arr.after.length <= column) {
        arr.after.push({ isPlan: false, id: null })
      }
      return Boolean(arr.after[column].id)
    }
    while (filtered.map(hasEvent).includes(true)) {
      column++ // 第 n 列を抽出して、イベントが一つでも含まれていれば第 n + 1 列に移る
    }

    eventsDic[event.ID].Column = column

    // 第 column 列にイベントを追加する
    filtered[0].after[filtered[0].after.length - 1] = { isPlan: false, id: event.ID }
    for (let i = 1; i < filtered.length; i++) {
      filtered[i].before[filtered[i].before.length - 1] = { isPlan: false, id: event.ID }
      filtered[i].after[filtered[i].after.length - 1] = { isPlan: false, id: event.ID }
    }
  }

  console.log(arrange)

  // 以上で arrange に全てのプラントスタンプの位置と列の情報が入った
  // この arrange を、before（次の時間からのイベントが始まる前）にイベントが入っていない要素を境に分割する
  // それぞれのグループの位置や、グループに含まれるイベントやプラン、横幅などを BlockGroup 型にまとめて返り値とする

  for (const plan of plans) {
    plansDic[plan.ID].Row = arrangeTimes.indexOf(epoch(plan.At))
  }

  for (const event of events) {
    eventsDic[event.ID].Start = arrangeTimes.indexOf(epoch(event.StartsAt))
    eventsDic[event.ID].End = arrangeTimes.indexOf(epoch(event.EndsAt))
  }

  const groups: BlockGroup[] = []
  const affiliation: number[] = [] // それぞれの時刻がどのグループに所属しているか

  // まず Start と End を埋めていく
  for (let i = 0; i < arrange.length; i++) {
    if (
      arrange[i].before.length === 0 ||
      (arrange[i].before.length === 1 && arrange[i].before[0].isPlan)
    ) {
      if (groups.length > 0) {
        groups[groups.length - 1].End = i - 1
      }
      groups.push({ Events: [], Plans: [], Start: i, End: 0, Columns: 0, TimeTable: [] })
    }
    groups[groups.length - 1].TimeTable.push({ Line: i, Time: arrangeTimes[i] })
    affiliation.push(groups.length - 1)
  }
  groups[groups.length - 1].End = groups[groups.length - 1].Start

  console.log(affiliation)

  for (const idText in plansDic) {
    const id = Number(idText) // 強制的に string として列挙されるという謎の仕様
    const groupNum = affiliation[plansDic[id].Row] // id のプランがどのグループに属するか
    groups[groupNum].Plans.push(plansDic[id])
  }

  for (const idText in eventsDic) {
    const id = Number(idText)
    const groupNum = affiliation[eventsDic[id].Start]
    groups[groupNum].Events.push(eventsDic[id])
  }

  for (let i = 0; i < groups.length; i++) {
    const arr = arrange.slice(groups[i].Start, groups[i].End + 1)
    groups[i].Columns = Math.max(...arr.map((t) => t.after.length), 1)
  }

  console.log(groups)

  return groups
}
