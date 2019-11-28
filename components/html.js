import { COMPANY_PHOTO_URL } from '../utility/constants';
import { getPercentage } from '../utility/helpers';

export const topLeft = (item) => {
    let v_total_pcm = 0;
    let v_total_ptd = 0;

    return (`
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <title>PAYSLIP </title>
        <style>
            html {
                width: 100%;
            }
    
            @page {
                margin: 0px;
            }
    
            body {
                margin: 0px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
    
            #data { 
                background-color: #fff;
                width: 90vw;
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                border: 1px solid black;
                border-radius: 10px;
                border-top-left-radius: 100px;
            }
    
            table tr td {
                padding-bottom: 2px !important;
                font-size: 22px;
                margin-bottom: 1px !important;
            }

            #table {
                width: 80%;
            }

            #watermark {
                position: fixed;
                opacity: 0.3;
                filter: alpha(opacity=30); /* For IE8 and earlier */
                bottom:   10cm;
                left:     5.5cm;
                width:    8cm;
                height:   8cm;
                z-index:  -1000;
            }
        </style>
    </head>
    
    <body>
        <div id="data">
            <br>
            <table border=0 id="table">
                <tr>
                    <td colspan="8" style="padding:1px;text-align:center;font-weight:bold;font-size:28px;">
                        <h3>${item.company.company_name || ''}</h3>
                    </td>
                </tr>
                <tr>
                    <td colspan="6">
                        <img src="${COMPANY_PHOTO_URL + item.company.logo}" style="max-height: 80px; max-width: 180px" />
                    </td>
                    <td>
                        <span style='font-weight:bold;font-size:24px;color:#8b2a2d;'>PAYSLIP</span>
                        <span style='font-size:21px;font-weight:bold;'> ${item.date}</span>
                        <br />
                    </td>
                </tr>
                <tr>
                    <td>
                        <table style="font-size:21px;">
                            <tr>
                                <td colspan="7">
                                    <b style="text-transform: uppercase; font-size: 23px">${item.info.employee.firstname || ''} ${item.info.employee.middlename || ''} ${item.info.employee.lastname || ''}</b>
                                </td>
                            </tr>
                            <tr>
                                <td>Position:</td>
                                <td colspan="3"> ${item.info.employee.position || ''}</td>
                            </tr>
                            <tr>
                                <td>Department:</td>
                                <td colspan="3">${item.info.department || ''}</td>
                            </tr>
                            <tr>
                                <td>Location:</td>
                                <td colspan="3">${item.info.location || ''}</td>
                            </tr>
                            <tr>
                                <td>Staff Code:</td>
                                <td colspan="3"> ${item.info.employee.staff_no || ''}</td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <div style="clear: both"></div>
                <div class="row" style="padding-bottom: 20px">
                    <table style="font-size:11pt; float: left; margin-left: 25px; width: 80%" border=0>
                        <tr>
                            <td>&nbsp;</td>
                            <td align='right' style="font-size: 23px;">
                                <h5>Current ${item.currency ? item.currency.name : 'NGN'}</h5>
                            </td>
                            <td align='right' style="font-size: 23px;">
                                <h5>YTD ${item.currency ? item.currency.name : 'NGN'}</h5>
                            </td>
                        </tr>
                        ${Object.keys(item.payments).map(key => {
                            if (item.payments[key] > 0) {
                                return '<tr><td>' + key + '</td>' + (item.pcm.payment[key] ? '<td align="right"> ' + getPercentage(item.pcm.payment[key], 100) + ' </td>' : '<td align="right"> 0.00 </td>') + '<td align="right">' + getPercentage(item.payments[key], 100) + '</td> </tr>';
                            }
                        }).join('')}
                        <tr style="color:green">
                            <td><b>Total Gross Payable (a)</b></td>
                            <td align='right'><b> ${ getPercentage(item.pcm.total_gross_payable, 100)}</b></td>
                            <td align='right'><b> ${ getPercentage(item.ptd.total_gross_payable, 100)}</b></td>
                        </tr>
                        <tr>
                            <td>Less: Total Tax Reliefs</td>
                            <td align='right'><b> ${ getPercentage(item.pcm.total_tax_relief, 100)}</b></td>
                            <td align='right'><b> ${ getPercentage(item.ptd.total_tax_relief, 100)}</b></td>
                        </tr>
                        <tr style="color:green">
                            <td>Taxable Pay</td>
                            <td align='right'><b> ${ getPercentage(item.pcm.taxable_pay, 100)}</b></td>
                            <td align='right'><b> ${ getPercentage(item.ptd.taxable_pay, 100)}</b></td>
                        </tr>
                        <tr style="color:#8b2a2d">
                            <td><b>Deductions:</b></td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        ${Object.keys(item.deductions).map(key => {
                            if (item.deductions[key] > 0) {
                                return (key === 'Payee' ? '<tr><td> PAYE</td>' : '<tr><td>' + key + '</td>') + (item.pcm.deduction[key] ? "<td align='right'> " + getPercentage(item.pcm.deduction[key], 100) + ' </td>' : "<td align='right'> 0.00 </td>") + "<td align='right'>" + getPercentage(item.deductions[key], 100) + '</td> </tr>';
                            }
                        }).join('')}
                        <tr style="color:#8b2a2d">
                            <td><b>Total Deductions (b)</b></td>
                            <td align='right'><b> ${ getPercentage(item.pcm.total_deduction, 100)}</b></td>
                            <td align='right'><b> ${ getPercentage(item.ptd.total_deduction, 100)}</b></td>
                        </tr>
                        ${(Object.keys(item.other_payments).length !== 0 && item.other_payments.constructor === Object) ? (`
                            <tr style="color:green">
                                <td><strong>Other Payments:</strong></td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            ${Object.keys(item.other_payments).map(key => (item.other_payments[key] > 0 ? ('<tr><td>' + key + '</td>' + (item.pcm.other_payments[key] ? ("<td align='right'> " + getPercentage(item.pcm.other_payments[key], 100) + ' </td>') : "<td align='right'> 0.00 </td>") + "<td align='right'>" + getPercentage(item.other_payments[key], 100) + '</td> </tr>') : '')).join('')}
                            <tr style="color:green">
                                <td><b>Total Other Payments(c)</b></td>
                                <td align='right'><b>${getPercentage(item.pcm.total_other_payments, 100)}</b></td>
                                <td align='right'><b>${getPercentage(item.ptd.total_other_payments, 100)}</b></td>
                            </tr>
                            <tr style="color:green">
                                <td><strong> Net Salary ((a - b) + c)</strong></td>
                                <td align='right'><b>${getPercentage(item.pcm.net_pay, 100)}</b></td>
                                <td align='right'><b>${getPercentage(item.ptd.net_pay, 100)}</b></td>
                            </tr>
                        `) : (`
                            <tr style="color:green">
                                <td><strong> Net Salary (a - b)</strong></td>
                                <td align='right'><b> ${getPercentage(item.pcm.net_pay, 100)}</b></td>
                                <td align='right'><b> ${getPercentage(item.ptd.net_pay, 100)}</b></td>
                            </tr>
                        `)}
                        ${item.disbursement_variance.length <= 0 ? `
                            <tr style="color:green">
                                <td><b>Payment Advice:</b></td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td><b>NGN</b></td>
                                <td align='right'><b>${getPercentage(item.pcm.net_pay, 100)}</b></td>
                                <td align='right'><b>${getPercentage(item.ptd.net_pay, 100)}</b></td>
                            </tr>
                            <tr style="color:green">
                                <td><b>Total</b></td>
                                <td align='right'><b>${getPercentage(item.pcm.net_pay, 100)}</b></td>
                                <td align='right'><b>${getPercentage(item.ptd.net_pay, 100)}</b></td>
                            </tr>` : `${Object.keys(item.disbursement_variance).map(key =>
                                `<tr>
                                ${() => {
                                    v_total_pcm += item.pcm.disbursement_variance[key].total;
                                    v_total_ptd += item.disbursement_variance[key].total;
                                }}            
                                    <td>${key}</td>
                                    ${item.pcm.disbursement_variance[key] ? `<td align="right"><b>${getPercentage(item.pcm.disbursement_variance[key].total, 100)}</b></td>` :
                                    '<td align="right"><b>0.00</b></td>'}
                                    <td align="right"><b>${getPercentage(item.disbursement_variance[key].total, 100)}</b></td>
                                </tr>
                                <tr>
                                    <th style="font-size: 20px">Details</th>
                                    <th align='right'>Rate(NGN)</th>
                                    <th style="font-size: 20px">NGN(equ)</th>
                                </tr>
                                <tr>
                                ${Object.keys(item.disbursement_variance[key].details).map(details =>
                                    Object.keys(details).map(detail =>
                                        `<td>&nbsp;</td>
                                        <td align='right'><b>${getPercentage(detail.actual, 100)}</b></td>
                                        <td align='right'><b>${getPercentage(detail.rate, 100)}</b></td>`
                                    ).join('')
                                ).join('')}
                            </tr>`).join('')}
                            <tr>
                                <td><b>NGN</b></td>
                                <td align='right'><b>${getPercentage(item.pcm.net_pay - v_total_pcm, 100)}</b></td>
                                <td align='right'><b>${getPercentage(item.ptd.net_pay - v_total_ptd, 100)}</b></td>
                            </tr>
                            <tr style="color:green">
                                <td><b>Total</b></td>
                                <td align='right'><b>${getPercentage(item.pcm.net_pay, 100)}</b></td>
                                <td align='right'><b>${getPercentage(item.ptd.net_pay, 100)}</b></td>
                            </tr>`}
                            <tr>
                                <td><strong> Effective Tax Rate</strong></td>
                                <td align='right'><b>${getPercentage(item.pcm.deduction.Payee / item.pcm.total_gross_payable * 100, 100)}%</b></td>
                                <td align='right'><b>${getPercentage(item.deductions.Payee / item.ptd.total_gross_payable * 100, 100)}%</b></td>
                            </tr>
                        </table>
                        <br/><br/><br/>
                        <div style="clearfix: both;"></div>
                    </div>
                </table>
            </div>
            <a href="#" style='font-size:15px;font-weight:bold; color: red; position: fixed; bottom: 10px; left: 40px;'>Generated  at ${new Date(Date.now())}</a>
        </body>
    </html>`);
};

