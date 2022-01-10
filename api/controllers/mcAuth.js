module.exports = () => {
  require('dotenv').config();
  const fs = require('fs');
  const path = require("path");
  const _ = require("underscore");

  const SO_HOMEFOLDER = process.env.HOME;

  const controller = {};

  controller.authUser = (req, res) => {
    const playername = req.body.username;

    const usernamecache = fs.readFileSync(SO_HOMEFOLDER + '/src/minecraft_server/mc-data/usernamecache.json',{encoding: 'utf-8', flag: 'r'});

    let uuid = ""
    JSON.parse(usernamecache, (key, value) => {
      if (value == playername) {
        uuid = key;
      }
    });

    console.info(uuid);

    if (uuid) {
        const jsonResult = `
        {
            "user": {
                "username": "${playername}",
                "properties": [
                    {
                        "name": "preferredLanguage",
                        "value": "pt-br"
                    },
                    {
                        "name": "registrationCountry",
                        "value": "BR"
                    }
                ],
                "id": "${uuid}"
            },
            "clientToken": "",
            "accessToken": "",
            "availableProfiles": [
                {
                    "name": "${playername}",
                    "id": "${uuid}"
                }
            ],
            "selectedProfile": {
                "name": "${playername}",
                "id": "${uuid}"
            }
        }`;

      console.log(jsonResult);
      res.status(200).json(JSON.parse(jsonResult));

    } else {
      res.status(404).send('Player not found');
    }
  };

  return controller;
}
