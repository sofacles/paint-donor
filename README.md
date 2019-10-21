I'm using create-react-app and I added a server following this pattern
install concurrently npm i --save-dev concurrently
installed express, etc

My commands are:
 "client": "react-scripts start",  (This is the "start" script from CRA)
"server": "nodemon --inspect ./server/src/server.js"  <- not the "--inspect"
"dev": "concurrently --kill-others-on-fail \"yarn server\" \"yarn client\""


I added a server folder, with some routes
So, open launch.json (there's a local one in your vs_code folder) and enter this.

{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "attach",
            "name": "Node: Nodemon",
            "processId": "${command:PickProcess}",
            "restart": true,
            "protocol": "inspector",
        },
    ]
}

So I run yarn dev
In the debug pane of VS Code, I click play and I select the "Node: nodemon" option.  Then a bunch of different candidate node processes pop up 
and I choose the one that has "--inspect" on it.  When I refresh the page, I hit a breakpoint.