import 'package:flutter/material.dart';
import 'package:shanya_scans/ui_helper/app_colors.dart';

import '../../../bottom_navigation_screen.dart';

class OrderFailedScreen extends StatelessWidget {
  final String reason;
  const OrderFailedScreen({super.key, required this.reason});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: AppColors.primary,
        title: const Text("Payment Failed"),
        centerTitle: true,
        elevation: 0,
      ),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Error Icon
            Icon(Icons.cancel_rounded, color: Colors.redAccent, size: 100),

            const SizedBox(height: 20),

            // Title
            const Text(
              "Oops! Transaction Failed",
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
                color: Colors.black87,
              ),
              textAlign: TextAlign.center,
            ),

            const SizedBox(height: 10),

            // Reason message
            Text(
              reason,
              style: const TextStyle(
                fontSize: 16,
                color: Colors.black54,
              ),
              textAlign: TextAlign.center,
            ),

            const SizedBox(height: 30),

            // Retry Button
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.redAccent,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
                icon: const Icon(Icons.refresh, color: Colors.white),
                label: const Text(
                  "Try Again",
                  style: TextStyle(fontSize: 16, color: Colors.white),
                ),
                onPressed: () {
                  Navigator.pop(context, true); // retry karne ke liye
                },
              ),
            ),

            const SizedBox(height: 12),

            // Go Home Button
            TextButton(
              onPressed: () {
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(
                      builder: (context) => BottomNavigationScreen()),
                );
              },
              child: const Text(
                "Back to Home",
                style: TextStyle(fontSize: 16, color: Colors.redAccent),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
