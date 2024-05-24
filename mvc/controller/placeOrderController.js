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


let items = [];










$('#nav-place-order').on('click', function() {
    resetItemDetails.click();
    updateBtn2.prop("disabled",true);
    removeBtn2.prop("disabled",true);
    generateCurrentDate();
    populateItemIDs();
    /*searchField.attr("placeholder", "Search Order Id Here");*/

});
function generateCurrentDate(){
    $("#order_date").val(new Date().toISOString().slice(0, 10));
}


function populateItemIDs() {

    // Clear existing options except the default one
    itemIdCB.find("option:not(:first-child)").remove();

    // Iterate through the customerArray and add options to the select element
    for (let i = 0; i < item_db.length; i++) {
        itemIdCB.append($("<option>", {
            value: item_db[i].item_code,
            text: item_db[i].item_code
        }));
    }
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
            getQty: qtyValue
        });

        console.log("Item array : ",items);

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
    $('tbody').eq(0).empty();

    console.log("Items x array : ",items);

    items.map((item) => {
        $('tbody').eq(0).append(
            `<tr>
                <th scope="row">${item.itemCode}</th>
                <td>${item.itemName}</td>
                <td>${item.priceValue}</td>
                <td>${item.qtyOnHand}</td>
                <td>${item.getQty}</td>
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

itemIdCB.on("change", function() {
    // Capture the selected value in a variable
    let selectedValue = $(this).val();

    let itemObj = $.grep(item_db, function(item) {
        return item.item_code === selectedValue;
    });

    if (itemObj.length > 0) {
        // Access the first element in the filtered array
        itemName.val(itemObj[0].item_name); // Assuming there is an 'item_name' property
        price.val(itemObj[0].price);
        qtyOnHand.val(itemObj[0].qty_on_hand);
    }

    // Check if the item is already in the items array
    let existingItem = items.find(item => item.itemCode === selectedValue);

    if (existingItem) {
        updateBtn2.prop("disabled", false);
        removeBtn2.prop("disabled",false);
        add.prop("disabled", true);
        qty.val(existingItem.qtyValue);
    }
});

$('#item-order-table').on('click', 'tbody tr', function() {

    let itemCodeValue = $(this).find('th').text();
    let itemNameValue = $(this).find('td:eq(0)').text();
    let priceValue = $(this).find('td:eq(1)').text();
    let qtyOnHandValue = $(this).find('td:eq(2)').text();
    let qtyValue=$(this).find('td:eq(3)').text();

    itemIdCB.val(itemCodeValue);
    itemName.val(itemNameValue);
    price.val(priceValue);
    qtyOnHand.val(qtyOnHandValue);
    qty.val(qtyValue);

    updateBtn2.prop("disabled", false);
    removeBtn2.prop("disabled",false);
    add.prop("disabled", true);


});

/*
resetBtn.on("click", function () {
    // Reset the form fields to their initial state
    generateCurrentDate();
    populateCustomerIDs();
    populateItemIDs();
    orderId.val(generateOrderId());
    $("#total").val('');       // Reset the total
    $("#discount").val('');    // Reset the discount
    $("#Cash").val('');        // Reset the cash input
    customerName.val('');
    itemName.val('');
    price.val('');
    qtyOnHand.val('');
    total.val('');
    discountInput.val('');
    cashInput.val('');
    subTotalInput.val('');
    balanceInput.val('');

    /!*Clear the items array*!/
    items = [];

    /!*Clear the item order table*!/
    $("#item-order-table tbody").empty();

    updateBtn.prop("disabled", true);
    deleteBtn.prop("disabled", true);
    submitBtn.prop("disabled",false);

});*/
