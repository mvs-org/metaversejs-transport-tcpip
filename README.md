<p align="center">
  <a href="https://mvs.org/">
    <img width="200" src="https://raw.githubusercontent.com/mvs-org/lightwallet/master/src/assets/logo.png" alt="">
  </a>
  <br>
  <br>
  JavaScript Transport for the Metaverse Blockchain P2P network using TCP/IP
</p>

## Install

``` bash
npm install metaversejs-transport-tcpip
```

## Usage

### Initialization

Create using the Transporter class
``` javascript
const {P2PTransporterTCPIP} = require('metaversejs-transport-tcpip')

const transporter = new P2PTransporterTCPIP()

const transport = transporter.get({
  host: '127.0.0.1',
  port: 5251,
})
```

You can also create the Transport directly
``` javascript
const {P2PTransportTCPIP} = require('metaversejs-transport-tcpip')

const transport = new P2PTransportTCPIP({
  host: '127.0.0.1',
  port: 5251,
})
```

### Send

To send data just add it to the $egress subject
``` javascript
const transport = new P2PTransportTCPIP({
  host: '127.0.0.1',
  port: 5251,
})
transport.$egress.next(your_buffer)
```

### Receive
To receive data just subscribe to $ingress
``` javascript
const transport = new P2PTransportTCPIP({
  host: '127.0.0.1',
  port: 5251,
})
transport.$ingress.subscribe((data)=>console.log('received data', data))
```

### Connect
``` javascript
const transport = new P2PTransportTCPIP({
  host: '127.0.0.1',
  port: 5251,
})
transport.connect()
```

### Destroy
``` javascript
const transport = new P2PTransportTCPIP({
  host: '127.0.0.1',
  port: 5251,
})
transport.connect()
transport.destroy()
```

### Status
To get the status you can subscribe to $status
``` javascript
const transport = new P2PTransportTCPIP({
  host: '127.0.0.1',
  port: 5251,
})
transport.$status.subscribe((data)=>console.log('status', data))
```

To only get informed about an established connection you can use pipe
``` javascript
const transport = new P2PTransportTCPIP({
  host: '127.0.0.1',
  port: 5251,
})
transport.$status
  .pipe(
    filter(status=>status==='connected')
  )
  .subscribe(()=>console.log('connection established'))
transport.connect()
```

### Error handling
``` javascript
const transport = new P2PTransportTCPIP({
  host: '127.0.0.1',
  port: 5251,
})
transport.$errors.subscribe((error)=>console.error(error))
```

## License
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.