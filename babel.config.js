const presets = [
  [
    '@babel/env',
    {
      targets: {
        node: 'current'
      }
    }
  ],
  ['minify']
];

module.exports = { presets };
