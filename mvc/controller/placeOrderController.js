import {item_db} from "../db/db.js";
import {ItemModel} from "../model/itemModel.js";

import {customer_db} from "../db/db.js";
import {CustomerModel} from "../model/customerModel.js";

import {order_db} from "../db/db.js";
import {OrderModel} from "../model/placeOrderModel.js";

let customerIdCB = $('#order_customer_id');
let orderId=$('#order_id');
let customerName=$('#order_customer_name');
let total=$('#total');
let discountInput = $('#discount');
let subTotalInput = $('#sub_total');
let cashInput=$('#Cash');
let balanceInput=$('#balance');


let itemIdCB = $('#order_item_code');
let itemName=$('#order_item_name');
let price=$('#order_price');
let qtyOnHand=$('#qty_on_hand');
let qty=$('#getQty');


let submitBtn=$('#purchase_btn');

let add = $('#order_add_btn');
let updateBtn2=$('#order_update_btn');
let removeBtn2=$('#order_delete_btn');
let resetItemDetails=$('#order_reset_btn');











$('#nav-place-order').on('click', function() {
    resetItemDetails.click();
    updateBtn2.prop("disabled",true);
    removeBtn2.prop("disabled",true);
    generateCurrentDate();
    /*searchField.attr("placeholder", "Search Order Id Here");*/

});
function generateCurrentDate(){
    $("#order_date").val(new Date().toISOString().slice(0, 10));
}

add.on("click", function () {
    let itemCodeValue = itemIdCB.val();
    let qtyValue = parseInt(qty.val());

    if (qtyOnHand.val() >= qtyValue) {
        let itemNameValue = itemName.val();
        let priceValue = price.val();
        let qtyOnHandValue = qtyOnHand.val();

        /*Add a new item to the items array*/
        items.push({
            itemCode: itemCodeValue,
            itemName: itemNameValue,
            priceValue: priceValue,
            qtyOnHand: qtyOnHandValue,
            qtyValue: qtyValue
        });

        /*Populate the Item table*/
        populateItemTable();

        /*Reset the item details*/
        resetItemDetails.click();
    } else {
        showValidationError('Invalid Input', 'Out of stock');
    }

    total.val(calculateTotal());

});

function showValidationError(title, text) {
    Swal.fire({
        icon: 'error',
        title: title,
        text: text,
        footer: '<a href="">Why do I have this issue?</a>'
    });
}

function populateItemTable() {
    $('tbody').eq(3).empty();
    items.map((item) => {
        $('tbody').eq(3).append(
            `<tr>
                <th scope="row">${item.itemCode}</th>
                <td>${item.itemName}</td>
                <td>${item.priceValue}</td>
                <td>${item.qtyOnHand}</td>
                <td>${item.qtyValue}</td>
            </tr>`
        );
    });
}

function calculateTotal() {
    let total = 0;
    items.forEach((item) => {
        total += item.priceValue * item.qtyValue;
    });
    return total;
}

resetItemDetails.on("click", function () {
    itemIdCB.val('Select Item Code');
    qty.val('');
    itemName.val('');
    price.val('');
    qtyOnHand.val('');
    updateBtn2.prop("disabled", true);
    removeBtn2.prop("disabled",true);
    add.prop("disabled", false);
});

