import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:razorpay_flutter/razorpay_flutter.dart';
import 'package:shanya_scans/screen/checkout/model/store_checkout_form_data_model.dart';
import 'package:shanya_scans/screen/order/model/OrderItem.dart';
import 'package:shanya_scans/ui_helper/snack_bar.dart';
import 'package:shanya_scans/ui_helper/storage_helper.dart';
import 'package:shanya_scans/util/StringUtils.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../../network_manager/api_error_handler.dart';
import '../../../network_manager/repository.dart';
import '../../order/model/CreateOrder2ModelResponse.dart';
import '../../order/screen/OrderSuccessScreen.dart';
import '../../order/screen/order_failed_screen.dart';
import '../model/payment_checkout_model.dart';

class CheckoutProvider with ChangeNotifier {
  final Repository _repository = Repository();
  List<OrderItem> _checkoutItems = [];
  StoreCheckoutFormDataModel? _formData;

  StoreCheckoutFormDataModel? get formData => _formData;

  bool _isLoading = false;
  String _errorMessage = "";
  String? _razorpayKey;

  late Razorpay _razorpay;

  PaymentCheckoutModel? _checkoutModel;
  PaymentCheckoutModel? get checkoutModel => _checkoutModel;
  CreateOrder2ModelResponse? _createOrderModelResponse;
  final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();

  String paymentStatus = '';

  CreateOrder2ModelResponse? get createOrderModelResponse =>  _createOrderModelResponse;
  List<OrderItem> get checkoutItems => _checkoutItems;
  bool get isCheckoutEmpty => _checkoutItems.isEmpty;
  bool get isLoading => _isLoading;
  String get errorMessage => _errorMessage;
  String? get razorpayKey => _razorpayKey;

  // jo ye maine saari files ka code diya hai to isme maine offer ka logic lagaya hia ki jo new user ko only  first order krne ke liye offer lagaya hai to isme problem ye hai ki jab new user registered ya login hota hai to jab vo honme screen per jaata hai to usko offer dialog to show hota ahi lekin jab vo first order ke liye checkout krta ahi to checkout screen per apply couopn content hai vo show nhi hota hai aisa kyu jabki usko jab first order ke liye checkout screen per apply coupon show hona chaiye only for first order to dekho ky problem hia kyu nhi show ho rha ahi aur jab tak vo first order na kre tab tak ye offer logic  baar baar shwo hona chahiye chahe vo app ko reinstall kre tab bhi iske liye ye jo logic hai usko order history list page per logic lagao ki agar koi bhi order nhi hat to ye offer logic chale

// Add these properties to CheckoutProvider class
  bool _isCouponApplied = false;
  double _couponDiscount = 200.0;
  bool _isFirstTimeUser = false;
  bool _isCheckingFirstTimeUser = true;

  bool get isCouponApplied => _isCouponApplied;
  double get couponDiscount => _couponDiscount;
  bool get isFirstTimeUser => _isFirstTimeUser;
  bool get isCheckingFirstTimeUser => _isCheckingFirstTimeUser;


  void reset() {
    _isLoading = false;
    notifyListeners();
  }

  void notiFylistener() {
    notifyListeners();
  }

