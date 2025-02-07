// 見やすさのためにエディタ上でも簡単な装飾を施すスクリプト
// 色の変更はなし。太字 / 斜体 / 下線（リンク）/ 取消線 のみ
// marked.js の実装とも異なるので複雑なことをすると壊れる

const matchDivision = (text: string, reg: RegExp) => {
  // 与えられた match の配列から、
  const division: { part: string; effect: boolean }[] = []
  let before = 0
  for (const match of [...text.matchAll(reg)]) {
    if (match['index'] !== 0) {
      division.push({ part: text.slice(before, match['index']), effect: false })
    }
    division.push({
      part: text.slice(match['index'], match['index'] + match[0].length),
      effect: true,
    })
    before = match['index'] + match[0].length
  }
  if (before !== text.length) {
    division.push({ part: text.slice(before, text.length), effect: false })
  }
  return division
}

export const decorated = (line: string) => {
  // let unBoldline = line
  // const m = /\*\*(\S.*?\S)\*\*/g
  // for (const match of [...line.matchAll(/\*\*(\S.*?\S)\*\*/g)]) {
  //   unBoldline =
  //     unBoldline.slice(0, match['index']) +
  //     `..${match[1]}..` +
  //     unBoldline.slice(match['index'] + match[0].length, unBoldline.length)
  // }

  const parts: { text: string; style: string }[] = []

  for (const italic of matchDivision(line, /\*\*(\S.*?\S)\*\*/g)) {
    const i = italic.effect ? 'font-style: italic; ' : ''
    for (const bold of matchDivision(italic.part, /\*(\S.*?\S)\*/g)) {
      const b = italic.effect ? 'font-weight: bold; ' : ''
      for (const strike of matchDivision(bold.part, /~~(\S.*?\S)~~/g)) {
        const s = strike.effect ? 'text-decoration: line-through; ' : ''
        for (const link of matchDivision(strike.part, /\bhttps?:\/\/[^\s<>"]+/g)) {
          const l = link.effect ? 'text-decoration: underline; ' : ''
          parts.push({ text: link.part, style: i + b + s + l })
        }
      }
    }
  }

  return parts
}
