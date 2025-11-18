const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
const PORT = 8000;
app.use(
  cors({
    origins: "*",
  })
);
app.get("/api/swiggy", async (req, res) => {
  console.log("hi");
  try {
    const response = await axios.get(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.38430&lng=78.45830&collection=83639&tags=layout_CCS_Biryani&sortBy=&filters=&type=rcv2&offset=0&page_type=null",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          Referer: "https://www.swiggy.com/",
          Accept: "application/json",
          "Accept-Language": "en-US,en;q=0.9",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});
app.get("/:id/suggetions", async (req, res) => {
  console.log("hi");
  const { id } = req.params;
  console.log(id);
  try {
    const response = await axios.get(
      `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${id}&types=`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          Referer: "https://www.swiggy.com/",
          Accept: "application/json",
          "Accept-Language": "en-US,en;q=0.9",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

//api
app.get("/:id/placeId", async (req, res) => {
  console.log("hello");
  const { id } = req.params;
  console.log(id);
  try {
    const response = await axios.get(
      `https://www.swiggy.com/dapi/misc/address-recommend?place_id=${id}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          Referer: "https://www.swiggy.com/",
          Accept: "application/json",
          "Accept-Language": "en-US,en;q=0.9",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});
app.get("/topRestaurants", async (req, res) => {
  const { lat, lng } = req.query;
  console.log(lat, lng);
  try {
    const response = await axios.get(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          Referer: "https://www.swiggy.com/",
          Accept: "application/json",
          "Accept-Language": "en-US,en;q=0.9",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});
app.get("/menu", async (req, res) => {
  const { restId } = req.query;

  try {
    const response = await axios.get(
      // `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.37240&lng=78.43780&restaurantId=${restId}&catalog_qa=undefined&submitAction=ENTER`,
      ` https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.38430&lng=78.45830&restaurantId=${restId}&query=Idli&submitAction=ENTER&source=collection`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          Referer: "https://www.swiggy.com/",
          Accept: "application/json",
          "Accept-Language": "en-US,en;q=0.9",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});
app.get("/moreRestaurants", async (req, res) => {
  const { lat, lng, paramsId, foodName } = req.query;

  try {
    const response = await axios.get(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&collection=${paramsId}&tags=layout_${foodName}_Contextual&sortBy=&filters=&type=rcv2&offset=0&page_type=null`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          Referer: "https://www.swiggy.com/",
          Accept: "application/json",
          "Accept-Language": "en-US,en;q=0.9",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});
app.get("/searchDish", async (req, res) => {
  const { lat, lng, SearchDish } = req.query;

  try {
    const response = await axios.get(
      `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${SearchDish}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=652e40c2-c091-d5e2-1a71-b8470cdbd857&`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          Referer: "https://www.swiggy.com/",
          Accept: "application/json",
          "Accept-Language": "en-US,en;q=0.9",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});
app.get("/searchRestuarants", async (req, res) => {
  const { lat, lng, SearchRestuarants } = req.query;

  try {
    const response = await axios.get(
      `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${SearchRestuarants}&trackingId=d9f7c559-9fa7-c036-aeda-f47e8701d692&submitAction=ENTER&queryUniqueId=d5205c14-7d27-441d-e1cf-178d60ecbbe6`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          Referer: "https://www.swiggy.com/",
          Accept: "application/json",
          "Accept-Language": "en-US,en;q=0.9",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});
app.use(express.json());

app.listen(PORT, () => console.log("Server running"));
