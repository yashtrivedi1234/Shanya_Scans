import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shanya_scans/screen/auth/controller/auth_provider.dart';
import 'package:shanya_scans/ui_helper/app_colors.dart';
import '../../base_widgets/common/custom_text_field.dart';
import '../../base_widgets/common/default_common_app_bar.dart';
import '../../base_widgets/loading_indicator.dart';
import '../../base_widgets/solid_rounded_button.dart';
import '../../ui_helper/responsive_helper.dart';

class ForgotPasswordScreen extends StatefulWidget {
  @override
  _ForgotPasswordScreenState createState() => _ForgotPasswordScreenState();
}

class _ForgotPasswordScreenState extends State<ForgotPasswordScreen> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController mobileController = TextEditingController();
  final TextEditingController _otpController = TextEditingController();
  final TextEditingController _newPasswordController = TextEditingController();

  final FocusNode _mobileFocusNode = FocusNode();
  final FocusNode _emailFocusNode = FocusNode();
  final FocusNode _otpFocusNode = FocusNode();
  final FocusNode _passwordFocusNode = FocusNode();
  final _formKey = GlobalKey<FormState>();

  String? _emailError, _otpError, _passwordError;



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

  void _requestOtp() async {
    if (!_formKey.currentState!.validate()) {
      return; // ❌ stop if mobile invalid
    }

    final provider = context.read<AuthApiProvider>();

    // Mobile number clean karo
    final mobile = mobileController.text
        .replaceAll(RegExp(r'[^0-9]'), '');

    bool success =
    await provider.forgetPassword(context, mobile);

    if (success) {
      setState(() {});
    }
  }

  void _resetPassword() async {
    final provider = context.read<AuthApiProvider>();
    String otp = _otpController.text.trim();
    String newPassword = _newPasswordController.text.trim();

    setState(() {
      _otpError = _passwordError = null;
    });

    if (otp.isEmpty) {
      setState(() => _otpError = "Enter the OTP");
      return;
    }
    if (newPassword.isEmpty) {
      setState(() => _passwordError = "Invalid Password");
      return;
    }

    await provider.resetPassword( context,_emailController.text.toString() , otp, newPassword);
    setState(() {}); // Ensure UI updates
  }

  bool _isValidEmail(String email) {
    final emailRegex =
        RegExp(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");
    return emailRegex.hasMatch(email);
  }

  @override
  void initState() {
    super.initState();
    _otpFocusNode.addListener(() => setState(() {}));
    _passwordFocusNode.addListener(() => setState(() {}));
  }


  @override
  void dispose() {
    Provider.of<AuthApiProvider>(context, listen: false).resetForgotPassword();
    _otpController.dispose();
    _newPasswordController.dispose();
    _otpFocusNode.dispose();
    _passwordFocusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        Provider.of<AuthApiProvider>(context, listen: false).resetForgotPassword(); // ✅ Reset on system back
        return true;
      },
      child: Scaffold(
        backgroundColor: Colors.white,
        appBar: DefaultCommonAppBar(activityName: "Forget Password",backgroundColor: AppColors.primary,   onBack: () {
          Provider.of<AuthApiProvider>(context, listen: false).resetForgotPassword();// ✅ Reset state
          Navigator.pop(context); // ✅ Go back
        },),
        body: Consumer<AuthApiProvider>(
          builder: (context, provider, child) {
            return Container(
              color: Colors.white,
              padding: EdgeInsets.all(10.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    provider.isOtpSent ? "Reset Password" : "Forgot Password",
                    style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 8),
                  Text(
                    provider.isOtpSent
                        ? "Enter OTP and new password"
                        : "Enter your email to receive OTP",
                    style: TextStyle(fontSize: 14, color: Colors.grey),
                  ),
                  SizedBox(height: 20),
                  Form(
                    key: _formKey,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        Padding(

                          padding: ResponsiveHelper.padding(context, 1, 0.2),
                          child:  CustomTextField(
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

                          // CustomTextField(
                          //   controller: _emailController,
                          //   iconColor: AppColors.primary,
                          //   shadowColor: AppColors.primary.withAlpha(70),
                          //   borderColor: AppColors.primary,
                          //   focusNode: _emailFocusNode,
                          //   icon: Icons.email,
                          //   hintText: "Enter email",
                          //   title: "Email",
                          //   // errorMessage: "Invalid Email",
                          //   errorMessage: _emailError.toString(),
                          //   keyboardType: TextInputType.emailAddress,
                          // ),
      
                          // Text(
                          //   "${StorageHelper().getEmail()}",
                          //   // "\u20B9${widget.pathalogyTestSlug}",
                          //   style: AppTextStyles.bodyText1(context,
                          //       overrideStyle: TextStyle(
                          //           fontSize: ResponsiveHelper.fontSize(
                          //               context, 12))),
                          // ),
      
      
      
                        ),
      
                        SizedBox(height: 10),
                        if (provider.isOtpSent) ...[
      
                          CustomTextField(
                            controller: _otpController,
                            maxLength: 6,
                            iconColor: AppColors.primary,
                            shadowColor: AppColors.primary.withAlpha(70),
                            borderColor: AppColors.primary,
                            focusNode: _otpFocusNode,
                            icon: Icons.keyboard_alt_outlined,
                            hintText: "Enter Otp Code",
                            title: "OTP",
                            // errorMessage: "Invalid OTP",
                            errorMessage: _otpError.toString(),
                            keyboardType: TextInputType.number,
                          ),
                          SizedBox(height: 10),
                          CustomTextField(
                            controller: _newPasswordController,
                            iconColor: AppColors.primary,
                            shadowColor: AppColors.primary.withAlpha(70),
                            borderColor: AppColors.primary,
                            focusNode: _passwordFocusNode,
                            icon: Icons.lock_clock_outlined,
                            hintText: "Enter new password",
                            title: "Password",
                            // errorMessage: "Invalid password",
                            errorMessage: _passwordError.toString(),
                            keyboardType: TextInputType.text,
                          ),
                        ],
                      ],
                    ),
                  ),
                  SizedBox(height: 10),

                  Consumer<AuthApiProvider>(
                    builder: (context, provider, _) {
                      return  provider.isLoading
                          ? loadingIndicator()
                          : SolidRoundedButton(
                        onPressed: (){
                          print("🟢 Button Clicked");
                          provider.isOtpSent ? _resetPassword() : _requestOtp();
                        },
                        text: provider.isOtpSent? 'Reset Password' : 'Request OTP',
                        color: AppColors.primary,
                        borderRadius: 10.0,
                        textStyle:
                        TextStyle(color: Colors.white, fontSize: 18),
                      );
                    },
                  ),

                  // SizedBox(
                  //   width: double.infinity,
                  //   // height: 50,
                  //   child: provider.isLoading
                  //       ? loadingIndicator()
                  //       : SolidRoundedButton(
                  //           onPressed: (){
                  //             print("🟢 Button Clicked");
                  //             provider.isOtpSent ? _resetPassword() : _requestOtp();
                  //           },
                  //           text: provider.isOtpSent? 'Reset Password' : 'Request OTP',
                  //           color: AppColors.primary,
                  //           borderRadius: 10.0,
                  //           textStyle:
                  //               TextStyle(color: Colors.white, fontSize: 18),
                  //         ),
                  // ),
                ],
              ),
            );
          },
        ),
      ),
    );
  }
}
