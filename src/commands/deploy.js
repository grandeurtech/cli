// Deploy Command
// Running this command will deploy the site
// to Grandeur Web Hosting

// Import Libraries
const {Command, flags} = require('@oclif/command')
const {cli} = require('cli-ux')
const chalk = require('chalk')
const fs = require('fs').promises
const fsWithoutPromises = require('fs')
const post = require('../apollo/handlers/post.handler')

// Command Class
class DeployCommand extends Command {
  // Run
  async run() {
    // Show spinner
    cli.action.start("Starting project deployment")

    try {
      // Open the configuration file from local directory
      const config = JSON.parse(await fs.readFile(process.cwd() + "/grandeur.config.json"))

      // Setup includes
      if (!config.ignore) config.ignore = [];

      // Function to generate directory files map
      const mapDirectory = async (basePath, path) => {
        // Array to store files
        var files = []

        // We will start from base path
        var nodes = await fs.readdir(basePath);

        // Then we will itrate over the files object 
        // and prepare a map
        for (var node of nodes) {
          // Exlude the config file to prevent security breach
          if (node == "grandeur.config.json" || config.ignore.includes(node)) continue

          // We will checkout if the object is a directory
          // or a file
          const stat = await fs.lstat(`${basePath}/${node}`)

          // If it is a directory
          if (stat.isDirectory()) {
            // Employ recurrsion to get the path
            var nodeFiles = await mapDirectory(`${basePath}/${node}`, `${path}/${node}`)

            // Append it to our main list
            files.push(...nodeFiles)
          }
          else {
            // Push the filename and path
            // to our array
            files.push(`${path}/${node}`)
          }
        }

        // Return
        return files;
      }

      // Log the root
      this.log(`Starting project deployment`)
      cli.action.start(`Creating directory map from ${chalk.bold(config.root)}`)

      // Create map
      const files = await mapDirectory(`${process.cwd()}/${config.root}`, "")

      // Create an array to hold buffers
      var attachments = [];

      // Iterate over map
      for (var file of files) {
        // and append file and filename to the form
        attachments.push(fsWithoutPromises.createReadStream(`${process.cwd()}/${config.root + file}`))
      }

      // Log the map
      this.log(`Creating directory map from ${chalk.bold(config.root)}\n`)
      this.log(files);
      this.log();

      // Start upload
      cli.action.start("Uploading")

      // Configurations
      var postConfig = {
        url: "https://api.grandeur.tech",
        apiKey: config.apiKey,
        accessKey: config.accessKey,
        accessToken: config.accessToken
      }
      
      // Submit request
      var postHandler = new post(postConfig)
      var res = await postHandler.send("/hosting/upload", {filenames: files}, attachments)

      // Log response
      this.log("Uploading")
      
      // and handle response and stop spinner
      switch(res.code) {
        case "TOKEN-INVALID": 
        case "TOKEN-VALIDATION-FAILED":
        case "SIGNATURE-INVALID":
        case "PERMISSION-DENIED":
          // Invalid token
          cli.action.start("Access token is invalid. Please run grandeur init command again.")

          // Stop spinner
          cli.action.stop("Failed")
          break

        case "WEBHOSTING-NOT-ENABLED":
          // Hosting is not enabled
          cli.action.start("Hosting is not enabled. Please visit https://cloud.grandeur.tech/hosting to enable it first")

          // Stop spinner
          cli.action.stop("Failed")
          break

        case "WEBHOSTING-FILES-EMPTY":
          // Empty directory
          cli.action.start("Directory is empty")

          // Stop spinner
          cli.action.stop("Failed")
          break

        case "APIKEY-INVALID":
          // Api key is invalid
          cli.action.start("Project api key is invalid.")

          // Stop spinner
          cli.action.stop("Failed")
          break

        case "PROJECT-WEBHOSTING-CONTENT-UPDATED":
          // Empty directory
          cli.action.start("App has been deployed")

          // Stop spinner
          cli.action.stop()
          break          
      }
    } catch (error) {
      // Handle errors
      if (error.code === "ENOENT") {
        // Configuration file not found
        cli.action.stop("Failed")

        // Log error
        this.log("This directory is not associate with a project.")

        // Exit
        return
      }

      // other erros
      throw error
    }
  }
}

// Documentation
// Deploy Command Description
DeployCommand.description = `deploy site to grandeur
...
This command will deploy the site from local folder to grandeur
`
// Arguments
DeployCommand.flags = {}

// Export
module.exports = DeployCommand
