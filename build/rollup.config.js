import commonjs from 'rollup-plugin-commonjs'; // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import buble from 'rollup-plugin-buble'; // Transpile/polyfill with reasonable browser support
import {terser} from 'rollup-plugin-terser'

export default [{
    input: 'src/plugins/dynamicForms/index.js', // Path relative to package.json
    output: [
        {
          file: 'dist/vuejs-dynamic-forms.js',
          format: 'umd',
          name: 'vuejsDynamicForms'
        },
        {
          file: 'dist/vuejs-dynamic-forms.common.js',
          format: 'cjs'
        },
        {
          file: 'dist/vuejs-dynamic-forms.esm.js',
          format: 'es'
        }
    ],
    plugins: [
        commonjs(),
        vue({
            css: true, // Dynamically inject css as a <style> tag
            //compileTemplate: true, // Explicitly convert template to render function
        }),
        buble(), // Transpile to ES5
    ],
},{
    input: 'src/plugins/dynamicForms/index.js', // Path relative to package.json
    output: {
        file: 'dist/vuejs-dynamic-forms.min.js',
        format: 'umd',
        name: 'vuejsDynamicForms'
    },
    plugins: [
        commonjs(),
        vue({
            css: true, // Dynamically inject css as a <style> tag
            //compileTemplate: true, // Explicitly convert template to render function
        }),
        buble(), // Transpile to ES5
        terser(), //minify
    ],
}];