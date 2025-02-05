// 「イベントの開始時刻と終了時刻」の配列、そして「プランの時刻」の配列を引数として、
// それらの x 方向の配置を返す関数

// export type EventBlock = CampEvent & {
//   Start: number // イベントブロックの始まりが第何行か
//   End: number // イベントブロックの終わりが第何行か
//   Column: number // イベントブロックは第何列にいるか
// }

// export type MomentBlock = CampEvent & {
//   Row: number // 第何行に書かれているか
// }

// export type TimeHead = {
//   Line: number // 第何行の時刻表示か
//   Time: number // 時刻（UNIX 元期からの経過ミリ秒数）
// }

// export type BlockGroup = {
//   events: ventBlock[] // 含まれているイベント
//   Moments: MomentBlock[] // 含まれているプラン
//   Start: number // 始まりが第何行か
//   End: number // 終わりが第何行か
//   Columns: number // このグループの横幅（整数値）
//   TimeTable: TimeHead[] // グループに含まれる時刻
// }

const epoch = (timeString: string) => new Date(timeString).getTime()

// 日程によって events を仕分け、それぞれ開始日時（等しければ終了日時）でソートする
const sortDayEvents = (events: CampEvent[], camp: Camp) => {
  const sorted = [...events].sort((a, b) => {
    if (epoch(a.time_start) > epoch(b.time_start)) {
      return 1
    } else if (epoch(a.time_start) < epoch(b.time_start)) {
      return -1
    } else {
      return epoch(a.time_end) - epoch(b.time_end)
    }
  })

  // 合宿期間中の全ての date に対し、date と events をもつ配列 dayEvents を作成
  const dayEvents: { date: Date; events: CampEvent[] }[] = []
  const newDay = new Date(camp.start_date)

  for (const event of sorted) {
    while (epoch(event.time_start) >= newDay.getTime()) {
      dayEvents.push({ date: newDay, events: [] })
      newDay.setDate(newDay.getDate() + 1)
    }
    dayEvents[dayEvents.length - 1].events.push(event)
  }
  while (epoch(camp.end_date) >= newDay.getTime()) {
    dayEvents.push({ date: newDay, events: [] })
    newDay.setDate(newDay.getDate() + 1)
  }

  return dayEvents
}

export type EventPos = {
  startRow: number
  endRow: number
  column: number
  content: CampEvent
}

export type EventGroup = {
  columns: number // 列数
  spaces: { time: Date; minHeight: number }[] // 領域ごとの最小の表示高さ
  events: EventPos[]
  moments: EventPos[]
}

export type DayGroup = {
  date: Date
  eventGroups: EventGroup[]
}

// events を groups に仕分け、各 groups の列を決定する
const arrangeEvents = (events: CampEvent[]) => {
  const epochTimeSet = new Set<number>([
    ...Array.from(events, (event) => epoch(event.time_start)),
    ...Array.from(events, (event) => epoch(event.time_end)),
  ])

  // それぞれのタイムスタンプに対応した要素をもつ配列 arranged
  const arranged: { time: Date; events: (CampEvent | null)[] }[] = Array.from(
    [...epochTimeSet].sort((a, b) => a - b), // 全てのタイムスタンプ（時系列順）
    (time) => ({ time: new Date(time), events: [] }),
  )

  // イベントの位置情報を記録する配列
  const eventPos: EventPos[] = []

  // arranged の瞬間イベントに対応する要素にイベントを追加
  for (const moment of events.filter((event) => event.time_start === event.time_end)) {
    const index = arranged.findIndex((el) => el.time.getTime() === epoch(moment.time_start))
    arranged[index].events.push(moment)
  }

  // 連続する瞬間イベントの最後に空の要素を追加
  for (let i = arranged.length - 1; i > 0; i--) {
    if (arranged[i - 1].events.length === 1 && arranged[i].events.length === 0) {
      arranged.splice(i, 0, { time: arranged[i - 1].time, events: [] })
    }
  }

  // arranged を分割可能な場所の配列
  let groupBorder = [...new Array(arranged.length + 1).keys()]

  // arranged の要素数は定まったので、瞬間イベント以外のイベントも配置していく
  for (const event of events.filter((event) => event.time_start !== event.time_end)) {
    let start = arranged.findIndex((el) => el.time.getTime() === epoch(event.time_start))
    if (start < arranged.length - 1 && arranged[start].time === arranged[start + 1].time) {
      start = start + 1
    }
    const end = arranged.findIndex((el) => el.time.getTime() === epoch(event.time_end))
    // console.log(`${event.name}: ${start} ~ ${end}`)

    // arranged における start から end までの時間に渡ってイベントがまだ存在しない列を探索
    let column = 0
    while (true) {
      for (let i = start; i < end; i++) {
        if (arranged[i].events.length <= column) {
          arranged[i].events.push(null)
        }
      }
      const arr = Array.from(arranged.slice(start, end), (el) => el.events[column])
      if (arr.some((el) => !!el)) {
        column++ // arr に null でない値が含まれている = すでにイベントが存在する
      } else {
        break
      }
    }

    // イベントの位置情報を配列に追加
    eventPos.push({ startRow: start, endRow: end, column: column, content: event })

    // arranged における start から end までの要素にイベント情報を追加する
    for (let i = start; i < end; i++) {
      arranged[i].events[column] = event
      if (i > start) {
        groupBorder = groupBorder.filter((el) => el !== i) // 分割不可能になったので取り除く
      }
    }
  }

  // eventPos に瞬間イベントの情報を追加
  for (let i = 0; i < arranged.length; i++) {
    const event = arranged[i].events[0]
    if (event && event.time_start === event.time_end) {
      eventPos.push({ startRow: i, endRow: i + 1, column: 0, content: event })
    }
  }

  console.log(arranged)

  // この日の全ての event の配置の配列とイベントグループの境界番号の配列を返す
  return { events: eventPos, border: groupBorder }
  // 2 次元配列 arranged はイベントの分布を視覚化するために用いたが、
  // 最終的な返り値はイベントごとに配置の情報がまとまっている方が望ましい
}

// 日付 > イベントグループ（時間の重なるイベントの集まり） > イベント という配列を返す
export const getLayout = (events: CampEvent[], camp: Camp) => {
  const dayGroups: DayGroup[] = []

  for (const day of sortDayEvents(events, camp)) {
    const eventGroups: EventGroup[] = []

    const result = arrangeEvents(day.events)
    const assign: number[] = [0] // この日の第 n 行にあるイベントは第 assign[n] グループに割り当てられる
    while (assign.length < result.border[result.border.length - 1]) {
      assign.push(assign[assign.length - 1] + (result.border.includes(assign.length) ? 1 : 0))
    }

    // 各イベントグループについて（result.border の各要素はイベントグループの始まりの位置を表す）
    for (let i = 0; i < result.border.length - 1; i++) {
      const groupEvents = result.events.filter((eventPos) => assign[eventPos.startRow] === i)
      for (let j = 0; j < groupEvents.length; j++) {
        groupEvents[j].startRow -= result.border[i]
        groupEvents[j].endRow -= result.border[i]
      } // その日の始まり基準 → そのグループの始まり基準

      eventGroups.push({
        columns: Math.max(...Array.from(groupEvents, (el) => el.column + 1), 0),
        spaces: [{ time: new Date(), minHeight: 0 }],
        events: groupEvents.filter((event) => event.content.time_start !== event.content.time_end),
        moments: groupEvents.filter((event) => event.content.time_start === event.content.time_end),
      })
    }

    dayGroups.push({ date: day.date, eventGroups: eventGroups })
  }

  return dayGroups
}
