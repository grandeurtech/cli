// Init Command
// Running this command will init a directory
// as a Grandeur project workspace

// Import Libraries
const {Command, flags} = require('@oclif/command')
const {cli} = require('cli-ux')
const chalk = require('chalk')
const fs = require('fs').promises
const express = require('express')
const figlet = require('figlet')
const cors = require('cors')

// Command Class
class InitCommand extends Command {
  // Run 
  async run() {
    // Port
    const port = 3000

    // Show spinner
    cli.action.start("Starting")
                                                                 
    // Show Grandeur logo
    this.log(figlet.textSync("Grandeur", {font: "Slant"}))

    // Create an express object
    const app = express()

    // Create a server object
    const http = require('http').Server(app)

    // Route to get response from dashboard
    app.get('/setup', cors(), async (req, res) => {
      // Got the response
      if (!req.query.apiKey || !req.query.accessToken || !req.query.accessKey) {
        // Parameters aren't provided
        res.status(422).json({
          code: "DATA-INVALID",
          message: "Parameters are not provided"
        })

        return
      }

      // Log response
      this.log("Received configurations")

      // Show spinner
      cli.action.start("Initializing")

      // If provided then create a json file
      // to save the configurations
      var config = {
        apiKey: req.query.apiKey,
        accessKey: req.query.accessKey,
        accessToken: req.query.accessToken,
        root: "/"
      }

      // Use try catch
      try {
        // Save file to directory
        await fs.writeFile(`${process.cwd()}/grandeur.config.json`, JSON.stringify(config, null, "\t"))

        // Return success
        res.status(200).json({
          code: "CLI-CONFIGURED",
          message: "Cli has been configured successfully"
        })

        // Stop spinner
        cli.action.stop()

        // Exit
        process.exit()

      } catch (error) {
        throw error
      }
    })

    // Use try catch
    try {
      // and start the http server
      await http.listen(port)

      // We will open cloud dashboard
      // with a return data object so that the dashboard
      // could send back a response to the cli
      var reference = {
        url: `http://localhost:${port}/setup`,
        at: Date.now()
      }

      // Encode the reference
      var encoded = Buffer.from( JSON.stringify(reference), "utf8").toString("base64").replace(/=/g, "");

      // Log a response
      this.log(`Let us first associate this directory with a project\n`)

      // Open the url in browser
      cli.open(`https://cloud.grandeur.tech/cli/init/${encoded}`)

      // Log the url
      this.log(`Opening dashboard. If a page do not automatically show up in the browser then please visit ${chalk.bold(`https://cloud.grandeur.tech/cli/init/${encoded}`)}\n`)

      // Show spinner
      cli.action.start("Waiting")

    } catch (error) {
      // error
      throw error
    }
  }
}

// Documentation
// Init Command Description
InitCommand.description = `init a directory as grandeur project workspace
...
This command initialize a directory as grandeur project workspace from where you can interact with your project with CLI.
`

InitCommand.flags = {}

module.exports = InitCommand