export const topRight = (item) => {
    let v_total_pcm = 0;
    let v_total_ptd = 0;

    return (`
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <title>PAYSLIP </title>
        <style>
            html {
                width: 100%;
            }
    
            @page {
                margin: 0px;
            }
    
            body {
                margin: 0px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
    
            #data { 
                background-color: #fff;
                width: 90vw;
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                border: 1px solid black;
                border-radius: 10px;
                border-top-left-radius: 100px;
            }
    
            table tr td {
                padding-bottom: 2px !important;
                font-size: 22px;
                margin-bottom: 1px !important;
            }

            #table {
                width: 80%;
            }

            #watermark {
                position: fixed;
                opacity: 0.3;
                filter: alpha(opacity=30); /* For IE8 and earlier */
                bottom:   10cm;
                left:     5.5cm;
                width:    8cm;
                height:   8cm;
                z-index:  -1000;
            }
        </style>
    </head>
    
    <body>
        <div id="data">
            <br>
            <table border=0 id="table">
                <tr>
                    <td colspan="8" style="padding:1px;text-align:center;font-weight:bold;font-size:28px;">
                        <h3>${item.company.company_name || ''}</h3>
                    </td>
                </tr>
                <tr>
                    <td colspan="6">
                        <span style='font-weight:bold;font-size:24px;color:#8b2a2d;'>PAYSLIP</span>
                        <span style='font-size:21px;font-weight:bold;'> ${item.date}</span>
                        <br />
                    </td>
                    <td>
                        <img src="${COMPANY_PHOTO_URL + item.company.logo}" style="max-height: 80px; max-width: 180px; float: right" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <table style="font-size:21px;">
                            <tr>
                                <td colspan="7">
                                    <b style="text-transform: uppercase; font-size: 23px">${item.info.employee.firstname || ''} ${item.info.employee.middlename || ''} ${item.info.employee.lastname || ''}</b>
                                </td>
                            </tr>
                            <tr>
                                <td>Position:</td>
                                <td colspan="3"> ${item.info.employee.position || ''}</td>
                            </tr>
                            <tr>
                                <td>Department:</td>
                                <td colspan="3">${item.info.department || ''}</td>
                            </tr>
                            <tr>
                                <td>Location:</td>
                                <td colspan="3">${item.info.location || ''}</td>
                            </tr>
                            <tr>
                                <td>Staff Code:</td>
                                <td colspan="3"> ${item.info.employee.staff_no || ''}</td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <div style="clear: both"></div>
                <div class="row" style="padding-bottom: 20px">
                    <table style="font-size:11pt; float: left; margin-left: 25px; width: 80%" border=0>
                        <tr>
                            <td>&nbsp;</td>
                            <td align='right' style="font-size: 23px;">
                                <h5>Current ${item.currency ? item.currency.name : 'NGN'}</h5>
                            </td>
                            <td align='right' style="font-size: 23px;">
                                <h5>YTD ${item.currency ? item.currency.name : 'NGN'}</h5>
                            </td>
                        </tr>
                        ${Object.keys(item.payments).map(key => {
                            if (item.payments[key] > 0) {
                                return '<tr><td>' + key + '</td>' + (item.pcm.payment[key] ? '<td align="right"> ' + getPercentage(item.pcm.payment[key], 100) + ' </td>' : '<td align="right"> 0.00 </td>') + '<td align="right">' + getPercentage(item.payments[key], 100) + '</td> </tr>';
                            }
                        }).join('')}
                        <tr style="color:green">
                            <td><b>Total Gross Payable (a)</b></td>
                            <td align='right'><b> ${ getPercentage(item.pcm.total_gross_payable, 100)}</b></td>
                            <td align='right'><b> ${ getPercentage(item.ptd.total_gross_payable, 100)}</b></td>
                        </tr>
                        <tr>
                            <td>Less: Total Tax Reliefs</td>
                            <td align='right'><b> ${ getPercentage(item.pcm.total_tax_relief, 100)}</b></td>
                            <td align='right'><b> ${ getPercentage(item.ptd.total_tax_relief, 100)}</b></td>
                        </tr>
                        <tr style="color:green">
                            <td>Taxable Pay</td>
                            <td align='right'><b> ${ getPercentage(item.pcm.taxable_pay, 100)}</b></td>
                            <td align='right'><b> ${ getPercentage(item.ptd.taxable_pay, 100)}</b></td>
                        </tr>
                        <tr style="color:#8b2a2d">
                            <td><b>Deductions:</b></td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        ${Object.keys(item.deductions).map(key => {
                            if (item.deductions[key] > 0) {
                                return (key === 'Payee' ? '<tr><td> PAYE</td>' : '<tr><td>' + key + '</td>') + (item.pcm.deduction[key] ? "<td align='right'> " + getPercentage(item.pcm.deduction[key], 100) + ' </td>' : "<td align='right'> 0.00 </td>") + "<td align='right'>" + getPercentage(item.deductions[key], 100) + '</td> </tr>';
                            }
                        }).join('')}
                        <tr style="color:#8b2a2d">
                            <td><b>Total Deductions (b)</b></td>
                            <td align='right'><b> ${ getPercentage(item.pcm.total_deduction, 100)}</b></td>
                            <td align='right'><b> ${ getPercentage(item.ptd.total_deduction, 100)}</b></td>
                        </tr>
                        ${(Object.keys(item.other_payments).length !== 0 && item.other_payments.constructor === Object) ? (`
                            <tr style="color:green">
                                <td><strong>Other Payments:</strong></td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            ${Object.keys(item.other_payments).map(key => (item.other_payments[key] > 0 ? ('<tr><td>' + key + '</td>' + (item.pcm.other_payments[key] ? ("<td align='right'> " + getPercentage(item.pcm.other_payments[key], 100) + ' </td>') : "<td align='right'> 0.00 </td>") + "<td align='right'>" + getPercentage(item.other_payments[key], 100) + '</td> </tr>') : '')).join('')}
                            <tr style="color:green">
                                <td><b>Total Other Payments(c)</b></td>
                                <td align='right'><b>${getPercentage(item.pcm.total_other_payments, 100)}</b></td>
                                <td align='right'><b>${getPercentage(item.ptd.total_other_payments, 100)}</b></td>
                            </tr>
                            <tr style="color:green">
                                <td><strong> Net Salary ((a - b) + c)</strong></td>
                                <td align='right'><b>${getPercentage(item.pcm.net_pay, 100)}</b></td>
                                <td align='right'><b>${getPercentage(item.ptd.net_pay, 100)}</b></td>
                            </tr>
                        `) : (`
                            <tr style="color:green">
                                <td><strong> Net Salary (a - b)</strong></td>
                                <td align='right'><b> ${getPercentage(item.pcm.net_pay, 100)}</b></td>
                                <td align='right'><b> ${getPercentage(item.ptd.net_pay, 100)}</b></td>
                            </tr>
                        `)}
                        ${item.disbursement_variance.length <= 0 ? `
                            <tr style="color:green">
                                <td><b>Payment Advice:</b></td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td><b>NGN</b></td>
                                <td align='right'><b>${getPercentage(item.pcm.net_pay, 100)}</b></td>
                                <td align='right'><b>${getPercentage(item.ptd.net_pay, 100)}</b></td>
                            </tr>
                            <tr style="color:green">
                                <td><b>Total</b></td>
                                <td align='right'><b>${getPercentage(item.pcm.net_pay, 100)}</b></td>
                                <td align='right'><b>${getPercentage(item.ptd.net_pay, 100)}</b></td>
                            </tr>` : `${Object.keys(item.disbursement_variance).map(key =>
                                `<tr>
                                ${() => {
                                    v_total_pcm += item.pcm.disbursement_variance[key].total;
                                    v_total_ptd += item.disbursement_variance[key].total;
                                }}            
                                    <td>${key}</td>
                                    ${item.pcm.disbursement_variance[key] ? `<td align="right"><b>${getPercentage(item.pcm.disbursement_variance[key].total, 100)}</b></td>` :
                                    '<td align="right"><b>0.00</b></td>'}
                                    <td align="right"><b>${getPercentage(item.disbursement_variance[key].total, 100)}</b></td>
                                </tr>
                                <tr>
                                    <th style="font-size: 20px">Details</th>
                                    <th align='right'>Rate(NGN)</th>
                                    <th style="font-size: 20px">NGN(equ)</th>
                                </tr>
                                <tr>
                                ${Object.keys(item.disbursement_variance[key].details).map(details =>
                                    Object.keys(details).map(detail =>
                                        `<td>&nbsp;</td>
                                        <td align='right'><b>${getPercentage(detail.actual, 100)}</b></td>
                                        <td align='right'><b>${getPercentage(detail.rate, 100)}</b></td>`
                                    ).join('')
                                ).join('')}
                            </tr>`).join('')}
                            <tr>
                                <td><b>NGN</b></td>
                                <td align='right'><b>${getPercentage(item.pcm.net_pay - v_total_pcm, 100)}</b></td>
                                <td align='right'><b>${getPercentage(item.ptd.net_pay - v_total_ptd, 100)}</b></td>
                            </tr>
                            <tr style="color:green">
                                <td><b>Total</b></td>
                                <td align='right'><b>${getPercentage(item.pcm.net_pay, 100)}</b></td>
                                <td align='right'><b>${getPercentage(item.ptd.net_pay, 100)}</b></td>
                            </tr>`}
                            <tr>
                                <td><strong> Effective Tax Rate</strong></td>
                                <td align='right'><b>${getPercentage(item.pcm.deduction.Payee / item.pcm.total_gross_payable * 100, 100)}%</b></td>
                                <td align='right'><b>${getPercentage(item.deductions.Payee / item.ptd.total_gross_payable * 100, 100)}%</b></td>
                            </tr>
                        </table>
                        <br/><br/><br/>
                        <div style="clearfix: both;"></div>
                    </div>
                </table>
            </div>
            <a href="#" style='font-size:15px;font-weight:bold; color: red; position: fixed; bottom: 10px; left: 40px;'>Generated  at ${new Date(Date.now())}</a>
        </body>
    </html>`);
};

