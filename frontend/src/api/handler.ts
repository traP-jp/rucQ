// import { useUserStore } from '@/store'
// const userStore = useUserStore()

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export const fetchApi = async (
  method: HttpMethod,
  path: string,
  option?: {
    body?: Record<string, string | string[] | number | boolean>
  },
) => {
  const request: RequestInit = {
    method: method,
    headers: { 'X-Forwarded-User': 'kitsne', 'Content-Type': 'application/json' },
    body: JSON.stringify(option?.body),
  }
  const res = await fetch(`/api${path}`, request)
  if (res.status === 200 && method === 'GET') {
    // HTTP ステータスコード。200 は OK, 404 は Not Found の意味
    return await res.json()
  } else {
    return null
  }
}

// 合宿のしおり
export const getDefalutCamps = async () => {
  return fetchApi('GET', `/camps/default`)
}

export const getCamps = async (camp_id: number) => {
  return fetchApi('GET', `/camps/${camp_id}`)
}

export const newCamp = async (params: CampParams) => {
  return fetchApi('POST', `/camps`, { body: params })
}

export const editCamp = async (camp_id: number, params: CampParams) => {
  return fetchApi('PUT', `/camps/${camp_id}`, { body: params })
}

// イベント

export const getEvents = async () => {
  return fetchApi('GET', `/events`)
}

export const newEvent = async (params: EventParams) => {
  return fetchApi('POST', `/events`, { body: params })
}

export const getEventDetail = async (event_id: number) => {
  return fetchApi('GET', `/events/${event_id}`)
}

export const editEvent = async (event_id: number, params: EventParams) => {
  return fetchApi('PUT', `/events/${event_id}`, { body: params })
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
  return fetchApi('POST', `/question_groups`, { body: params })
}

// 質問

export const getQuestions = async () => {
  return fetchApi('GET', `/questions`)
}

export const newQuestion = async (params: QuestionParams) => {
  return fetchApi('POST', `/questions`, { body: params })
}

export const getQuestionDetail = async (question_id: number) => {
  return fetchApi('GET', `/questions/${question_id}`)
}

export const editQuestion = async (question_id: number, params: QuestionParams) => {
  return fetchApi('PUT', `/questions/${question_id}`, { body: params })
}

export const deleteQuestion = async (question_id: number) => {
  return fetchApi('PUT', `/questions/${question_id}`)
}

// 選択肢

export const newOption = async (params: OptionParams) => {
  return fetchApi('POST', `/options`, { body: params })
}

export const editOption = async (option_id: number, params: OptionParams) => {
  return fetchApi('POST', `/options/${option_id}`, { body: params })
}

// 自分の回答（新規に回答を送信する API がまだない？）

export const getAnswer = async (question_id: number) => {
  return fetchApi('GET', `/me/answers/${question_id}`)
}

export const editAnswer = async (question_id: number, content: string | string[]) => {
  return fetchApi('PUT', `/me/answers/${question_id}`, { body: { content: content } })
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
  return fetchApi('POST', `/staffs`, { body: { traq_id: traq_id } })
}

export const deleteStaff = async (traq_id: string) => {
  return fetchApi('DELETE', `/staffs`, { body: { traq_id: traq_id } })
}

export const makeCampParams = (camp: Camp): CampParams => {
  return {
    display_id: camp.display_id,
    name: camp.name,
    is_draft: camp.is_draft,
    description: camp.description,
  }
}

export const makeEventParams = (event: CampEvent): EventParams => {
  return {
    name: event.name,
    description: event.description,
    location: event.location,
    time_start: event.time_start,
    time_end: event.time_end,
    camp_id: event.camp_id,
    create_as_staff: event.by_staff,
    display_color: event.display_color,
  }
}

export const makeOptionParams = (option: Option): OptionParams => {
  return {
    question_id: option.question_id,
    content: option.content,
  }
}

export const makeQuestionParams = (question: Question): QuestionParams => {
  return {
    question_group_id: question.question_group_id,
    title: question.title,
    description: question.description,
    type: question.type,
    is_public: question.is_public,
    is_open: question.is_open,
  }
}

export const makeQuestionGroupParams = (group: QuestionGroup): QuestionGroupParams => {
  return {
    name: group.name,
    description: group.description,
    due: group.due,
  }
}
