import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

import '../screen/auth/model/OtpVerifyModel.dart';

class StorageHelper {
  static final StorageHelper _singleton = StorageHelper._internal();
  static const String _orderDetailsKey = 'order_details';


  static const String _locationDisclosureAcceptedKey = 'locationDisclosureAccepted';
  static const String _firstTimeOfferKey = "first_time_offer_shown";

  factory StorageHelper() {
    return _singleton;
  }

  StorageHelper._internal();

  late SharedPreferences sp;

  Future<void> init() async {
    sp = await SharedPreferences.getInstance();
  }
  /// ✅ Ensure `sp` is initialized before using it
  Future<void> _ensureInitialized() async {
    if (!(_singleton.sp is SharedPreferences)) {
      await init();
    }
  }

  void clear() {
    sp.clear();
  }
  // ✅ Logout Method: Clears stored login data
  /// ✅ Reusable Logout Method
  Future<void> logout() async {
    await _ensureInitialized(); // Ensure SharedPreferences is initialized
    clearUserRole();
    List<String> keysToRemove = [
      'user_access_token',
      'user_id',
      'user_name',
      'email',
      'password',
      'phoneNumber',
      'whatsappNumber',
      'verify',
      'user_profile_image'
    ];

    for (String key in keysToRemove) {
      await sp.remove(key);
      // sp.clear();
    }

    print("✅ User logged out successfully!");
  }

  Future<void> setAppVersion(String version) async {
    await _ensureInitialized(); // Ye line add kar do – safe rahega
    await sp.setString('last_known_app_version', version);
  }

// ✅ FIXED: getAppVersion – ab crash nahi hoga
  Future<String?> getAppVersion() async {
    await _ensureInitialized(); // Pehle init ensure karo
    return sp.getString('last_known_app_version');
  }

  void setRole(String role) {
    sp.setString('role', role);
  }