export const bottomLeft = (item) => {
    let v_total_pcm = 0;
    let v_total_ptd = 0;

    return (`
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <title>PAYSLIP </title>
        <style>
            html {
                width: 100%;
            }
    
            @page {
                margin: 0px;
            }
    
            body {
                margin: 0px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
    
            #data { 
                background-color: #fff;
                width: 90vw;
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                border: 1px solid black;
                border-radius: 10px;
                border-top-left-radius: 100px;
            }
    
            table tr td {
                padding-bottom: 2px !important;
                font-size: 22px;
                margin-bottom: 1px !important;
            }

            #table {
                width: 80%;
            }

            #watermark {
                position: fixed;
                opacity: 0.3;
                filter: alpha(opacity=30); /* For IE8 and earlier */
                bottom:   10cm;
                left:     5.5cm;
                width:    8cm;
                height:   8cm;
                z-index:  -1000;
            }
        </style>
    </head>
    
    <body>
        <div id="data">
            <br>
            <table border=0 id="table">
                <tr>
                    <td colspan="8" style="padding:1px;text-align:center;font-weight:bold;font-size:28px;">
                        <h3>${item.company.company_name || ''}</h3>
                    </td>
                </tr>
                <tr>
                    <td colspan="8">
                        <span style='font-weight:bold;font-size:24px;color:#8b2a2d;'>PAYSLIP</span>
                        <span style='font-size:21px;font-weight:bold;'> ${item.date}</span>
                        <br />
                    </td>
                </tr>
                <tr>
                    <td>
                        <table style="font-size:21px;">
                            <tr>
                                <td colspan="7">
                                    <b style="text-transform: uppercase; font-size: 23px">${item.info.employee.firstname || ''} ${item.info.employee.middlename || ''} ${item.info.employee.lastname || ''}</b>
                                </td>
                            </tr>
                            <tr>
                                <td>Position:</td>
                                <td colspan="3"> ${item.info.employee.position || ''}</td>
                            </tr>
                            <tr>
                                <td>Department:</td>
                                <td colspan="3">${item.info.department || ''}</td>
                            </tr>
                            <tr>
                                <td>Location:</td>
                                <td colspan="3">${item.info.location || ''}</td>
                            </tr>
                            <tr>
                                <td>Staff Code:</td>
                                <td colspan="3"> ${item.info.employee.staff_no || ''}</td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <div style="clear: both"></div>
                <div class="row" style="padding-bottom: 20px">
                    <table style="font-size:11pt; float: left; margin-left: 25px; width: 80%" border=0>
                        <tr>
                            <td>&nbsp;</td>
                            <td align='right' style="font-size: 23px;">
                                <h5>Current ${item.currency ? item.currency.name : 'NGN'}</h5>
                            </td>
                            <td align='right' style="font-size: 23px;">
                                <h5>YTD ${item.currency ? item.currency.name : 'NGN'}</h5>
                            </td>
                        </tr>
                        ${Object.keys(item.payments).map(key => {
                            if (item.payments[key] > 0) {
                                return '<tr><td>' + key + '</td>' + (item.pcm.payment[key] ? '<td align="right"> ' + getPercentage(item.pcm.payment[key], 100) + ' </td>' : '<td align="right"> 0.00 </td>') + '<td align="right">' + getPercentage(item.payments[key], 100) + '</td> </tr>';
                            }
                        }).join('')}
                        <tr style="color:green">
                            <td><b>Total Gross Payable (a)</b></td>
                            <td align='right'><b> ${ getPercentage(item.pcm.total_gross_payable, 100)}</b></td>
                            <td align='right'><b> ${ getPercentage(item.ptd.total_gross_payable, 100)}</b></td>
                        </tr>
                        <tr>
                            <td>Less: Total Tax Reliefs</td>
                            <td align='right'><b> ${ getPercentage(item.pcm.total_tax_relief, 100)}</b></td>
                            <td align='right'><b> ${ getPercentage(item.ptd.total_tax_relief, 100)}</b></td>
                        </tr>
                        <tr style="color:green">
                            <td>Taxable Pay</td>
                            <td align='right'><b> ${ getPercentage(item.pcm.taxable_pay, 100)}</b></td>
                            <td align='right'><b> ${ getPercentage(item.ptd.taxable_pay, 100)}</b></td>
                        </tr>
                        <tr style="color:#8b2a2d">
                            <td><b>Deductions:</b></td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        ${Object.keys(item.deductions).map(key => {
                            if (item.deductions[key] > 0) {
                                return (key === 'Payee' ? '<tr><td> PAYE</td>' : '<tr><td>' + key + '</td>') + (item.pcm.deduction[key] ? "<td align='right'> " + getPercentage(item.pcm.deduction[key], 100) + ' </td>' : "<td align='right'> 0.00 </td>") + "<td align='right'>" + getPercentage(item.deductions[key], 100) + '</td> </tr>';
                            }
                        }).join('')}
                        <tr style="color:#8b2a2d">
                            <td><b>Total Deductions (b)</b></td>
                            <td align='right'><b> ${ getPercentage(item.pcm.total_deduction, 100)}</b></td>
                            <td align='right'><b> ${ getPercentage(item.ptd.total_deduction, 100)}</b></td>
                        </tr>
                        ${(Object.keys(item.other_payments).length !== 0 && item.other_payments.constructor === Object) ? (`
                            <tr style="color:green">
                                <td><strong>Other Payments:</strong></td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            ${Object.keys(item.other_payments).map(key => (item.other_payments[key] > 0 ? ('<tr><td>' + key + '</td>' + (item.pcm.other_payments[key] ? ("<td align='right'> " + getPercentage(item.pcm.other_payments[key], 100) + ' </td>') : "<td align='right'> 0.00 </td>") + "<td align='right'>" + getPercentage(item.other_payments[key], 100) + '</td> </tr>') : '')).join('')}
                            <tr style="color:green">
                                <td><b>Total Other Payments(c)</b></td>
                                <td align='right'><b>${getPercentage(item.pcm.total_other_payments, 100)}</b></td>
                                <td align='right'><b>${getPercentage(item.ptd.total_other_payments, 100)}</b></td>
                            </tr>
                            <tr style="color:green">
                                <td><strong> Net Salary ((a - b) + c)</strong></td>
                                <td align='right'><b>${getPercentage(item.pcm.net_pay, 100)}</b></td>
                                <td align='right'><b>${getPercentage(item.ptd.net_pay, 100)}</b></td>
                            </tr>
                        `) : (`
                            <tr style="color:green">
                                <td><strong> Net Salary (a - b)</strong></td>
                                <td align='right'><b> ${getPercentage(item.pcm.net_pay, 100)}</b></td>
                                <td align='right'><b> ${getPercentage(item.ptd.net_pay, 100)}</b></td>
                            </tr>
                        `)}
                        ${item.disbursement_variance.length <= 0 ? `
                            <tr style="color:green">
                                <td><b>Payment Advice:</b></td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td><b>NGN</b></td>
                                <td align='right'><b>${getPercentage(item.pcm.net_pay, 100)}</b></td>
                                <td align='right'><b>${getPercentage(item.ptd.net_pay, 100)}</b></td>
                            </tr>
                            <tr style="color:green">
                                <td><b>Total</b></td>
                                <td align='right'><b>${getPercentage(item.pcm.net_pay, 100)}</b></td>
                                <td align='right'><b>${getPercentage(item.ptd.net_pay, 100)}</b></td>
                            </tr>` : `${Object.keys(item.disbursement_variance).map(key =>
                                `<tr>
                                ${() => {
                                    v_total_pcm += item.pcm.disbursement_variance[key].total;
                                    v_total_ptd += item.disbursement_variance[key].total;
                                }}            
                                    <td>${key}</td>
                                    ${item.pcm.disbursement_variance[key] ? `<td align="right"><b>${getPercentage(item.pcm.disbursement_variance[key].total, 100)}</b></td>` :
                                    '<td align="right"><b>0.00</b></td>'}
                                    <td align="right"><b>${getPercentage(item.disbursement_variance[key].total, 100)}</b></td>
                                </tr>
                                <tr>
                                    <th style="font-size: 20px">Details</th>
                                    <th align='right'>Rate(NGN)</th>
                                    <th style="font-size: 20px">NGN(equ)</th>
                                </tr>
                                <tr>
                                ${Object.keys(item.disbursement_variance[key].details).map(details =>
                                    Object.keys(details).map(detail =>
                                        `<td>&nbsp;</td>
                                        <td align='right'><b>${getPercentage(detail.actual, 100)}</b></td>
                                        <td align='right'><b>${getPercentage(detail.rate, 100)}</b></td>`
                                    ).join('')
                                ).join('')}
                            </tr>`).join('')}
                            <tr>
                                <td><b>NGN</b></td>
                                <td align='right'><b>${getPercentage(item.pcm.net_pay - v_total_pcm, 100)}</b></td>
                                <td align='right'><b>${getPercentage(item.ptd.net_pay - v_total_ptd, 100)}</b></td>
                            </tr>
                            <tr style="color:green">
                                <td><b>Total</b></td>
                                <td align='right'><b>${getPercentage(item.pcm.net_pay, 100)}</b></td>
                                <td align='right'><b>${getPercentage(item.ptd.net_pay, 100)}</b></td>
                            </tr>`}
                            <tr>
                                <td><strong> Effective Tax Rate</strong></td>
                                <td align='right'><b>${getPercentage(item.pcm.deduction.Payee / item.pcm.total_gross_payable * 100, 100)}%</b></td>
                                <td align='right'><b>${getPercentage(item.deductions.Payee / item.ptd.total_gross_payable * 100, 100)}%</b></td>
                            </tr>
                        </table>
                        <br/><br/><br/>
                        <div style="clearfix: both;"></div>
                        <div style="width: 80%">
                            <img src="${COMPANY_PHOTO_URL + item.company.logo}" style="max-height: 80px; max-width: 100px;" />
                        </div>
                        <br />
                    </div>
                </table>
            </div>
            <a href="#" style='font-size:15px;font-weight:bold; color: red; position: fixed; bottom: 10px; left: 40px;'>Generated  at ${new Date(Date.now())}</a>
        </body>
    </html>`);
};

