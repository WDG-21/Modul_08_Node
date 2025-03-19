import http from "http"

const server =  http.createServer((request, response) => {
console.log(request.headers)
  response.statusCode = 200;
  response.setHeader("Content-Type", "text/html")
  response.end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdn.tailwindcss.com"></script>
      <title>Document</title>
    </head>
    <body>
      <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold text-center">Here's a dog!</h1>
        <p class="text-center">This code came from a Node-powered server!</p>
        <img src="https://placedog.net/500/280" alt="Dog" class="mx-auto mt-4">
      </div>

      <script>
        console.log("Some js running in the browser")
      </script>
    </body>
    </html>
    `)

})

server.listen(8000, () => console.log("Server is listening on port 8000"))