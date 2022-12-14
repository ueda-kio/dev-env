# MPA dev env

MPA Frontend Development Environment.

## Usage

In the root directory:

```
yarn
```

Run the app in the development mode.  
Open http://localhost:8080/ to view it in the browser:

```
yarn start
```

Compile files in dist directory:

```
yarn build
```

If you want to convert html files to tsx files before starting development, please follow these steps
- add html files under the pages directory with a newly created diff.
- run the following script:

```
node convertHtmlToTsx.js
```

converts git new file diff files in a batch, so multiple files can be converted at the same time.

## LICENSE
The MIT License (MIT)

Copyright (c) 2022 tsx-html-template-engine

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.