export interface FaqPayload {
    name: string
    description: string
    activeStatus: boolean
  }

  export interface FaqResponse {
    statusCode: number
    message: string
    data: any
  }