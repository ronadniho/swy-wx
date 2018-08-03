//全局公共函数
var Base64 = require('base64.js');
var __GlobalInfo = require('config.js');

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//用于判断空，Undefined String Array Object
function isBlank(str) {
  if (Object.prototype.toString.call(str) === '[object Undefined]') {//空
    return true
  }
  else if (
    Object.prototype.toString.call(str) === '[object String]' ||
    Object.prototype.toString.call(str) === '[object Array]') { //字条串或数组
    return str.length == 0 ? true : false
  }
  else if (Object.prototype.toString.call(str) === '[object Object]') {
    return JSON.stringify(str) == '{}' ? true : false
  }
  else {
    return true
  }
}
function returnFloat(value) {
  var value = Math.round(parseFloat(value) * 10) / 10;
  var xsd = value.toString().split(".");
  if (xsd.length == 1) {
    value = value.toString() + ".0";
    return value;
  }
  if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      value = value.toString();
    }
    return value;
  }
}

// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  })
}

var getServerData = (obj, api, callback, method) => {
  method = method || 'POST';
  var data = null, error = null;
  wx.request({
    method: method,
    header: {
      'content-type': 'application/json', // 默认值
      'Cookie': wx.getStorageSync('sessionId')
    },
    url: __GlobalInfo.postUrl + api,
    data: obj,
    dataType: 'json',
    success: function (response) {
      var result = null;
      if (response.statusCode === 200) {
        if (response.data && response.data.error) {
          //showModel("错误提示", response.data.error[0].error);
        }
        if (callback) {
          callback(response.data);
        }
      } else {
        //showModel("错误提示", "请求数据失败");//=======参数：" + JSON.stringify(obj) + "=======接口url：" + api
      }
    },
    fail: function (response) {
      console.log(response.statusCode, response.errMsg);
      //showModel("错误提示", "请求数据失败");//=======参数：" + JSON.stringify(obj) + "=======接口url：" + api
    }
  })
}

var secondToDate = (result) => {
  var h = Math.floor(result / 3600);
  var m = Math.floor((result / 60 % 60));
  var s = Math.floor((result % 60));
  return result = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "")  + s + "";
}

var Guid = function (format) {
  function Guid(g) {
    var arr = new Array(); //存放32位数值的数组
    if (typeof (g) == "string") { //如果构造函数的参数为字符串
      InitByString(arr, g);
    }

    else {
      InitByOther(arr);
    }
    //返回一个值，该值指示 Guid 的两个实例是否表示同一个值。
    this.Equals = function (o) {
      if (o && o.IsGuid) {
        return this.ToString() == o.ToString();
      }
      else {
        return false;
      }

    }

    //Guid对象的标记
    this.IsGuid = function () { }
    //返回 Guid 类的此实例值的 String 表示形式。
    this.ToString = function (format) {
      if (typeof (format) == "string") {
        if (format == "N" || format == "D" || format == "B" || format == "P") {
          return ToStringWithFormat(arr, format);
        }
        else {
          return ToStringWithFormat(arr, "D");
        }

      }

      else {
        return ToStringWithFormat(arr, "D");
      }

    }

    //由字符串加载
    function InitByString(arr, g) {
      g = g.replace(/\{|\(|\)|\}|-/g, "");
      g = g.toLowerCase();
      if (g.length != 32 || g.search(/[^0-9,a-f]/i) != -1) {
        InitByOther(arr);
      }
      else {
        var temp = g.split("");
        for (var i = 0; i < temp.length; i++) {
          arr.push(temp[i]);
        }
        //                for (var i = 0; i < g.length; i++) {
        //                    var chat = g[i] || g.substr(i, 1)
        //                    arr.push(chat);
        //                }
      }
    }

    //由其他类型加载

    function InitByOther(arr) {
      var i = 32;
      while (i--) {
        arr.push("0");
      }
    }

    /*

    根据所提供的格式说明符，返回此 Guid 实例值的 String 表示形式。

    N  32 位： xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    D  由连字符分隔的 32 位数字 xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx 

    B  括在大括号中、由连字符分隔的 32 位数字：{xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx} 

    P  括在圆括号中、由连字符分隔的 32 位数字：(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx) 

    */
    function ToStringWithFormat(arr, format) {
      switch (format) {
        case "N":
          return arr.toString().replace(/,/g, "");
        case "D":
          var str = arr.slice(0, 8) + "-" + arr.slice(8, 12) + "-" + arr.slice(12, 16) + "-" + arr.slice(16, 20) + "-" + arr.slice(20, 32);
          str = str.replace(/,/g, "");
          return str;
        case "B":
          var str = ToStringWithFormat(arr, "D");
          str = "{" + str + "}";
          return str;
        case "P":
          var str = ToStringWithFormat(arr, "D");
          str = "(" + str + ")";
          return str;
        default:
          return new Guid();
      }

    }

  }

  //Guid 类的默认实例，其值保证均为零。
  Guid.Empty = new Guid();
  //初始化 Guid 类的一个新实例。
  Guid.NewGuid = function () {
    var g = "";
    var i = 32;
    while (i--) {
      g += Math.floor(Math.random() * 16.0).toString(16);
    }
    return new Guid(g);
  }
  format = format || 'n';
  return Guid.NewGuid().ToString(format.toUpperCase());
}

module.exports = {
  formatTime: formatTime,
  isBlank: isBlank,
  getServerData: getServerData,
  returnFloat: returnFloat,
  secondToDate: secondToDate,
  showModel: showModel,
  Guid: Guid
}
