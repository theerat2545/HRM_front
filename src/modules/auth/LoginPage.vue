<template>
  <v-app>
    <v-main class="auth-background">
      <v-container fluid class="fill-height pa-0">
        <v-row align="center" justify="center" class="fill-height ma-0">
          <v-col cols="12" sm="10" md="8" lg="7" xl="6" class="pa-0">
            <div class="login-wrapper">
              <!-- Left Side -->
              <div class="left-side">
                <div class="left-content">
                  <!-- <div class="desc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                  </div> -->
                </div>
                <!-- <div class="left-footer">
                  <span>Creator HERE</span>
                  <span class="divider"></span>
                  <span>Designer HERE</span>
                </div> -->
              </div>
              <!-- Right Side -->
              <div class="right-side">
                <div class="form-content">
                <div class="logo-section">
                    <div class="rocket-logo" style="width: 48px; margin: 0 auto 10px;">
                      <!-- SVG Rocket -->
                      <svg fill="#000000" width="76" height="76" viewBox="924 578 200 200" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M984.585,638.942c0,13.999-9.609,25.348-21.462,25.348c-11.852,0-21.459-11.349-21.459-25.348 c0-13.998,9.607-25.346,21.459-25.346C974.976,613.596,984.585,624.944,984.585,638.942z"></path> <path d="M987.585,683.641c1.55-0.945,3.265-1.561,5.041-1.855c-3.606-5.088-6.161-10.546-7.637-17.078 c-0.404-2.387-3.672-2.667-6.102-0.687c-4.546,3.706-9.849,6.186-15.765,6.186c-6.03,0-11.577-2.399-16.024-6.414 c-1.419-1.282-3.51-1.476-5.143-0.479c-8.443,5.158-14.834,13.344-17.622,23.067c-0.749,2.605-0.223,5.42,1.411,7.588 c1.636,2.166,4.192,3.443,6.906,3.443h38.668C975.947,692.072,981.41,687.41,987.585,683.641z"></path> </g> <g> <path d="M1063.416,638.942c0,13.999,9.608,25.348,21.461,25.348c11.854,0,21.46-11.349,21.46-25.348 c0-13.998-9.606-25.346-21.46-25.346C1073.024,613.596,1063.416,624.944,1063.416,638.942z"></path> <path d="M1060.415,683.641c-1.55-0.945-3.266-1.561-5.041-1.855c3.606-5.088,6.161-10.546,7.637-17.078 c0.405-2.387,3.673-2.667,6.103-0.687c4.546,3.706,9.848,6.186,15.764,6.186c6.029,0,11.577-2.399,16.025-6.414 c1.419-1.282,3.509-1.476,5.142-0.479c8.444,5.158,14.836,13.344,17.622,23.067c0.748,2.605,0.223,5.42-1.41,7.588 c-1.637,2.166-4.192,3.443-6.905,3.443h-38.67C1072.053,692.072,1066.591,687.41,1060.415,683.641z"></path> </g> <g> <path d="M1082.475,725.451c-4.198-14.654-13.72-27.045-26.326-34.992c-2.487-1.566-5.715-1.313-7.921,0.631 c-6.766,5.959-15.138,9.506-24.228,9.506c-9.269,0-17.791-3.686-24.626-9.855c-2.182-1.971-5.393-2.268-7.902-0.734 c-12.977,7.924-22.799,20.504-27.082,35.445c-1.151,4.008-0.344,8.328,2.166,11.662c2.516,3.33,6.443,5.291,10.615,5.291h92.523 c4.173,0,8.103-1.955,10.618-5.291C1082.823,733.779,1083.626,729.463,1082.475,725.451z"></path> <path d="M1056.981,652.547c0,21.513-14.766,38.955-32.981,38.955c-18.214,0-32.979-17.442-32.979-38.955 c0-21.515,14.765-38.951,32.979-38.951C1042.216,613.596,1056.981,631.033,1056.981,652.547z"></path> </g> </g> </g>
                      </svg>
                    </div>
                    <div class="brand-title">HR MANAGEMENT</div>
                  </div>
                  <!-- <div class="form-title">Sign In</div> -->
                  <div class="form-text">Please enter your employee ID and password.</div>
                  <v-form>
                    <div class="form-label">EmploeeID</div>
                    <v-text-field
                      dense
                      hide-details
                      placeholder="Enter your EmploeeID"
                      class="mb-6"
                      solo
                    ></v-text-field>
                    <div class="form-label">password</div>
                    <v-text-field
                      dense
                      hide-details
                      placeholder="Enter your password"
                      class="mb-4"
                      solo
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      @click:append="showPassword = !showPassword"
                    ></v-text-field>
                    <div class="btn-row">
                      <v-btn outlined color="primary" class="sign-btn" large>Sign In</v-btn>
                    </div>
                  </v-form>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const showPassword = ref(false)
</script>

<style scoped>
.login-wrapper {
  display: flex;
  min-height: 600px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(130, 129, 129, 0.15);
  background: transparent;
}
.left-side {
  flex: 1.1;
  background: url('../../assets/bg-login1.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 48px 32px 24px 32px;
  position: relative;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}
.left-side:after {
  content: "";
  position: absolute;
  top: 0; right: 0; bottom: 0;
  width: 70px;
  background: white;
  border-radius: 100% 0 0 100% / 54% 0 0 54%;
  z-index: 1;
  /* opacity: 0.8; */
}
.left-content {
  position: relative;
  z-index: 2;
}
.logo-section {
  text-align: center;
  margin-right: 40px;
  
}
.welcome-text {
  color: #fff;
  font-size: 1.1rem;
  letter-spacing: 2px;
  margin-bottom: 10px;
  font-weight: 500;
}
.rocket-logo {
  margin-bottom: 10px;
}
.brand-title {
  color: #000000;
  font-size: 1.3rem;
  font-weight: bold;
  letter-spacing: 2px;
  margin-bottom: 10px;
}
/* .desc {
  color: #e0f7fa;
  font-size: 0.95rem;
  margin-top: 20px;
  text-align: center;
} */
.left-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #e0f7fa;
  font-size: 0.85rem;
  z-index: 2;
}
.left-footer .divider {
  width: 1px;
  height: 18px;
  background: #e0f7fa;
  margin: 0 16px;
}
.right-side {
  flex: 1.3;
  background: #fff;
  padding: 48px 40px 32px 0;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form-content {
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
}
.form-title {
  font-size: 1.5rem;
  font-weight: bold;
  /* margin-bottom: 32px; */
  text-align: left;
  color: #222;
}
.form-text {
  font-size: 16px;
  font-weight: regular;
  margin-top: 0!important;
  margin-bottom: 42px;
  text-align: left;
  color: #222;
}
.form-label {
  font-size: 0.95rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 2px;
  margin-top: 10px;
  letter-spacing: 1px;
}
.sign-btn {
  min-width: 120px;
  margin-right: 12px;
  margin-bottom: 0;
  margin-top: 20px;
}
.btn-row {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
}

/* .auth-background {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  overflow: hidden;
}
.auth-background::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  width: 100vw;
  height: 100vh;
  background: url('../../assets/bg1.jpg') no-repeat center center;
  background-size: cover;
  z-index: 0;
} */
.v-main.auth-background > .v-container,
.login-wrapper {
  position: relative;
  z-index: 1;
  filter: none;
}


@media (max-width: 900px) {
  .login-wrapper {
    flex-direction: column;
    border-radius: 16px;
  }
  .left-side, .right-side {
    border-radius: 0 !important;
    padding: 32px 16px;
  }
  .right-side {
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }
  .left-side {
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
  }
}
</style>