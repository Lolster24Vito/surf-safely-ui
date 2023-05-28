
}
export interface CheckUrlResponse {
    matches: Match[]
  }
  
  export interface Match {
    cacheDuration: string
    platformType: string
    threat: Threat
    threatEntryType: string
    threatType: string
  }
  
  export interface Threat {
    url: string
  }
  