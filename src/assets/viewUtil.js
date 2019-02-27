/*
 * @name 全局插件
 * @auther hulanyu
 * @created 18-04-29
 */

// 这里引入element-ui
import { Message, MessageBox } from 'element-ui';

const viewUtil = {
  /**
  * @func: imgPreview
  * @desc: 图片预览
  * @param url     {String}    图片路径url
  * @author hulanyu
  * @version 1.0.0
  */
  imgPreview(url) {
    const img = document.createElement("img"); 
    img.src = url || '';
    const viewer = new Viewer(img, {
      inline: false,
      viewed: function() {
        viewer.zoomTo(1);
      }
    });
    viewer.show();
  },
  /**
  * @func: success
  * @desc: 全局成功提升
  * @param content  {String}    提示文本
  * @param duration {String}    图片路径url
  * @author hulanyu
  * @version 1.0.0
  */
  success(content, duration) {
    Message(
      { 
        type: 'success', 
        message: content || '',
        duration: duration || 2000, 
        iconClass: 'el-icon-circle-check' 
      }
    );
  },
  /**
  * @func: error
  * @desc: 全局失败提示
  * @param content  {String}    提示文本
  * @param duration {String}    图片路径url
  * @author janber
  * @version 1.0.0
  */
  error(content, duration) {
    Message(
      { 
        type: 'error', 
        message: content || '',
        duration: duration || 2000, 
        iconClass: 'el-icon-warning' 
      }
    );
  },
  /**
  * @func: Dialog
  * @desc: 弹窗信息
  * @param param     {Object}    title->标题 message->正文内容 noCancle->是否隐藏取消按钮
  * @param confirmCb {Function}  点击确定的回调函数
  * @param cancleCb  {Function}  点击取消的回调函数
  * @author hulanyu
  * @version 1.0.0
  */
  Dialog(param, confirmCb, cancleCb) {
    MessageBox({
      title: param.title || '--',
      message: param.message || '--',
      showCancelButton: !param.noCancle,
      closeOnClickModal: false,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      center: true
    }).then(action=>{
      confirmCb && confirmCb()
    }).catch(() => {
      cancleCb && cancleCb()
    });
  },
  
}

export default viewUtil