  void setLoadingState(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void _setErrorState(String message) {
    _errorMessage = message;
    setLoadingState(false);
    notifyListeners();
  }



  // 🟢 Increase Quantity of an Item
  void increaseQuantity(BuildContext context, String id) {
    int index = _checkoutItems.indexWhere((item) => item.id == id);

    if (index != -1) {
      if (_checkoutItems[index].quantity < 5) {
        _checkoutItems[index] = OrderItem(
          id: _checkoutItems[index].id,
          name: _checkoutItems[index].name,
          category: _checkoutItems[index].category,
          price: _checkoutItems[index].price,
          imageUrl: _checkoutItems[index].imageUrl,
          orderType: _checkoutItems[index].orderType,
          packageDetail: _checkoutItems[index].packageDetail,
          quantity: _checkoutItems[index].quantity + 1,
        );

        saveCheckoutItems(); // Save updated cart
        notifyListeners();
      } else {
        // Show Snackbar when quantity exceeds 5
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
              content: Text("You can't add more than 5 items."),
              duration: Duration(seconds: 2)),
        );
      }

      saveCheckoutItems(); // Save updated cart
      notifyListeners();
    }
  }

  void decreaseQuantity(BuildContext context, String id, {bool isCheckoutPage = false}) {
    int index = _checkoutItems.indexWhere((item) => item.id == id);

    if (index != -1) {
      if (_checkoutItems[index].quantity > 1) {
        // Normal decrease
        _checkoutItems[index] = OrderItem(
          id: _checkoutItems[index].id,
          name: _checkoutItems[index].name,
          category: _checkoutItems[index].category,
          price: _checkoutItems[index].price,
          imageUrl: _checkoutItems[index].imageUrl,
          packageDetail: _checkoutItems[index].packageDetail,
          orderType: _checkoutItems[index].orderType,
          quantity: _checkoutItems[index].quantity - 1,
        );
      } else if (_checkoutItems.length > 1) {
        // Only remove if more than 1 item in cart
        OrderItem removedItem = _checkoutItems[index];
        _checkoutItems.removeAt(index);
        if (isCheckoutPage) {
          showCustomSnackbarHelper.showSnackbar(
            context: context,
            backgroundColor: Colors.red,
            message: "${removedItem.name} removed from checkout",
            duration: Duration(seconds: 2),
          );
        }
      } else {
        // Do nothing if only 1 item and quantity is 1
        // OR show message: "Cannot remove last item"
        if (isCheckoutPage) {
          showCustomSnackbarHelper.showSnackbar(
            context: context,
            backgroundColor: Colors.orange,
            message: "At least one item is required",
            duration: Duration(seconds: 2),
          );
        }
        return;
      }

      saveCheckoutItems();
      notifyListeners();
    }
  }



  // 🟢 Decrease Quantity of an Item
  // void decreaseQuantity(BuildContext context, String id, {bool isCheckoutPage = false}) {
  //   int index = _checkoutItems.indexWhere((item) => item.id == id);
  //   if (index != -1 && _checkoutItems[index].quantity > 1) {
  //     _checkoutItems[index] = OrderItem(
  //       id: _checkoutItems[index].id,
  //       name: _checkoutItems[index].name,
  //       category: _checkoutItems[index].category,
  //       price: _checkoutItems[index].price,
  //       imageUrl: _checkoutItems[index].imageUrl,
  //       orderType: _checkoutItems[index].orderType,
  //       packageDetail: _checkoutItems[index].packageDetail,
  //       quantity: _checkoutItems[index].quantity - 1,
  //     );
  //
  //     saveCheckoutItems(); // Save updated cart
  //     notifyListeners();
  //   } else if (index != -1 && _checkoutItems[index].quantity == 1) {
  //     // Remove item if quantity reaches 0
  //     // removeFromCart(null, id);
  //     if (!isCheckoutPage) {
  //       OrderItem? removedItem = _checkoutItems
  //           .firstWhere((item) => item.id == id, orElse: () => OrderItem.empty());
  //       _checkoutItems.removeWhere((item) => item.id == id);
  //       saveCheckoutItems(); // Save updated cart
  //       notifyListeners();
  //     }
  //
  //     // OrderItem? removedItem = _checkoutItems
  //     //     .firstWhere((item) => item.id == id, orElse: () => OrderItem.empty());
  //     // _checkoutItems.removeWhere((item) => item.id == id);
  //     // saveCheckoutItems(); // Save updated cart
  //     // notifyListeners();
  //   }
  // }

  // 🟢 Save Cart to SharedPreferences
  Future<void> saveCheckoutItems() async {
    final prefs = await SharedPreferences.getInstance();
    final userId = StorageHelper().getUserId();
    final key = 'checkout_items_$userId'; // User-specific key
    final String encodedData =jsonEncode(_checkoutItems.map((item) => item.toJson()).toList());
    await prefs.setString(key, encodedData);
    print("Saved cart for user $userId: ${_checkoutItems.length} items");
  }

  // 🟢 Load Cart from SharedPreferences
  Future<void> loadCheckoutItems() async {
    final prefs = await SharedPreferences.getInstance();
    final userId = StorageHelper().getUserId();
    final key = 'checkout_items_$userId';
    final cartData = prefs.getString(key);

    if (cartData != null) {
      final List<dynamic> decodedData = jsonDecode(cartData);
      _checkoutItems = decodedData.map((item) => OrderItem.fromJson(item)).toList();
      print("Loaded cart for user $userId: ${_checkoutItems.length} items");
    }else {
      _checkoutItems = [];
      print("No cart found for user $userId");
    }
    notifyListeners();
  }

  // 🟢 Add Item to Cart
  void addToCheckout(BuildContext context, OrderItem item) {
    int index = _checkoutItems.indexWhere((element) => element.id == item.id);

    if (index != -1) {
      _checkoutItems[index] = OrderItem(
        id: item.id,
        name: item.name,
        category: item.category,
        price: item.price,
        imageUrl: item.imageUrl,
        orderType: item.orderType,
        packageDetail: item.packageDetail,
        quantity: _checkoutItems[index].quantity + 1,
      );
    } else {
      _checkoutItems.clear(); // Clear previous checkout items
      _checkoutItems.add(item);
    }

    saveCheckoutItems(); // Save updated cart
    notifyListeners();
    // ✅ Show Snackbar from Helper
    // showCustomSnackbarHelper.showSnackbar(
    //   context: context,
    //   message: "${item.name} added to your cart!",
    //   duration: Duration(seconds: 2),
    // );
  }

  // 🟢 Add Multiple Items to Cart in CheckoutProvider
  void addMultipleToCheckout(BuildContext context, List<OrderItem> items) {
    for (var item in items) {
      int index = _checkoutItems.indexWhere((element) => element.id == item.id);

      if (index != -1) {
        _checkoutItems[index] = OrderItem(
          id: item.id,
          name: item.name,
          category: item.category,
          price: item.price,
          imageUrl: item.imageUrl,
          orderType: item.orderType,
          packageDetail: item.packageDetail,
          quantity: _checkoutItems[index].quantity + item.quantity,
        );
      } else {
        _checkoutItems.add(item);
      }
    }

    saveCheckoutItems(); // Save updated cart
    notifyListeners();

    // ✅ Show Snackbar
    showCustomSnackbarHelper.showSnackbar(
      context: context,
      message: "Items added to checkout!",
      duration: Duration(seconds: 2),
    );
  }

  // 🟢 Remove Item from Cart
  void removeFromCart(BuildContext context, String id) {
    OrderItem? removedItem = _checkoutItems.firstWhere((item) => item.id == id,
        orElse: () => OrderItem.empty());
    _checkoutItems.removeWhere((item) => item.id == id);
    saveCheckoutItems(); // Save updated cart
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

  void saveFormData({
    required String selectedDate,
    required String selectedTime,
    required String email,
    required String fullName,
    required String age,
    required String phone,
    required String altPhone,
    required String gender,
    required String address,
    required String pinCode,
    required String selectedPlace,
    required String addressType,
    required String bookingFor,
  }) {
    _formData = StoreCheckoutFormDataModel(
      selectedDate: selectedDate,
      selectedTime: selectedTime,
      email: email,
      fullName: fullName,
      age: age,
      phone: phone,
      altPhone: altPhone,
      gender: gender,
      cityAddress: address,
      pinCode: pinCode,
      place: selectedPlace,
      addressType: addressType,
      bookingFor: bookingFor,
    );
    notifyListeners();
  }

  Future<bool> createOrder(
      BuildContext context,
      String bookingDate,
      String bookingTime,
      String email,
      String name,
      String age,
      String phone,
      String altPhone,
      String gender,
      String cityState,
      String pinCode,
      String selectedPlace,
      String addressType) async {
    setLoadingState(true);
    _errorMessage = "";
    _createOrderModelResponse = null;

    try {
      // Convert order details list to JSON format
      // List<Map<String, dynamic>> orderDetailsJson = _checkoutItems.map((orderDetail) {
      //   return {
      //     "patientName": name,
      //     "patientAge": age,
      //     "patientGender": gender,
      //     "tests": _checkoutItems.map((test) {
      //       return {
      //         // "id": test.id,
      //         "name": test.name,
      //         "price": test.price,
      //         "category": test.category,
      //         "orderType": test.orderType,
      //         "quantity": test.quantity,
      //         "bookingDate": bookingDate,
      //         "bookingTime": bookingTime,
      //       };
      //     }).toList(),
      //   };
      // }).toList();

      // Convert checkout items into structured order details
      // Collect all tests for the single patient
      List<Map<String, dynamic>> tests = _checkoutItems.map((test) {
        return {
          "orderName": test.name, // Test Name
          "quantity": test.quantity,
          "category": test.category,
          "orderType": test.orderType,
          "orderPrice": test.price,
          "bookingDate": _formData!.selectedDate.toString(),
          "bookingTime":  _formData!.selectedTime.toString(),
        };
      }).toList();

      // Construct order details with patient info only once
      List<Map<String, dynamic>> orderDetailsJson = [
        {
          "patientName":  _formData!.fullName.toString(),
          "patientAge":  _formData!.age.toString(),
          "patientGender": StringUtils.toLowerCase( _formData!.gender.toString()),
          "tests": tests, // All tests for the patient
        }
      ];

      // Construct request body
      Map<String, dynamic> requestBody = {
        "email":  _formData!.email.toString(),
        "address":  _formData!.cityAddress.toString(),
        "selectedPlace":  _formData!.place.toString(),
        "addressType":  _formData!.addressType.toString(),
        "pinCode":  _formData!.pinCode.toString(),
        "phoneNumber":  _formData!.phone.toString(),
        "altPhoneNumber":  _formData!.altPhone.toString(),
        "orderDetails": orderDetailsJson,
      };

      // Debugging log
      print("bodyRequest => ${requestBody.toString()}");

      // Map<String, dynamic> requestBody = {
      //   "testName": testName,
      //   "bookingDate": bookingDate,
      //   "bookingTime": bookingTime,
      //   "category": category,
      //   "rate": rate,
      //   "email": email,
      //   "name": name,
      //   "age": age,
      //   "phone": phone,
      //   "altPhone": altPhone,
      //   "gender": gender,
      //   "cityState": cityState
      // };

      var response = await _repository.createOrderResponse(requestBody);

      print("bodyRequest=>${requestBody.toString()}");
      if (response.success == true && response.data != null) {
        print("✅ Order created successfully!");
        _createOrderModelResponse = response;
        setLoadingState(false);
        StorageHelper().setUserTestBookingAddress( _formData!.cityAddress.toString());
        StorageHelper().setUserTestBookingPhone( _formData!.phone.toString());
        StorageHelper().setUserTestBookingAltPhone( _formData!.altPhone.toString());

        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => OrderSuccessScreen()),
        );
        return true;
      } else {
        _setErrorState(response.message ?? "Failed to create order");
      }
    } on DioException catch (e) {
      String errorMessage = ApiErrorHandler.handleError(e);
      _setErrorState(errorMessage);
      print("⚠️ Order API Error: $errorMessage");
      showCustomSnackbarHelper.showSnackbar(
        context: context,
        message: errorMessage,
        backgroundColor: Colors.red,
        duration: Duration(seconds: 3),
      );
    }

    setLoadingState(false);
    return false;
  }

  // 🟢 Clear Cart
  void clearCheckout(BuildContext context)async {
    _checkoutItems.clear();
    await saveCheckoutItems(); // Save updated cart
    notifyListeners();
    showCustomSnackbarHelper.showSnackbar(
      context: context,
      message: "Order has  cleared",
      duration: Duration(seconds: 2),
    );
  }

  //  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Paymebt api ****************************************

  // 🟢 Get Total Amount
  double get totalAmount {
    return _checkoutItems.fold(
        0.0, (sum, item) => sum + ((item.price) * item.quantity));
  }

  //// Payment call
  Future<String?> fetchRazorpayKey() async {
    setLoadingState(true);
    // notifyListeners();
    final response = await _repository.getRazorPaymentKey();

    if (response["success"] == true) {
      _razorpayKey = response["key"];
      if (razorpayKey != null) {
        StorageHelper().setPaymentKey(razorpayKey.toString());
        return _razorpayKey;
      } else {
        _razorpayKey = null;
      }
      setLoadingState(false);
      // notifyListeners();
    }
  }

  initRazorpay(BuildContext context) async {
    _razorpay = Razorpay();
    // ✅ Context को pass करें payment handlers में
    _razorpay.on(Razorpay.EVENT_PAYMENT_SUCCESS, (response) => _handlePaymentSuccess(response, context));
    _razorpay.on(Razorpay.EVENT_PAYMENT_ERROR, (response) => _handlePaymentError(response, context));
    _razorpay.on(Razorpay.EVENT_EXTERNAL_WALLET, (response) => _handleExternalWallet(response, context));
    // Calculate total amount from cart in rupees
    // double totalAmount = this.totalAmount;
    // int totalInRupees = totalAmount.toInt();

    // Calculate total amount with coupon discount
    double totalAmount = totalAmountWithDiscount;
    int totalInRupees = totalAmount.toInt();

    createAndStartPayment(totalInRupees, "Book Test");
  }

  // Add this method to check first-time user status
