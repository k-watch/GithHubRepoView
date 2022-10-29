module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-var': 'error', // var 금지
    'no-multiple-empty-lines': 'error', // 여러 줄 공백 금지
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }], // console.log() 금지
    eqeqeq: 'error', // 일치 연산자 사용 필수
    'dot-notation': 'error', // 가능하다면 dot notation 사용
    'linebreak-style': 0, // CRLF 에러
    'react/function-component-definition': 0, // 함수형 컴포넌트 화살표함수사용 가능
    'comma-dangle': 0,
    'arrow-body-style': 0,
    'consistent-return': 0,
    'react/prop-types': 0,
    'no-unused-vars': 0,
    'no-shadow': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/react-in-jsx-scope': 0,
  },
};
