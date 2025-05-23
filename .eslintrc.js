module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@babel/eslint-parser',
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-env']
    }
  },
   rules: {
    // ปิดการเตือนสำหรับ event ที่ไม่ได้ประกาศ (ถ้าต้องการ)
    'vue/require-explicit-emits': 'off',
    
    // ตั้งค่าการเตือนสำหรับตัวแปรที่ไม่ได้ใช้
    '@typescript-eslint/no-unused-vars': ['warn', { 
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_' 
    }],
    
    // ตั้งค่าการตรวจสอบ v-slot
    'vue/valid-v-slot': ['error', {
      'allowModifiers': false
    }]
  }
}