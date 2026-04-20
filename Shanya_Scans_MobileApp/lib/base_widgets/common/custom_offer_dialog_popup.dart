import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:shanya_scans/ui_helper/app_colors.dart';

import '../../ui_helper/app_text_styles.dart';
import '../../ui_helper/responsive_helper.dart';
import '../../ui_helper/storage_helper.dart';

// ============= ANIMATED MODERN OFFER DIALOG =============
class ModernOfferDialog extends StatefulWidget {
  const ModernOfferDialog({Key? key}) : super(key: key);


  @override
  State<ModernOfferDialog> createState() => _ModernOfferDialogState();
}

class _ModernOfferDialogState extends State<ModernOfferDialog>
    with TickerProviderStateMixin {
  late AnimationController _controller;
  late AnimationController _pulseController;
  late AnimationController _sloganController;
  late Animation<double> _scaleAnimation;
  late Animation<double> _fadeAnimation;
  late Animation<double> _pulseAnimation;
  late Animation<Offset> _sloganSlideAnimation;
  late Animation<double> _sloganFadeAnimation;

  @override
  void initState() {
    super.initState();

    // Main dialog animation
    _controller = AnimationController(
      duration: Duration(milliseconds: 600),
      vsync: this,
    );

    // Pulse animation for badge
    _pulseController = AnimationController(
      duration: Duration(milliseconds: 1500),
      vsync: this,
    )..repeat(reverse: true);

    // Slogan text animation
    _sloganController = AnimationController(
      duration: Duration(milliseconds: 800),
      vsync: this,
    );

    _scaleAnimation = CurvedAnimation(
      parent: _controller,
      curve: Curves.elasticOut,
    );

    _fadeAnimation = CurvedAnimation(
      parent: _controller,
      curve: Curves.easeIn,
    );

    _pulseAnimation = Tween<double>(begin: 1.0, end: 1.1).animate(
      CurvedAnimation(parent: _pulseController, curve: Curves.easeInOut),
    );

    _sloganSlideAnimation = Tween<Offset>(
      begin: Offset(0, -0.5),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _sloganController,
      curve: Curves.elasticOut,
    ));

    _sloganFadeAnimation = CurvedAnimation(
      parent: _sloganController,
      curve: Curves.easeIn,
    );

    // Start animations
    _controller.forward();
    Future.delayed(Duration(milliseconds: 300), () {
      _sloganController.forward();
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    _pulseController.dispose();
    _sloganController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ScaleTransition(
      scale: _scaleAnimation,
      child: FadeTransition(
        opacity: _fadeAnimation,
        child: Dialog(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
          child: Stack(
            clipBehavior: Clip.none,
            children: [
              // Main Dialog Content
              Container(
                padding: EdgeInsets.fromLTRB(20, 35, 20, 25),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(20),
                  gradient: LinearGradient(
                    colors: [
                      AppColors.primary,
                      AppColors.primary,
                      AppColors.primary,
                    ],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: AppColors.primary.withOpacity(0.4),
                      blurRadius: 20,
                      spreadRadius: 2,
                    ),
                  ],
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    // ✅ Animated Badge with Welcome Slogan
                    ScaleTransition(
                      scale: _pulseAnimation,
                      child: SlideTransition(
                        position: _sloganSlideAnimation,
                        child: FadeTransition(
                          opacity: _sloganFadeAnimation,
                          child: Container(
                            padding: EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                            decoration: BoxDecoration(
                              // gradient: LinearGradient(
                              //   colors: [Colors.amber, Colors.orange],
                              // ),
                              // borderRadius: BorderRadius.circular(20),
                              // boxShadow: [
                              //   BoxShadow(
                              //     color: Colors.amber.withOpacity(0.5),
                              //     blurRadius: 10,
                              //     spreadRadius: 1,
                              //   ),
                              // ],
                            ),
                            child: Column(
                              children: [
                                Row(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    Icon(Icons.celebration, color: AppColors.yellowColor, size: 20),
                                    SizedBox(width: 8),
                                    Text(
                                      "Congratulations",
                                      style: AppTextStyles.heading1(
                                        context,
                                        overrideStyle: TextStyle(
                                          color: AppColors.yellowColor,
                                          fontSize: ResponsiveHelper.fontSize(
                                              context, 16),
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                                // SizedBox(height: 4),
                                // Text(
                                //   "Welcome to Shanya Scans!",
                                //   style: TextStyle(
                                //     fontSize: 11,
                                //     color: Colors.white.withOpacity(0.9),
                                //     fontWeight: FontWeight.w500,
                                //   ),
                                // ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ),
                    // SizedBox(height: 20),

                    // SPECIAL OFFER Text
                    // Row(
                    //   mainAxisSize: MainAxisSize.min,
                    //   children: [
                    //     Icon(Icons.stars_rounded, color: Colors.white, size: 18),
                    //     SizedBox(width: 6),
                    //     Text(
                    //       "SPECIAL OFFER",
                    //       style: TextStyle(
                    //         fontSize: 13,
                    //         fontWeight: FontWeight.bold,
                    //         color: Colors.white,
                    //         letterSpacing: 1.2,
                    //       ),
                    //     ),
                    //   ],
                    // ),
                    // SizedBox(height: 20),

                    // Amount with animation
                    TweenAnimationBuilder<double>(
                      tween: Tween(begin: 0.0, end: 1.0),
                      duration: Duration(milliseconds: 800),
                      builder: (context, value, child) {
                        return Opacity(
                          opacity: value,
                          child: Transform.translate(
                            offset: Offset(0, 20 * (1 - value)),
                            child: child,
                          ),
                        );
                      },
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            "₹",
                            style: TextStyle(
                              fontSize: ResponsiveHelper.iconSize(context, 30),
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                          Text(
                            "200",
                            style: TextStyle(
                              fontSize: 56,
                              fontWeight: FontWeight.w900,
                              color: Colors.white,
                              height: 1,
                              shadows: [
                                Shadow(
                                  color: Colors.black26,
                                  offset: Offset(2, 2),
                                  blurRadius: 4,
                                ),
                              ],
                            ),
                          ),
                          SizedBox(width: 10),
                          Padding(
                            padding: EdgeInsets.only(top: 12),
                            child: Container(
                              padding: EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                              decoration: BoxDecoration(
                                color: Colors.red,
                                borderRadius: BorderRadius.circular(6),
                              ),
                              child: Text(
                                "OFF",
                                style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white,
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    SizedBox(height: 8),
                    Text(
                      "on your first booking",
                      style: AppTextStyles.heading1(
                        context,
                        overrideStyle: TextStyle(
                          color: AppColors.whiteColor,
                          fontSize: ResponsiveHelper.fontSize(
                              context, 14),
                        ),
                      ),
                    ),
                    SizedBox(height: 20),

                    // Coupon Card
                    Container(
                      padding: EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(12),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.1),
                            blurRadius: 10,
                            offset: Offset(0, 4),
                          ),
                        ],
                      ),
                      child: Column(
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(Icons.confirmation_number_outlined,
                                  color: AppColors.primary, size: 18),
                              SizedBox(width: 8),
                              Text(
                                "Coupon Code",
                                style: TextStyle(
                                  fontSize: 13,
                                  color: Colors.black54,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ],
                          ),
                          SizedBox(height: 12),
                          Container(
                            padding: EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                            decoration: BoxDecoration(
                              color: AppColors.primary.withOpacity(0.1),
                              borderRadius: BorderRadius.circular(8),
                              border: Border.all(
                                color: AppColors.primary.withOpacity(0.3),
                                width: 1.5,
                                style: BorderStyle.solid,
                              ),
                            ),
                            child: Text(
                              "FIRST200",
                              style: TextStyle(
                                fontSize: 24,
                                fontWeight: FontWeight.bold,
                                color: AppColors.primary,
                                letterSpacing: 2,
                              ),
                            ),
                          ),
                          SizedBox(height: 14),
                          SizedBox(
                            width: double.infinity,
                            child: ElevatedButton.icon(
                              style: ElevatedButton.styleFrom(
                                backgroundColor: AppColors.primary,
                                foregroundColor: Colors.white,
                                padding: EdgeInsets.symmetric(vertical: 14),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(10),
                                ),
                                elevation: 0,
                              ),
                              onPressed: () async {
                                Clipboard.setData(ClipboardData(text: "SS200"));
                                Navigator.pop(context,true);
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: Row(
                                      children: [
                                        Icon(Icons.check_circle, color: Colors.white),
                                        SizedBox(width: 8),
                                        Text("Coupon Code Copied! Offer Claimed."),
                                      ],
                                    ),
                                    backgroundColor: Colors.green,
                                    behavior: SnackBarBehavior.floating,
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(10),
                                    ),
                                  ),
                                );
                              },
                              icon: Icon(Icons.copy_rounded, size: 18),
                              label: Text(
                                "Copy Code",
                                style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 15,
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),

              // ✅ Close Button - Top Right Corner
              Positioned(
                top: 10,
                right: 10,
                child: GestureDetector(
                  onTap: () => Navigator.pop(context,true),
                  child: Container(
                    padding: EdgeInsets.all(6),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.3),
                      shape: BoxShape.circle,
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black12,
                          blurRadius: 4,
                        ),
                      ],
                    ),
                    child: Icon(
                      Icons.close_rounded,
                      color: Colors.white,
                      size: 20,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}





// ============= MINIMAL VERSION WITH IMPROVEMENTS =============

class MinimalOfferDialog extends StatefulWidget {
  const MinimalOfferDialog({Key? key}) : super(key: key);

  @override
  State<MinimalOfferDialog> createState() => _MinimalOfferDialogState();
}

class _MinimalOfferDialogState extends State<MinimalOfferDialog>
    with TickerProviderStateMixin {
  late AnimationController _controller;
  late AnimationController _welcomeController;
  late Animation<double> _scaleAnimation;
  late Animation<Offset> _welcomeSlideAnimation;
  late Animation<double> _welcomeFadeAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: Duration(milliseconds: 500),
      vsync: this,
    );

    _welcomeController = AnimationController(
      duration: Duration(milliseconds: 700),
      vsync: this,
    );

    _scaleAnimation = CurvedAnimation(
      parent: _controller,
      curve: Curves.elasticOut,
    );

    _welcomeSlideAnimation = Tween<Offset>(
      begin: Offset(0, -0.3),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _welcomeController,
      curve: Curves.easeOut,
    ));

    _welcomeFadeAnimation = CurvedAnimation(
      parent: _welcomeController,
      curve: Curves.easeIn,
    );

    _controller.forward();
    Future.delayed(Duration(milliseconds: 200), () {
      _welcomeController.forward();
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    _welcomeController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ScaleTransition(
      scale: _scaleAnimation,
      child: Stack(
        alignment: Alignment.center,
        children: [
          Dialog(
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            child: Container(
              padding: EdgeInsets.fromLTRB(24, 40, 24, 24),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(16),
                gradient: LinearGradient(
                  colors: [
                    Color(0xFF1E40AF),
                    Color(0xFF3B82F6),
                  ],
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                ),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Welcome Animation
                  SlideTransition(
                    position: _welcomeSlideAnimation,
                    child: FadeTransition(
                      opacity: _welcomeFadeAnimation,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.emoji_emotions, color: Colors.amber, size: 24),
                          SizedBox(width: 8),
                          Text(
                            "Welcome!",
                            style: TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  SizedBox(height: 16),

                  Container(
                    padding: EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: Colors.amber,
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Text(
                      "SPECIAL OFFER",
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF1E40AF),
                      ),
                    ),
                  ),
                  SizedBox(height: 20),
                  RichText(
                    text: TextSpan(
                      children: [
                        TextSpan(
                          text: "₹200 ",
                          style: TextStyle(
                            fontSize: 42,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                        TextSpan(
                          text: "OFF",
                          style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                            color: Colors.redAccent,
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 8),
                  Text(
                    "First booking only",
                    style: TextStyle(color: Colors.white60, fontSize: 12),
                  ),
                  SizedBox(height: 20),
                  Container(
                    width: double.infinity,
                    padding: EdgeInsets.all(14),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Column(
                      children: [
                        Text(
                          "FIRST200",
                          style: TextStyle(
                            fontSize: 22,
                            fontWeight: FontWeight.bold,
                            color: Colors.orange.shade800,
                            letterSpacing: 2,
                          ),
                        ),
                        SizedBox(height: 12),
                        SizedBox(
                          width: double.infinity,
                          child: ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Color(0xFF1E40AF),
                              foregroundColor: Colors.white,
                              padding: EdgeInsets.symmetric(vertical: 12),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(8),
                              ),
                            ),
                            onPressed: () {
                              Clipboard.setData(ClipboardData(text: "FIRST200"));
                              Navigator.pop(context);
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text("Code Copied!"),
                                  backgroundColor: Colors.green,
                                  duration: Duration(seconds: 1),
                                ),
                              );
                            },
                            child: Text(
                              "COPY CODE",
                              style: TextStyle(fontWeight: FontWeight.bold),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Close button above dialog
          Positioned(
            top: MediaQuery.of(context).size.height * 0.5 - 220,
            right: MediaQuery.of(context).size.width * 0.5 - 160,
            child: GestureDetector(
              onTap: () => Navigator.pop(context),
              child: Container(
                padding: EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: Colors.white,
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black26,
                      blurRadius: 8,
                    ),
                  ],
                ),
                child: Icon(
                  Icons.close,
                  color: Color(0xFF1E40AF),
                  size: 22,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// ============= SHOW DIALOG FUNCTIONS =============

Future<bool?> showSpecialOfferDialog(BuildContext context) async {
  return await showDialog(
    context: context,
    barrierDismissible: true,
    builder: (BuildContext context) => ModernOfferDialog(),
  );
}

void showModernOfferDialog(BuildContext context) {
  showDialog(
    context: context,
    barrierDismissible: true,
    builder: (BuildContext context) => ModernOfferDialog(),
  );
}

void showMinimalOfferDialog(BuildContext context) {
  showDialog(
    context: context,
    barrierDismissible: true,
    builder: (BuildContext context) => MinimalOfferDialog(),
  );
}