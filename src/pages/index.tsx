import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

const Content = () => {
  return <></>;
};

const page = `
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charSet="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Title</title>
<link href="/css/index.css" rel="stylesheet">
<script src="/js/index.js" defer></script>
</head>
<body>
${renderToStaticMarkup(<Content />)}
</body>
</html>
`;

export default page;
