const Fs = require('fs');
const Path = require('path');
const Axios = require('axios');


async function downloadFile(){
    const url = 'https://unsplash.com/photos/U39FPHKfDu0/download?ixid=MnwxMjA3fDB8MXxhbGx8Nzd8fHx8fHwyfHwxNjY0ODA3NDMz&force=true';
    const path = Path.resolve(__dirname, 'files', 'image.jpg');

    const response = await Axios({
        method: "GET",
        url: url,
        responseType: "stream"
    })

    response.data.pipe(Fs.createWriteStream(path));

    return new Promise((resolve,reject) =>{
        response.data.on('end', () => {
            resolve()
        })
        response.data.on('error', err => {
            reject(err)
        })
    })
}

downloadFile();
