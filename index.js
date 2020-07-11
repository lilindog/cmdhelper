/**
 * 命令行工具开发辅助工具函数集合 
 */;

module.exports = nameSpace = Object.create(null);

const select = require("./lib/select");

/**
 * 单选选择
 * 
 * @param {String} title 标题
 * @param {Array} options 选项数组，如: [{label: "选项", ...}, ...]
 * @param {Function} cb 选择确定回调函数，可选，没有则返回promise
 */
nameSpace["select"] = select;

/**
 * 确认
 * 
 * @param {String} title 标题文本
 * @param {Object} options 确定、取消显示文本，如：{confirmText: "", cancelText: ""}
 * @return {Promise} resove(boolean)
 */
nameSpace["confirm"] = async (title = "确定？", options = {confirmText: "确定", cancelText: "取消"}) => {
    const is = await select(title, [
        {label: options.confirmText},
        {label: options.cancelText}
    ]);
    return is.label === options.confirmText ? true : is.label === options.cancelText ? false : null;
}
    
