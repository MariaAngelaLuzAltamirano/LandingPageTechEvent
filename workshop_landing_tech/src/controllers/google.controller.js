let googleSheet = require('../spreadsheet');

const getRegistries = async (req, res) => {
  data = await googleSheet.accessGoogleSheet();

  let registries = data.map((item) => {
    let row = {
      'firstName': (item.firstName) ? item.firstName : '',
      'lastName': (item.lastName) ? item.lastName : '',
      'email': (item.email) ? item.email : '',
    };
    return row;
  });

  res.json({ successfully: true, data: registries });
}

const saveRegistries = async (req, res) => {
  googleSheet.saveRegistry(req.body);
  res.json({ successfully: true })
}

const deleteRegistry = async (req,res) => {
  googleSheet.deleteRegistry(req.body.deleteRow);
  res.json({ successfully: true })
}

module.exports = {
  getRegistries,
  saveRegistries,
  deleteRegistry,
}