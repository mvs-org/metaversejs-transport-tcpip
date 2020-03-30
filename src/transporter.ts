import {P2PTransport, P2PTransportTCPIPConfig, P2PTransportTCPIP} from './transport'

export interface P2PTransporter {
    get: (options: any) => P2PTransport
}

export class P2PTransporterTCPIP implements P2PTransporter{
    get(options: P2PTransportTCPIPConfig){
        return new P2PTransportTCPIP(options)
    }
}