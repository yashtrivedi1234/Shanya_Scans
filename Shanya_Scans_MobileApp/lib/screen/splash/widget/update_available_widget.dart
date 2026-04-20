// import 'package:flutter/material.dart';
// import 'package:upgrader/upgrader.dart';
//
// import '../../../ui_helper/app_colors.dart';
//
// class CustomUpgradeAlert extends UpgradeAlert {
//   CustomUpgradeAlert({
//     super.key,
//     super.upgrader,
//     super.child,
//   });
//
//   @override
//   _CustomUpgradeAlertState createState() => _CustomUpgradeAlertState();
// }
//
// class _CustomUpgradeAlertState extends UpgradeAlertState<CustomUpgradeAlert> {
//   @override
//   void showTheDialog({
//     Key? key,
//     required BuildContext context,
//     required String? title,
//     required String message,
//     required String? releaseNotes,
//     required bool barrierDismissible,
//     required UpgraderMessages messages,
//   }) {
//     showDialog<void>(
//       context: context,
//       barrierDismissible: barrierDismissible,
//       builder: (BuildContext dialogContext) {
//         final currentVersion = upgrader?.currentInstalledVersion() ?? 'Unknown';
//         final storeVersion = upgrader?.currentAppStoreVersion() ?? 'Unknown';
//
//         return AlertDialog(
//           key: key,
//           shape:
//               RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
//           backgroundColor: Colors.white,
//           title: Row(
//             children: const [
//               Icon(Icons.update, color: AppColors.primary),
//               SizedBox(width: 10),
//               Text(
//                 "नया अपडेट उपलब्ध!",
//                 style: TextStyle(
//                   color: AppColors.primary,
//                   fontWeight: FontWeight.bold,
//                 ),
//               ),
//             ],
//           ),
//           content: SingleChildScrollView(
//             child: Column(
//               mainAxisSize: MainAxisSize.min,
//               crossAxisAlignment: CrossAxisAlignment.start,
//               children: [
//                 Text(message),
//                 const SizedBox(height: 16),
//                 Text("वर्तमान वर्जन: $currentVersion"),
//                 Text(
//                   "नया वर्जन: $storeVersion",
//                   style: const TextStyle(fontWeight: FontWeight.bold),
//                 ),
//                 if (releaseNotes != null && releaseNotes.isNotEmpty) ...[
//                   const SizedBox(height: 12),
//                   const Text(
//                     "What's New:",
//                     style: TextStyle(fontWeight: FontWeight.bold),
//                   ),
//                   Text(releaseNotes),
//                 ],
//               ],
//             ),
//           ),
//           actions: [
//             TextButton(
//               onPressed: () => onUserLater(dialogContext), // "Later" button
//               child: Text(messages.buttonTitleLater ?? "बाद में"),
//             ),
//             ElevatedButton(
//               style:
//                   ElevatedButton.styleFrom(backgroundColor: AppColors.primary),
//               onPressed: () => upgrader?.requestUpdate(), // Store kholega
//               child: Text(messages.buttonTitleUpdate ?? "अभी अपडेट करें"),
//             ),
//           ],
//         );
//       },
//     );
//   }
// }
