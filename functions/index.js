const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors({ origin: true }));

app.get("/check", async (req, res) => {
  const id = req.query.id;
  if (!id) return res.json({ success: false, message: "No ID provided" });

  try {
    const response = await axios.get(https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store, {
      params: {
        gameId: "200021",
        itemId: "1",
        catalogId: "1",
        productId: id
      },
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': '*/*'
      }
    });

    const nickname = response?.data?.data?.gameDetail?.userName;
    const zoneId = response?.data?.data?.gameDetail?.zoneId;

    if (nickname) {
      res.json({ success: true, name: nickname, server: zoneId });
    } else {
      res.json({ success: false, message: "Player not found" });
    }
  } catch (err) {
    res.json({ success: false, message: "API error or ID invalid" });
  }
});

exports.api = functions.https.onRequest(app);
