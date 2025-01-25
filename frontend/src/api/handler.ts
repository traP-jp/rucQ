import { useUserStore } from '@/store'
const userStore = useUserStore()

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export const fetchApi = async (
  method: HttpMethod,
  path: string,
  option?: { parameters?: Record<string, string | number | boolean>; body?: FormData },
) => {
  let parameterStr = ''

  if (option?.parameters) {
    const textParams: Record<string, string> = {}
    for (const key in option.parameters) {
      if (Object.prototype.hasOwnProperty.call(option.parameters, key)) {
        textParams[key] = String(option.parameters[key]) // 値を文字列に変換
      }
    }
    parameterStr = new URLSearchParams(textParams).toString()
  }

  const request: RequestInit = {
    method: method,
    headers: option?.body
      ? { 'X-Forwarded-User': userStore.userId! }
      : { 'X-Forwarded-User': userStore.userId!, 'Content-Type': 'application/json' },
    body: option?.body,
  }

  const res = await fetch(`/api${path}${parameterStr}`, request)
  if (res.status === 200) {
    // HTTP ステータスコード。200 は OK, 404 は Not Found の意味
    return await res.json()
  } else {
    return null
  }
}

// イベント

export const getEvents = async () => {
  return fetchApi('GET', `/events`)
}

export const newEvent = async (params: EventParams) => {
  return fetchApi('POST', `/events`, { parameters: params })
}

export const getEventDetail = async (event_id: number) => {
  return fetchApi('GET', `/events/${event_id}`)
}

export const editEvent = async (event_id: number, params: EventParams) => {
  return fetchApi('PUT', `/events/${event_id}`, { parameters: params })
}

export const registerEvent = async (event_id: number) => {
  return fetchApi('POST', `/events/${event_id}/register`)
}

export const cancelEvent = async (event_id: number) => {
  return fetchApi('DELETE', `/events/${event_id}/register`)
}

export const getEventParticipants = async (event_id: number) => {
  return fetchApi('GET', `/events/${event_id}/participants`)
}

// 質問グループ

export const getQuestionGroups = async () => {
  return fetchApi('GET', `/question_groups`)
}

export const newQuestionGroup = async (params: QuestionGroupParams) => {
  return fetchApi('POST', `/question_groups`, { parameters: params })
}

// 質問

export const getQuestions = async () => {
  return fetchApi('GET', `/questions`)
}

export const newQuestion = async (params: QuestionParams) => {
  return fetchApi('POST', `/questions`, { parameters: params })
}

export const getQuestionDetail = async (question_id: number) => {
  return fetchApi('GET', `/questions/${question_id}`)
}

export const editQuestion = async (question_id: number, params: QuestionParams) => {
  return fetchApi('PUT', `/questions/${question_id}`, { parameters: params })
}

export const deleteQuestion = async (question_id: number) => {
  return fetchApi('PUT', `/questions/${question_id}`)
}

// 選択肢

export const newOption = async (params: OptionParams) => {
  return fetchApi('POST', `/options`, { parameters: params })
}

export const editOption = async (option_id: number, params: OptionParams) => {
  return fetchApi('POST', `/options/${option_id}`, { parameters: params })
}

// 自分の回答（新規に回答を送信する API がまだない？）

export const getAnswer = async (question_id: number) => {
  return fetchApi('GET', `/me/answers/${question_id}`)
}

export const editAnswer = async (question_id: number, content: string) => {
  return fetchApi('PUT', `/me/answers/${question_id}`, { parameters: { content: content } })
}

// 予算

export const getBudget = async () => {
  return fetchApi('GET', `/me/budgets`)
}

// 合宿係

export const getStaffs = async () => {
  return fetchApi('GET', `/staffs`)
}

export const newStaff = async (traq_id: string) => {
  return fetchApi('POST', `/staffs`, { parameters: { traq_id: traq_id } })
}

export const deleteStaff = async (traq_id: string) => {
  return fetchApi('DELETE', `/staffs`, { parameters: { traq_id: traq_id } })
}
