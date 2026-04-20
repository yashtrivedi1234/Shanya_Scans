import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shanya_scans/base_widgets/common/custom_text_field.dart';
import 'package:shanya_scans/screen/auth/controller/auth_provider.dart';
import 'package:shanya_scans/screen/auth/signup_screen.dart';
import '../../../base_widgets/loading_indicator.dart';
import '../../../base_widgets/solid_rounded_button.dart';
import '../../../ui_helper/app_colors.dart';
import '../../../ui_helper/app_text_styles.dart';
import '../../../ui_helper/responsive_helper.dart';

class MobileOTPFormWidget extends StatefulWidget {
  MobileOTPFormWidget();

  @override
  _MobileOTPFormWidgetState createState() => _MobileOTPFormWidgetState();
}

class _MobileOTPFormWidgetState extends State<MobileOTPFormWidget> {
  final TextEditingController mobileController = TextEditingController();
  final TextEditingController otpController = TextEditingController();
  final FocusNode _mobileFocusNode = FocusNode();
  final FocusNode _otpFocusNode = FocusNode();
  final _formKey = GlobalKey<FormState>();

  bool otpSent = false;
  bool isLoading = false;

  @override
  void initState() {
    super.initState();
    _mobileFocusNode.addListener(() => setState(() {}));
    _otpFocusNode.addListener(() => setState(() {}));
  }

  String? validateIndianMobile(String? value) {
    if (value == null || value.trim().isEmpty) {
      return "Mobile number is required";
    }

    // Remove spaces, +, -, brackets etc.
    String cleaned = value.replaceAll(RegExp(r'[^0-9]'), '');

    // Remove country code if entered
    if (cleaned.startsWith('91') && cleaned.length == 12) {
      cleaned = cleaned.substring(2);
    }

    // Remove leading zero
    if (cleaned.startsWith('0') && cleaned.length == 11) {
      cleaned = cleaned.substring(1);
    }

    if (cleaned.length != 10) {
      return "Enter valid 10-digit mobile number";
    }

    // Indian mobile numbers start with 6,7,8,9
    if (!RegExp(r'^[6-9]\d{9}$').hasMatch(cleaned)) {
      return "Invalid mobile number";
    }

    return null; // ✅ Valid
  }


  // Handle Send OTP
  Future<void> handleSendOTP() async {
    // if (!_formKey.currentState!.validate() || otpSent) return;

    final provider = Provider.of<AuthApiProvider>(context, listen: false);
    final cleanedNumber = mobileController.text.replaceAll(RegExp(r'[^0-9]'), '');

    await provider.loginWithOtp(context, cleanedNumber,"login");

    if (provider.isLoading == false) {
      if (mounted) {
        setState(() {
          otpSent = true;
          _otpFocusNode.requestFocus();
        });
      }
    }


  }

