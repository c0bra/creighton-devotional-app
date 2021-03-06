fs = require 'fs'
path = require 'path'
file = require 'file'
{exec} = require 'child_process'
zip = new require('node-zip')();
konphyg = require('konphyg')(__dirname + '/config');
build_api = require 'phonegap-build-api'

# Read inthe config file
config = konphyg.all();

# Folder where built project will reside
phonegap_folder = 'www'
phonegap_filename = 'phonegap.zip'
built_filename = "#{phonegap_filename}"

task 'bundle', 'Build the sencha app and publish it to phonegap-build', ->
  invoke 'package', ->
    # invoke 'phonegap'

task 'package', 'Build the sencha app as a native package', ->
  console.log "Running 'sencha app build package'"

  exec 'sencha app build package', (err, stdout, stderr) ->
    console.log stdout, stderr

    invoke 'phonegap'

task 'phonegap', 'Zip and push project to phonegap', ->
  invoke 'phonegap-zip'
  invoke 'phonegap-build'

task 'phonegap-zip', 'Zip the packaged app up for phonegap', ->
  console.log "Zipping up package for phonegap"

  # Synchronously walk down the directory tree of the phonegap folder
  file.walkSync phonegap_folder, (dir, dirs, files) ->
    # Skip anything with "node_modules" in the path, we don't want to bundle that up
    if /node\_modules/im.test(dir)
       return
    else
      # The first directory returned has the path separators going the wrong direction (Win7), so just handle that
      myDirs = dir.split(path.sep)
      if myDirs[0].match(/\//)
        myDirs = dir.split('/')

      # Remove upper level directory structure; we only want the www folder in the phonegap zip file
      myDirs.splice(0, 2)
      zipDir = myDirs.join(path.sep)

      console.log "Adding folder: #{zipDir}"

      # Add this folder to the zip file
      zip.folder zipDir

      # Add every file in this folder
      for file in files
        # Skip server.js; I use that for local testing
        continue if /^server\.js$/.test(file)

        filename = path.join(dir, file);
        zipFileName = path.join(zipDir, file)
        console.log "  Adding: #{zipFileName}"

        # Add the file to the folder
        zip.file zipFileName, fs.readFileSync(filename, 'utf8')

  # Create the zip data!
  data = zip.generate({ base64:false, compression: 'DEFLATE'});

  # Write the zip data out to the zip file
  fs.writeFileSync "#{phonegap_filename}", data, 'binary'

  console.log "Phonegap project built!"

task 'phonegap-build', 'Publish project to phonegap build', ->
  # Read in the config options

  token = config.phonegap_build.token
  app_id = config.phonegap_build.app_id

  options =
    form:
      file: built_filename

  build_api.auth { 'token': token }, (e, api) ->
    if e?
      console.log 'Error authenticating with phonegap-build: ' + e
      process.exit()

    console.log "Putting to: /apps/#{app_id}"

    api.put "/apps/#{app_id}", (e, data) ->
      if e?
        console.log 'Error PUTing app: ' + e
        process.exit()
      else
        console.log data
  