export const bottomRight = (item) => {
    let v_total_pcm = 0;
    let v_total_ptd = 0;

    return (`
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <title>PAYSLIP </title>
        <style>
            html {
                width: 100%;
            }
    
            @page {
                margin: 0px;
            }
    
            body {
                margin: 0px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
    
            #data { 
                background-color: #fff;
                width: 90vw;
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                border: 1px solid black;
                border-radius: 10px;
                border-top-left-radius: 100px;
            }
    
            table tr td {
                padding-bottom: 2px !important;
                font-size: 22px;
                margin-bottom: 1px !important;
            }

            #table {
                width: 80%;
            }

            #watermark {
                position: fixed;
                opacity: 0.3;
                filter: alpha(opacity=30); /* For IE8 and earlier */
                bottom:   10cm;
                left:     5.5cm;
                width:    8cm;
                height:   8cm;
                z-index:  -1000;
            }
        </style>
    </head>
    
    <body>
        <div id="data">
            <br>
            <table border=0 id="table">
                <tr>
                    <td colspan="8" style="padding:1px;text-align:center;font-weight:bold;font-size:28px;">
                        <h3>${item.company.company_name || ''}</h3>
                    </td>
                </tr>
                <tr>
                    <td colspan="8">
                        <span style='font-weight:bold;font-size:24px;color:#8b2a2d;'>PAYSLIP</span>
                        <span style='font-size:21px;font-weight:bold;'> ${item.date}</span>
                        <br />
                    </td>
                </tr>
                <tr>
                    <td>
                        <table style="font-size:21px;">
                            <tr>
                                <td colspan="7">
                                    <b style="text-transform: uppercase; font-size: 23px">${item.info.employee.firstname || ''} ${item.info.employee.middlename || ''} ${item.info.employee.lastname || ''}</b>
                                </td>
                            </tr>
                            <tr>
                                <td>Position:</td>
                                <td colspan="3"> ${item.info.employee.position || ''}</td>
                            </tr>
                            <tr>
                                <td>Department:</td>
                                <td colspan="3">${item.info.department || ''}</td>
                            </tr>
                            <tr>
                                <td>Location:</td>
                                <td colspan="3">${item.info.location || ''}</td>
                            </tr>
                            <tr>
                                <td>Staff Code:</td>
                                <td colspan="3"> ${item.info.employee.staff_no || ''}</td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <div style="clear: both"></div>
                <div class="row" style="padding-bottom: 20px">
                    <table style="font-size:11pt; float: left; margin-left: 25px; width: 80%" border=0>
                        <tr>
                            <td>&nbsp;</td>
                            <td align='right' style="font-size: 23px;">
                                <h5>Current ${item.currency ? item.currency.name : 'NGN'}</h5>
                            </td>
                            <td align='right' style="font-size: 23px;">
                                <h5>YTD ${item.currency ? item.currency.name : 'NGN'}</h5>
                            </td>
                        </tr>
                        ${Object.keys(item.payments).map(key => {
                            if (item.payments[key] > 0) {
                                return '<tr><td>' + key + '</td>' + (item.pcm.payment[key] ? '<td align="right"> ' + getPercentage(item.pcm.payment[key], 100) + ' </td>' : '<td align="right"> 0.00 </td>') + '<td align="right">' + getPercentage(item.payments[key], 100) + '</td> </tr>';
                            }
                        }).join('')}
                        <tr style="color:green">
                            <td><b>Total Gross Payable (a)</b></td>
                            <td align='right'><b> ${ getPercentage(item.pcm.total_gross_payable, 100)}</b></td>
                            <td align='right'><b> ${ getPercentage(item.ptd.total_gross_payable, 100)}</b></td>
                        </tr>
                        <tr>
                            <td>Less: Total Tax Reliefs</td>
                            <td align='right'><b> ${ getPercentage(item.pcm.total_tax_relief, 100)}</b></td>
                            <td align='right'><b> ${ getPercentage(item.ptd.total_tax_relief, 100)}</b></td>
                        </tr>
                        <tr style="color:green">
                            <td>Taxable Pay</td>
                            <td align='right'><b> ${ getPercentage(item.pcm.taxable_pay, 100)}</b></td>
                            <td align='right'><b> ${ getPercentage(item.ptd.taxable_pay, 100)}</b></td>
                        </tr>
                        <tr style="color:#8b2a2d">
                            <td><b>Deductions:</b></td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        ${Object.keys(item.deductions).map(key => {
                            if (item.deductions[key] > 0) {
                                return (key === 'Payee' ? '<tr><td> PAYE</td>' : '<tr><td>' + key + '</td>') + (item.pcm.deduction[key] ? "<td align='right'> " + getPercentage(item.pcm.deduction[key], 100) + ' </td>' : "<td align='right'> 0.00 </td>") + "<td align='right'>" + getPercentage(item.deductions[key], 100) + '</td> </tr>';
                            }
                        }).join('')}
                        <tr style="color:#8b2a2d">
                            <td><b>Total Deductions (b)</b></td>
                            <td align='right'><b> ${ getPercentage(item.pcm.total_deduction, 100)}</b></td>
                            <td align='right'><b> ${ getPercentage(item.ptd.total_deduction, 100)}</b></td>
                        </tr>
                        ${(Object.keys(item.other_payments).length !== 0 && item.other_payments.constructor === Object) ? (`
                            <tr style="color:green">
                                <td><strong>Other Payments:</strong></td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            ${Object.keys(item.other_payments).map(key => (item.other_payments[key] > 0 ? ('<tr><td>' + key + '</td>' + (item.pcm.other_payments[key] ? ("<td align='right'> " + getPercentage(item.pcm.other_payments[key], 100) + ' </td>') : "<td align='right'> 0.00 </td>") + "<td align='right'>" + getPercentage(item.other_payments[key], 100) + '</td> </tr>') : '')).join('')}
                            <tr style="color:green">
                                <td><b>Total Other Payments(c)</b></td>
                                <td align='right'><b>${getPercentage(item.pcm.total_other_payments, 100)}</b></td>
                                <td align='right'><b>${getPercentage(item.ptd.total_other_payments, 100)}</b></td>
                            </tr>
                            <tr style="color:green">
                                <td><strong> Net Salary ((a - b) + c)</strong></td>
                                <td align='right'><b>${getPercentage(item.pcm.net_pay, 100)}</b></td>
                                <td align='right'><b>${getPercentage(item.ptd.net_pay, 100)}</b></td>
                            </tr>
                        `) : (`
                            <tr style="color:green">
                                <td><strong> Net Salary (a - b)</strong></td>
                                <td align='right'><b> ${getPercentage(item.pcm.net_pay, 100)}</b></td>
                                <td align='right'><b> ${getPercentage(item.ptd.net_pay, 100)}</b></td>
                            </tr>
                        `)}
                        ${item.disbursement_variance.length <= 0 ? `
                            <tr style="color:green">
                                <td><b>Payment Advice:</b></td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td><b>NGN</b></td>
                                <td align='right'><b>${getPercentage(item.pcm.net_pay, 100)}</b></td>
                                <td align='right'><b>${getPercentage(item.ptd.net_pay, 100)}</b></td>
                            </tr>
                            <tr style="color:green">
                                <td><b>Total</b></td>
                                <td align='right'><b>${getPercentage(item.pcm.net_pay, 100)}</b></td>
                                <td align='right'><b>${getPercentage(item.ptd.net_pay, 100)}</b></td>
                            </tr>` : `${Object.keys(item.disbursement_variance).map(key =>
                                `<tr>
                                ${() => {
                                    v_total_pcm += item.pcm.disbursement_variance[key].total;
                                    v_total_ptd += item.disbursement_variance[key].total;
                                }}            
                                    <td>${key}</td>
                                    ${item.pcm.disbursement_variance[key] ? `<td align="right"><b>${getPercentage(item.pcm.disbursement_variance[key].total, 100)}</b></td>` :
                                    '<td align="right"><b>0.00</b></td>'}
                                    <td align="right"><b>${getPercentage(item.disbursement_variance[key].total, 100)}</b></td>
                                </tr>
                                <tr>
                                    <th style="font-size: 20px">Details</th>
                                    <th align='right'>Rate(NGN)</th>
                                    <th style="font-size: 20px">NGN(equ)</th>
                                </tr>
                                <tr>
                                ${Object.keys(item.disbursement_variance[key].details).map(details =>
                                    Object.keys(details).map(detail =>
                                        `<td>&nbsp;</td>
                                        <td align='right'><b>${getPercentage(detail.actual, 100)}</b></td>
                                        <td align='right'><b>${getPercentage(detail.rate, 100)}</b></td>`
                                    ).join('')
                                ).join('')}
                            </tr>`).join('')}
                            <tr>
                                <td><b>NGN</b></td>
                                <td align='right'><b>${getPercentage(item.pcm.net_pay - v_total_pcm, 100)}</b></td>
                                <td align='right'><b>${getPercentage(item.ptd.net_pay - v_total_ptd, 100)}</b></td>
                            </tr>
                            <tr style="color:green">
                                <td><b>Total</b></td>
                                <td align='right'><b>${getPercentage(item.pcm.net_pay, 100)}</b></td>
                                <td align='right'><b>${getPercentage(item.ptd.net_pay, 100)}</b></td>
                            </tr>`}
                            <tr>
                                <td><strong> Effective Tax Rate</strong></td>
                                <td align='right'><b>${getPercentage(item.pcm.deduction.Payee / item.pcm.total_gross_payable * 100, 100)}%</b></td>
                                <td align='right'><b>${getPercentage(item.deductions.Payee / item.ptd.total_gross_payable * 100, 100)}%</b></td>
                            </tr>
                        </table>
                        <br/><br/><br/>
                        <div style="clearfix: both;"></div>
                        <div style="width: 80%">
                            <img src="${COMPANY_PHOTO_URL + item.company.logo}" style="max-height: 80px; max-width: 100px; float: right" />
                        </div>
                        <br />
                    </div>
                </table>
            </div>
            <a href="#" style='font-size:15px;font-weight:bold; color: red; position: fixed; bottom: 10px; left: 40px;'>Generated  at ${new Date(Date.now())}</a>
        </body>
    </html>`);
};
