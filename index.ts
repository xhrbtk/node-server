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
    console.log(path)
    switch (pathname) {
        case '/index.html':
            response.setHeader('Content-Type', 'text/html;charset=utf-8')
            fs.readFile(p.resolve(publicDir, 'index.html'), (error, data) => {
                if (error) throw error
                response.end(data.toString())
            })
            break
        case '/style.css':
            response.setHeader('Content-Type', 'text/css;charset=utf-8')
            fs.readFile(p.resolve(publicDir, 'style.css'), (error, data) => {
                if (error) throw error
                response.end(data.toString())
            })
            break
        case '/main.js':
            response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
            fs.readFile(p.resolve(publicDir, 'main.js'), (error, data) => {
                if (error) throw error
                response.end(data.toString())
            })
            break
        default:
            response.statusCode = 404
            response.end()
    }
})

server.listen(8888)
