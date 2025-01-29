import createClient from 'openapi-fetch'
import type { paths } from '@/api/schema'

const baseUrl = 'https://rucq.trap.show'
export const apiClient = createClient<paths>({ baseUrl: baseUrl })
