import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import replace from '@rollup/plugin-replace';

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'react-scripts': 'ReactScripts',
};

const extensions = ['.ts', '.tsx', '.js', '.jsx'];

// Determine if the build is for production
const isProduction = process.env.NODE_ENV === 'production';

export default [
  {
    input: './src/lib/Quiz.jsx',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        globals,
        sourcemap: true
      },
      {
        file: 'dist/index.es.js',
        format: 'es',
        exports: 'named',
        globals,
        sourcemap: true
      },
    ],
    external: Object.keys(globals),
    plugins: [
      peerDepsExternal(),
      nodeResolve({
        modulePaths: ['./src/lib/'],
        browser: true,
        preferBuiltins: true,
        jsnext: true,
        extensions,
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        preventAssignment: true,
      }),
      postcss({
        plugins: [],
        minimize: true,
      }),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        extensions,
        presets: [
          '@babel/preset-env',
          ['@babel/preset-react', { runtime: 'automatic' }],
        ],
      }),
      commonjs({
        include: 'node_modules/**',
      }),
      isProduction && terser({
        keep_classnames: true,
        keep_fnames: true,
        sourceMap: true,
      }),
      // sourceMaps()
    ].filter(Boolean), // This filter removes any falsy values from the plugins array
  },
];
