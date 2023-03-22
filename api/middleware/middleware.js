const userModel = require("../users/users-model");

function logger(req, res, next) {
  console.log(
    `[${new Date().toLocaleString()}] method: ${req.method} url: ${
      req.url
    } ip: ${req.get("Origin")}`
  );
  next();
  // SİHRİNİZİ GÖRELİM
}

async function validateUserId(req, res, next) {
  try {
    let Users = await userModel.getById(req.params.id);
    if (!Users) {
      res.status(404).json({ message: "not found" });
    } else {
      req.user = Users;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "not found" });
    next(error);
  }
  // SİHRİNİZİ GÖRELİM
}

function validateUser(req, res, next) {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: "gerekli name alanı eksik" });
  } else {
    req.name = name;
    next();
  }
  // SİHRİNİZİ GÖRELİM
}

function validatePost(req, res, next) {
  const { text } = req.body;
  if (!text) {
    res.status(400).json({ message: "gerekli text alanı eksik" });
  } else {
    req.text = text;
    next();
  }
  // SİHRİNİZİ GÖRELİM
}

// bu işlevleri diğer modüllere değdirmeyi unutmayın
module.exports = { logger, validateUserId, validateUser, validatePost };
