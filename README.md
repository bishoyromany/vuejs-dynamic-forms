# Dynamic Forms

[![Version](https://img.shields.io/npm/v/vuejs-dynamic-forms.svg)](https://www.npmjs.com/package/vuejs-dynamic-forms)
[![Downloads](https://img.shields.io/npm/dm/vuejs-dynamic-forms.svg)](https://www.npmjs.com/package/vuejs-dynamic-forms)

A Dynamic Forms Generator Vue component. Compatible with Vue 2.x

- [Dynamic Forms](#dynamic-forms)
  - [Demo](#demo)
  - [Install](#install)
  - [Usage](#usage)
  - [Demo Source](#demo-source)
  - [Available props](#available-props)
  - [Events](#events)

## Demo

To view a demo online:
https://bishoyromany.github.io/vuejs-dynamic-forms/demo

<!-- To view demo locally clone the repo and run `npm install && npm run serve` -->

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

Or use directly from a CDN
``` html
<div id="app">
  <vuejsDynamicForms></vuejsDynamicForms>
</div>
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vuejs-dynamic-forms"></script>

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

## Demo Source
``` html 
<template>
    <div id="Demo">
        <h3 class="toggleMode" @click="toggleDarkMode">Toggle Dark Mode</h3>

        <DynamicForms v-model="formData" :title="title" :form="form" :values="values" :theme="theme" :button="button" />

        <h3 class="title">Form Result</h3>
        <pre>
            <code>{{formData}}</code>
        </pre>
    </div>
</template>

<script>
import DynamicForms from '../plugins/dynamicForms'

const state = {
  date1: new Date()
}

export default {
  name: 'demo',
  components: {
    DynamicForms
  },
  data () {
    return {
      title : 'My title with <strong>HTML</strong>',
      form : [
        {
          name : 'Name',
          placeholder : 'Please Write Your Name...',
          class : 'form-control',
          column : 'name',
          type : 'text',
          value : 'test',
        },
        {
          name : 'Text Area',
          placeholder : 'Please Write Your Name...',
          class : 'form-control',
          column : 'text',
          type : 'textarea',
          value : 'Text Area',
        }, 
        {
          name : 'Editor',
          class : 'form-control',
          column : 'editor',
          type : 'editor',
          value : 'Text Area',
        }, 
        {
          name : 'Tags',
          class : 'form-control',
          type : 'tag',
          column : 'tags',
          subColumn : 'tag',
          autocomplete : ['text' , 'and data' , 1,2, 'and three' , 'etcutra'],
          placeholder : 'Write your tags',
          addOnlyFromAutocomplete : false,
        },
        {
          name : 'Select One User',
          items : [
              {
                  name : 'User 1',
                  id : 1
              },
              {
                  name : 'User 2',
                  id : 2
              }
          ],
          show : 'name',
          value : 'id',
          type : 'selectbox',
          column : 'user',
          placeholder : 'Please Select Your Users'
        },
        {
          name : 'Select Multiple Users',
          items : [
              {
                  name : 'User 1',
                  id : 1
              },
              {
                  name : 'User 2',
                  id : 2
              },
              {
                  name : 'User 3',
                  id : 3
              }
          ],
          show : 'name',
          value : 'id',
          column : 'users',
          type : 'selectbox',
          placeholder : 'Please Select Your Users',
          multipleSelect : true,
          closeOnSelect : false,
        },
        {
          name : "Select Date",
          column : 'date',
          type : 'date',
          placeholder : 'Select Date',
          class : 'myClass',
        },
        {
          name : "Select Color",
          column : 'color',
          type : 'color',
          placeholder : 'Select color',
          class : 'myClass',
        }
      ],
      values : {
        name : 'This is my name',
        text : 'This is my Text',
        editor : '<p>This is my HTML Editor Data</p>',
        tags : ['this are my default tags' , 'my subtags'],
      },
      button : {
        title : 'My Button Content',
        class : 'btn btn-success btn-block myOtherClasses',
      },
      formData : {},
      theme : 'light',
    }
  },
  methods : {
    toggleDarkMode(){
      this.theme = this.theme == 'light' ? 'dark' : 'light';
    }
  }
}
</script>

<style lang="scss" scoped>
#Demo{
  max-width: 700px;
  margin : 50px auto;
  pre{
    margin-top : 20px;
    background-color : #DDD;
    border-radius : 10px;
    border : 1px solid #CCC;
    color : #333;
    padding : 10px;
  }
  .title{
    text-align: center;
    margin-top : 20px;
  }
  .toggleMode{
    margin-bottom : 30px;
    text-align : center;
    cursor : pointer;
  }
}
</style>
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

