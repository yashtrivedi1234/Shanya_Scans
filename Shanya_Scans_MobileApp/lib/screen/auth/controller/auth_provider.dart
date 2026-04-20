import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shanya_scans/network_manager/repository.dart';
import 'package:shanya_scans/screen/auth/login_screen.dart';
import 'package:shanya_scans/screen/auth/model/OtpVerifyModel.dart';
import 'package:shanya_scans/screen/auth/otp_screen.dart';
import 'package:shanya_scans/screen/other/screen/user_selection_screen.dart';
import 'package:shanya_scans/ui_helper/app_colors.dart';
import 'package:shanya_scans/ui_helper/storage_helper.dart';
import '../../../bottom_navigation_screen.dart';
import '../../../network_manager/api_error_handler.dart';
import '../../../network_manager/api_exception.dart';
import '../../../network_manager/dio_error_handler.dart';
import '../../../ui_helper/snack_bar.dart';
import '../../cart/controller/cart_list_api_provider.dart';

class AuthApiProvider with ChangeNotifier {
  final Repository _repository = Repository();
  bool _isLoading = false;
  bool _isOtpSent = false;
  bool _isOtpVerified = false; // ✅ New flag to track OTP verification

  bool get isLoading => _isLoading;

  bool get isOtpSent => _isOtpSent;

  bool get isOtpVerified => _isOtpVerified;

  String _verifiedPhoneNumber = ""; // ✅ Store verified phone number
  Map<String, String> _signupData = {};

  Map<String, String> get signupData => _signupData;

  void _setLoading(bool value) {
    _isLoading = value;
    notifyListeners();
  }

  void setSignupData({
    required String name,
    required String phoneNumber,
    required String age,
    required String dob,
    required String gender,
  }) {
    _signupData = {
      'name': name,
      'phoneNumber': phoneNumber,
      'age': age,
      'dob': dob,
      'gender': gender,
    };
    notifyListeners();
  }

  void reset() {
    _setLoading(false);
  }

  Future<void> _storeSignupData(String name, String phoneNumber, String age,
      String dob, String gender) async {
    StorageHelper().setUserName(name);
    StorageHelper().setPhoneNumber(phoneNumber);
    StorageHelper().setAge(age);
    StorageHelper().setDob(dob);
    StorageHelper().setGender(gender);
  }

