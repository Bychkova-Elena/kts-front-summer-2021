import { resolve } from 'path';

export const entry = resolve(__dirname, "../index.js");
export const output = {
  path: resolve(__dirname, 'dist'),
  filename: 'bundle.js',
};
export const module = {
  rules: [
    {
      test: /\.jsx?/,
      use: 'babel-loader'
    }
  ]
};