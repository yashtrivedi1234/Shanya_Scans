// import 'package:flutter/material.dart';
// import 'package:shanya_scans/base_widgets/common/custom_offer_dialog_popup.dart';
// import 'package:shanya_scans/ui_helper/storage_helper.dart';
//
// class OfferBannerWidget extends StatefulWidget {
//   const OfferBannerWidget({Key? key}) : super(key: key);
//
//   @override
//   State<OfferBannerWidget> createState() => _OfferBannerWidgetState();
// }
//
// class _OfferBannerWidgetState extends State<OfferBannerWidget> {
//   bool _hasClaimedOffer = false;
//   bool _isLoading = true;
//
//   @override
//   void initState() {
//     super.initState();
//     _checkOfferStatus();
//   }
//
//   Future<void> _checkOfferStatus() async {
//     final storage = StorageHelper();
//     await storage.init();
//
//     int orderCount = await storage.getOrderCount();
//     bool hasClaimed = await storage.getFirstTimeOfferShown();
//
//     if (mounted) {
//       setState(() {
//         _hasClaimedOffer = hasClaimed;
//         _isLoading = false;
//       });
//
//       // Show dialog only if order count < 1 and not claimed
//       if (orderCount < 1 && !hasClaimed) {
//         Future.delayed(const Duration(seconds: 1), () {
//           if (mounted) {
//             showSpecialOfferDialog(context).then((_) async {
//               // After dialog closes, mark as shown
//               await storage.setFirstTimeOfferShown(true);
//               if (mounted) {
//                 setState(() => _hasClaimedOffer = true);
//               }
//             });
//           }
//         });
//       }
//     }
//   }
//
//   @override
//   Widget build(BuildContext context) {
//     if (_isLoading) {
//       return const SizedBox.shrink();
//     }
//
//     // Agar offer claim ho chuka hai → kuch nahi dikhao
//     if (_hasClaimedOffer) {
//       return const SizedBox.shrink();
//     }
//
//     // Warna sticky bar dikhao
//     return Container(
//       margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
//       padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
//       decoration: BoxDecoration(
//         color: Colors.orange.shade50,
//         border: Border.all(color: Colors.orange),
//         borderRadius: BorderRadius.circular(8),
//       ),
//       child: Row(
//         mainAxisAlignment: MainAxisAlignment.center,
//         children: const [
//           Icon(Icons.local_offer, color: Colors.orange, size: 16),
//           SizedBox(width: 6),
//           Text(
//             "You can claim a special offer!",
//             style: TextStyle(
//               color: Colors.orange,
//               fontWeight: FontWeight.w600,
//               fontSize: 13,
//             ),
//           ),
//         ],
//       ),
//     );
//   }
// }