  String getRole() {
    return sp.getString('role') ?? "";
  }
  static Future<void> clearUserRole() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.remove("role");
  }

  Future<void> setUserLocationDisclosureAccepted(bool accepted) async {
    await sp.setBool(_locationDisclosureAcceptedKey, accepted);
  }

  bool isUserLocationDisclosureAccepted() {
    return sp.getBool(_locationDisclosureAcceptedKey) ?? false;
  }

  Future<void> setSalesLocationDisclosureAccepted(bool accepted) async {
    await sp.setBool("Sales_disclosure", accepted);
  }

  bool isSalesLocationDisclosureAccepted() {
    return sp.getBool("Sales_disclosure") ?? false;
  }

  void setPaymentKey(String key) {
    sp.setString('payment_key', key);
  }

  String getPaymentKey() {
    return sp.getString('payment_key') ?? "";
  }

  Future<void> setOrderTotalToPrefs(double orderTotal) async {
    await sp.setDouble('order_total', orderTotal);
  }
  Future<double> getOrderTotalFromPrefs() async {
    return sp.getDouble('order_total') ?? 0.0;
  }



  void setUserAccessToken(String token) {
    sp.setString('user_access_token', token);
  }

  String getUserAccessToken() {
    return sp.getString('user_access_token') ?? "";
  }

  void setUserId(String username) {
    sp.setString('user_id', username);
  }

  String getUserId() {
    return sp.getString('user_id') ?? "";
  }


  void setUserLiveAddress(String address) {
    sp.setString('address', address);
  }

  String getUserLiveAddress() {
    return sp.getString('address') ?? "";
  }


  void setDeliveryBoyLiveAddress(String address) {
    sp.setString('address', address);
  }

  String getDeliveryBoyLiveAddress() {
    return sp.getString('address') ?? "";
  }


  // set user order data

  /// Store order details from API response
  Future<void> saveOrderListFromApi(OtpVerifyModel response) async {
    final SharedPreferences sp = await SharedPreferences.getInstance();

    if (response.user?.orderDetails != null) {
      String jsonString = jsonEncode(
          response.user!.orderDetails!.map((order) => order.toJson()).toList());
      await sp.setString(_orderDetailsKey, jsonString);
    }
  }

  /// Retrieve stored order details
  Future<List<OrderDetails>> getOrderList() async {
    final SharedPreferences sp = await SharedPreferences.getInstance();
    String? jsonString = sp.getString(_orderDetailsKey);

    if (jsonString == null || jsonString.isEmpty) {
      return [];
    }

    List<dynamic> jsonList = jsonDecode(jsonString);
    return jsonList.map((json) => OrderDetails.fromJson(json)).toList();
  }

  /// Clear stored order details
  Future<void> clearOrderList() async {
    final SharedPreferences sp = await SharedPreferences.getInstance();
    await sp.remove(_orderDetailsKey);
  }

  // set user order data

  Future<void> setOtpVerified(bool value) async {
    await  sp.setBool("_otpVerifiedKey", value);
  }

  Future<bool> getOtpVerified() async {
    return  sp.getBool("_otpVerifiedKey") ?? false;
  }
  // Save login state
  Future<void> setUserLoggedIn(bool isLoggedIn) async {
    await sp.setBool("_keyIsLoggedIn", isLoggedIn);
  }

  // Retrieve login state
  Future<bool> isUserLoggedIn() async {
    return sp.getBool("_keyIsLoggedIn") ?? false; // Default is false
  }



  void setUserName(String username) {
    sp.setString('user_name', username);
  }

  String getUserName() {
    return sp.getString('user_name') ?? "";
  }

  void setEmail(String username) {
    sp.setString('email', username);
  }

  String getEmail() {
    return sp.getString('email') ?? "";
  }

  void setPassword(String passwrod) {
    sp.setString('passwrod', passwrod);
  }

  String getPasswrod() {
    return sp.getString('passwrod') ?? "";
  }

  void setPhoneNumber(String phoneNumber) {
    sp.setString('phoneNumber', phoneNumber);
  }

  String getPhoneNumber() {
    return sp.getString('phoneNumber') ?? "";
  }

  void setAge(String phoneNumber) {
    sp.setString('age', phoneNumber);
  }

  String getAge() {
    return sp.getString('age') ?? "";
  }
  void setGender(String gender) {
    sp.setString('gender', gender);
  }

  String getGender() {
    return sp.getString('gender') ?? "";
  }

  void setDob(String dob) {
    sp.setString('dob', dob);
  }

  String getDob() {
    return sp.getString('dob') ?? "";
  }


  void setUserTestBookingAddress(String address) {
    sp.setString('setUserTestBookingAddress', address);
  }

  String getUserTestBookingAddress() {
    return sp.getString('setUserTestBookingAddress') ?? "";
  }

  void setUserTestBookingPhone(String address) {
    sp.setString('setUserTestBookingPhone', address);
  }

  String getUserTestBookingPhone() {
    return sp.getString('setUserTestBookingPhone') ?? "";
  }

  void setUserTestBookingAltPhone(String address) {
    sp.setString('setUserTestBookingAltPhone', address);
  }

  String getUserTestBookingAltPhone() {
    return sp.getString('setUserTestBookingAltPhone') ?? "";
  }




  void setWhatsappNumber(String whatsappNumber) {
    sp.setString('whatsappNumber', whatsappNumber);
  }

  String getWhatsappNumber() {
    return sp.getString('whatsappNumber') ?? "";
  }
  // void setVerified(bool verify) async {
  //   await sp.setBool('verify', verify); // Store the boolean value correctly
  // }
  //
  // Future<bool> isUserVerified() async {
  //   return sp.getBool('verify') ?? false; // Retrieve the boolean value
  // }
  void setProfileImage(String url) {
    sp.setString('user_profile_image', url);
  }

  String getProfileImage() {
    return sp.getString('user_profile_image') ?? "";
  }

  // ✅ NEW METHODS: Order Count Management for First-Time Offer

  /// Save order count to SharedPreferences
  Future<void> setOrderCount(int count) async {
    await _ensureInitialized();
    await sp.setInt('user_order_count', count);
    print("✅ Order count saved: $count");
  }

  /// Get order count from SharedPreferences
  Future<int> getOrderCount() async {
    await _ensureInitialized();
    int count = sp.getInt('user_order_count') ?? 0;
    print("📊 Order count retrieved: $count");
    return count;
  }

  /// Check if user has completed first order
  Future<bool> hasCompletedFirstOrder() async {
    await _ensureInitialized();
    int count = await getOrderCount();
    bool hasOrder = count >= 1;
    print("🔍 Has completed first order: $hasOrder (count: $count)");
    return hasOrder;
  }

  /// Clear order count (for testing or logout)
  Future<void> clearOrderCount() async {
    await _ensureInitialized();
    await sp.remove('user_order_count');
    print("✅ Order count cleared");
  }

  // Add these methods in StorageHelper class

  /// Save offer dialog shown status
  Future<void> setOfferDialogShown(bool shown) async {
    await _ensureInitialized();
    await sp.setBool('offer_dialog_shown', shown);
    print("✅ Offer dialog shown status saved: $shown");
  }

  /// Get offer dialog shown status
  Future<bool> isOfferDialogShown() async {
    await _ensureInitialized();
    bool shown = sp.getBool('offer_dialog_shown') ?? false;
    print("📱 Offer dialog shown status: $shown");
    return shown;
  }

  /// Save offer used status (when user makes first booking)
  Future<void> setOfferUsed(bool used) async {
    await _ensureInitialized();
    await sp.setBool('offer_used', used);
    print("✅ Offer used status saved: $used");
  }

  /// Get offer used status
  Future<bool> isOfferUsed() async {
    await _ensureInitialized();
    bool used = sp.getBool('offer_used') ?? false;
    print("🎁 Offer used status: $used");
    return used;
  }

  /// Clear all offer related data (for testing)
  Future<void> clearOfferData() async {
    await _ensureInitialized();
    await sp.remove('offer_dialog_shown');
    await sp.remove('offer_used');
    print("✅ All offer data cleared");
  }


  Future<void> setFirstTimeOfferShown(bool value) async {
    await  sp.setBool(_firstTimeOfferKey, value);
  }

  Future<bool> getFirstTimeOfferShown() async {
    return  sp.getBool(_firstTimeOfferKey) ?? false;
  }

  //&&&&&&&&&&&&&&&&&&&&&&  DELIVERY BOY LOGIN &&&&&&&&&&&&&&&&&&&&&&

  void setDeliveryBoyId(String username) {
    sp.setString('delivery_boy_id', username);
  }
  String getDeliveryBoyId() {
    return sp.getString('delivery_boy_id') ?? "";
  }

  void setDeliveryBoyEmail(String username) {
    sp.setString('delivery_boy_email', username);
  }

  String getDeliveryBoyEmail() {
    return sp.getString('delivery_boy_email') ?? "";
  }
  void setDeliveryBoyName(String username) {
    sp.setString('delivery_boy_name', username);
  }

  String getDeliveryBoyName() {
    return sp.getString('delivery_boy_name') ?? "";
  }

  void setDeliveryBoyPassword(String username) {
    sp.setString('delivery_boy_password', username);
  }

  String getDeliveryBoyPassword() {
    return sp.getString('delivery_boy_password') ?? "";
  }

  // sales

  /// **🌍 Save Latitude (double)**
  void setSalesLat(double latitude) {
    sp.setDouble('sales_lat', latitude);
  }

  /// **📍 Get Latitude (double)**
  double getSalesLat() {
    return sp.getDouble('sales_lat') ?? 0.0;
  }

  /// **🌍 Save Longitude (double)**
  void setSalesLng(double longitude) {
    sp.setDouble('sales_lng', longitude);
  }

  /// **📍 Get Longitude (double)**
  double getSalesLng() {
    return sp.getDouble('sales_lng') ?? 0.0;
  }

  void setUserOrderId(String userOrderId) {
    sp.setString('user_order_id', userOrderId);
  }

  String getUserOrderId() {
    return sp.getString('user_order_id') ?? "";
  }




  ////////////
  void setUserLat(double latitude) {
    sp.setDouble('user_lat', latitude);
  }

  /// **📍 Get Latitude (double)**
  double getUserLat() {
    return sp.getDouble('user_lat') ?? 0.0;
  }
//

  void setUserLong(double latitude) {
    sp.setDouble('user_lng', latitude);
  }

  /// **📍 Get Latitude (double)**
  double getUserLong() {
    return sp.getDouble('user_lng') ?? 0.0;
  }








}
