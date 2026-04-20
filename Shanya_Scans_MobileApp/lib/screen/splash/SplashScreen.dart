import 'dart:io';

import 'package:app_tracking_transparency/app_tracking_transparency.dart';
import 'package:flutter/material.dart';
import 'package:package_info_plus/package_info_plus.dart';
import 'package:shanya_scans/deliveryBoy/screen/deleivery_boy_dashboard.dart';
import 'package:shanya_scans/screen/other/screen/user_selection_screen.dart';
import 'package:shanya_scans/screen/splash/screen/NoInternetScreen.dart';
import 'package:provider/provider.dart';

import '../../bottom_navigation_screen.dart';
import '../../ui_helper/app_colors.dart';
import '../../ui_helper/responsive_helper.dart';
import '../../ui_helper/storage_helper.dart';
import '../../util/config.dart';
import '../cart/controller/cart_list_api_provider.dart';
import 'controller/network_provider_controller.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  late final ConfigUtils _configUtils;

  @override
  void initState() {
    super.initState();
    _initTrackingThenCheckConnectivity();
  }

  Future<void> _initTrackingThenCheckConnectivity() async {
    if (Platform.isIOS) {
      final status = await AppTrackingTransparency.trackingAuthorizationStatus;
      if (status == TrackingStatus.notDetermined) {
        // Show pre-permission alert
        await showDialog(
          context: context,
          builder: (_) => AlertDialog(
            title: const Text('Permission Required'),
            content: const Text(
              'We use location data to help track deliveries and assign test collection agents. '
              'This data is only used to improve service quality.',
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(context),
                child: const Text('Continue'),
              ),
            ],
          ),
        );
        // Then request ATT
        await AppTrackingTransparency.requestTrackingAuthorization();
      }
    }

    _checkConnectivity();
  }

  void _checkConnectivity() async {
    await Future.delayed(const Duration(seconds: 1));

    // ✅ NEW: Version check for force logout on update
    PackageInfo packageInfo = await PackageInfo.fromPlatform();
    String currentVersion = packageInfo.version;

    String? savedVersion = await StorageHelper().getAppVersion(); // ← await add kiya

    // Agar version nayi hai → force logout
    if (savedVersion == null || savedVersion != currentVersion) {
      await StorageHelper().logout();
      await StorageHelper().setAppVersion(currentVersion);
      print("🔄 App updated to $currentVersion → Forced logout for fresh OTP login");
      // if (mounted) {
      //   ScaffoldMessenger.of(context).showSnackBar(
      //      SnackBar(
      //       content: Text("App updated! Please login again with your phone number."),
      //       backgroundColor: AppColors.primary ,
      //       duration: Duration(seconds: 5),
      //     ),
      //   );
      // }
    }

    bool isConnected = Provider.of<NetworkProvider>(context, listen: false).isConnected;

    if (!isConnected) {
      _navigateTo(NoInternetScreen());
      return;
    }

    await Provider.of<CartProvider>(context, listen: false).loadCartItems();
    final userRole = StorageHelper().getRole();

    print("✅ User Role === ${userRole}");
    if (userRole == "user") {
      final isOtpVerified = await StorageHelper().getOtpVerified();
      final userId = StorageHelper().getUserId();

      if (isOtpVerified && userId.isNotEmpty) {
        print("✅ User logged in completely - Going to Home");
        _navigateTo(const BottomNavigationScreen());
      } else {
        print(
            "⚠️ OTP: $isOtpVerified, UserId: $userId - Going to UserSelection");
        if (isOtpVerified && (userId == null || userId.isEmpty)) {
          await StorageHelper().setOtpVerified(false);
          print("🧹 Cleared incomplete OTP verification");
        }
        _navigateTo(UserSelectionScreen());
      }
    } else if (userRole == "delivery_boy") {
      // final isAcceptedDisclosure = await StorageHelper().isSalesLocationDisclosureAccepted();

      // if (isAcceptedDisclosure) {
      _configUtils = ConfigUtils();
      print(
          "Delivery Boy: Disclosure accepted. Checking actual location status...");
      Map<String, dynamic> locationData =
          await _configUtils.getSingleLocation();

      if (locationData.isNotEmpty && locationData["latitude"] != null) {
        print("Delivery Boy: Location obtained. Navigating to Dashboard.");
        _navigateTo(DeliveryBoyDashboardScreen());
      } else {
        print(
            "Delivery Boy: Location not obtainable. Navigating to User Selection.");
        _navigateTo(DeliveryBoyDashboardScreen());
      }
      // } else {
      //   // If disclosure not accepted, go to user selection (where login/disclosure happens)
      //   print(
      //       "Delivery Boy: Disclosure not yet accepted. Navigating to User Selection.");
      //   _navigateTo(UserSelectionScreen());
      // }
    } else {
      // No role or unknown role
      print(
          "No user role found or unknown role. Navigating to User Selection.");
      _navigateTo(UserSelectionScreen());
    }
  }

  void _navigateTo(Widget screen) {
    Navigator.of(context)
        .pushReplacement(MaterialPageRoute(builder: (_) => screen));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.whiteColor,
      body: Stack(
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Center(
                child: Image.asset(
                  "assets/images/logo.png",
                  width: ResponsiveHelper.containerWidth(context, 40),
                  height: ResponsiveHelper.containerWidth(context, 40),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
