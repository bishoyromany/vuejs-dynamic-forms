# Dynamic Forms

[![Version](https://img.shields.io/npm/v/vuejs-dynamic-forms.svg)](https://www.npmjs.com/package/vuejs-dynamic-forms)
[![Downloads](https://img.shields.io/npm/dm/vuejs-dynamic-forms.svg)](https://www.npmjs.com/package/vuejs-dynamic-forms)

A Dynamic Forms Generator Vue component. Compatible with Vue 2.x

- [Demo](#demo)
- [Install](#install)
- [Usage](#usage)
- [Props](#available-props)
- [Events](#events)

## Demo

To view a demo online:
https://codesandbox.io/s/vue-dynamic-forms-demo-60kyd

To view demo examples locally clone the repo and run `npm install && npm run serve`

## Install

``` bash
npm i vuejs-dynamic-forms --save
```


``` javascript
import vueDynamicForms from 'vuejs-dynamic-forms';

export default {
  // ...
  components: {
    vueDynamicForms
  }
  // ...
}
```
Don't Forget Bootstrap
``` html
<style>
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css");
</style>
```

Or use directly from a CDN
``` html
<div id="app">
  <vuejsDynamicForms></vuejsDynamicForms>
</div>
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vuejs-dynamic-forms"></script>
<style>
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css");
</style>

<script>
const app = new Vue({
  el: '#app',
  components: {
  	vuejsDynamicForms
  }
})
</script>
```

## Usage

``` html
<vueDynamicForms></vueDynamicForms>
```

*form* prop if passed should be a Array
*values* prop if passed should be object
``` html
<script>
var state = {
  form: [
    {
      name : 'The Label Name',
      type : 'The input type [text,date,color,selectbox,textarea,checkbox,editor]',
      class : 'the input field class',
      column : 'the object name where data should be stored',
      items : 'a list of items for select box',
      show : 'show column for select box',
      value : 'the data should be stored from select box'
    }
  ],
  values : {
    columnName : 'value here',
  }
}
</script>
<vueDynamicForms :form="state.form" :values="values"></vueDynamicForms>
```

You Can Use v-model
``` html
<vueDynamicForms v-model="data"></vueDynamicForms>
```

Emits events
``` html
<vueDynamicForms @save="doSomethingInParentComponentFunction">
```
## Available props

| Prop                          | Type            | Default     | Description                              |
|-------------------------------|-----------------|-------------|------------------------------------------|
| form                          | Array           | Sample Form | The Form Elements                        |
| values                        | Object          |Inputs Values| The Form Inputes Values                  |
| title                         | String          |             | The Form Title                           |
| button                        | Object          |             | {title,class} of the submit button       |
| theme                         | String          | dark        | Form Theme light/dark                    |

## Events

These events are emitted on actions in the datepicker

| Event             | Output     | Description                          |
|-------------------|------------|--------------------------------------|
| save              | Form Data  | Form Submited                        |
| update            | Form Edited| Form Updated                         |

