<template>
    <div id="app">
        <img src="/icons/logo.png" width="180px" height="180px">

        <table v-if="type" border="2" style="border-collapse: collapse">
            <thead>
                <th>Id</th>
                <th>Code</th>
                <th>Number</th>
                <th>Week</th>
                <th>Departure airport code</th>
                <th>Terminal</th>
                <th>Destination airport code</th>
                <th>Terminal</th>
                <th>Departure time</th>
                <th>Arrival time</th>
                <th>Number of stops</th>
                <th>Timetables start</th>
                <th>Timetables end</th>
                <th>Board code</th>
                <th>Travel time</th>
            </thead>
            <tbody>
                <tr v-for="item in msg" v-bind:key="item">
                    <td v-for="td in item" v-bind:key="td">{{ td }}</td>
                </tr>
            </tbody>
        </table>
  </div>
</template>

<script>
export default {
    name: 'app',

    mounted: function(){
        this.parser();
        this.highlight();
    },

    data () {
        return {
            msg: [],
            type: false,
            cityCodes: {
                ALA:'Алматы',
                GUW:'Атырау', 
                TSE:'Нур-Султан',
                KGF:'Караганда',
                SCO:'Актау',
                CIT:'Шимкент'
            },
            monthCodes: {
                JAN:'январь',
                FEB:'февраль',
                MAR:'март',
                APR:'апрель',  
                MAY:'май',      
                JUN:'июнь',
                JUL:'июль',
                AUG:'август', 
                SEP:'сентябрь',
                OCT:'октябрь', 
                NOV:'ноябрь', 
                DEC:'декабрь'
            },
            airlineCodes: {
                DV:'SCAT',
                KC:'AIR ASTANA',
                Z9:'BEK AIR'
            },
            color: ''
        }
    },

    methods: {
        parser: function() {
            var vue = this;
            var requests = [];
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.executeScript(tabs[0].id,{file: 'content.js'}, function(){
                    chrome.tabs.sendMessage(tabs[0].id, {data: 'hw'}, function(response) {
                        var regex = /(\d+)\s+(\w{2})(\s?\d{1,4})\s+(\w{1,4})\s+(\w{3})\s+(\d+\s)?(\w{3})\s+(\d+\s+)?(\d{4})\s+(\d{4})\s+(\d+)\s+(\d{2}[A-Z]{3}\d{2})\s+(\d{2}[A-Z]{3}\d{2})\s+(\w+)\s+(\d{1,2}\:\d{1,2})/g;
                        var result = response.data.matchAll(regex);
                        
                        // Рисуем таблицу
                        if(result) { 
                        for (let element of result) {
                            vue.type = true;
                            for(let key in  element) {
                            if(element[key] == undefined) {
                                element[key] = ' ';
                            }
                            else if(vue.cityCodes.hasOwnProperty(element[key])) {
                                element[key] = vue.cityCodes[element[key]];
                            }
                            else if(vue.monthCodes.hasOwnProperty(element[key])) {
                                element[key] = vue.monthCodes[element[key]];
                            }
                            else if(vue.airlineCodes.hasOwnProperty(element[key])) {
                                element[key] = vue.airlineCodes[element[key]];
                            }
                            }
                            vue.msg.push(element.slice(1));
                        }
                        }
                    });
                });
            });
        },

        highlight: function() {
        this.axios
            .get('http://otrarserver.test.cgr/') // Change this later on
            .then(function(response) {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                    chrome.tabs.sendMessage(tabs[0].id, {patterns: response.data, action: 'highlight'});
                });
            })
            .catch(function(error) {
                //Some error handling
            });
        },
    }

}
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 10px;
    }

    img {
        margin: 0 auto;
    }
</style>
