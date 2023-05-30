export class Stats {
    harmless!: number
    "type-unsupported": number
    suspicious!: number
    "confirmed-timeout": number
    timeout!: number
    failure!: number
    malicious!: number
    undetected!: number
    typeUnsupported(): number{
        return this["type-unsupported"];
    }
    confirmedTimeout():number{
        return this["confirmed-timeout"];
    }
  }
  