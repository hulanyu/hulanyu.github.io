/*
 * @name 全局插件
 * @auther Janber
 * @created 18-04-12
 */

import axios from 'axios'

import devTools from './devTools.js'
import QUERY_API from '@server-config'

const util = {
	/**
	* @func: query
	* @desc: 通用请求
	* @param url     {String}   请求路径
	* @param api     {String}   请求服务器地址
	* @param param   {Object}   请求参数(serviceUrl, httpType, apiModule, ...otherParams)
	* @param cb      {Function} 请求成功回调函数
	* @returns promise
	* @author hulanyu
	* @version 1.0.0
	*/
	query: function(param, successCB, failureCB) {
		// 判断参数完整性
		if (!param.api || !param.url) {
			devTools.logError('need params  @url or @api')
			return
		}
		let no_tips = false;

		// 数据返回后全局提升开关
		if (param.NO_TIPS) {
			no_tips = true;
			delete param.NO_TIPS;
		}

		// 全局loading是否显示
		if (param.NO_Loading) {
			delete param.NO_Loading
		} else {
			util.setLoading(true);
		}

    // 判断请求方法
    let http_type = param.http_type || 'post'
    delete param.http_type

		// 拼接请求地址
		const url = `${QUERY_API[param.api]}${param.url}`
    if (http_type === 'get') {
      delete param.url
      delete param.api
      var promise_ =  axios.get(url, {params: param}).then(function(res){
        const response = res.data || { errMsg: '操作失败' };
        util.setLoading(false)
        if (response.result && response.result === 'true') {
          successCB && successCB(response.data);
        } else {
          if (response.errCode === '1014') {
            location.reload();
          }
          if (!no_tips) {
            ViewUtil.error(response.errMsg || '操作失败');
          }
          if (failureCB) {
            failureCB( response )
          }
        }
      });
      return promise_
    } else {
      var promise_ =  axios.post(url, param).then(function(res){
        const response = res.data || { errMsg: '操作失败' };
        util.setLoading(false)
        if (response.result && response.result === 'true') {
          successCB && successCB(response.data);
        } else {
          if (response.errCode === '1014') {
            location.reload();
          }
          if (!no_tips) {
            ViewUtil.error(response.errMsg || '操作失败');
          }
          if (failureCB) {
            failureCB( response )
          }
        }
      });
      return promise_
    }
	},

	/**
	* @func: setLoading
	* @desc: 设置全局loading状态
	* @param show     {Boolean}   是否显示loading
	* @returns null
	* @author hulanyu
	* @version 1.0.0
	*/
	setLoading: function(show) {
		show = show || false;
		show && (document.querySelector("#loading").style.display = "inherit");
		!show && (document.querySelector("#loading").style.display = "none");
	},

	/**
	* @func: validatePhone
	* @desc: 验证是否为电话号码
	* @param value     {Number}   待验证数据
	* @returns null
	* @author hulanyu
	* @version 1.0.0
	*/
	validatePhone: function(value) {
		return new RegExp(/^[1][0-90]{10}$/).test(value)
	},

    /**
    * @func: validateLetterAndNumber
    * @desc: 校验只能为字母及数字
    * @param value     {Str}   待验证密码串
    * @returns Boolean
    * @author hulanyu
    * @version 1.0.0
    */
    validateLetterAndNumber: function(value) {
      const rule_3 = new RegExp(/^[0-9a-zA-Z]+$/)
      if (rule_3.test(value)) {
        return true
      }
      return false
    },
	/**
	* @func: dateFormat
	* @desc: 日期格式化方法
	* @param date 待格式化日期
	* @param fmt  格式。 yyyy-MM-dd   yyyy-MM-dd HH:mm:ss
	* @returns str
	* @author hulanyu
	* @version 1.0.0
	*/
	dateFormat(date, fmt) {
		date = date? new Date(date) : new Date();
		fmt = fmt || 'yyyy-MM-dd';
		let o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
	},

  /**
  * @func: selectFile
  * @desc: 选择文件
  * @param param {file_type: '文件类型匹配(jpg-png)', max_size: '文件大小限制(M)', single: '是否单选'}
  * @param cb 上传成功回调函数
  * @returns void
  * @author hulanyu
  * @version 1.0.0
  */
  selectFile(param, cb) {
    const $upload = $('#uploadFileInput');
    $upload.removeAttr('accept');
    $upload.removeAttr('multiple');
    let _default = {
      file_type: 'jpg-jpeg-png-svg-pdf',
      max_size: 10,
      single: false
    };
    let params = $.extend(true, _default, param);

    let file_type = params.file_type.split('-');
    let accept_str = [];
    const file_MIME_map = {
      jpg: 'image/jpeg',
      bmp: 'image/bmp',
      ico: 'image/x-icon',
      jpeg: 'image/jpeg',
      png: 'image/png',
      svg: 'image/svg+xml',
      gif: 'image/gif',
      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ppt: 'application/vnd.ms-powerpoint',
      pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      xls: 'application/vnd.ms-excel',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      dwg: '.dwg',
      zip: 'application/zip',
      rar: 'application/x-rar-compressed'
    }
    accept_str = file_type.map(type => file_MIME_map[type])
    
    $upload.attr('accept', accept_str.join(','));

    !params.single && ($upload.attr('multiple', 'multiple'));

    $upload.val('');
    $upload.unbind().change((e)=>{
      if (e.target.files.length == 0) {
        return
      }
      cb && cb(e.target.files)
    });
    $upload.click();
  },
  /**
  * @func: bytesToSize
  * @desc: 文件大小显示
  * @param bytes 文件字节数
  * @returns str
  * @author hulanyu
  * @version 1.0.0
  */
  bytesToSize(bytes) {
    if (bytes === 0) {
      return '0 B'
    }
    let k = 1000;
    let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i = Math.floor(Math.log(bytes) / Math.log(k));

    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
  },
  /**
  * @func: getFileType
  * @desc: 获取文件类型
  * @param file
  * @returns str
  * @author hulanyu
  * @version 1.0.0
  */
  getFileType(file) {
    let startIndex = file.name.lastIndexOf('.')
    return file.name.substring(startIndex + 1, file.name.length)
  },
  /**
  * @func: dataURL2File
  * @desc: base64转File
  * @param
  * @returns str
  * @author hulanyu
  * @version 1.0.0
  */
  dataURL2File(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
    while(n--){
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, {type:mime})
  },
  /**
  * @func: randomString
  * @desc: 生成随机串
  * @param
  * @returns str
  * @author hulanyu
  * @version 1.0.0
  */
  randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    var maxPos = $chars.length;
    var str = '';
    for (let i = 0; i < len; i++) {
      str += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
  　return str;
  }
}

export default util
