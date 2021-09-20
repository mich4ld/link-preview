### Link Preview
Simple link preview library for Node.js. </br>
It's using:
- Cheerio
- Axios

### Features
- limit response size to 3MB by default
- user agent rotation
- you can configure axios to use http proxy or even Tor
- ignoring non-string responses (json API, files)
- written in TypeScript
- validate utility (reject IP adresses, localhost and invalid url)

### Installation
```bash
npm install @mich4l/link-preview
```

### To-do
- add possibility to extend default crawler
- add utility to extract urls from text
