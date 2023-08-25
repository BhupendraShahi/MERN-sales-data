import express from "express";
import { getTransactions } from "../controllers/transactionController.js";
import { getStatistics } from "../controllers/statisticsController.js";
import { getBarChartData } from "../controllers/barChartController.js";
import { getPieChartData } from "../controllers/pieChartController.js";
import { getCombinedData } from "../controllers/combinedController.js"; 

const router = express.Router();

router.get("/transactions", getTransactions);

router.get("/statistics", getStatistics);

router.get("/bar-chart", getBarChartData);

router.get('/pie-chart', getPieChartData); 

router.get('/combined-data', getCombinedData); 


export default router;
