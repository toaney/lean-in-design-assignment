export interface Article {
  id: number
  title: string
  slug: string
  summary: string
  image_url: string
  topics: string[]
  audience: string[]
  author?: string
  published_date: string
  url: string
}

export interface Circle {
  id: number
  name: string
  location: string
  description: string
  member_count: number
  image_url: string
  category: string
  remote: boolean
}

export interface CircleStep {
  step: number
  title: string
  description: string
}

export interface CircleStat {
  value: string
  label: string
}

export interface HomeStats {
  circles_count: string
  countries_count: string
  promotion_rate: string
  satisfaction_rate: string
}

export interface ArticlesResponse {
  articles: Article[]
  total: number
  page: number
  limit: number
  has_more: boolean
}

export interface CirclesResponse {
  circles: Circle[]
}
