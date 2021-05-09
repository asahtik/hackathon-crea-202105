const conf = require("../data/config");
const Client = require("bitcoin-core");
const client = new Client({
  network: "regtest",
  username: conf.getUsername(),
  password: conf.getPassword(),
  port: conf.getPort()
});

const getVacc = (req, res) => {
  var txid = req.params.txid;
  client.getRawTransaction(txid, true).then((data) => {
    console.log(data);
    const vout = data.vout;
    for(var i = 0; i < vout.length; i++) {
      console.log(vout[i]);
      const asm = vout[i].scriptPubKey.asm.split(" ");
      if(asm[1] == "OP_RETURN") {
        const hex = vout[i].scriptPubKey.hex.split("");
        // console.log(hex.split(""));
        var j;
        for(j = 0; j < hex.length; j++) if(hex[j] != 0) break;
        var hexData = hex.slice(j).join("");
        // console.log(hexData);
        try {
          var jsonString = hex2a(hexData);
          for(j = 0; j < jsonString.length; j++) if(jsonString[j] == '{') break;
          jsonString = jsonString.slice(j);
          const vaccData = JSON.parse(jsonString);
          // console.log(vaccData);
          res.status(200).json({"data": vaccData});
          return;
        } catch(err) {
          throw new Error(err.message);
        }
      }
    }
    throw new Error("OP_RETURN not found");
  }).catch((err) => {
    console.log(err);
    res.status(500).json({"error": err.message});
  });
}

const addVacc = (req, res) => {
  const name = req.body.name;
  const surname = req.body.surname;
  const emso = parseInt(req.body.emso);
  const new_vaccine = req.body.vaccine;
  const new_date = req.body.date;
  const txid = req.body.tx_prev;
  const email = req.body.email;
  if(!name || !surname || !emso || !new_vaccine || !new_date) return res.status(400).json({"error": "Invalid data"});

  const usr = {
    "name": name,
    "surname": surname,
    "emso": emso
  }

  if(txid && typeof txid != "undefined" && txid != "") {
    client.getRawTransaction(txid, true).then((data) => {
      // console.log(data);
      const vout = data.vout;
      for(var i = 0; i < vout.length; i++) {
        console.log(vout[i]);
        const asm = vout[i].scriptPubKey.asm.split(" ");
        if(asm[1] == "OP_RETURN") {
          const hex = vout[i].scriptPubKey.hex.split("");
          // console.log(hex.split(""));
          var j;
          for(j = 0; j < hex.length; j++) if(hex[j] != 0) break;
          var hexData = hex.slice(j).join("");
          // console.log(hexData);
          try {
            var jsonString = hex2a(hexData);
            for(j = 0; j < jsonString.length; j++) if(jsonString[j] == '{') break;
            jsonString = jsonString.slice(j);
            const vaccData = JSON.parse(jsonString);
            
            if(vaccData.emso != emso) return res.status(400).json({"error": "EMSO data does not match"});

            usr.vaccines = vaccData.vaccines;
            usr.vaccines.push(new_vaccine);
            usr.dates = vaccData.dates;
            usr.dates.push(parseInt(new_date));

            addVaccination(usr, res);
            return;
          } catch(err) {
            throw new Error(err.message);
          }
        }
      }
      throw new Error("OP_RETURN not found");
    }).catch((err) => {
      console.log(err);
      return res.status(500).json({"error": err.message});
    });
  } else {
    usr.vaccines = []; usr.vaccines.push(new_vaccine);
    usr.dates = []; usr.dates.push(parseInt(new_date));
    addVaccination(usr, res);
    return;
  }
}

