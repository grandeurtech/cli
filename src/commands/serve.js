// Server Command
// Running this command will run a local development
// server for the user with auto reload function

// Import libraries
const {Command, flags} = require('@oclif/command')

// Command Class
class ServeCommand extends Command {
  // Run 
  async run() {
    // Get flags
    const {flags} = this.parse(ServeCommand)

    // Build logic
    const port = flags.port || '3000'

    // Response
    this.log(`Grandeur Cloud Development server has been started on ${port}`)
    this.log(`from ${process.cwd()}`)
  }
}

// Documentation
// Serve Command Description
ServeCommand.description = `Run a local development server
...
This command will run a local development server in the workspace with auto reload functionality.
`
// Arguments
ServeCommand.flags = {
  port: flags.string({char: 'p', description: 'port on which server should be started'}),
}

// Export
module.exports = ServeCommand