// CheckoutProvider में इस method को update करें:


  // ✅ FIXED: Proper first-time user check with better error handling
  Future<void> checkFirstTimeUser() async {
    _isCheckingFirstTimeUser = true;
    notifyListeners();

    try {
      final storage = StorageHelper();
      await storage.init();

      // ✅ Get order count from SharedPreferences
      int orderCount = await storage.getOrderCount();

      // ✅ If order count is 0 = first time user, else not first time user
      _isFirstTimeUser = orderCount < 1;

      print("===========================================");
      print("✅ First-time user check completed");
      print("📊 Total orders completed: $orderCount");
      print("🎯 Is First Time User: $_isFirstTimeUser");
      print("===========================================");

    } catch (e) {
      print("❌ Error checking first time user: $e");
      _isFirstTimeUser = false; // Default to false on error
    } finally {
      _isCheckingFirstTimeUser = false;
      notifyListeners();
    }
  }

  // ✅ Method to apply coupon
  void applyCoupon() {
    print("🔍 Attempting to apply coupon...");
    print("   First time user: $_isFirstTimeUser");
    print("   Already applied: $_isCouponApplied");

    if (_isFirstTimeUser && !_isCouponApplied) {
      _isCouponApplied = true;
      print("✅ Coupon applied successfully!");
      notifyListeners();
    } else {
      print("⚠️ Cannot apply coupon:");
      if (!_isFirstTimeUser) print("   - Not a first-time user");
      if (_isCouponApplied) print("   - Coupon already applied");
    }
  }

  // ✅ Method to remove coupon
  void removeCoupon() {
    _isCouponApplied = false;
    print("✅ Coupon removed");
    notifyListeners();
  }


