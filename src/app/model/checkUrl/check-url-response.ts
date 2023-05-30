
//this code and interface is never used,but is here for documenting what checkURL method actually returns
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
  