  // Handle Verify OTP
  void handleVerifyOTP() {
    if (otpController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text("Please enter OTP"),
          backgroundColor: Colors.red,
        ),
      );
      return;
    }

    setState(() {
      isLoading = true;
    });

    // Add your OTP verification API logic here
    print("🟢 Verifying OTP: ${otpController.text}");

    // Simulate API call
    Future.delayed(Duration(seconds: 2), () {
      if (mounted) {
        setState(() {
          isLoading = false;
        });
        // Navigate to home or show success
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text("Login successful!"),
            backgroundColor: Colors.green,
          ),
        );
      }
    });
  }

  // Resend OTP
  void handleResendOTP() {
    setState(() {
      otpSent = false;
      otpController.clear();
    });
    handleSendOTP();
  }

  @override
  void dispose() {
    mobileController.dispose();
    otpController.dispose();
    _mobileFocusNode.dispose();
    _otpFocusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        FocusScope.of(context).unfocus();
      },
      child: Form(
        key: _formKey,
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 15.0),
          child: Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
              boxShadow: [
                BoxShadow(
                  color: AppColors.primary.withOpacity(0.05),
                  blurRadius: 20,
                  spreadRadius: 5,
                  offset: Offset(0, 5),
                ),
              ],
            ),
            padding: EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Mobile Number Field
                CustomTextField(
                  controller: mobileController,
                  focusNode: _mobileFocusNode,
                  icon: Icons.phone,
                  hintText: "Enter 10-digit mobile number",
                  title: "Mobile Number",
                  errorMessage: "",
                  maxLength: 10,
                  keyboardType: TextInputType.phone,
                  validator: validateIndianMobile,
                ),

                // // Show OTP field only after OTP is sent
                // if (otpSent) ...[
                //   const SizedBox(height: 20),
                //   CustomTextField(
                //     controller: otpController,
                //     focusNode: _otpFocusNode,
                //     icon: Icons.lock_outline,
                //     hintText: "Enter 6-digit OTP",
                //     title: "OTP",
                //     errorMessage: "",
                //     keyboardType: TextInputType.number,
                //     validator: (value) {
                //       if (value == null || value.isEmpty) {
                //         return "OTP is required";
                //       }
                //       if (value.length != 6) {
                //         return "OTP must be 6 digits";
                //       }
                //       return null;
                //     },
                //   ),
                // ],

                const SizedBox(height: 25),

                // Send OTP / Verify OTP Button
                // isLoading
                //     ? Center(child: loadingIndicator())
                //     : SolidRoundedButton(
                //       onPressed: handleSendOTP,
                //       text: 'Send OTP',
                //       color: AppColors.primary,
                //       borderRadius: 12.0,
                //       textStyle: const TextStyle(
                //         color: Colors.white,
                //         fontSize: 18,
                //         fontWeight: FontWeight.bold,
                //         letterSpacing: 0.5,
                //       ),
                //     ),

                Consumer<AuthApiProvider>(
                  builder: (context, provider, _) {
                    return provider.isLoading
                        ? Center(child: loadingIndicator())
                        : SolidRoundedButton(
                      onPressed: handleSendOTP,
                      text: 'Send OTP',
                      color: AppColors.primary,
                      borderRadius: 12.0,
                      textStyle: const TextStyle(
                        color: Colors.white,
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    );
                  },
                ),


                const SizedBox(height: 20),

                // Info Section
                Container(
                  padding: EdgeInsets.all(15),
                  decoration: BoxDecoration(
                    color: AppColors.lightYellowColor.withOpacity(0.3),
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(
                      color: AppColors.primary.withOpacity(0.2),
                    ),
                  ),
                  child: Row(
                    children: [
                      Icon(
                        Icons.info_outline,
                        color: AppColors.primary,
                        size: 20,
                      ),
                      SizedBox(width: 10),
                      Expanded(
                        child: Text(
                          otpSent
                              ? "Please check your SMS for the 6-digit OTP"
                              : "You'll receive a 6-digit OTP on your mobile",
                          style: TextStyle(
                            fontSize: 12,
                            color: Colors.black87,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),

                // Divider
                const SizedBox(height: 20),
                Row(
                  children: [
                    Expanded(
                      child: Divider(
                        color: Colors.grey[300],
                        thickness: 1,
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      child: Text(
                        "OR",
                        style: TextStyle(
                          color: Colors.grey[500],
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                    Expanded(
                      child: Divider(
                        color: Colors.grey[300],
                        thickness: 1,
                      ),
                    ),
                  ],
                ),

                const SizedBox(height: 20),

                // Sign Up Section
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Text(
                      "Don't have an account?",
                      style: AppTextStyles.heading1(
                        context,
                        overrideStyle: TextStyle(
                          fontSize: ResponsiveHelper.fontSize(context, 12),
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    InkWell(
                      onTap: () {
                        // showSignupBottomSheet(context);
                        Navigator.of(context).pushReplacement(
                          // MaterialPageRoute(builder: (context) => TestingScreen()),
                          MaterialPageRoute(
                              builder: (context) => SignUpScreen()),
                        );
                      },
                      child: Text(
                        "SignUp",
                        style: AppTextStyles.heading1(
                          context,
                          overrideStyle: TextStyle(
                            fontWeight: FontWeight.w900,
                            color: AppColors.primary,
                            fontSize: ResponsiveHelper.fontSize(context, 14),
                          ),
                        ),
                      ),
                    ),
                  ],
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}