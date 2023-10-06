const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const Docxtemplater = require('docxtemplater');
const PizZip = require('pizzip');
const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);

app.use(bodyParser.json());


app.post('/generate-document', async (req, res) => {
  try {
    // replace the file name
    const templateContent = fs.readFileSync('sample-template-new.docx', 'binary');
    const zip = new PizZip(templateContent);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    const data = req.body;
    doc.setData(data);

    doc.render();

    const generatedContent = doc.getZip().generate({ type: 'nodebuffer' });

    const pdfBuf = await libre.convertAsync(generatedContent, '.pdf', undefined);

    const outputPath = 'output.pdf';
    await fs.promises.writeFile(outputPath, pdfBuf);


    res.status(200).json({ message: 'File Created' });
    
  } catch (error) {

    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
