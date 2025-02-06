numbers-api-fun-fact Installed Dependencies npm install express cors axios express Framework for handling API requests cors Middleware for handling CORS axios To fetch fun facts from an external API

Create index.js (Using ES6 & NumbersAPI) Run Locally using node index.js Test API: http://localhost:3000/api/classify-number?number=371

Deploy on Render Push to GitHub Deploy to Render

Public API Example Response {"number":371,"is_Prime":false,"is_Perfect":false,"properties":["armstrong","odd"],"digit_Sum":11, "fun_Fact":"371 is a number for which we're missing a fact (submit one to numbersapi at google mail!)."}

For Invalid Input { "error": "Invalid input. Please enter a valid integer." }
