/* eslint-disable */

import {Tree} from 'antd'
import React from 'react'

// 递归遍历Json数据生成树节点
export function renderTreeNodes(data, layer) {
    const TreeNode = Tree.TreeNode
    if (!data) {
        return
    }
    return data.map((item, i) => {
        if (item.children) {
            // console.log(layer + "-" + i)
            return (
                <TreeNode title={item.name} value={item.id} key={`${layer}-${i}`} dataRef={item}>
                    {renderTreeNodes(item.children, `${layer}-${i}`)}
                </TreeNode>
            )
        }
        // console.log(layer + "-" + i)
        return <TreeNode {...item} title={item.name} value={item.id} key={`${layer}-${i}`} dataRef={item}/>
    })
}

// 审批类型
export function getAuditType(type) {
    const config = {
        1: '费用报销',
        2: '外出出差申请',
        3: '招待费用申请',
        4: '付款申请',
        5: '预借款申请',
        6: '其他费用申请',
    }
    return config[type] || ''
}

// 数字转换成大写汉字
export function digitUppercase(n) {
    var fraction = ['角', '分'];
    var digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
    ];
    var unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    var head = n < 0 ? '欠' : '';
    n = Math.abs(n);
    var s = '';
    for (var i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(shiftRight(n, 1 + i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(shiftLeft(n, 1));
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
};

// 向右移位
function shiftRight(number, digit) {
    digit = parseInt(digit, 10);
    var value = number.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + digit) : digit))
}
// 向左移位
function shiftLeft(number, digit) {
    digit = parseInt(digit, 10);
    var value = number.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] - digit) : -digit))
}

/**
 * 判断浏览器版本
 * @returns {*}  -1，不是ie浏览器。11，IE11。
 * @constructor
 */
export function getIEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return 7;
        } else if (fIEVersion == 8) {
            return 8;
        } else if (fIEVersion == 9) {
            return 9;
        } else if (fIEVersion == 10) {
            return 10;
        } else {
            return 6; //IE版本<=7
        }
    } else if (isEdge) {
        return 'edge'; //edge
    } else if (isIE11) {
        return 11; //IE11
    } else {
        return -1; //不是ie浏览器
    }
}