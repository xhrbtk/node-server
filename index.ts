import * as http from 'http'
import * as fs from 'fs'
import * as p from 'path'
import * as url from 'url'

const server = http.createServer()
const publicDir = p.resolve(__dirname, 'public')

server.on('request', (request: http.IncomingMessage, response: http.ServerResponse) => {
    // console.log(request.method)
    // console.log(request.headers)
    // console.log(request.url)
    // const array = []
    // request.on('data', chunk => {
    //     array.push(chunk)
    // })
    // request.on('end', () => {
    //     const body = Buffer.concat(array).toString()
    //     console.log('body')
    //     console.log(body)
    //     response.statusCode = 404
    //     response.setHeader('X-frank', 'i am xhr')
    //     response.write('1\n')
    //     response.write('2\n')
    //     response.end('hi')
    // })
    // 目标一
    // url:path 可以将获取到的url改为path
    const { method, url: path, headers } = request
    const { pathname, search } = url.parse(path)
    let filename = pathname.substr(1)
    // response.setHeader('Content-Type', 'text/html;charset=utf-8')
    if (filename === '') {
        filename = 'index.html'
    }
    fs.readFile(p.resolve(publicDir, filename), (error, data) => {
        if (error) {
            console.log(error)
            if (error.errno === -2) {
                response.statusCode = 404
                fs.readFile(p.resolve(publicDir, '404.html'), (error, data) => {
                    response.end(data)
                })
            } else {
                response.statusCode = 500
                response.end('服务器繁忙,请稍后重试')
            }
        } else {
            response.end(data.toString())
        }
    })
})

server.listen(8888)
