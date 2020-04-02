import { Subject } from 'rxjs'
import { Socket } from 'net'

export type TransportStatus = 'connected' | 'disconnected'

export interface P2PTransport {
    connect: () => P2PTransport
    destroy: () => void
    $ingress: Subject<Buffer>
    $egress: Subject<Buffer>
    $status: Subject<TransportStatus>
    $errors: Subject<Error>
}

export interface P2PTransportTCPIPConfig {
    host: string
    port: number
}

export class P2PTransportTCPIP implements P2PTransport {

    remoteAddress: string
    remotePort: number
    socket: Socket

    $ingress = new Subject<Buffer>()
    $egress = new Subject<Buffer>()
    $status = new Subject<TransportStatus>()
    $errors = new Subject<Error>()

    constructor(config: P2PTransportTCPIPConfig) {
        this.remoteAddress = config.host
        this.remotePort = config.port
        this.socket = new Socket()
        this.socket.on('error', (error) => this.$errors.next(error))
        this.socket.on('connect', () => this.$status.next('connected'))
        this.socket.on('end', () => this.$status.next('disconnected'))
        this.socket.on('data', (data)=> this.$ingress.next(data) )
        this.$egress.subscribe(data => {
            if(this.socket.writable)
            this.socket.write(data)
        })
    }

    connect() {
        this.socket.connect({ host: this.remoteAddress, port: this.remotePort })
        return this
    }

    destroy() {
        this.socket.destroy()
    }

}
