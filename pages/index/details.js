// pages/index/details.js
Page({
  data: {
    image: {
      title: "Loading...",
    },
    items: [{ id: 1, text: "Loading..." }],
    comments: [],
    text: ""
  },

  /**
   * Component methods
   */
  methods: {

  },
  onLoad: function(options) {
    const Restaurant = new wx.BaaS.TableObject("Restaurant_submission");
    const RestaurantReview= new wx.BaaS.TableObject("restaurant_reviews");

    
    Restaurant.get(options.id).then((res)  => {
      console.log("detail page result", res);
      this.setData({Restaurant: res.data,
      });
      
    });

    let query = new wx.BaaS.Query();
    query.compare("restaurant_id", "=", options.id);

    RestaurantReview.setQuery(query).find().then((res)  => {
      console.log("detail page result", res);
      this.setData({
        comments: res.data.objects,
      });
      
    });
    
  },

  postStory:function(event){
    console.log(event);
    const comment = event.detail.value.comment;
 
    const page = this;

    const Restaurant_review = new wx.BaaS.TableObject('restaurant_reviews');
    let restaurant_review = Restaurant_review.create();
    
    let data ={
      comments: comment,
      restaurant_id: page.data.Restaurant.id
    }

    restaurant_review.set(data).save().then(res => {
      // success
      console.log(res)
      let query = new wx.BaaS.Query();
      query.compare("restaurant_id", "=", page.data.Restaurant.id);

    Restaurant_review.setQuery(query).find().then((res)  => {
      console.log("detail page result", res);
      this.setData({
        comments: res.data.objects,
      });
      
    });
    }, err => {
      console.log("error", err)
    })

  }
})
