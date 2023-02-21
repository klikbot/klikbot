import app from "./app";

const appPort = process.env.APP_PORT || 3001;

app.listen(appPort, () => {
	console.log("Http server started on port " + appPort + ".");
});