// import { getAll, addDayCare, getOrg } from "../data/daycares.js";
import daycareFun from "../data/daycares.js";
import {
  isProperId,
  isValidString,
  isValidNumber,
  isValidArray,
  checkState,
  isValidZip,
  isValidEmail,
  isValidPhone,
  isValidWebsite,
  checkBusinessHour,
  checkBoolean
} from "../helpers.js";
import express from "express";

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    res.render("daycares/home");
  } catch (e) {
    res.status(500).render("error", { error: e });
  }
});

router
  .get("/addDayCare", (req, res) => {
    res.render("daycares/addDayCare");
  })
  .post("/addDayCare", async (req, res) => {
    console.log("Request Body:", req.body);
    const dayCarePostData = req.body;
    if (!dayCarePostData || Object.keys(dayCarePostData).length === 0) {
      return res
        .status(400)
        .render("error", { error: "There are no fields in the request body" });
    }

    try {
      isValidString(dayCarePostData.name);
      isValidString(dayCarePostData.introduction);
      isValidString(dayCarePostData.address);
      isValidString(dayCarePostData.town);
      checkState(dayCarePostData.state);
      isValidZip(dayCarePostData.zipcode);
      checkBusinessHour(dayCarePostData.businessHours);
      isValidEmail(dayCarePostData.email);
      isValidPhone(dayCarePostData.phone);
      dayCarePostData.website = dayCarePostData.website ? isValidWebsite(dayCarePostData.website) : null;
      dayCarePostData.yearsInBusiness = dayCarePostData.yearsInBusiness ? isValidNumber(dayCarePostData.yearsInBusiness) : null;
      dayCarePostData.availability = dayCarePostData.availability ? checkBoolean(dayCarePostData.availability, "availability") : null;
      dayCarePostData.lunchOptions = dayCarePostData.lunchOptions ? isValidArray(dayCarePostData.lunchOptions) : null;
      dayCarePostData.duration = dayCarePostData.duration ? isValidArray(dayCarePostData.duration) : null;
      dayCarePostData.tuitionRange = dayCarePostData.tuitionRange ? isValidString(dayCarePostData.tuitionRange) : null;
    } catch (e) {
      return res.status(400).render("error", { error: e });
    }

    try {
      await daycareFun.addDaycare(
        dayCarePostData.name,
        dayCarePostData.introduction,
        dayCarePostData.address,
        dayCarePostData.town,
        dayCarePostData.state,
        dayCarePostData.zipcode,
        dayCarePostData.businessHours,
        dayCarePostData.email,
        dayCarePostData.phone,
        dayCarePostData.website,
        dayCarePostData.yearsInBusiness,
        dayCarePostData.availability,
        dayCarePostData.lunchOptions,
        dayCarePostData.duration,
        dayCarePostData.tuitionRange
      );
      res.redirect("/daycares");
    } catch (e) {
      res.status(500).render("error", { error: e });
    }
  });

router.get("/dayCareList", async (req, res) => {
  try {
    console.log("Fetching all daycares...");
    const dayCares = await daycareFun.getAll();
    console.log("Daycares fetched:", dayCares);
    res.render("daycares/dayCareList", { dayCares });
  } catch (e) {
    res.status(500).render("error", { error: e });
  }
});

router
  .route("/daycares/id")
  .get(async (req, res) => {
    const { name } = req.params;
    try {
      let validName = isValidString(id);
      validName = validName.trim();
      const dayCare = await daycareFun.getOrg(id);

      if (!dayCare) {
        return res.status(404).render("error", { error: "Daycare not found" });
      }

      res.render("dayCareDetail", { dayCare });
    } catch (e) {
      return res.status(400).render("error", { error: e.message });
    }
  })
  .delete(async (req, res) => {
    try {
      req.params.id = isProperId(req.params.id);
    } catch (e) {
      return res.status(400).render("error", { error: e.message });
    }

    try {
      await dayCareData.remove(req.params.id);
      res.redirect("/daycares");
    } catch (e) {
      res.status(500).render("error", { error: e });
    }
  });

export default router;
