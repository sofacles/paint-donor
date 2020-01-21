module.exports = {
    apps : [
        {
            name: "mongosh",
            script: "/home/steve/shellScripts/mong.sh",
            watch: true
          },

          {
            name: "server",
            script: "./server.js",
            watch: true,
            env: {
              "NODE_ENV": "production",
            }
          },

          {
            name: "ProdStaticServer",
            script: "/home/steve/websites/paint-donor/ProdStaticServer.js",
            watch: true,
            env: {
              "NODE_ENV": "production",
            }
          }
    ]
  }