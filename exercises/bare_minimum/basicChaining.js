/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var request = require('needle');
var {getGitHubProfileAsync, generateRandomTokenAsync, readFileAndMakeItFunnyAsync} = require('./promisification.js');
var {getStatusCodeAsync, pluckFirstLineFromFileAsync} = require('./promiseConstructor.js');
Promise.promisifyAll(fs);


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return pluckFirstLineFromFileAsync(readFilePath)
    .then((handle) => getGitHubProfileAsync(handle))
    .then((message) => fs.writeFileAsync(writeFilePath, JSON.stringify(message)));
};
//   return fs.readFileAsync(readFilePath).then((data) => {
//     let fileData = '' + data;
//     let indexN = fileData.indexOf('\n');
//     let githubHandle = fileData.slice(0, indexN);
//     return githubHandle;
//   })
//     .then((githubH) => {
//       request('get', 'https://api.github.com/users/' + githubH)
//         .then((response) => {
//           // console.log(response.statusCode, 'this is the STATUS');
//           // console.log(response.body.id);
//           let userInfo = {
//             id: response.body.id,
//             login: response.body.login,
//             name: response.body.name,
//             company: response.body.company,
//             location: response.body.location};
//             console.log(userInfo);
//             console.log(writeFilePath);

//           fs.writeFileAsync(writeFilePath, 'utf8', JSON.stringify(userInfo))
//             .then((err) => {
//               return 'error';
//             });
//         })
//         .catch((error) => {
//           console.error(error);
//         });

//     });

// };


// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
