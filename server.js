const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    let dataFile = '';
    let html = '';
    fs.readFile('./data/data.txt', 'utf-8', (err, data) => {
        if(err) {
            console.log('error')
        }
        dataFile = data.split(',');
        dataFile.forEach((item, index) => {
            html += `
            <tr>
            <td>${index + 1}</td>
            <td>${item}</td>
            </tr>
            `
        });
    })
    fs.readFile('./templates/index.html', 'utf-8', (err, data) => {
        if(err) {
            console.log('error')
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        data = data.replace('{item-list}', html);
        res.write(data);
        res.end()
    })
})

server.listen(8080, () => {
    console.log('Server is running at localhost:8080')
})