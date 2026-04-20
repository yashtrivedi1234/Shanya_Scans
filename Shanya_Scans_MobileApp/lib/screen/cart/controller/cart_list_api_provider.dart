import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shanya_scans/screen/order/model/OrderItem.dart';
import 'package:shanya_scans/ui_helper/snack_bar.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../../ui_helper/storage_helper.dart';


class CartProvider with ChangeNotifier {
  List<OrderItem> _cartItems = [];
  final StorageHelper _storageHelper = StorageHelper();
  List<OrderItem> get cartItems => _cartItems;
  bool get isCartEmpty => _cartItems.isEmpty;

  /// **Initialize Cart (Load from Storage)**
  CartProvider() {
    _initializeCart();
  }

  Future<void> _initializeCart() async {
    await loadCartItems();
  }

  // 🟢 Add Item to Cart
  void addToCart(BuildContext context, OrderItem item) {
    int index = _cartItems.indexWhere((element) => element.id == item.id);

    if (index != -1) {
      _cartItems[index] = OrderItem(
        id: item.id,
        name: item.name,
        category: item.category,
        price: item.price,
        imageUrl: item.imageUrl,
        packageDetail: item.packageDetail,
        orderType: item.orderType,
        quantity: _cartItems[index].quantity + 1,
      );
    } else {
      _cartItems.add(item);
    }

    saveCartItems(); // Save updated cart
    notifyListeners();
    // ✅ Show Snackbar from Helper
    showCustomSnackbarHelper.showSnackbar(
      context: context,
      message: "${item.name} added to your cart!",
      duration: Duration(seconds: 2),
    );
  }

  // 🟢 Increase Quantity of an Item
  void increaseQuantity(BuildContext context, String id) {
    int index = _cartItems.indexWhere((item) => item.id == id);

    if (index != -1) {
      if (_cartItems[index].quantity < 5) {
        _cartItems[index] = OrderItem(
          id: _cartItems[index].id,
          name: _cartItems[index].name,
          category: _cartItems[index].category,
          price: _cartItems[index].price,
          imageUrl: _cartItems[index].imageUrl,
          packageDetail: _cartItems[index].packageDetail,
          orderType: _cartItems[index].orderType,
          quantity: _cartItems[index].quantity + 1,
        );

        saveCartItems(); // Save updated cart
        notifyListeners();
      } else {
        // Show Snackbar when quantity exceeds 5
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
              content: Text("You can't add more than 5 items."),
              duration: Duration(seconds: 2)),
        );
      }

      // saveCartItems(); // Save updated cart
      // notifyListeners();
    }
  }

  // 🟢 Decrease Quantity of an Item
  void decreaseQuantity(BuildContext context, String id) {
    int index = _cartItems.indexWhere((item) => item.id == id);
    if (index != -1 && _cartItems[index].quantity > 1) {
      _cartItems[index] = OrderItem(
        id: _cartItems[index].id,
        name: _cartItems[index].name,
        category: _cartItems[index].category,
        price: _cartItems[index].price,
        imageUrl: _cartItems[index].imageUrl,
        packageDetail: _cartItems[index].packageDetail,
        orderType: _cartItems[index].orderType,
        quantity: _cartItems[index].quantity - 1,
      );

      saveCartItems(); // Save updated cart
      notifyListeners();
    } else if (index != -1 && _cartItems[index].quantity == 1) {
      // Remove item if quantity reaches 0
      // removeFromCart(null, id);
      OrderItem? removedItem = _cartItems.firstWhere((item) => item.id == id,
          orElse: () => OrderItem.empty());
      _cartItems.removeWhere((item) => item.id == id);
      saveCartItems(); // Save updated cart
      notifyListeners();
    }
  }

  // 🟢 Save Cart to SharedPreferences
  Future<void> saveCartItems() async {
    final prefs = await SharedPreferences.getInstance();
    final userId = StorageHelper().getUserId();
    final key = 'cart_items$userId'; // User-specific key
    final String encodedData =  jsonEncode(_cartItems.map((item) => item.toJson()).toList());
    await prefs.setString(key, encodedData);
  }

  // 🟢 Load Cart from SharedPreferences
  Future<void> loadCartItems() async {
    final prefs = await SharedPreferences.getInstance();
    final userId = StorageHelper().getUserId();
    final key = 'cart_items$userId';
    final cartData = prefs.getString(key);

    if (cartData != null) {
      final List<dynamic> decodedData = jsonDecode(cartData);
      _cartItems = decodedData.map((item) => OrderItem.fromJson(item)).toList();
    }else {
      _cartItems = [];
      print("No cart found for user $userId");
    }
    notifyListeners();
  }

  // 🟢 Remove Item from Cart
  void removeFromCart(BuildContext context, String id) {
    OrderItem? removedItem = _cartItems.firstWhere((item) => item.id == id,
        orElse: () => OrderItem.empty());
    _cartItems.removeWhere((item) => item.id == id);
    saveCartItems(); // Save updated cart
    notifyListeners();

    if (removedItem.id.isNotEmpty) {
      showCustomSnackbarHelper.showSnackbar(
        context: context,
        backgroundColor: Colors.red,
        message: "${removedItem.name} removed from cart ",
        duration: Duration(seconds: 2),
      );
    }
  }

  // 🟢 Completely Clear Cart (List + SharedPreferences)
  Future<void> clearCartAll() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('cart_items');   // <-- VERY IMPORTANT
    _cartItems.clear();
    notifyListeners();
  }


  // 🟢 Clear Cart
  void clearCart(BuildContext context) async {
    await clearCartAll(); // <-- update here
    // _cartItems.clear();
    // saveCartItems(); // Save updated cart
    // notifyListeners();
    showCustomSnackbarHelper.showSnackbar(
      context: context,
      message: "Cart has been cleared 🗑️",
      duration: Duration(seconds: 2),
    );
  }
  // 🟢 Clear Cart on LOGOUT (Without Snackbar)
  Future<void> clearOnLogout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('cart_items');   // DELETE cart from storage
    _cartItems.clear();                 // CLEAR in-memory cart
    notifyListeners();
  }


  // 🟢 Get Total Amount
  double get totalAmount {
    return _cartItems.fold(
        0.0, (sum, item) => sum + (item.price * item.quantity));
  }
}
