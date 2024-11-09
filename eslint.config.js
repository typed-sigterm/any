import ts from '@typed-sigterm/eslint-config';

export default ts({
  typescript: true,
  rules: {
    'new-cap': [0],
    'symbol-description': [0],
  },
});
