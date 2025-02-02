// 「イベントの開始時刻と終了時刻」の配列、そして「プランの時刻」の配列を引数として、
// それらの x 方向の配置を返す関数

export type DurationBlock = CampEvent & {
  Start: number // イベントブロックの始まりが第何行か
  End: number // イベントブロックの終わりが第何行か
  Column: number // イベントブロックは第何列にいるか
}

export type MomentBlock = CampEvent & {
  Row: number // 第何行に書かれているか
}

export type TimeHead = {
  Line: number // 第何行の時刻表示か
  Time: number // 時刻（UNIX 元期からの経過ミリ秒数）
}

export type BlockGroup = {
  Durations: DurationBlock[] // 含まれているイベント
  Moments: MomentBlock[] // 含まれているプラン
  Start: number // 始まりが第何行か
  End: number // 終わりが第何行か
  Columns: number // このグループの横幅（整数値）
  TimeTable: TimeHead[] // グループに含まれる時刻
}

export const epoch = (timeString: string) => new Date(timeString).valueOf()
// ISO 文字列が与えられたとき、その時刻について UNIX 元期からの経過ミリ秒数（切り捨て整数値）を返す関数

export const getLayout = (events: CampEvent[]) => {
  const moments: CampEvent[] = [] // 開催時間と終了時間が同じイベント
  const durations: CampEvent[] = [] // 開催時間と終了時間が異なるイベント

  for (const event of events) {
    if (event.time_start === event.time_end) {
      moments.push(event)
    } else {
      durations.push(event)
    }
  }

  moments.sort((a, b) => epoch(a.time_start) - epoch(b.time_start))
  const momentsDic: { [id: number]: MomentBlock } = {} // あとで使う。ID は一意なので連想配列（辞書）を定義できる
  for (const moment of moments) {
    momentsDic[moment.id] = { ...moment, Row: 0 }
  }

  durations.sort((a, b) => {
    if (epoch(a.time_start) > epoch(b.time_start)) {
      return 1
    } else if (epoch(a.time_start) < epoch(b.time_start)) {
      return -1
    } else {
      return epoch(a.time_end) - epoch(b.time_end)
    }
  })
  const durationsDic: { [id: number]: DurationBlock } = {}
  for (const duration of durations) {
    durationsDic[duration.id] = { ...duration, Start: 0, End: 0, Column: 0 }
  }

  type TimeStatus = {
    time: number // 日時（UNIX 元期からの経過ミリ秒数）
    before: { isMoment: boolean; id: number | null }[] // その時刻に開始するイベント終了直後の状態と、その時刻ちょうどのプラン
    after: { isMoment: boolean; id: number | null }[] // その時刻に開始するイベント開始直後の状態
  }

  const arrange: TimeStatus[] = []
  const arrangeTimes: number[] = [] // arrange に登録されている日時のみの配列

  for (const moment of moments) {
    arrange.push({
      time: epoch(moment.time_start),
      before: [{ isMoment: true, id: moment.id }],
      after: [],
    })
    arrangeTimes.push(epoch(moment.time_start))
  }

  for (const duration of durations) {
    if (!arrangeTimes.includes(epoch(duration.time_start))) {
      arrange.push({
        time: epoch(duration.time_start),
        before: [],
        after: [],
      })
      arrangeTimes.push(epoch(duration.time_start))
    }
    if (!arrangeTimes.includes(epoch(duration.time_end))) {
      arrange.push({
        time: epoch(duration.time_end),
        before: [],
        after: [],
      })
      arrangeTimes.push(epoch(duration.time_end))
    }
  }

  arrange.sort((a, b) => a.time - b.time)
  arrangeTimes.sort((a, b) => a - b)

  // 以上で全てのプラン及び全てのタイムスタンプ（プラン、イベントの開始・終了）の情報を格納した配列 arrange が得られた
  // ここから arrange において実際にイベントの配置を決める処理をする

  for (const duration of durations) {
    // 1. イベント全体が収まる列を探す
    // 2. イベントを arrange に収める

    // arrange からイベントが新たに入る部分（開催時刻 <= arr.time < 終了時刻）の行を抽出
    const filtered = arrange.filter(
      (arr) => epoch(duration.time_start) <= arr.time && arr.time < epoch(duration.time_end),
    )

    // イベント期間に真に含まれる arr の before[0] にプランが含まれるなら column > 0
    // イベント期間に含まれる（先頭を含む）arr の after[0] から after[n] までにイベントが含まれるなら column > n

    let column = 0 // イベントを挿入可能な列
    const hasMoment = (arr: TimeStatus) => {
      if (arr.before.length === 0) {
        arr.before.push({ isMoment: false, id: null })
      }
      return arr.before[0].isMoment
    }
    if (filtered.slice(1).map(hasMoment).includes(true)) {
      column++ // 第 0 列を抽出して、プランが一つでも含まれていれば第 1 列に移る
    }
    const hasduration = (arr: TimeStatus) => {
      while (arr.after.length <= column) {
        arr.after.push({ isMoment: false, id: null })
      }
      return Boolean(arr.after[column].id)
    }
    while (filtered.map(hasduration).includes(true)) {
      column++ // 第 n 列を抽出して、イベントが一つでも含まれていれば第 n + 1 列に移る
    }

    durationsDic[duration.id].Column = column

    // 第 column 列にイベントを追加する
    filtered[0].after[filtered[0].after.length - 1] = { isMoment: false, id: duration.id }
    for (let i = 1; i < filtered.length; i++) {
      filtered[i].before[filtered[i].before.length - 1] = { isMoment: false, id: duration.id }
      filtered[i].after[filtered[i].after.length - 1] = { isMoment: false, id: duration.id }
    }
  }

  // console.log(arrange)

  // 以上で arrange に全てのプラントスタンプの位置と列の情報が入った
  // この arrange を、before（次の時間からのイベントが始まる前）にイベントが入っていない要素を境に分割する
  // それぞれのグループの位置や、グループに含まれるイベントやプラン、横幅などを BlockGroup 型にまとめて返り値とする

  for (const moment of moments) {
    momentsDic[moment.id].Row = arrangeTimes.indexOf(epoch(moment.time_start))
  }

  for (const duration of durations) {
    durationsDic[duration.id].Start = arrangeTimes.indexOf(epoch(duration.time_start))
    durationsDic[duration.id].End = arrangeTimes.indexOf(epoch(duration.time_end))
  }

  const groups: BlockGroup[] = []
  const affiliation: number[] = [] // それぞれの時刻がどのグループに所属しているか

  // まず Start と End を埋めていく
  for (let i = 0; i < arrange.length; i++) {
    if (
      arrange[i].before.length === 0 ||
      (arrange[i].before.length === 1 && arrange[i].before[0].isMoment)
    ) {
      if (groups.length > 0) {
        groups[groups.length - 1].End = i - 1
      }
      groups.push({ Durations: [], Moments: [], Start: i, End: 0, Columns: 0, TimeTable: [] })
    }
    groups[groups.length - 1].TimeTable.push({ Line: i, Time: arrangeTimes[i] })
    affiliation.push(groups.length - 1)
  }
  groups[groups.length - 1].End = groups[groups.length - 1].Start

  // console.log(affiliation)

  for (const idText in momentsDic) {
    const id = Number(idText) // 強制的に string として列挙されるという謎の仕様
    const groupNum = affiliation[momentsDic[id].Row] // id のプランがどのグループに属するか
    groups[groupNum].Moments.push(momentsDic[id])
  }

  for (const idText in durationsDic) {
    const id = Number(idText)
    const groupNum = affiliation[durationsDic[id].Start]
    groups[groupNum].Durations.push(durationsDic[id])
  }

  for (let i = 0; i < groups.length; i++) {
    const arr = arrange.slice(groups[i].Start, groups[i].End + 1)
    groups[i].Columns = Math.max(...arr.map((t) => t.after.length), 1)
  }

  // console.log(groups)

  return groups
}
