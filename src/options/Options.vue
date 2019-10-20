<template>
    <div id="app">
        <div class="container">
            <h2>Настройки</h2>
            <br>
            <!-- Nav tabs -->
            <ul class="nav nav-tabs nav-justified" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" data-toggle="pill" href="#addPattern">Добавить шаблон</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="pill" href="#menu1">Menu 1</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="pill" href="#menu2">Menu 2</a>
                </li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content">
                <div id="addPattern" class="container tab-pane active"><br>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-md-8">
                                <div class="card">
                                    <div class="card-header">Новый шаблон</div>
                    
                                    <div class="card-body">
                                        <form @submit="submitForm">
                                            <div class="form-group">
                                                <label for="inputTitle">Название</label>
                                                <input type="text" class="form-control" name="title" v-model="patternForm.title" id="inputTitle" placeholder="Введите название">
                                            </div>
                                            <div class="form-group">
                                                <label for="inputRegex">Регулярное выражение</label>
                                                <input type="text" class="form-control" name="regex" v-model="patternForm.regex" id="inputRegex" aria-describedby="emailHelp" placeholder="Введите регулярное выражение">
                                            </div>
                                            <div class="form-group">
                                                <label for="inputTooltip">Подсказка</label>
                                                <input type="text" class="form-control" name="tooltip" v-model="patternForm.tooltip" id="inputTooltip" placeholder="Введите подсказку">
                                            </div>
                                            <div class="form-group">
                                                <label for="inputColor">Цвет</label>
                                                <input type="color" class="form-control" name="color" v-model="patternForm.color" id="inputColor">
                                            </div>
                                            <button type="submit" class="btn btn-success">Добавить</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="menu1" class="container tab-pane fade"><br>
                    <h3>Placeholder</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit autem dolorem earum illum?</p>
                </div>
                <div id="menu2" class="container tab-pane fade"><br>
                    <h3>Placeholder</h3>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app',

    mounted: function(){
        
    },

    data () {
        return {
            patternForm: {
                title: '',
                regex: '',
                tooltip: '',
                color: '',
            }
        }
    },

    methods: {
        submitForm(e) {
            e.preventDefault();
            let vue = this;
            vue.axios
                .post('http://otrarserver.test.cgr/', { // Change this later on
                    data: {
                        title: this.patternForm.title,
                        regex: this.patternForm.regex,
                        tooltip: this.patternForm.tooltip,
                        color: this.patternForm.color
                    },
                    action: 'add'
                })
                .then(function (response){
                    console.log(response);
                    vue.patternForm.title = '';
                    vue.patternForm.regex = '';
                    vue.patternForm.tooltip = '';
                    vue.patternForm.color = '';
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

}
</script>

