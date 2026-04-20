////////// EMAIL LOGIN FORM SAME AS BEFORE WITH MOBILE OTP //////

////////// EMAIL LOGIN FORM SAME AS BEFORE WITH MOBILE OTP //////


// import 'package:flutter/material.dart';
// import 'package:shanya_scans/screen/auth/widget/login_form_widget.dart';
// import 'package:shanya_scans/screen/auth/widget/mobile_otp_form_widget.dart';
// import 'package:shanya_scans/util/dimensions.dart';
// import 'package:shanya_scans/util/image_loader_util.dart';
// import 'package:url_launcher/url_launcher.dart';
// import '../../ui_helper/responsive_helper.dart';
// import '../../ui_helper/app_colors.dart';
// import '../../ui_helper/app_text_styles.dart';
//
// class LoginScreen extends StatefulWidget {
//   @override
//   _LoginScreenState createState() => _LoginScreenState();
// }
//
// class _LoginScreenState extends State<LoginScreen> with SingleTickerProviderStateMixin {
//   final PageController _pageController = PageController();
//   int _currentPage = 0;
//   late TabController _tabController;
//
//   final Uri _url = Uri.parse('https://codecrafter.co.in/');
//
//   Future<void> _launchURL() async {
//     if (!await launchUrl(_url, mode: LaunchMode.externalApplication)) {
//       throw Exception('Could not launch $_url');
//     }
//   }
//
//   @override
//   void initState() {
//     super.initState();
//     _tabController = TabController(length: 2, vsync: this);
//   }
//
//   @override
//   void dispose() {
//     _pageController.dispose();
//     _tabController.dispose();
//     super.dispose();
//   }
//
//   @override
//   Widget build(BuildContext context) {
//     print("🔄 LoginScreen rebuild ho raha hai!");
//
//     return Scaffold(
//       backgroundColor: AppColors.whiteColor,
//       body: SafeArea(
//         child: Column(
//           children: [
//             Expanded(
//               child: SingleChildScrollView(
//                 child: Column(
//                   children: [
//                     _buildEnhancedTopSection(),
//                     _buildTabSection(),
//                     SizedBox(
//                       height: MediaQuery.of(context).size.height * 0.55,
//                       child: TabBarView(
//                         controller: _tabController,
//                         children: [
//                           SingleChildScrollView(
//                             child: Padding(
//                               padding: ResponsiveHelper.padding(context,
//                                   Dimensions.paddingHorizontalSmall_5, 0),
//                               child: LoginFormWidget(),
//                             ),
//                           ),
//                           SingleChildScrollView(
//                             child: Padding(
//                               padding: ResponsiveHelper.padding(context,
//                                   Dimensions.paddingHorizontalSmall_5, 0),
//                               child: MobileOTPFormWidget(),
//                             ),
//                           ),
//                         ],
//                       ),
//                     ),
//                   ],
//                 ),
//               ),
//             ),
//             _buildBottomSection(),
//           ],
//         ),
//       ),
//     );
//   }
//
//   /// ✅ Enhanced Top Section with Modern Design
//   Widget _buildEnhancedTopSection() {
//     return ClipPath(
//       clipper: ModernCurveClipper(),
//       child: Container(
//         width: double.infinity,
//         decoration: BoxDecoration(
//           gradient: LinearGradient(
//             begin: Alignment.topCenter,
//             end: Alignment.bottomCenter,
//             colors: [
//               AppColors.primary.withOpacity(0.1),
//               AppColors.lightYellowColor,
//             ],
//           ),
//         ),
//         height: ResponsiveHelper.containerHeight(context, 34),
//         child: Stack(
//           children: [
//             // Decorative circles
//             Positioned(
//               top: -50,
//               right: -50,
//               child: Container(
//                 width: 150,
//                 height: 150,
//                 decoration: BoxDecoration(
//                   shape: BoxShape.circle,
//                   color: AppColors.primary.withOpacity(0.1),
//                 ),
//               ),
//             ),
//             Positioned(
//               bottom: 30,
//               left: -30,
//               child: Container(
//                 width: 100,
//                 height: 100,
//                 decoration: BoxDecoration(
//                   shape: BoxShape.circle,
//                   color: Colors.white.withOpacity(0.3),
//                 ),
//               ),
//             ),
//             // Main content
//             Center(
//               child: Column(
//                 mainAxisAlignment: MainAxisAlignment.center,
//                 crossAxisAlignment: CrossAxisAlignment.center,
//                 children: [
//                   SizedBox(height: ResponsiveHelper.containerHeight(context, 2)),
//                   // Logo with shadow
//                   Container(
//                     padding: EdgeInsets.all(15),
//                     decoration: BoxDecoration(
//                       shape: BoxShape.circle,
//                       color: Colors.white,
//                       boxShadow: [
//                         BoxShadow(
//                           color: AppColors.primary.withOpacity(0.2),
//                           blurRadius: 20,
//                           spreadRadius: 5,
//                         ),
//                       ],
//                     ),
//                     child: ImageLoaderUtil.assetImage(
//                       'assets/images/loginimage.png',
//                       width: ResponsiveHelper.containerWidth(context, 20),
//                       height: ResponsiveHelper.containerWidth(context, 20),
//                     ),
//                   ),
//                   ResponsiveHelper.sizeBoxHeightSpace(context, Dimensions.sizeBoxVerticalSpace_2),
//                   // Welcome text
//                   Text(
//                     "Welcome Back!",
//                     style: TextStyle(
//                       fontSize: ResponsiveHelper.fontSize(context, 22),
//                       fontWeight: FontWeight.bold,
//                       color: AppColors.primary,
//                       letterSpacing: 0.5,
//                     ),
//                   ),
//                   SizedBox(height: 6),
//                   Padding(
//                     padding: ResponsiveHelper.padding(
//                         context, Dimensions.paddingHorizontalSmall_5 + 2, 0),
//                     child: Text(
//                       "Join over 10,000+ satisfied users who trust us",
//                       textAlign: TextAlign.center,
//                       style: TextStyle(
//                         fontSize: ResponsiveHelper.fontSize(context, 13),
//                         fontWeight: FontWeight.w500,
//                         color: Colors.black87,
//                         height: 1.3,
//                       ),
//                     ),
//                   ),
//                   SizedBox(height: 15),
//                 ],
//               ),
//             ),
//           ],
//         ),
//       ),
//     );
//   }
//
//   /// ✅ Tab Section with Modern Design
//   Widget _buildTabSection() {
//     return Container(
//       margin: EdgeInsets.symmetric(
//         horizontal: ResponsiveHelper.containerWidth(context, 5),
//         vertical: ResponsiveHelper.containerHeight(context, 2),
//       ),
//       decoration: BoxDecoration(
//         color: AppColors.lightYellowColor.withOpacity(0.3),
//         borderRadius: BorderRadius.circular(15),
//         border: Border.all(color: AppColors.primary.withOpacity(0.1)),
//       ),
//       child: TabBar(
//         controller: _tabController,
//         indicator: BoxDecoration(
//           gradient: LinearGradient(
//             colors: [AppColors.primary, AppColors.primary.withOpacity(0.8)],
//           ),
//           borderRadius: BorderRadius.circular(12),
//           boxShadow: [
//             BoxShadow(
//               color: AppColors.primary.withOpacity(0.3),
//               blurRadius: 8,
//               offset: Offset(0, 4),
//             ),
//           ],
//         ),
//         labelColor: Colors.white,
//         unselectedLabelColor: AppColors.primary,
//         labelStyle: TextStyle(
//           fontSize: ResponsiveHelper.fontSize(context, 13),
//           fontWeight: FontWeight.bold,
//         ),
//         unselectedLabelStyle: TextStyle(
//           fontSize: ResponsiveHelper.fontSize(context, 13),
//           fontWeight: FontWeight.w500,
//         ),
//         indicatorSize: TabBarIndicatorSize.tab,
//         dividerColor: Colors.transparent,
//         tabs: [
//           Tab(
//             child: Row(
//               mainAxisAlignment: MainAxisAlignment.center,
//               children: [
//                 Icon(Icons.email_outlined, size: 16),
//                 SizedBox(width: 6),
//                 Text("Email/Phone"),
//               ],
//             ),
//           ),
//           Tab(
//             child: Row(
//               mainAxisAlignment: MainAxisAlignment.center,
//               children: [
//                 Icon(Icons.phone_android, size: 16),
//                 SizedBox(width: 6),
//                 Text("Mobile OTP"),
//               ],
//             ),
//           ),
//         ],
//       ),
//     );
//   }
//
//   Widget _buildBottomSection() {
//     return Container(
//       height: ResponsiveHelper.containerHeight(context, 5),
//       child: Row(
//         mainAxisAlignment: MainAxisAlignment.center,
//         children: [
//           Text(
//             "Powered By",
//             style: AppTextStyles.heading1(
//               context,
//               overrideStyle: TextStyle(
//                   fontSize: ResponsiveHelper.fontSize(
//                       context, Dimensions.fontSize10)),
//             ),
//           ),
//           ResponsiveHelper.sizeboxWidthlSpace(
//               context, Dimensions.sizeBoxHorizontalSpace_2),
//           GestureDetector(
//             onTap: () {
//               _launchURL();
//               print("logo clicked ");
//             },
//             child: Container(
//               width: ResponsiveHelper.containerWidth(context, 20),
//               child: ImageLoaderUtil.assetImage("assets/images/code_crafter_logo.png"),
//             ),
//           ),
//         ],
//       ),
//     );
//   }
// }
//
// /// ✅ Modern Curve Clipper
// class ModernCurveClipper extends CustomClipper<Path> {
//   @override
//   Path getClip(Size size) {
//     Path path = Path();
//     path.lineTo(0, 0);
//     path.lineTo(0, size.height - 50);
//
//     // Smooth wave curve
//     path.quadraticBezierTo(
//       size.width * 0.25, size.height - 20,
//       size.width * 0.5, size.height - 30,
//     );
//     path.quadraticBezierTo(
//       size.width * 0.75, size.height - 40,
//       size.width, size.height - 50,
//     );
//
//     path.lineTo(size.width, 0);
//     path.close();
//     return path;
//   }
//
//   @override
//   bool shouldReclip(CustomClipper<Path> oldClipper) => false;
// }