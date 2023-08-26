const express = require('express');
const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');

const md = new MarkdownIt();

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  const markdownFilePath = path.join(process.cwd(), 'README.md');

  fs.readFile(markdownFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading Markdown file');
    }
    const htmlContent = md.render(data);

    res.send(htmlContent);
  });
});
module.exports = router;
