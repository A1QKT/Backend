import config from "config";

export default test("test config", () => {
    console.log(config.get("firebase.serviceAccount"));
    console.log(config.get("mongo.uri"));
})
