<template>
  <div style="margin: 0 auto">
    <el-input-number v-model="choice.num" @change="numChange" :min="1" :max="100" label="数量"></el-input-number>
    <router-link to="/home">首页</router-link>
    <button @click="addCart()">加入购物车</button>
    <button @click="buy()">立即购买</button>
    <div class="hd">
      <div class="carousel">
        <el-carousel height="360px" style="width: 500px" trigger="click">
          <el-carousel-item v-for="item in this.product.swipperImgs" :key="item">
            <el-image
                    style="height: 360px;width: 100%"
                    :src="item"
                    fit="fill"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div>
        <span>商品名:   {{product.name}}</span>
        <br>
        <span>店铺名：    {{product.storeName}}</span>
        <br>
        <span>价格：   ￥{{price}}</span>
        <br>
        <span>销量：{{product.sales}}</span>
        <br>
        <span>发货地：{{product.address}}</span>
        <br>
        <span>运费：￥{{product.freight}}</span>
        <br>
        <span>商品描述:   {{product.description}}</span>
        <br>
        <br>
        <br>
        <br>
      </div>
    </div>
    <h1>商品参数</h1>
    <div v-for="item in product.args">
      <div>{{item.name}}:{{item.value}}</div>
    </div>

    <h1>商品服务</h1>
    <div v-for="item in product.services">
      {{item.name}}
    </div>
    
    <h1>商品body图片</h1>
    <div v-for="item in product.bodyImgs">
      <img :src="item" alt="">
    </div>

    <h1>商品规格</h1>
    <div v-for="(item, index) in product.choices" class="choice" :class="{active: index === selectIndex}">
      <div @click="select(item,index)" class="choiceName">规格名: {{item.choice}}</div>
      <div>库存: {{item.storage}}</div>
      <h1>choice图片</h1>
      <img :src="item.choiceImg" alt="">
    </div>
  </div>
</template>

<script>
  import {Message} from 'element-ui'
  export default {
    name: "Detail",
    data() {
      return {
        id: null,
        product: {},
        price: null,
        selectIndex: null,
        choice: {
          num: 1,
          userId: null,
          choiceId: null
        }
      }
    },
    computed:{
      user(){
        return this.$store.state.user
      }
    },
    created() {
      this.id = this.$route.params.id
      this.getRequest("/api/common/detail",{id:this.id}).then(res =>{
        this.product = res
        for (let i = 0; i < res.swipperImgs.length; i++) {
          res.swipperImgs[i] = '/api' + res.swipperImgs[i]
        }

        for (let i = 0; i < res.bodyImgs.length; i++) {
          res.bodyImgs[i] = '/api' + res.bodyImgs[i]
        }

        for (let i = 0; i < res.choices.length; i++) {
          res.choices[i].choiceImg = '/api' + res.choices[i].choiceImg
        }

        this.product = res
        this.price = res.displayPrice
      })
    },
    methods: {
      select(item, index) {
        this.price = item.price
        this.selectIndex = index
        this.choice.choiceId = item.choiceId
        console.log(item)
        this.choice.num = 1
      },
      numChange(value) {
        this.choice.num = value
      },
      addCart() {
        if (this.choice.choiceId == null) {
          Message.info("请选择商品规格")
        }else {
          this.choice.userId = this.user.id
          this.postRequest('/api/cartItem/add',this.$qs.stringify(this.choice)).then(res => {
            Message.info(res.msg)
          })
        }
      },
      buy() {
        this.postRequest('/api/order/imbuy')
      }
    }
  }
</script>

<style scoped>
  .hd {
    display: flex;
    justify-content: flex-start;
    width: 1200px;
    margin-top: 40px;
  }
  .choice {
    margin-top: 30px;
  }
  .choiceName{
    cursor: pointer;
  }
  .active {
    font-size: 24px;
  }
</style>