const express = require("express");
const config = require("config");
const router = express.Router();
const axios = require("axios");

// @route   POST yelp/search
// @desc    Search on yelp by city and keypword
// @access  Public
router.post("/search", async (req, res) => {
  const { location, keyword, limit } = req.body;

  let search = `sort_by: "rating"`;
  if (location) {
    search = `${search}, location: "${location}"`;
  }
  if (keyword) {
    search = `${search}, attributes: "${keyword}"`;
  }
  if (limit) {
    search = `${search}, limit: ${limit}`;
  }

  let yelpGQL = axios.create({
    url: config.get("YELP_GQL_URL"),
    headers: {
      Authorization: `Bearer ${config.get("API_KEY")}`,
      "Content-Type": "application/json"
    },
    method: "POST"
  });

  try {
    const response = await yelpGQL({
      data: {
        query: `{
            search(${search}) {
              business {
                id
                name
                rating      
                price
                phone
                categories {
                  title
                }
                location {
                  address1
                  city
                  state
                }
                reviews {
                  text
                  user {
                    name
                  }
                }
              }
            }
          }`
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
