const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');


const username = 'akhalil_br9WO1';
const accessKey = 'nxS3fz9iTEUTfxU6vuAi';
const filePath = 'C:\\Users\\Bido Khalil\\Downloads\\Soar Automation (7).ipa';

const uploadApp = async (type) => {
    const url = type === 'live'
        ? 'https://api-cloud.browserstack.com/app-live/upload'
        : 'https://api-cloud.browserstack.com/app-automate/upload';

    try {
        const form = new FormData();
        form.append('file', fs.createReadStream(filePath));

        const response = await axios.post(url, form, {
            auth: {
                username,
                password: accessKey
            },
            headers: {
                ...form.getHeaders()
            }
        });

        console.log('Upload successful! Response:', response.data);
        if (response.data.app_id) {
            console.log('App ID:', response.data.app_id);
        } else {
            console.log('No App ID returned. Full response:', response.data);
        }
    } catch (error) {
        console.error('Upload failed:', error.response ? error.response.data : error.message);
    }
};

// Get command line argument
const type = process.argv[2];
if (type === 'live' || type === 'automate') {
    uploadApp(type);
} else {
    console.log('Usage: node uploadApp.js [live|automate]');
}