  // ✅ STEP 1: Send OTP for Signup (only phone number needed)
  Future<void> sendSignupOtp(
      BuildContext context, String phoneNumber, String type) async {
    _setLoading(true);
    try {
      Map<String, dynamic> requestBody = {
        "phone": phoneNumber,
        "type": type,
      };
      var response = await _repository.loginWithOtp(requestBody);

      if (response.success == true) {
        _verifiedPhoneNumber = phoneNumber;
        _isOtpSent = true;
        notifyListeners();

        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => OTPScreen(phoneNumber, isSignupFlow: true),
          ),
        );

        showCustomSnackbarHelper.showSnackbar(
          context: context,
          message: response.message ?? "OTP sent successfully!",
          backgroundColor: AppColors.primary,
          duration: Duration(seconds: 2),
        );
      } else {
        showCustomSnackbarHelper.showSnackbar(
          context: context,
          message: response.message ?? 'Failed to send OTP!',
          backgroundColor: Colors.red,
          duration: Duration(seconds: 2),
        );
      }
    } on DioException catch (e) {
      _handleDioErrors(context, e);
    } finally {
      _setLoading(false);
    }
  }

  // ✅ STEP 2: Verify OTP for Signup
  Future<bool> verifySignupOtp(
      BuildContext context, String phone, String type, String otp) async {
    _setLoading(true);
    try {
      Map<String, dynamic> requestBody = {
        "phone": phone,
        "type": type,
        "otp": otp,
      };
      var response = await _repository.verifyOtp(
        requestBody,
      );

      if (response.success == true) {
        _isOtpVerified = true;
        _verifiedPhoneNumber = phone;
        notifyListeners();

        showCustomSnackbarHelper.showSnackbar(
          context: context,
          message: "OTP verified successfully! Complete your signup.",
          backgroundColor: AppColors.primary,
          duration: Duration(seconds: 2),
        );
        return true;
      } else {
        showCustomSnackbarHelper.showSnackbar(
          context: context,
          message: "Invalid OTP!",
          backgroundColor: Colors.red,
          duration: Duration(seconds: 2),
        );
        return false;
      }
    } on DioException catch (e) {
      _handleDioErrors(context, e);
    } catch (e) {
      _handleUnexpectedErrors(context, e, "OTP Verification Failed");
    } finally {
      _setLoading(false);
    }
    return false;
  }

  // ✅ STEP 3: Complete Signup after form submission
  Future<void> signUpUser(
      BuildContext context,
      String name,
      String phoneNumber,
      String age,
      String dob,
      String gender,
      ) async {
    _setLoading(true);
    try {
      Map<String, dynamic> requestBody = {
        "name": name,
        "phoneNumber": phoneNumber,
        "age": age,
        "dob": dob,
        "gender": gender.toLowerCase(),
      };

      var response = await _repository.userSignUp(requestBody);

      // Fix: response is likely SignUpModel, so check success directly
      if (response.success == true) {
        await _storeSignupData(name, phoneNumber, age, dob, gender);
        await StorageHelper().setOtpVerified(true);

        StorageHelper().setUserId(response.user?.sId.toString() ?? "");
        StorageHelper().setUserName(response.user?.name.toString() ?? "");
        StorageHelper().setEmail(response.user?.email.toString() ?? "");
        StorageHelper().setAge(response.user?.age.toString() ?? "");
        StorageHelper().setDob(response.user?.dob.toString() ?? "");
        StorageHelper().setGender(response.user?.gender.toString() ?? "");
        StorageHelper().setPhoneNumber(response.user?.phoneNumber.toString() ?? "");
        StorageHelper().setWhatsappNumber(response.user?.whatsappNumber.toString() ?? "");

        // if (response.user != null) {
        //   // await _storeUserData(response.user!);
        //   StorageHelper().setUserId(response.user?.sId.toString() ?? "");
        //   StorageHelper().setUserName(response.user?.name.toString() ?? "");
        //   StorageHelper().setEmail(response.user?.email.toString() ?? "");
        //   StorageHelper().setAge(response.user?.age.toString() ?? "");
        //   StorageHelper().setDob(response.user?.dob.toString() ?? "");
        //   StorageHelper().setGender(response.user?.gender.toString() ?? "");
        //   StorageHelper().setPhoneNumber(response.user?.phoneNumber.toString() ?? "");
        //   StorageHelper().setWhatsappNumber(response.user?.whatsappNumber.toString() ?? "");
        //
        // }


        // Reset state
        _isOtpVerified = false;
        _isOtpSent = false;
        _verifiedPhoneNumber = "";
        _signupData.clear();

        Navigator.pushAndRemoveUntil(
          context,
          MaterialPageRoute(builder: (_) => const BottomNavigationScreen()),
              (route) => false,
        );

        showCustomSnackbarHelper.showSnackbar(
          context: context,
          message: response.message ?? "Sign-up successful!",
          backgroundColor: AppColors.primary,
          duration: const Duration(seconds: 2),
        );
      } else {
        String displayMessage = response.message ?? "Sign-up failed. Please try again.";
        if (displayMessage.toLowerCase().contains("bad request")) {
          displayMessage = "Account already exists. Try a different account.";
        }

        showCustomSnackbarHelper.showSnackbar(
          context: context,
          message: displayMessage,
          backgroundColor: Colors.red,
          duration: const Duration(seconds: 3),
        );
      }
    } on DioException catch (e) {
      String message = "Something went wrong. Please try again.";

      if (e.response?.statusCode == 400) {
        message = "Account already exists. Try with a different account.";
      } else if (e.response?.statusCode == 500) {
        message = "Server error. Please try again later.";
      }

      showCustomSnackbarHelper.showSnackbar(
        context: context,
        message: message,
        backgroundColor: Colors.red,
        duration: const Duration(seconds: 3),
      );
    } catch (e) {
      showCustomSnackbarHelper.showSnackbar(
        context: context,
        message: "Unexpected error occurred.",
        backgroundColor: Colors.red,
      );
    } finally {
      _setLoading(false);
    }
  }
  // ✅ Login with OTP (existing flow)
  Future<void> loginWithOtp(
      BuildContext context, String input, String type) async {
    _setLoading(true);
    try {
      Map<String, dynamic> requestBody = {};

      if (RegExp(r'^[0-9]{10}$').hasMatch(input)) {
        requestBody = {
          "phone": input,
          "type": type,
        };
      } else {
        _setLoading(false);
        showCustomSnackbarHelper.showSnackbar(
          context: context,
          message: "Please enter a valid 10-digit number.",
          backgroundColor: Colors.red,
          duration: const Duration(seconds: 2),
        );
        return;
      }

      var response = await _repository.loginWithOtp(requestBody);

      if (response.success == true) {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => OTPScreen(input, isSignupFlow: false),
          ),
        );

        showCustomSnackbarHelper.showSnackbar(
          context: context,
          message: response.message ?? "OTP sent successfully!",
          backgroundColor: AppColors.primary,
          duration: Duration(seconds: 2),
        );
      } else {
        showCustomSnackbarHelper.showSnackbar(
          context: context,
          message: response.message ?? 'OTP failed!',
          backgroundColor: Colors.red,
          duration: Duration(seconds: 2),
        );
      }
    } on DioException catch (e) {
      _handleDioErrors(context, e);
    } finally {
      _setLoading(false);
    }
  }

  // ✅ Verify OTP for Login
  Future<bool> verifyOtp(
      BuildContext context, String phone, String type, String otp) async {
    _setLoading(true);
    try {
      Map<String, dynamic> requestBody = {
        "phone": phone,
        "type": type,
        "otp": otp,
      };
      var response = await _repository.verifyOtp(
        requestBody,
      );

      if (response.success == true) {
        await StorageHelper().setOtpVerified(true);
        await _storeUserData(response.user);

        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => BottomNavigationScreen()),
        );
        return true;
      } else {
        await StorageHelper().setOtpVerified(false);
        showCustomSnackbarHelper.showSnackbar(
          context: context,
          message: "Invalid OTP!",
          backgroundColor: Colors.red,
          duration: Duration(seconds: 2),
        );
      }
    } on DioException catch (e) {
      _handleDioErrors(context, e);
    } catch (e) {
      _handleUnexpectedErrors(context, e, "OTP Verification Failed");
    } finally {
      _setLoading(false);
    }
    await StorageHelper().setOtpVerified(false);
    return false;
  }

  Future<bool> getResendOtp(
      BuildContext context, String phone, String type) async {
    _setLoading(true);
    try {
      Map<String, dynamic> requestBody = {
        "phone": phone,
        "type": type,
      };
      var response = await _repository.resendOtp(requestBody);
      showCustomSnackbarHelper.showSnackbar(
        context: context,
        message: response,
        backgroundColor: AppColors.primary,
        duration: Duration(seconds: 3),
      );
      return true;
    } on DioException catch (e) {
      _handleDioErrors(context, e);
    } finally {
      _setLoading(false);
    }
    return false;
  }

  Future<void> loginUser(
      BuildContext context, String input, String password) async {
    _setLoading(true);
    try {
      Map<String, dynamic> requestBody = {};

      if (RegExp(r'^\S+@\S+\.\S+$').hasMatch(input)) {
        requestBody = {"email": input, "password": password};
      } else if (RegExp(r'^[0-9]{10}$').hasMatch(input)) {
        requestBody = {"phoneNumber": input, "password": password};
      } else {
        _setLoading(false);
        showCustomSnackbarHelper.showSnackbar(
          context: context,
          message: "Please enter a valid email or 10-digit phone number.",
          backgroundColor: Colors.red,
          duration: const Duration(seconds: 2),
        );
        return;
      }

      var response = await _repository.userLogin(requestBody);

      if (response.success == true && response.data != null) {
        StorageHelper().setOtpVerified(true);
        Navigator.pushReplacement(context,
            MaterialPageRoute(builder: (context) => BottomNavigationScreen()));
        showCustomSnackbarHelper.showSnackbar(
          context: context,
          message: response.message ?? "Login successfully!",
          backgroundColor: AppColors.primary,
          duration: Duration(seconds: 2),
        );
      } else {
        showCustomSnackbarHelper.showSnackbar(
          context: context,
          message: response.message ?? 'Login failed!',
          backgroundColor: Colors.red,
          duration: Duration(seconds: 2),
        );
      }
    } on DioException catch (e) {
      _handleDioErrors(context, e);
    } finally {
      _setLoading(false);
    }
  }

  void setOtpSent(bool value) {
    _isOtpSent = value;
    notifyListeners();
  }

  Future<bool> forgetPassword(BuildContext context, String email) async {
    _setLoading(true);
    try {
      Map<String, dynamic> requestBody = {"phoneNumber": email};
      // Map<String, dynamic> requestBody = {"email": email};
      var response = await _repository.forgetPassword(requestBody);

      if (response["success"] == true) {
        setOtpSent(true);
        showCustomSnackbarHelper.showSnackbar(
          context: context,
          message: response["message"] ?? "Reset link sent to your email!",
          backgroundColor: AppColors.primary,
          duration: Duration(seconds: 2),
        );
        return true;
      } else {
        showCustomSnackbarHelper.showSnackbar(
          context: context,
          message: response["message"] ?? "Failed to send reset link!",
          backgroundColor: Colors.red,
          duration: Duration(seconds: 2),
        );
      }
    } on DioException catch (e) {
      _handleDioErrors(context, e);
    } catch (e) {
      _handleUnexpectedErrors(context, e, "Something went wrong!");
    } finally {
      _setLoading(false);
    }
    return false;
  }

  void resetForgotPassword() {
    _isOtpSent = false;
    notifyListeners();
  }

  Future<bool> resetPassword(BuildContext context, String email, String code,
      String newPassword) async {
    _setLoading(true);
    try {
      Map<String, dynamic> requestBody = {
        "email": email,
        "code": code,
        "newPassword": newPassword,
      };

      var response = await _repository.resetPassword(requestBody);

      if (response["success"] == true) {
        setOtpSent(false);
        StorageHelper().setPassword(newPassword);
        logoutUser(context);
        showCustomSnackbarHelper.showSnackbar(
          context: context,
          message: response["message"] ?? "Password reset successfully!",
          backgroundColor: AppColors.primary,
          duration: Duration(seconds: 2),
        );
        return true;
      } else {
        showCustomSnackbarHelper.showSnackbar(
          context: context,
          message: response["message"] ?? "Password reset failed!",
          backgroundColor: Colors.red,
          duration: Duration(seconds: 2),
        );
      }
    } on DioException catch (e) {
      _handleDioErrors(context, e);
    } catch (e) {
      _handleUnexpectedErrors(context, e, "Something went wrong!");
    } finally {
      _setLoading(false);
    }
    return false;
  }

  void logoutUser(BuildContext context) {
    _setLoading(true);
    Future.delayed(Duration(seconds: 1), () async {
      await StorageHelper().logout();
      _signupData.clear();
      _isOtpVerified = false;
      _isOtpSent = false;
      _verifiedPhoneNumber = "";
      _setLoading(false);
      Navigator.of(context).pushAndRemoveUntil(
        MaterialPageRoute(builder: (context) => LoginScreen()),
        (route) => false,
      );
    });
  }

  Future<void> _storeUserData(User? response) async {
    if (response != null) {
      StorageHelper().setUserId(response.sId.toString());
      StorageHelper().setUserName(response.name.toString());
      StorageHelper().setEmail(response.email.toString());
      StorageHelper().setAge(response.age.toString());
      StorageHelper().setDob(response.dob.toString());
      StorageHelper().setGender(response.gender.toString());
      StorageHelper().setPhoneNumber(response.phoneNumber.toString());
      StorageHelper().setWhatsappNumber(response.whatsappNumber.toString());
    } else {
      await StorageHelper().clearOrderList();
    }
  }

  Future<void> updateProfile(BuildContext context, String userId, String name,
      String phoneNumber, String age, String dob) async {
    _setLoading(true);
    try {
      Map<String, dynamic> requestBody = {
        "name": name,
        "phoneNumber": phoneNumber,
        "age": age,
        "dob": dob,
      };

      var response = await _repository.updateProfile(userId, requestBody);

      if (response.success == true) {
        StorageHelper().setUserName(response.data?.name ?? '');
        StorageHelper().setPhoneNumber(response.data?.phoneNumber ?? '');
        StorageHelper().setWhatsappNumber(response.data?.whatsappNumber ?? '');
        StorageHelper().setAge(response.data?.age ?? '');
        StorageHelper().setDob(response.data?.dob ?? '');


        showCustomSnackbarHelper.showSnackbar(
          context: context,
          message: response.message ?? "Profile updated successfully!",
          backgroundColor: AppColors.primary,
          duration: const Duration(seconds: 2),
        );

        Navigator.pushReplacement(context,
            MaterialPageRoute(builder: (context) => BottomNavigationScreen()));
      } else {
        showCustomSnackbarHelper.showSnackbar(
          context: context,
          message: response.message ?? "Update failed! Please try again.",
          backgroundColor: Colors.red,
          duration: const Duration(seconds: 2),
        );
      }
    } on DioException catch (e) {
      _handleDioErrors(context, e);
    } finally {
      _setLoading(false);
    }
  }

  void _handleDioErrors(BuildContext context, DioException e) {
    showCustomSnackbarHelper.showSnackbar(
      context: context,
      message: ApiErrorHandler.handleError(e),
      backgroundColor: Colors.red,
      duration: Duration(seconds: 3),
    );
  }

  void _handleUnexpectedErrors(
      BuildContext context, dynamic e, String message) {
    showCustomSnackbarHelper.showSnackbar(
      context: context,
      message: message,
      backgroundColor: Colors.red,
      duration: Duration(seconds: 3),
    );
  }
}
