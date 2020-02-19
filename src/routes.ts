import * as express from "express";
const appRoot = require("app-root-path");
const swaggerUi = require("swagger-ui-express");
import * as specs from "./swagger";
import { auth } from "./verifyToken";

//import sub-routers
import * as registerRouter from "./controllers/Register";
import * as loginRouter from "./controllers/Login";
import * as entries from "./controllers/entries";
import * as languages from "./controllers/languages";
import * as versions from "./controllers/versions";
import * as resetPasswordRouter from "./controllers/ResetPassword";
import * as profilesRouter from "./controllers/Profiles";
import * as leaderboardRouter from "./controllers/Leaderboard";
import * as prizeRouter from "./controllers/prizes";
import * as winnerRouter from "./controllers/winner";
import * as historyRouter from "./controllers/History";
import * as prize_claim from "./controllers/Tukarpoint";
import * as masterRouter from "./controllers/Master";
import * as newsRouter from "./controllers/News";
import * as videosRouter from "./controllers/Video";
import * as quizRouter from "./controllers/quiz";
import * as surveyRouter from "./controllers/survey";
import * as bannerRouter from "./controllers/Banner";

let router = express.Router();

router.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs.default, { explorer: true })
);

router.get("/", (req, res) => res.send("Welcome to API UNDI-UNDI"));

//Router
router.use("/registration", registerRouter);
router.use("/login", loginRouter);
router.use("/entries", auth, entries);
router.use("/languages", languages);
router.use("/versions", versions);
router.use("/reset", resetPasswordRouter);
router.use("/profiles", auth, profilesRouter);
router.use("/leaderboard", auth, leaderboardRouter);
router.use("/prize", auth, prizeRouter);
router.use("/winner", auth, winnerRouter);
router.use("/history", auth, historyRouter);
router.use("/prize_claim", auth, prize_claim);
router.use("/master", masterRouter);
router.use("/news", auth, newsRouter);
router.use("/videos", auth, videosRouter);
router.use("/quiz", auth, quizRouter);
router.use("/survey", auth, surveyRouter);
router.use("/banner", auth, bannerRouter);

router.use("/faq", (req: express.Request, res: express.Response) => {
  res.sendFile(`${appRoot}/public/tnc/faq.html`);
});
router.use("/tnc", (req: express.Request, res: express.Response) => {
  res.sendFile(`${appRoot}/public/tnc/tnc.html`);
});

module.exports = router;
