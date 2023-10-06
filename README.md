# docx-to-pdf-generator


1. Install the dependencies using npm install or npm i
2. Run using npm start
3. Use the below cURL and import into postman
    curl --location 'http://localhost:3000/generate-document' \
    --header 'Content-Type: application/json' \
    --data '{
        "name": "Himanshu Sharma",
        "tool": "Node Js API"
    }'