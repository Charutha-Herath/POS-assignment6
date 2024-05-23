import {item_db} from "../db/db.js";
import {ItemModel} from "../model/itemModel.js";

import {customer_db} from "../db/db.js";
import {CustomerModel} from "../model/customerModel.js";

import {order_db} from "../db/db.js";
import {OrderModel} from "../model/placeOrderModel";

let customerIdCB = $('#order_customer_id');
let itemIdCB = $('#item_code1');
let orderId=$('#order_id');
let itemName=$('#item_name1');
let price=$('#price1');
let qtyOnHand=$('#qty_on_hand');
let qty=$('#getQty');
let customerName=$('#customer_name1');
let total=$('#total');
let discountInput = $('#discount');
let subTotalInput = $('#sub_total');
let cashInput=$('#Cash');
let balanceInput=$('#balance');