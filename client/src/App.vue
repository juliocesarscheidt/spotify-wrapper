<template>
  <div id="app">
    <Header/>
    <div class="container-fluid container-min-height">
      <div class="row">
        <div class="col-lg-12">
          <router-view/>
        </div>
      </div>
    </div>
    <Footer/>
    <notifications group="information" position="bottom right"/>
  </div>
</template>

<script>
// Parts
import Header from '@/components/Parts/Header';
import Footer from '@/components/Parts/Footer';

export default {
  name: 'app',
  components: {
    Header,
    Footer,
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
#app {
  font-family: 'Calibri', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
  background-color: #fff;
  font-size: 14px;
}
h2{
  margin: 5px !important;
}
.container-regular{
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}
.container-small{
  max-width: 400px;
  width: 50% !important;
  margin-left: auto;
  margin-right: auto;
}
.container-min-height {
	min-height: calc(100vh - 142px);
}
.center {
  text-align: center;
}
.flex {
  display: flex;
}
.flex-center {
  justify-content: center;
  align-items: center;
}

.flex-justify-content-start {
  justify-content: start;
}
.flex-align-items-start {
  align-items: flex-start;
}

.flex-justify-content-center {
  justify-content: center;
}
.flex-align-items-center {
  align-items: center;
}

.flex-space-between {
  justify-content: space-between;
}
.flex-space-around {
  justify-content: space-around;
}
.flex-start {
  justify-content: start;
  align-items: flex-start;
}
.flex-end {
  justify-content: end;
  align-items: flex-end;
}
.flex-row {
  flex-direction: row;
}
.flex-column {
  flex-direction: column;
}

select {
  height: 36px !important;
}

button{
	transition: box-shadow .5s, border-color .5s !important;
	outline: none;
	padding: 6px 12px;
	border: 1px solid;
	border-color: rgba(0,0,0,0);
	font-weight: bold;
	border-radius: 0.2em;
	height: 100%;
  cursor: pointer;
}
button[type=submit], button[type=button]{
	color: #fff;
}
.button-blue {
  background-color: #0870a0;
}
.button-green {
  background-color: #05991e;
}
.button-red {
  background-color: #c01717;
}

button:hover{
	border-color: rgba(175,175,175,1);
	box-shadow: 0 0 20px 0.25px rgba(0, 0, 0, .25);
}

.btnlarge{
	width: 100%;
}
.btnsmall{
	width: 50%;
	float: left;
}

.form-control{
	border-color: #ccc !important;
}
.form-control:focus{
  border-color: none !important;
  box-shadow: 0 0 20px 0.25px rgba(0,0,0,.25) !important;
}

.grid-container {
	display: grid;
	grid-gap: 0 0 ;
	justify-content: space-around;
	padding: 10px;
	overflow: hidden;
  margin-bottom: 75px;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	grid-template-areas:
	"sidebar sidebar"
	"content content"
	;
}

.grid-container > div {
	text-align: center;
	vertical-align: middle;
	align-self: center;
	padding: 00px 0;
	font-size: 30px;
	min-height: 400px;
	height: auto;
}
.sidebar {
	grid-area: sidebar;
}
.content {
	grid-area: content;
}

@media screen and (min-width: 1024px){
	.grid-container {
		grid-template-columns: 70% 30%;
		grid-template-rows: 1fr;
		grid-template-areas:
		"sidebar content"
		;
	}
}
@media screen and (max-width: 640px){
	.btnsmall{
		width: 100%;
		margin-bottom: 10px;
	}
}
</style>
