<template>
    <div id="addComponent">
        <div class="card text-white bg-dark">
            <div class="card-header" v-html="title"></div>
            <div class="card-body">
                <form @submit.prevent="action()">
                    <div class="form-group" v-for="f in form" v-bind:key="f.name">
                        <div class="row" v-if="f.type != 'editor'">
                            <div class="col-md-3">
                                <label :for="f.column">{{f.name}}</label>
                            </div>
                            <div class="col-md-9">
                                <input v-if="f.type != 'selectbox' && f.type != 'textarea' && f.type != 'editor'" :type="f.type" :required="f.required ? '' : false" :placeholder="f.placeholder" v-model="formBack[f.column]" :id="f.column" :class="f.class">
                                <textarea v-else-if="f.type == 'textarea'" :required="f.required ? '' : false" :placeholder="f.placeholder" v-model="formBack[f.column]" :id="f.column" :class="f.class"></textarea>
                                <select v-else :type="f.type" :required="f.required ? '' : false" v-model="formBack[f.column]" :id="f.column" :class="f.class">
                                    <option v-for="v in f.items" v-bind:key="v[f.value]" :value="v[f.value]">
                                        {{v[f.show]}}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div v-else>
                            <label :for="f.column">{{f.name}}</label>
                            <!-- <tinymce v-model="formBack[f.column]" :id="f.column" class="tinymce"></tinymce> -->
                            <div v-html="formBack[f.column]"></div>
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
// import tinymce from 'vue-tinymce-editor';

export default {
    name : 'DynamicForms',
    props : {
        hidden : '',
        values : {
            type : Object,
            default(){
                return{
                    name : 'This is my name',
                    text : 'This is my Text',
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
        // tinymce,
    },
    data(){
        return{
            formBack : [],
        }
    },
    created(){
        this.formBack = this.values;
    },
    methods : {
        action(){
            this.$emit('save' , this.formBack);
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

<style scoped>
@import './../styles/style.css';
</style>