const getStat = async (req, res) => {
  const timestamp = req.params.time;
  try {
    var checkedEMSOs = [];
    var statData = [];
    const bestHash = await client.getBestBlockHash();
    var block = await client.getBlock(bestHash);
    var ctime = block.mediantime;
    while(ctime >= timestamp) {
      // console.log(block.hash);
      const txs = block.tx;
      for(var tx = 0; tx < txs.length; tx++) {
        try {
          const data = await client.getRawTransaction(txs[tx], true);
          const vout = data.vout;
          for(var i = 0; i < vout.length; i++) {
            // console.log(vout[i]);
            const asm = vout[i].scriptPubKey.asm.split(" ");
            if(asm[1] == "OP_RETURN") {
              const hex = vout[i].scriptPubKey.hex.split("");
              // console.log(hex.split(""));
              var j;
              for(j = 0; j < hex.length; j++) if(hex[j] != 0) break;
              var hexData = hex.slice(j).join("");
              // console.log(hexData);
              try {
                var jsonString = hex2a(hexData);
                for(j = 0; j < jsonString.length; j++) if(jsonString[j] == '{') break;
                jsonString = jsonString.slice(j);
                const vaccData = JSON.parse(jsonString);
                if(checkedEMSOs[vaccData.emso] && checkedEMSOs[vaccData.emso] <= vaccData.dates.length) {} else {
                  checkedEMSOs[vaccData.emso] = vaccData.dates.length;
                  for(j = 0; j < vaccData.vaccines.length; j++) {
                    const idx = findIndex(statData, vaccData.vaccines[j]);
                    console.log(statData);
                    if(idx < 0) statData.push([vaccData.vaccines[j], 1]);
                    else statData[idx][1]++;
                  }
                }
              } catch(err) {}
            }
          }
        } catch(err) {};
      }
      if(block.previousblockhash == 0 || block.previousblockhash == "0" || !block.previousblockhash) break;
      block = await client.getBlock(block.previousblockhash);
      ctime = block.mediantime;
    }
    res.status(200).json({"data": statData});
  } catch(err) {
    console.log(err.message);
    return res.status(500).json({"error": err.message});
  }
}

const supply = (req, res) => {
  const address = req.body.address;
  const quantity = req.body.quantity;
  const batch = req.body.batch;
  if(!address || !quantity || !batch) return res.status(400).json({"error": "Invalid data"});

  const obj = {};
  obj[address] = parseInt(quantity);
  obj["data"] = batch;
  client.createRawTransaction([], obj).then((rawTxStr) => {
    client.fundRawTransaction(rawTxStr).then((fundedTxObj) => {
      client.signRawTransaction(fundedTxObj.hex).then((signedTxObj) => {
        client.sendRawTransaction(signedTxObj.hex).then((txid) => {
          res.status(201).json({"data": txid});
        }).catch((err) => {
          console.log(err);
          return res.status(500).json({"error": err.message});
        });
      }).catch((err) => {
        console.log(err);
        return res.status(500).json({"error": err.message});
      });
    }).catch((err) => {
      console.log(err);
      return res.status(500).json({"error": err.message});
    });
  }).catch((err) => {
    console.log(err);
    return res.status(500).json({"error": err.message});
  });
}

function addVaccination(usr, res) {
  const obj = {};
  obj[conf.getOutAddress()] = 1.0000;
  const data = JSON.stringify(usr);
  obj["data"] = a2hex(data);

  client.createRawTransaction([], obj).then((rawTxStr) => {
    client.fundRawTransaction(rawTxStr).then((fundedTxObj) => {
      client.signRawTransaction(fundedTxObj.hex).then((signedTxObj) => {
        client.sendRawTransaction(signedTxObj.hex).then((txid) => {
          res.status(201).json({"data": txid});
        }).catch((err) => {
          console.log(err);
          return res.status(500).json({"error": err.message});
        });
      }).catch((err) => {
        console.log(err);
        return res.status(500).json({"error": err.message});
      });
    }).catch((err) => {
      console.log(err);
      return res.status(500).json({"error": err.message});
    });
  }).catch((err) => {
    console.log(err.message);
    return res.status(500).json({"error": err.message});
  });
}

function findIndex(array, val) {
  for(var i = 0; i < array.length; i++) {
    for(var j = 0; j < array[i].length; j++) {
      if(array[i][j] == val || typeof array[i][j] == "string" && array[i][j].localeCompare(val) == 0) return i;
    }
  }
  return -1;
}

function hex2a(hexx) {
  var hex = hexx.toString();//force conversion
  var str = '';
  for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}

function a2hex(str) {
  var arr = [];
  for (var i = 0; i < str.length; i++)
    arr[i] = (str.charCodeAt(i).toString(16));
  return arr.join("");
}

module.exports = {
  getVacc,
  addVacc,
  getStat,

  supply
}