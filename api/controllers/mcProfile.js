module.exports = () => {
  require('dotenv').config();
  const fs = require('fs');
  const path = require("path");
  const _ = require("underscore");

  const SO_HOMEFOLDER = process.env.HOME;

  const controller = {};

  controller.getPlayerProfile = (req, res) => {
    const uuid = req.params.uuid;

    const usernamecache = fs.readFileSync(SO_HOMEFOLDER + '/src/minecraft_server/mc-data/usernamecache.json',{encoding: 'utf-8', flag: 'r'});
    const objUsernamecache = JSON.parse(usernamecache);

    let filtered = _.filter(objUsernamecache, function(value,key) {
      return key == uuid;
    });

    const playername = filtered[0];

    if (playername) {
      if (fs.existsSync(path.resolve(__dirname,`../data/${playername}.png`))) {
        const contents = fs.readFileSync(path.resolve(__dirname,`../data/${playername}.png`), {encoding: 'base64', flag: 'r'});

        const jsonResult = `
          {
            "id" : "${uuid}",
            "name" : "${playername}",
            "properties" : [ {
              "name" : "textures",
              "value" : "${contents}"
            } ]
          }`;

        res.status(200).json(JSON.parse(jsonResult));
      } else {
        res.status(404).send('Avatar not found');
      }
    } else {
      res.status(404).send('Player not found');
    }
  };

  return controller;
}
