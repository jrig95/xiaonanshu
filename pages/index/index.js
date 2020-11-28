//index.js
//获取应用实例
const app = getApp()

Page({

  data:{
    restaurants: null,
    currentUser: null,
  },
  
  onLoad: function() {
    const restaurants = new wx.BaaS.TableObject("Restaurant_submission");

    restaurants.find().then((res) =>{
      console.log("results from ifanr", res)
      this.setData({
        items: res.data.objects,
      });
     },
     (error) => {
       console.log("Error!", error);
     });

     const currentUser = wx.getStorageSync('user');
    if (currentUser) {
      this.setData({
        currentUser: currentUser,
      })
    }

    


     
     
    },

    userInfoHandler: function(data) {
      wx.BaaS.auth.loginWithWechat(data).then(user => {
        this.setData({
          currentUser: user,
        })
          console.log('user', user);
        }, err => {
          console.log("It's an error!", error)
      })
    },
  
  
  goToRestaurant: function(e){
    wx.navigateTo ({
      url: `details?id=${e.currentTarget.id}`,
  });
    
  },

  
  
  
})
