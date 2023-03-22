const express = require("express");
const usersModel = require("./users-model");
const postsModel = require("../posts/posts-model");

const {
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");

// `users-model.js` ve `posts-model.js` sayfalarına ihtiyacınız var
// ara yazılım fonksiyonları da gereklidir

const router = express.Router();

router.get("/", async (req, res) => {
  // TÜM KULLANICILARI İÇEREN DİZİYİ DÖNDÜRÜN
  try {
    let users = await usersModel.get();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "hata oluştu" });
  }
});

router.get("/:id", validateUserId, (req, res) => {
  // USER NESNESİNİ DÖNDÜRÜN
  // user id yi getirmek için bir ara yazılım gereklidir
  res.json(req.user);
});

router.post("/", validateUser, async (req, res, next) => {
  try {
    let insertedUser = await usersModel.insert({ name: req.name });
    res.status(201).json(insertedUser);
    next();
  } catch (error) {
    next(error);
  }

  // YENİ OLUŞTURULAN USER NESNESİNİ DÖNDÜRÜN
  // istek gövdesini doğrulamak için ara yazılım gereklidir.
});

router.put("/:id", validateUserId, validateUser, async (req, res, next) => {
  // YENİ GÜNCELLENEN USER NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan ara yazılım gereklidir
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
  try {
    await usersModel.update(req.params.id, { name: req.name });
    const updatedUser = await usersModel.getById(req.params.id);
    res.status(201).json(updatedUser);
    next();
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", validateUserId, async (req, res, next) => {
  // SON SİLİNEN USER NESNESİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  try {
    await usersModel.remove(req.params.id);
    res.json(req.user);
    next();
  } catch (error) {
    next(error);
  }
});

router.get("/:id/posts", validateUserId, async (req, res) => {
  // USER POSTLARINI İÇEREN BİR DİZİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  try {
    let usersPosts = await usersModel.getUserPosts(req.params.id);
    res.json(usersPosts);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/:id/posts",
  validateUserId,
  validatePost,
  async (req, res, next) => {
    // YENİ OLUŞTURULAN KULLANICI NESNESİNİ DÖNDÜRÜN
    // user id yi doğrulayan bir ara yazılım gereklidir.
    // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
    try {
      const result = await postsModel.insert({
        user_id: req.params.id,
        text: req.text,
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

// routerı dışa aktarmayı unutmayın
module.exports = router;
