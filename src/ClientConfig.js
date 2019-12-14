/*
Environment Variables are tricky in CRA so I'm doing it manually for now.

*/

const config = {
    development: {
        BASE_API_URL: ""
    },
    production: {
        BASE_API_URL: "http://thegerm.us"
    }
}

export default config.development;