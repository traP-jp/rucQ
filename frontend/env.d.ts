/// <reference types="vite/client" />

type Camp = {
  id: number
  display_id: string
  name: string
  is_draft: boolean
  description: string
}

type CampParams = {
  display_id: string
  name: string
  is_draft: boolean
  description: string
}

type EventParams = {
  name: string
  description: string
  location: string
  time_start: string
  time_end: string
  camp_id: number
  create_as_staff: boolean
  display_color: string
}

type CampEvent = {
  id: number
  name: string
  description: string
  location: string
  time_start: string
  time_end: string
  camp_id: number
  organizer_traq_id: string
  by_staff: true
  display_color: string
}

type OptionParams = {
  question_id: number
  content: string
}

type Option = {
  id: number
  question_id: number
  content: string
}

type QuestionParams = {
  question_group_id: number
  title: string
  description: string
  type: string
  is_public: boolean
  is_open: boolean
}

type Question = {
  id: number
  question_group_id: number
  title: string
  description: string
  type: string // "single" などいくつかの種類の文字列
  is_public: boolean
  is_open: boolean
  options?: Option[]
}

type QuestionGroupParams = {
  name: string
  description: string
  due: string
}

type QuestionGroup = {
  id: number
  name: string
  description: string
  due: string
  questions: Question[]
}

type QuestionAnswer = {
  id: number
  question_id: number
  user_traq_id: string
  content: string | string[]
}
