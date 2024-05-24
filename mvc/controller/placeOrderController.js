import {item_db} from "../db/db.js";
import {ItemModel} from "../model/itemModel.js";

import {customer_db} from "../db/db.js";
import {CustomerModel} from "../model/customerModel.js";

import {order_db} from "../db/db.js";
import {OrderModel} from "../model/placeOrderModel";

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
let removeBtn=$('#order_delete_btn');
let resetItemDetails=$('#order_reset_btn');

