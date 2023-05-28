export class CheckUrlRequest {
    threatTypes: string[]
  platformTypes: string[]
  threatEntryTypes: string[]
  threatEntries: ThreatEntry[]

  constructor(inputText: string )
  {
    this.threatTypes=["MALWARE","SOCIAL_ENGINEERING","UNWANTED_SOFTWARE"];
    this.platformTypes=["ANY_PLATFORM"];
    this.threatEntryTypes=["URL"];
    this.threatEntries =[{url:inputText}];
  }
}
export interface ThreatEntry {
    url: string
  }
