<script setup>
import { NSkeleton } from 'naive-ui'
import { Suspense } from 'vue';
</script>
<template>
    <div class="home">
<h1>Weather Today</h1>
<!-- <Suspense> -->
<div v-if="(weatherData===null)">...Loading</div>
<div v-else className="main">
    <p className="header">{{weatherData.name}}</p>
    <div className="flex">
        <p className="description">{{weatherData.weather[0].main}}</p>
        <p className="description">{{ weatherData.wind.deg }}&deg {{weatherData.wind.gust}} km/h</p>
    </div>

    <div className="flex">
        <p className="temp">Temprature: {{weatherData.main.temp}} &deg;C</p>
        <p className="temp">Humidity: {{weatherData.main.humidity}} %</p>
    </div>

    <div className="flex">
        <p className="sunrise-sunset">Sunrise: {{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}}
        </p>
        <p className="sunrise-sunset">Sunset: {{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}}</p>
    </div>
</div>   
</div>
<!-- </Suspense> -->
</template>

<script>
export default {
    data() {
        return {
            lat: null,
            Long: null,
            weatherData: null,
            loading:true
        }
    },
    created() {
            this.showPosition();
            this.getWeather();
    },
    watch: {
        lat(oldval, newval) {
               this.getWeather();
        },
        // weatherData() {
        //     this.loading = false;
        // }
    },
    methods: {
        showPosition() {
            navigator.geolocation.getCurrentPosition((position) => {
                this.lat = position.coords.latitude;
                this.long = position.coords.longitude;
            });
        },
        async getWeather() {
            if (this.lat && this.long) {
                await fetch(`${import.meta.env.VITE_APP_API_URL}/weather/?lat=${this.lat}&lon=${this.long}&units=metric&APPID=${import.meta.env.VITE_APP_API_KEY}`)
                    .then(res => res.json())
                    .then(result => {
                        this.weatherData = (result)
                        this.loading = false;
                        console.log(this.weatherData)
                    });
            }
        }
    },
}


</script>
<style>
.home{
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    gap: 2rem;
}
.main {
    width: min(100%, 600px);
    border-radius: 20px;
    background-color: #01579b;
}

.top {
    height: 60px;
    background-color: #424242;
    color: whitesmoke;
    padding: 10px;
    border-radius: 20px 20px 0 0;
    font-family: 'Recursive', sans-serif;
    display: flex;
    justify-content: space-between;
}

.header {
    background-color: #424242;
    color: whitesmoke;
    margin: 10px 0px 0px 10px;
    font-size: 25px;
    border-radius: 20px 20px 0 0;
    font-family: 'Recursive', sans-serif;
}

.day {
    padding: 15px;
    color: whitesmoke;
    font-family: 'Recursive', sans-serif;
    font-size: 24px;
    font-weight: 600;
}

.temp {
    padding: 15px;
    color: whitesmoke;
    font-family: 'Recursive', sans-serif;
    font-size: 18px;
}

.flex {
    display: flex;
    justify-content: space-between;
}

.sunrise-sunset {
    padding: 15px;
    color: whitesmoke;
    font-family: 'Recursive', sans-serif;
    font-size: 16px;
}

.description {
    padding: 15px;
    color: whitesmoke;
    font-family: 'Recursive', sans-serif;
    font-size: 24px;
    font-weight: 600;
}
</style>

