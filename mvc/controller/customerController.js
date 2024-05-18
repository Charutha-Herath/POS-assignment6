import {customer_db} from "../db/db.js";
import {CustomerModel} from "../model/customerModel";

let submit = $('#Customer .btn-success').eq(0);
let update = $('#Customer .btn-primary').eq(0);
let delete_btn = $('#Customer .btn-danger').eq(0);
let reset = $('#Customer .btn-warning').eq(0);

let customer_id = $('#customer_id');
let name = $('#customer_name');
let address = $('#address');
let contact = $('#contact');

let searchBtn=$('#search');
let searchField=$('#searchField');






$('#customer_page').on('click', function() {
    customer_id.val(generateCustomerId());
    populateCustomerTable();
    delete_btn.prop("disabled", true);
    update.prop("disabled", true);
    searchField.attr("placeholder", "Search Customer Here");
});