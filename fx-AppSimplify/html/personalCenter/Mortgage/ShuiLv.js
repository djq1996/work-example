//本金还款的月还款额(参数: 年利率 / 贷款总额 / 贷款总月份 / 贷款当前月0～length-1)
function getMonthMoney2(lilv, total, month, cur_month) {
    var lilv_month = (lilv / 12).toFixed(8);//月利率=年利率/月份
    //return total * lilv_month * Math.pow(1 + lilv_month, month) / ( Math.pow(1 + lilv_month, month) -1 );
    var benjin_money = total / month;//房价=贷款总额/月份
    return (total - benjin_money * cur_month) * lilv_month + benjin_money;//返回（（贷款总额-房价*贷款当前月）*月利率+房价）
}

//本息还款的月还款额(参数: 年利率/贷款总额/贷款总月份)
function getMonthMoney1(lilv, total, month) {
    var lilv_month = (lilv / 12).toFixed(8);//月利率

    var templilv = parseFloat(1) + parseFloat(lilv_month);

    var tempfullpower = Math.pow(templilv, month)

    return (total * lilv_month * tempfullpower)/(tempfullpower - 1)
    //return total * lilv_month * Math.pow(1 + lilv_month, month) / (Math.pow(1 + lilv_month, month) - 1);
    //等额本息计算公式：〔贷款本金×月利率×（1＋月利率）＾还款月数〕÷〔（1＋月利率）＾还款月数－1〕
}
/**
daikuan_total 贷款总额 混合之商业
lilv_sd 商业
lilv_gjj 公积金
years 年
daikuantype 贷款方式
type 1本金 0 本息
daik2 混合之公积金
*/
function ext_total(daikuan_total, lilv_sd, lilv_gjj, years, daikuantype, type, daik2) {//贷款总额，商业利率，公积金利率，贷款年限，还款类型，
    //console.info(lilv_sd);
    //console.info(lilv_gjj);
    var month = years * 12;//月
    //console.info("daikuan_total--" + daikuan_total);
    //console.info("lilv_sd--" + lilv_sd);
    //console.info("lilv_gjj--" + lilv_gjj);
    //console.info("years--" + years);
    //console.info("daikuantype--" + daikuantype);
    //console.info("type--" + type);
    //console.info("daik2--" + daik2);
    if (daikuantype == 3) {
        //--  组合型贷款(组合型贷款的计算，只和商业贷款额、和公积金贷款额有关，和按贷款总额计算无关)
        //贷款总额
        var total_sy = daik2;//商贷的钱
        var total_gjj = daikuan_total;//公积金贷款
        var daikuan_total = total_sy + total_gjj;
        var objArray = new Array();

        //1.本金还款
        //月还款
        if (type == 1) {
            var all_total2 = 0;
            var month_money2 = "";
            var sb = new Array();
            var n = 0;//第一个月还款
            var n1 = 0;//下个月还款
            var n2 = 0;
            for (j = 0; j < month; j++) {
                //调用函数计算: 本金月还款额
                huankuan = getMonthMoney2(lilv_sd, total_sy, month, j) + getMonthMoney2(lilv_gjj, total_gjj, month, j);
                //console.info( "月" + huankuan.toFixed(4));

                all_total2 += huankuan;
                huankuan = Math.round(huankuan * 100) / 100;
                month_money2 += (j + 1) + "月," + huankuan + "(元)\n";
                if (j <= 0) {
                    n = huankuan;
                }
                if (j <= 1) {
                    n1 = huankuan;
                    n2 = n - n1;
                }

                sb.push(huankuan, n2);
            }
            objArray[0] = Math.round(all_total2 * 100) / 100;//总还款
            objArray[1] = month;//月数
            objArray[2] = Math.round((all_total2 - daikuan_total) * 100) / 100;//支付利息款
            objArray[3] = sb[0];//月均还款
            objArray[4] = sb[3];//每月递减
        } else {
            //2.本息还款
            //月均还款
            var month_money1 = getMonthMoney1(lilv_sd, total_sy, month) + getMonthMoney1(lilv_gjj, total_gjj, month);//调用函数计算
            //console.info(j + "月" + month_money1.toFixed(4));

            //还款总额
            var all_total1 = month_money1 * month;
            //支付利息款
            objArray[0] = month_money1 * month;
            objArray[1] = month;//月数
            objArray[2] = Math.round((all_total1 - daikuan_total) * 100) / 100;//支付利息款
            objArray[3] = month_money1;//月均还款
        }
        return objArray;
    }
    else if (daikuantype == 1) {
        //console.info(daikuan_total);
        //公积金贷款
        var lilv = lilv_gjj //公积金
        var objArray = new Array();
        //1.本金还款
        //月还款
        if (type == 1) {
            var all_total2 = 0;
            var month_money2 = "";
            var n = 0;//第一个月还款
            var n1 = 0;//下个月还款
            var n2 = 0;
            var sb = new Array();
            for (j = 0; j < month; j++) {
                //调用函数计算: 本金月还款额
                huankuan = getMonthMoney2(lilv, daikuan_total, month, j);
                //console.info(huankuan);
                all_total2 += huankuan;
                huankuan = Math.round(huankuan * 100) / 100;
                month_money2 += (j + 1) + "yue," + huankuan + "(yuan)\n";//1(yue),111(yuan)
                if (j <= 0) {
                    n = huankuan;
                }
                if (j <= 1) {
                    n1 = huankuan;
                    n2 = n - n1;
                }
                sb.push(huankuan, n2);
            }
            //fmobj.month_money2.value = month_money2;
            //还款总额
            objArray[0] = Math.round(all_total2 * 100) / 100;//总还款
            objArray[1] = month;//月数
            objArray[2] = Math.round((all_total2 - daikuan_total) * 100) / 100;//支付利息款
            objArray[3] = sb[0];//月均还款
            objArray[4] = sb[3];//每月递减
        } else {
            //2.本息还款
            //月均还款
            var month_money1 = getMonthMoney1(lilv, daikuan_total, month);//调用函数计算
            //console.info("月" + month_money1.toFixed(4));

            var all_total1 = month_money1 * month;
            objArray[0] = month_money1 * month;
            objArray[1] = month;//月数
            objArray[2] = Math.round((all_total1 - daikuan_total) * 100) / 100;//支付利息款
            objArray[3] = month_money1;//月均还款
        }
        return objArray;
    }
    else if (daikuantype == 2) {
        var lilv = lilv_sd//得到利率 商业
        var objArray = new Array();
        //1.本金还款
        //月还款
        if (type == 1) {
            var all_total2 = 0;
            var month_money2 = "";
            var sb = new Array();
            var n = 0;//第一个月还款
            var n1 = 0;//下个月还款
            var n2 = 0;
            //console.info(daikuan_total)
            for (j = 0; j < month; j++) {
                //调用函数计算: 本金月还款额
                huankuan = getMonthMoney2(lilv, daikuan_total, month, j);
                console.info( "月" + huankuan.toFixed(4));
                all_total2 += huankuan;
                huankuan = Math.round(huankuan * 100) / 100;
                month_money2 += (j + 1) + "yue," + huankuan + "(yuan)\n";
                if (j <= 0) {
                    n = huankuan;
                }
                if (j <= 1) {
                    n1 = huankuan;
                    n2 = n - n1;
                }
                sb.push(huankuan, n2);
            }
            //还款总额
            objArray[0] = Math.round(all_total2 * 100) / 100;//总还款
            objArray[1] = month;//月数
            objArray[2] = Math.round((all_total2 - daikuan_total) * 100) / 100;//支付利息款
            objArray[3] = sb[0];//月均还款
            objArray[4] = sb[3];//每月递减
        } else {
            //2.本息还款
            //月均还款
            var month_money1 = getMonthMoney1(lilv, daikuan_total, month);//调用函数计算
            //console.info("月" + month_money1.toFixed(4));

            var all_total1 = month_money1 * month;
            objArray[0] = month_money1 * month;
            objArray[1] = month;//月数
            objArray[2] = Math.round((all_total1 - daikuan_total) * 100) / 100;//支付利息款
            objArray[3] = month_money1;//月均还款
        }
        return objArray;
    }
}
if ($("dengeben2").checked) {
    fmobj.fangkuan_total1.value = fmobj.fangkuan_total2.value;
    fmobj.daikuan_total1.value = fmobj.daikuan_total2.value;
    fmobj.all_total1.value = fmobj.all_total2.value;
    fmobj.accrual1.value = fmobj.accrual2.value;
    fmobj.money_first1.value = fmobj.money_first2.value;
    fmobj.month1.value = fmobj.month2.value;
    fmobj.month_money1.value = fmobj.month_money2.value;
}


function chanage_type_mm() {
    if ($("dengeben2").checked)
        $("type1_mm1").innerHTML = '&nbsp;&nbsp;月均金额：<textarea name="month_money1" rows="5" ></textarea>';
    else
        $("type1_mm1").innerHTML = '&nbsp;&nbsp;月均还款：<input name="month_money1" type="text" class="guestbook02" />元';
}
