import {customer_db} from "../db/db.js";
import {CustomerModel} from "../model/customerModel.js";

let submit = $('#btn-customer-add').eq(0);
let update_btn = $('#btn-customer-update').eq(0);
let delete_btn = $('#btn-customer-delete').eq(0);
let reset = $('#btn-customer-reset').eq(0);

let customer_id = $('#customer_id');
let name = $('#customer_name');
let address = $('#address');
let contact = $('#contact');

let searchBtn=$('#search');
let searchField=$('#searchField');






$('#nav-customer').on('click', function() {
    customer_id.val(generateCustomerId());
    /*populateCustomerTable();
    delete_btn.prop("disabled", true);
    update.prop("disabled", true);
    searchField.attr("placeholder", "Search Customer Here");*/
});

function generateCustomerId() {
    let highestCustId = 0;

    for (let i = 0; i < customer_db.length; i++) {
        // Extract the numeric part of the item code
        const numericPart = parseInt(customer_db[i].customer_id.split('-')[1]);

        // Check if the numeric part is greater than the current highest
        if (!isNaN(numericPart) && numericPart > highestCustId) {
            highestCustId = numericPart;
        }
    }

    // Increment the highest numeric part and format as "item-XXX"
    return `cust-${String(highestCustId + 1).padStart(3, '0')}`;
}

function resetColumns() {
    reset.click();
    customer_id.val(generateCustomerId());
    delete_btn.prop("disabled", true);
    update_btn.prop("disabled", true);
    submit.prop("disabled",false);
}

reset.on('click', function(e) {
    e.preventDefault();
    customer_id.val(generateCustomerId());
    name.val('');
    address.val('');
    contact.val('');
    email.val('');
    submit.prop("disabled", false);
    delete_btn.prop("disabled", true);
    update_btn.prop("disabled", true);
});