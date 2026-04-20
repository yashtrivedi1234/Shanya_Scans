import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shanya_scans/base_widgets/loading_indicator.dart';
import 'package:shanya_scans/base_widgets/solid_rounded_button.dart';
import 'package:shanya_scans/screen/auth/controller/auth_provider.dart';
import 'package:shanya_scans/screen/auth/login_screen.dart';
import 'package:shanya_scans/util/dimensions.dart';
import 'package:shanya_scans/util/image_loader_util.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../base_widgets/common/custom_text_field.dart';
import '../../ui_helper/responsive_helper.dart';
import '../../ui_helper/app_colors.dart';
import '../../ui_helper/app_text_styles.dart';

class SignUpScreen extends StatefulWidget {
  @override
  _SignUpScreenState createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<SignUpScreen> {
  final PageController _pageController = PageController();
  int _currentPage = 0;
  final Uri _url = Uri.parse('https://codecrafter.co.in/');

  // ✅ Phone number form
  final TextEditingController phoneController = TextEditingController();
  final FocusNode _phoneFocusNode = FocusNode();
  final _formKey = GlobalKey<FormState>();

  Future<void> _launchURL() async {
    if (!await launchUrl(_url, mode: LaunchMode.externalApplication)) {
      throw Exception('Could not launch $_url');
    }
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

  // ✅ Send OTP for signup
  void handleSendOtp() async {
    if (_formKey.currentState!.validate()) {
      final authProvider = context.read<AuthApiProvider>();
      await authProvider.sendSignupOtp(context, phoneController.text.trim(),"register");
    }
  }

  @override
  void initState() {
    super.initState();
    _phoneFocusNode.addListener(() => setState(() {}));
  }

  @override
  void dispose() {
    _pageController.dispose();
    phoneController.dispose();
    _phoneFocusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.whiteColor,
      body: SafeArea(
        bottom: false,
        child: GestureDetector(
          onTap: () => FocusScope.of(context).unfocus(),
          child: LayoutBuilder(
            builder: (context, constraints) {
              return Column(
                children: [
                  Expanded(
                    child: SingleChildScrollView(
                      child: MediaQuery.removePadding(
                        context: context,
                        removeBottom: true,
                        child: Column(
                          children: [
                            _buildEnhancedTopSection(),
                            Padding(
                              padding: ResponsiveHelper.padding(context, 5, 0),
                              child: _buildPhoneNumberForm(),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  _buildBottomSection(),
                ],
              );
            },
          ),
        ),
      ),
    );
  }

  /// ✅ Phone Number Input Form
  Widget _buildPhoneNumberForm() {
    return Form(
      key: _formKey,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 10.0),
        child: Container(
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(20),
            boxShadow: [
              BoxShadow(
                color: AppColors.primary.withOpacity(0.05),
                blurRadius: 20,
                spreadRadius: 5,
                offset: const Offset(0, 5),
              ),
            ],
          ),
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "Get Started",
                style: AppTextStyles.heading1(
                  context,
                  overrideStyle: TextStyle(
                    fontSize: ResponsiveHelper.fontSize(context, 18),
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              const SizedBox(height: 4),
              Text(
                "Enter your phone number to create an account",
                style: AppTextStyles.bodyText2(
                  context,
                  overrideStyle: TextStyle(
                    fontSize: ResponsiveHelper.fontSize(context, 12),
                  ),
                ),
              ),
              const SizedBox(height: 20),

              CustomTextField(
                controller: phoneController,
                focusNode: _phoneFocusNode,
                icon: Icons.phone_android,
                maxLength: 10,
                hintText: "Enter your phone number",
                title: "Phone Number",
                errorMessage: "Please enter a valid 10-digit phone number",
                keyboardType: TextInputType.phone,
                validator: validateIndianMobile,
              ),

              const SizedBox(height: 20),

              Consumer<AuthApiProvider>(
                builder: (context, authProvider, child) {
                  return authProvider.isLoading
                      ? loadingIndicator()
                      : SolidRoundedButton(
                    text: 'Send OTP',
                    color: AppColors.primary,
                    borderRadius: 10.0,
                    onPressed: handleSendOtp,
                    textStyle: const TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                    ),
                  );
                },
              ),

              ResponsiveHelper.sizeBoxHeightSpace(context, 2),

              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    "Already have an account?",
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
                      Navigator.pushReplacement(
                        context,
                        MaterialPageRoute(builder: (context) => LoginScreen()),
                      );
                    },
                    child: Text(
                      "Login",
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
              ),
            ],
          ),
        ),
      ),
    );
  }

  /// ✅ Enhanced Top Section with Modern Design
  Widget _buildEnhancedTopSection() {
    return ClipPath(
      clipper: ModernCurveClipper(),
      child: Container(
        width: double.infinity,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              AppColors.primary.withOpacity(0.1),
              AppColors.lightYellowColor,
            ],
          ),
        ),
        height: ResponsiveHelper.containerHeight(context, 34),
        child: Stack(
          children: [
            // Decorative circles
            Positioned(
              top: -50,
              right: -50,
              child: Container(
                width: 150,
                height: 150,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: AppColors.primary.withOpacity(0.1),
                ),
              ),
            ),
            Positioned(
              bottom: 30,
              left: -30,
              child: Container(
                width: 100,
                height: 100,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: Colors.white.withOpacity(0.3),
                ),
              ),
            ),
            // Main content
            Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  SizedBox(height: ResponsiveHelper.containerHeight(context, 2)),
                  // Logo with shadow
                  Container(
                    padding: EdgeInsets.all(15),
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: Colors.white,
                      boxShadow: [
                        BoxShadow(
                          color: AppColors.primary.withOpacity(0.2),
                          blurRadius: 20,
                          spreadRadius: 5,
                        ),
                      ],
                    ),
                    child: ImageLoaderUtil.assetImage(
                      'assets/images/loginimage.png',
                      width: ResponsiveHelper.containerWidth(context, 20),
                      height: ResponsiveHelper.containerWidth(context, 20),
                    ),
                  ),
                  ResponsiveHelper.sizeBoxHeightSpace(context, Dimensions.sizeBoxVerticalSpace_2),
                  // Welcome text
                  Text(
                    "Create Account",
                    style: TextStyle(
                      fontSize: ResponsiveHelper.fontSize(context, 22),
                      fontWeight: FontWeight.bold,
                      color: AppColors.primary,
                      letterSpacing: 0.5,
                    ),
                  ),
                  SizedBox(height: 6),
                  Padding(
                    padding: ResponsiveHelper.padding(
                        context, Dimensions.paddingHorizontalSmall_5 + 2, 0),
                    child: Text(
                      "Join over 10,000+ satisfied users who trust us",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: ResponsiveHelper.fontSize(context, 13),
                        fontWeight: FontWeight.w500,
                        color: Colors.black87,
                        height: 1.3,
                      ),
                    ),
                  ),
                  SizedBox(height: 15),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBottomSection() {
    return Container(
      height: ResponsiveHelper.containerHeight(context, 5),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            "Powered By",
            style: AppTextStyles.heading1(
              context,
              overrideStyle:
              TextStyle(fontSize: ResponsiveHelper.fontSize(context, 10)),
            ),
          ),
          const SizedBox(width: 8),
          GestureDetector(
            onTap: () {
              _launchURL();
              print("logo clicked ");
            },
            child: SizedBox(
              width: 100,
              child: Image.asset("assets/images/code_crafter_logo.png"),
            ),
          ),
        ],
      ),
    );
  }
}

class ModernCurveClipper extends CustomClipper<Path> {
  @override
  Path getClip(Size size) {
    Path path = Path();
    path.lineTo(0, 0);
    path.lineTo(0, size.height - 30);
    path.quadraticBezierTo(
        size.width / 2, size.height, size.width, size.height - 30);
    path.lineTo(size.width, 0);
    path.close();
    return path;
  }

  @override
  bool shouldReclip(CustomClipper<Path> oldClipper) {
    return false;
  }
}

class BottomCurveClipper extends CustomClipper<Path> {
  @override
  Path getClip(Size size) {
    Path path = Path();
    path.lineTo(0, 0);
    path.lineTo(0, size.height - 30);
    path.quadraticBezierTo(
        size.width / 2, size.height, size.width, size.height - 30);
    path.lineTo(size.width, 0);
    path.close();
    return path;
  }

  @override
  bool shouldReclip(CustomClipper<Path> oldClipper) {
    return false;
  }
}