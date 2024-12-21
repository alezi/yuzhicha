export interface RiskData {
  id: string
  level: number
  title: string
  description: string
  keywords: string[]
  created_at: string
  report_count: number
  last_report_date: string
  report_images?: string[]
  report_details?: string[]
  risk_type: string
  handling_advice?: string[]
  similar_cases?: {
    title: string
    result: string
  }[]
}

export interface SearchResult {
  success: boolean
  data: RiskData[]
  error?: string
}
