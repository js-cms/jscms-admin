<template>
  <div class="login-vue">
    <div class="login-container">
      <div class="login-content">
        <div class="login-title">JSCMS管理</div>
        <div class="login-name login-input">
          <input type="text" name="username" v-model="login.email" autocomplete="off"/>
          <span class="placeholder" :class="{fixed: login.email != '' && login.email != null}">用户名</span>
        </div>
        <div class="login-password login-input">
          <input type="password" name="password" v-model="login.password" @keyup.enter="submit" autocomplete="off"/>
          <span class="placeholder" :class="{fixed: login.password != '' && login.password != null}">密码</span>
        </div>
        <div class="login-name login-input" v-if="vercode.show">
          <input type="text" name="vercode" v-model="login.vercode" @keyup.enter="submit" autocomplete="off"/>
          <span class="placeholder" :class="{fixed: login.vercode != '' && login.vercode != null}">验证码</span>
        </div>
        <div class="login-vercode login-input" v-if="vercode.show">
          <img v-tooltip="true" :content="'点击刷新验证码'" title="点击刷新验证码" :src="vercode.src" @click="()=>{vercode.src+=`&t=?${new Date().getTime()}`}" alt="">
        </div>
        <div class="buttonDiv">
          <Button :loading="loading" block color="primary" size="l" @click="submit">登录</Button>
        </div>
      </div>
      <p class="copyright"> Copyright © 2019 <a href="http://jscms.top" target="_blank">JSCMS</a></p>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import Login from './ModelLogin';
import storejs from 'store';
import uuid from 'uuid';

const origin = storejs.get('origin');
const randomUID = uuid.v4();

export default {
  data() {
    return {
      randomUID: randomUID,
      login: Login.parse({}),
      loading: false,
      vercode: {
        show: false,
        src: origin + `/api/front/captcha/create?uid=${randomUID}`
      }
    };
  },
  created() {
    this.checkVercode();
  },
  methods: {
    async submit() {
      let params = _.cloneDeep(this.login);
      let vercode = params.vercode;
      delete params.vercode;
      let res = await this.req$.post(`/api/back/login?uid=${randomUID}&vercode=${vercode}`, params);
      if (res.code === 0) {
        this.$Message({
          type: 'success',
          text: res.msg, 
          timeout: 3000
        });
        let userInfo = res.data.userInfo;
        if (userInfo) {
          userInfo.avatar = userInfo.avatar.indexOf('http') === -1 ? origin + userInfo.avatar : userInfo.avatar;
        }
        storejs.set('token', res.data.token);
        storejs.set('uuid', userInfo._id);
        storejs.set('userInfo', userInfo);
        this.$router.push({
          name: 'Home'
        });
      } else {
        if ( res.msg.detail ) {
          this.$Message({
            type: 'error',
            text: res.msg.detail[0].message, 
            timeout: 3000
          });
        } else {
          this.$Message({
            type: 'error',
            text: res.msg, 
            timeout: 3000
          });
        }
      }
    },

    async checkVercode() {
      let res = await this.req$.get('http://127.0.0.1:7011/api/front/captcha/is');
      this.vercode.show = res.data.boolLoginVercode;
    }
  }
};
</script>

<style lang="less">
@gradient-color: #3788ee;
@bg-color: #f7f8fa;
@title-color:#3a3a3a;
@text-color: #7e7e7e;
@placeholder-color: #7e7e7e;
.login-vue {
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0; 
  right: 0;
  left: 0;
  background: @bg-color;
  .login-container {
    width: 320px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .login-content {
      letter-spacing: 2px;
      background: #FFF;
      padding: 70px 30px 20px;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
      border-radius: 3px;
      box-sizing: border-box;
      >div {
        margin: 30px 0;
        &.login-input {

          &.login-vercode {
            margin: 0px;
            cursor: pointer;
          }

          position: relative;
          .placeholder {
            position: absolute;
            color: @placeholder-color;
            top: 6px;
            font-size: 16px;
            transition: all .2s;
            left: 0;
            pointer-events: none;
          }
          input {
            font-size: 16px;
            padding: 8px 0;
            height: 40px;
            width: 100%;
            border: none;
            border-radius: 0;
            border-bottom: 1px solid #d3d3d3;
            box-shadow: inset 0 0 0 1000px #fff;
            outline: none;
            box-sizing: border-box;
            transition: .3s;
            font-weight: 200;
            &:focus {
              border-bottom-color: @gradient-color;
              box-shadow: inset 0 0 0 1000px #fff;
            }
          }
          input:focus + .placeholder,input:-webkit-autofill + .placeholder, .placeholder.fixed{
            font-size: 13px;
            top: -16px;
          }
        }
        &.login-title {
          font-size: 30px;
          color: @title-color;
          line-height: 1;
          margin: -16px 0px 40px;
          font-weight: 200;
        }

      }
      > .buttonDiv {
        margin-top: 45px;
        .h-btn {
          padding: 12px 0;
          font-size: 18px;
          opacity: .8;
          border-radius: 3px;
          background: @gradient-color;
          border-color: @gradient-color;
          &:hover {
            opacity: 1;
            background: @gradient-color;
            border-color: @gradient-color;
          }
        }
      }
    }
    .copyright {
      letter-spacing: 1px;
      margin-top: 30px;
      color: @text-color;
      a {
        color: @text-color;
      }
    }
  }
}
</style>
