<template>
  <div>
    <div class="pattern-bg"></div>
    <div class="tools">
      <!-- section 1 -->
      <h2>
        Every tool you need to work with PDFs in one place
      </h2>
      <h4>
        Every tool you need to use PDFs, at your fingertips. All are 100% FREE and
        easy to use! Merge, <br />split, compress, convert, rotate, unlock and
        watermask PDFs with just a few clicks
      </h4>
      <div class="tools_container">
          <div v-for="(item, index) in features" :key="index" class="tools__item">
            <feature-title
              :item={item}        
            >
            </feature-title>
          </div>
      </div>
      <!-- section 1 -->
    </div>

    <div class="solution">
      <div class="block__container">
        <div class="solution-header">
          Looking for another solution?
        </div>
        <div class="md-layout">
          
          <div class="md-layout-item">
            <div class="md-layout-item-title">
              iLovePDF Desktop
            </div>
            <div class="md-layout-item-content">
              Download the <a href=""> iLovePDF Desktop App </a> to work with your favorite PDF tools on your Mac or Windows PC. Get a lightweight PDF app that helps you process heavy PDF tasks offline in seconds.
            </div>
          </div>
          <div class="md-layout-item">
            <div class="md-layout-item-title">
              iLovePDF Mobile
            </div>
            <div class="md-layout-item-content">
              Get the <a href=""> iLovePDF Desktop App </a>  App to manage documents remotely or on the move. Turn your Android or iPhone device into a PDF Editor & Scanner to annotate, sign, and share documents with ease.
            </div>
          </div>
          <div class="md-layout-item">
            <div class="md-layout-item-title">
              iLoveIMG
            </div>
            <div class="md-layout-item-content">
              
              <a href=""> iLoveIMG </a> is the web app that helps you modify images in bulk for free. Crop, resize, compress, convert, and more. All the tools you need to enhance your images in just a few clicks.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="trusted">
      <div class="block__container">
        <div class="trusted-header">
          The PDF software trusted by millions of users
        </div>

        <div class="trusted_teext">
          iLovePDF is your number one web app for editing PDF with ease. Enjoy all the tools you need to work efficiently with your digital documents while keeping your data safe and secure.
        </div>

        <div class="md-layout">
          <div class="md-layout-item">
            <img src="@/assets/img/pdf-association-logo.svg" alt="">
          </div>
          <div class="md-layout-item">
            <img src="@/assets/img/iso-logo.svg" alt="">
          </div>
          <div class="md-layout-item">
            <img src="@/assets/img/ssl-encrypted-logo.svg" alt="">
          </div>
        </div>
      </div>
    </div>

    <div class="premium">
      <div class="block__container">
        <div class="md-layout">
          <div class="md-layout-item">
            <div class="premium_title">
              Get more with Premium
            </div>
            <div class="premium_text">
              Complete projects faster with batch file processing, convert scanned documents with OCR and e-sign your business agreements.
            </div>
            <div >
              <a href="" class="btn premium_btn">
                Get Premium
              </a>
            </div>
          </div>
          <div class="md-layout-item">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FeatureTitle from "./components/FeatureTitle.vue";
import {feature_names} from './feature_name.js';

export default {
  components: {
    FeatureTitle,
  },
  data() {
    return {
      features: feature_names,
    }
  }
};
</script>

<style lang="scss" scoped>
 

 .md-layout-item {
    height: 40px;

    &:after {
      width: 100%;
      height: 100%;
      display: block;
      background: md-get-palette-color(red, 200);
      content: " ";
    }
  }
.pattern-bg{
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    z-index: 1;
    position: fixed;
    top: 0;
    background-position: center center;
    background-size: 100% auto;
    background-image: url('../../assets/img/background.svg')
}

.tools h2, .tools h4{
  text-align: center;
}

h2{
  font-weight: 600;
  margin-top: 60px;
}

h4{
  font-weight: 500;
  margin-bottom: 50px;
}
.elevation-demo {
  padding: 16px;
  display: flex;
  flex-wrap: wrap; 
  margin: 20px;
  align-items: center;
  justify-content: center;
}

.tools{
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    position: relative;
    margin: auto;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    padding: 0 68px 42px;
}

.tools_container{
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    position: relative;
}


