<template>
    <div id="Demo">
        <DynamicForms :theme="'light'" v-model="formData" :form="form" :values="values" />

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
      formData : {},
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
}
</style>