/// <reference types="vite/client" />

// 応急処置
import type { components } from '@/api/schema'

type Camp = components['schemas']['Camp']

type CampParams = components['schemas']['PostCampRequest']

type EventParams = components['schemas']['PostEventRequest']

type CampEvent = components['schemas']['Event']

type OptionParams = components['schemas']['PostOptionRequest']

type Option = components['schemas']['Option']

type QuestionParams = components['schemas']['PostQuestionRequest']

type Question = components['schemas']['Question']

type QuestionGroupParams = components['schemas']['PostQuestionGroupRequest']

type QuestionGroup = components['schemas']['QuestionGroup']

type QuestionAnswer = components['schemas']['Answer']
