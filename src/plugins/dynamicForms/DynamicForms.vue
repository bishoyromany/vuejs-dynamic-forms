<template>
    <div id="VuejsDynamicForms">
        <div :class="`card ${theme == 'dark' ? 'text-white bg-dark' : 'text-black bg-white'}`">
            <div class="card-header" v-html="title"></div>
            <div class="card-body">
                <form @submit.prevent="action()">

                    <div class="form-group" v-for="f in formData" v-bind:key="f.name">

                        <div class="row" v-if="normalInputs.includes(f.type)">
                            <div class="col-md-3">
                                <label :for="f.column">{{f.name}}</label>
                            </div>
                            <div class="col-md-9">
                                <input 
                                v-if="f.type != 'selectbox' && f.type != 'textarea' && f.type != 'editor'" 
                                :type="f.type" 
                                :required="f.required ? '' : false" 
                                :placeholder="f.placeholder" 
                                v-model="formBack[f.column]" 
                                :id="f.column" 
                                :class="f.class ? f.class : 'form-control'">


                                <textarea 
                                v-else-if="f.type == 'textarea'" 
                                :required="f.required ? '' : false" 
                                :placeholder="f.placeholder" 
                                v-model="formBack[f.column]" 
                                :id="f.column" 
                                :class="f.class ? f.class : 'form-control'"></textarea>
                            </div>
                        </div>


                        <div v-else-if="f.type == 'editor'">
                            <label :for="f.column">{{f.name}}</label>
                            <tinymce v-model="formBack[f.column]" :id="f.column" class="tinymce"></tinymce>
                        </div>


                        <div v-else-if="f.type == 'tag'">
                            <div class="row">
                                <div class="col-md-3">
                                    <label :for="f.column">{{f.name}}</label>
                                </div>
                                <div class="col-md-9">
                                    <VueTagsInput 
                                    :placeholder="f.placeholder" 
                                    v-model="formData[f.subColumn]" 
                                    :tags="formBack[f.column]" 
                                    :allow-edit-tags="true"
                                    :add-only-from-autocomplete="formData[f.addOnlyFromAutocomplete]"
                                    @tags-changed="newTags => formBack[f.column] = newTags.map(item => {
                                        return item.text;
                                    })" 
                                    :autocomplete-items='filterData(f.autocomplete , formData[f.subColumn])' />
                                </div>
                            </div>
                        </div>

                        <div v-else-if="f.type == 'selectbox'">
                            <div class="row">
                                <div class="col-md-3">
                                    <label :for="f.column">{{f.name}}</label>
                                </div>
                                <div class="col-md-9">
                                    <Multiselect 
                                    :allow-empty="!f.required"
                                    :searchable="f.seachable ? f.searchale : true"
                                    :placeholder="f.placeholder" 
                                    v-model="formBack[f.column]"
                                    :track-by="f.value" :label="f.show"
                                    :close-on-select="f.closeOnSelect"
                                    :preselect-first="f.selectFirst"
                                    :multiple="f.multipleSelect"
                                    :options="f.items"></Multiselect>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="form-group row mb-0">
                        <div class="col-md-6 offset-md-3">
                            <button type="submit" :class="button.class" v-html="button.title"></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import 'bootstrap-css-only';
import tinymce from 'vue-tinymce-editor';
import VueTagsInput from '@johmun/vue-tags-input';
import Multiselect from 'vue-multiselect'

export default {
    name : 'DynamicForms',
    props : {
        hidden : {
            default : '',
        },
        values : {
            type : Object,
            default(){
                return{
                    name : 'This is my name',
                    text : 'This is my Text',
                    editor : '<p>This is my HTML Editor Data</p>',
                    tags : ['this are my default tags' , 'my subtags'],
                }
            }
        },
        form : {
            type : Array,
            default(){
                return[
                    {
                        name : 'Name',
                        placeholder : 'Please Write Your Name...',
                        class : 'form-control',
                        column : 'name',
                        type : 'text',
                        value : 'test',
                    },
                    {
                        name : 'Name Two',
                        placeholder : 'Please Write Your Name...',
                        class : 'form-control',
                        column : 'text',
                        type : 'textarea',
                        value : 'Text Area',
                    }, 
                    {
                        name : 'Name Three',
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
                    }
                ]
            }
        },
        title : {
            type : String,
            default : 'Your Title'
        },
        button : {
            type : Object,
            default(){
                return {
                    title : 'My Button',
                    class : 'btn btn-success btn-block'
                }
            }
        },
        theme : {
            type : String,
            default : 'dark',
        }
    },
    model: {
        prop: 'hidden',
        event: 'update'
    },
    components : {
        tinymce,
        VueTagsInput,
        Multiselect,
    },
    data(){
        return{
            formBack : [],
            formData : this.form,
            normalInputs : ['text' , 'email' , 'checkbox' , 'radio' , 'password' , 'textarea'],
        }
    },
    created(){
        this.formBack = this.values;
        this.fixFormData();
    },
    methods : {
        action(){
            this.$emit('save' , this.formBack);
        },
        /**
         * fix form data to match our needs
         */
        fixFormData(){
            // this.formData = this.formData.map(item => {
            //     if(item.autocomplete != undefined){
            //         item.autocomplete = item.autocomplete.map(i => {
            //             return String(i);
            //         });
            //     }

            //     return item;
            // });
        },
        /**
         * filter data for autocomplete
         */
        filterData(items , text){
            text = String(text);
            let newText = text ? text.toLowerCase() : '';
            return items.filter(item => {
                return String(item).toLowerCase().indexOf(newText) !== -1;
            });
        }
    },
    computed : {

    },
    watch : {
        formBack : {
            handler(){
                this.$emit('update' , this.formBack);
            },
            deep : true,
        }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
#VuejsDynamicForms{
    .vue-tags-input{
        max-width : 100%;
    }
}
</style>