// Update the totalAmount getter to include coupon discount
  double get totalAmountWithDiscount {
    double total = _checkoutItems.fold(
        0.0, (sum, item) => sum + ((item.price) * item.quantity));
    print("💰 Cart Total: ₹$total");

    if (_isCouponApplied && _isFirstTimeUser) {
      double discountedTotal = total - _couponDiscount;
      if (discountedTotal < 0) discountedTotal = 0;

      print("🎉 Discount Applied: -₹$_couponDiscount");
      print("💰 Final Total: ₹$discountedTotal");

      return discountedTotal;
    }

    print("💰 Final Total (no discount): ₹$total");

    return total;
  }



  Future<void> createAndStartPayment( int total,  String forName) async {

    setLoadingState(true);
    final requestBody = {
      "total": total,
      "forName": forName,
    };
    // // Calculate final amount with discount
    // double finalAmount = totalAmountWithDiscount;
    // int totalInRupees = finalAmount.toInt();
    //
    // // final requestBody = {
    // //   "total": totalInRupees,
    // //   "forName": forName,
    // // };
    final result = await _repository.createRazerPayOrder(requestBody);
    _checkoutModel = result;
    // setLoadingState(true);
    if (_checkoutModel?.order?.id != null) {
      var apiKey = await fetchRazorpayKey();
      _startRazorpayPayment(apiKey.toString(), _checkoutModel!);
    }else {
      setLoadingState(false);
      // Handle error case
      print("Failed to create Razorpay order");
    }
  }

  void _startRazorpayPayment(String? apiKey, PaymentCheckoutModel model) {
    final order = model.order!;
    // Backend se rupees mein amount aa rha hai, Razorpay ke liye paise mein convert kren
    int amountInPaise = (order.amount! * 100).toInt();

    print("Backend amount (rupees): ${order.amount}");
    print("Razorpay amount (paise): $amountInPaise");

    var options = {
      'key': apiKey,
      'amount': amountInPaise, // in paise
      'currency': 'INR',
      'name': 'Shanya Scans',
      'description': 'Payment for test',
      'order_id': order.id,
      'prefill': {
        'contact': _formData?.phone ?? '',
        'email': _formData?.email ?? '',
      }
    };

    _razorpay.open(options);
  }

  void _handlePaymentSuccess(PaymentSuccessResponse response, BuildContext context) async {
    final requestBody = {
      "razorpay_payment_id": response.paymentId!,
      "razorpay_order_id": response.orderId!,
      "razorpay_signature": response.signature!,
    };
/// isme razerpay ka code ko use krna hai razerpayment ke liye lekin mughe kuch samgh nhi aa rha hai kha pr update kre jisse razeroat kaga hate naube akreadt razeroat kagata gau vyt sang bgu aa rga gau nyge cid ji cinnebt jrje razeroat kagaba gau
    // setLoadingState(true);
    final verified = await _repository.verifyPayment(requestBody);
    if (verified) {
      bool orderCreated = await createOrder(
        context,
        _formData!.selectedDate,
        _formData!.selectedTime,
        _formData!.email,
        _formData!.fullName,
        _formData!.age,
        _formData!.phone,
        _formData!.altPhone,
        _formData!.gender,
        _formData!.cityAddress,
        _formData!.pinCode,
        _formData!.place,
        _formData!.addressType,
      );
      if (orderCreated) {
        // ✅ Increment order count after successful order
        if (_isCouponApplied && _isFirstTimeUser) {
          final storage = StorageHelper();
          await storage.init();

          // Get current count and increment
          int currentCount = await storage.getOrderCount();
          await storage.setOrderCount(currentCount + 1);
          // Mark offer as used for first order
          if (currentCount == 0) {
            await storage.setOfferUsed(true);
            print("✅ First order completed - Offer marked as used");
            print("✅ Order count updated to: ${currentCount + 1}");
          }
          _isFirstTimeUser = false;
          _isCouponApplied = false;
          print("✅ First order completed - Order count updated to: ${currentCount + 1}");
        }

        paymentStatus = 'Payment and order successful';
        clearCheckout(context); // ✅ Cart clear करें successful payment के बाद
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (_) => OrderSuccessScreen()),
        );
      } else {
        paymentStatus = 'Payment successful, but order failed';
        setLoadingState(false); // ✅ Loading stop करें
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (_) => OrderFailedScreen(reason: "Order creation failed"),
          ),
        );
      }
    } else {
      paymentStatus = 'Payment verification failed';
      setLoadingState(false); // ✅ Loading stop करें
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (_) => OrderFailedScreen(reason: "Payment verification failed"),
        ),
      );
    }

    paymentStatus = verified ? 'Payment successful' : 'Payment verification failed';
    print("payment status => ${paymentStatus}");
    setLoadingState(false);
  }

  void _handlePaymentError(PaymentFailureResponse response , BuildContext context) {
    paymentStatus = 'Payment failed: ${response.message}';
    print("payment status => ${paymentStatus}");
    setLoadingState(false);
    clearRazorpay();
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(
        builder: (_) => OrderFailedScreen(reason: "Payment failed: ${response.message}"),
      ),
    );
  }

  void _handleExternalWallet(ExternalWalletResponse response , BuildContext context) {
    paymentStatus = 'External wallet selected: ${response.walletName}';
    print("payment status => ${paymentStatus}");
    setLoadingState(false);
    clearRazorpay();
  }
  // ✅ Additional method to handle payment cancellation explicitly
  void handlePaymentCancellation(BuildContext context) {
    paymentStatus = 'Payment cancelled by user';
    setLoadingState(false);

    showCustomSnackbarHelper.showSnackbar(
      context: context,
      message: "Payment cancelled",
      backgroundColor: Colors.orange,
      duration: Duration(seconds: 2),
    );
  }

  void clearRazorpay() {
    try {
      if (_razorpay != null) {
        _razorpay.clear();
      }
    } catch (e) {
      print("Error clearing Razorpay: $e");
      // Ignore cleanup errors
    }
  }

  // ✅ यह method भी add करें loading state को manually reset करने के लिए
  void resetLoadingState() {
    if (_isLoading) {
      setLoadingState(false);
    }
  }

}
