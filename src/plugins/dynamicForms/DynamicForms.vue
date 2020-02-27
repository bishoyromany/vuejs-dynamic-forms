<template>
    <div id="VuejsDynamicForms">
        <div :class="`card ${theme == 'dark' ? 'text-white bg-dark' : 'text-black bg-white'}`">
            <div class="card-header" v-html="title"></div>
            <div class="card-body">
                <form @submit.prevent="action()">

                    <div class="form-group" v-for="f in form" v-bind:key="f.name">

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
                                
                                <select 
                                v-else-if="f.type == 'selectbox'" 
                                :type="f.type" 
                                :required="f.required ? '' : false" 
                                :placeholder="f.placeholder" 
                                v-model="formBack[f.column]" 
                                :id="f.column" 
                                :class="f.class ? f.class : 'form-control'">
                                    <option v-for="v in f.items" v-bind:key="v[f.value]" :value="v[f.value]">
                                        {{v[f.show]}}
                                    </option>
                                </select>

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
                                    <VueTagsInput :placeholder="f.placeholder" v-model="form[f.subColumn]" :tags="form[f.column]" 
                                    @tags-changed="newTags => form[f.column] = newTags" 
                                    :autocomplete-items='filterData(f.autocomplete , form[f.subColumn])' />
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
                    editor : '<p>This is my HTML Editor Data</p>'
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
                        placeholder : 'Write your tags'
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
    },
    data(){
        return{
            formBack : [],
            normalInputs : ['text' , 'email' , 'checkbox' , 'radio' , 'selectbox' , 'password' , 'textarea'],
        }
    },
    created(){
        this.formBack = this.values;
    },
    methods : {
        action(){
            this.$emit('save' , this.formBack);
        },
        /**
         * filter data for autocomplete
         */
        filterData(items , text){
            let newText = text ? text.toLowerCase() : '';
            return items.filter(item => {
                return String(item).toLowerCase().indexOf(newText) !== -1
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

<style lang="scss">
#VuejsDynamicForms{
    .vue-tags-input{
        max-width : 100%;
    }
}
</style>
