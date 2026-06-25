// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrlNode: "https://node-mongo-jwt-wiseachievers.herokuapp.com/",
  baseTestUrlNode: "https://node-mongo-test1-wiseachievers.herokuapp.com/",
  baseCalculationUrl: "https://wiseachievers-calculation.herokuapp.com/",
  baseUrlNodeRender: "https://wise-achievers-jwt-auth.onrender.com/",
  baseTestUrlNodeRender: "https://wise-achievers-tests.onrender.com/",
  baseCalculationUrlRender: "https://wise-achievers-calculation.onrender.com/",
  aiReportFunctionUrl:
    "https://m776dqqsyd2g3ktrn5bhcfof3u0wnulz.lambda-url.ap-south-1.on.aws/",
  careerTestUsersFunctionUrl:
    "https://t7grszjc5vaxddengfywv737cy0urgvv.lambda-url.ap-south-1.on.aws/",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
