/*
 * @name 开发中用到的插件
 * @auther hulanyu
 */

const devTools = {
	/**
	* @func: logError
	* @desc: 打印错误信息
	* @param msg     {String}   错误信息详情
	* @author hulanyu
	* @version 1.0.0
	*/
	logError: function (msg) {
		msg = '%c ' + msg;
		var style = 'border: 1px solid #fbd9d0; padding: 8px 48px 8px 16px; background-color: #fdece8; color: #495060; border-radius: 6px;'
		console.log(msg, style)
	},
	/**
	* @func: logWarning
	* @desc: 打印警告信息
	* @param msg     {String}   警告信息详情
	* @author hulanyu
	* @version 1.0.0
	*/
	logWarning: function (msg) {
		msg = '%c ' + msg;
		var style = 'border: 1px solid #ffebcc; padding: 8px 48px 8px 16px; background-color: #fff5e6; color: #495060; border-radius: 6px;'
		console.log(msg, style)
	}
}

export default devTools