.tools__item {
    background: #fff;
    -ms-flex-positive: 0;
    flex-grow: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -ms-flex-preferred-size: calc(16.666% - 4px);
    flex-basis: calc(16.666% - 4px);
    border: 1px solid #f5f5fa;
    margin: 2px;
    position: relative;
    overflow: hidden;
    -webkit-transition: background-color .4s ease-out,-webkit-box-shadow .4s ease-out;
    transition: background-color .4s ease-out,-webkit-box-shadow .4s ease-out;
    -o-transition: box-shadow .4s ease-out,background-color .4s ease-out;
    transition: box-shadow .4s ease-out,background-color .4s ease-out;
    transition: box-shadow .4s ease-out,background-color .4s ease-out,-webkit-box-shadow .4s ease-out;
    z-index: 1;
    border-radius: 4px;
    -webkit-box-shadow: 0 2px 10px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 10px 0 rgba(0,0,0,.1);
}

.solution{
  background-color: #fff;
  padding: 96px 0 124px;
  z-index: 1;
  position: relative;
}

.trusted{
  padding: 96px 0 124px;
}

.trusted-header{
  font-weight: 600;
  font-size: 42px;
  line-height: 52px;
  color: #33333b;
  text-align: center;
  margin-bottom: 30px;
}

.trusted_teext{
  margin-top: 16px;
  text-align: center;
  font-weight: 400;
  color: #47474f;
  font-size: 20px;
}


.trusted .md-layout{
  margin-top: 70px;
}

.trusted .md-layout .md-layout-item{
  text-align: center;
}
.trusted .md-layout .md-layout-item img{
  width: 120px;
}


.premium{
  position: relative;
  background: #47474f;
  color: #f5f5fa;
  padding: 64px 0 230px;
  z-index: 1;
}

.premium .premium_title{
  font-weight: 600;
  font-size: 42px;
  line-height: 52px;
}

.premium_text{
  line-height: 32px;
  font-size: 22px;
  font-weight: 400;
} 

.premium_btn{
  margin-top: 20px;
  color: #33333b !important;
  background-color: #ffc233;
}

.btn{
  
  width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    padding: 8px 20px;
    text-shadow: none;
    border: 1px solid rgba(0,0,0,0);
    text-decoration: none;
    border-radius: 8px;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
    -webkit-transition: all .1s linear;
    -o-transition: all .1s linear;
    transition: all .1s linear;
    font-size: 16px;
    line-height: 20px;
    font-weight: 600;
    letter-spacing: 0;
    min-height: 42px;
    color: #fff;
}
.block__container{
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    max-width: 91%;
}
.solution-header
  {
    font-weight: 600;
    font-size: 42px;
    line-height: 52px;
    color: #33333b;
    text-align: center;
    margin-bottom: 64px;
  }

.solution .md-layout-item{
  height: auto;
}
.md-layout-item-title{
    font-weight: 500;
    font-size: 28px;
    line-height: 30px;
    color: #33333b;
    margin-bottom: 12px;
}

.md-layout-item-content{
  color: #707078;
  line-height: 28px;
  font-size: 16px;
  font-weight: 400;
}

@media (min-width: 992px)
{
  .block__container {
    max-width: 84%;
  }
}

@media (min-width: 1366px)
{
  .block__container {
      max-width: 84%;
  }
}
@media (max-width: 98.75em){
  .tools__item{
      font-size: 36px;
      
      -ms-flex-positive: 0;
      flex-grow: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
      -ms-flex-preferred-size: calc(20% - 4px);
      flex-basis: calc(20% - 4px);
  }
}

@media (max-width: 90em)
{.tools {
    padding: 0 32px 32px;
}}
@media (max-width: 1280px){
  .tools__item {
      -ms-flex-positive: 0;
      flex-grow: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
      -ms-flex-preferred-size: calc(25% - 4px);
      flex-basis: calc(25% - 4px);
  }
}

@media (max-width: 960px)
{
  .tools__item {
    -ms-flex-positive: 0;
    flex-grow: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -ms-flex-preferred-size: calc(33.333% - 4px);
    flex-basis: calc(33.333% - 4px);
  }
}


@media (max-width: 640px)
{ 
   .tools__item {
      -ms-flex-positive: 0;
      flex-grow: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
      -ms-flex-preferred-size: calc(50% - 4px);
      flex-basis: calc(50% - 4px);
  }

  .solution-header{
    margin-bottom: 25px;
  }
  .md-layout-item{
    margin-top: 30px;
  }
}

@media (max-width: 440px)
{
  .tools__item {
    -ms-flex-positive: 0;
    flex-grow: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -ms-flex-preferred-size: calc(100% - 4px);
    flex-basis: calc(100% - 4px);
  }
}
</style>
