import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'package:permission_handler/permission_handler.dart';
import 'package:open_filex/open_filex.dart';
import 'package:dio/dio.dart';
import 'package:path_provider/path_provider.dart';

class FileDownloader {
  static final Dio _dio = Dio();
  static const MethodChannel _channel = MethodChannel('file_downloader/mediastore');

  static Future<void> downloadFile({
    required String url,
    required String fileName,
    required BuildContext context,
    Function(double)? onProgress,
  }) async {
    try {
      // Check internet
      if (!await _hasInternet()) {
        _showMessage(context, "No internet connection");
        return;
      }

      String? downloadedFilePath;

      if (Platform.isAndroid) {
        // Android-specific logic
        final apiLevel = await _getAndroidApiLevel();

        if (apiLevel >= 29) {
          // Android 10+ - Use MediaStore
          downloadedFilePath = await _downloadWithMediaStore(url, fileName, onProgress);
        } else {
          // Android 9 and below - Use traditional method
          if (await _requestStoragePermission(context)) {
            downloadedFilePath = await _downloadTraditional(url, fileName, onProgress);
          }
        }
      } else if (Platform.isIOS) {
        // iOS-specific logic
        downloadedFilePath = await _downloadForIOS(url, fileName, onProgress);
      }

      if (downloadedFilePath != null) {
        _showMessage(context, "File downloaded successfully", isSuccess: true);

        // Ask to open
        // if (await _askToOpen(context)) {
        //   await OpenFilex.open(downloadedFilePath);
        // }
      } else {
        _showMessage(context, "Download failed");
      }

    } catch (e) {
      _showMessage(context, "Download error: $e");
    }
  }

  // iOS download method
  static Future<String?> _downloadForIOS(String url, String fileName, Function(double)? onProgress) async {
    try {
      // iOS में files Documents directory में save होती हैं
      final documentsDir = await getApplicationDocumentsDirectory();
      final filePath = '${documentsDir.path}/$fileName';

      await _dio.download(
        url,
        filePath,
        onReceiveProgress: (received, total) {
          if (total != -1 && onProgress != null) {
            onProgress(received / total);
          }
        },
      );

      return filePath;
    } catch (e) {
      print('iOS download error: $e');
      return null;
    }
  }

  // Android MediaStore download (same as before)
  static Future<String?> _downloadWithMediaStore(String url, String fileName, Function(double)? onProgress) async {
    try {
      final uriString = await _channel.invokeMethod('createDownloadUri', {
        'displayName': fileName,
        'mimeType': _getMimeType(fileName),
      });

      if (uriString == null) return null;

      final tempDir = Directory.systemTemp;
      final tempFile = File('${tempDir.path}/temp_$fileName');

      await _dio.download(
        url,
        tempFile.path,
        onReceiveProgress: (received, total) {
          if (total != -1 && onProgress != null) {
            onProgress(received / total);
          }
        },
      );

      final success = await _channel.invokeMethod('copyToMediaStore', {
        'uri': uriString,
        'sourcePath': tempFile.path,
      });

      if (tempFile.existsSync()) {
        tempFile.deleteSync();
      }

      if (success == true) {
        return await _channel.invokeMethod('getFilePathFromUri', {
          'uri': uriString,
        }) ?? uriString;
      }

      return null;
    } catch (e) {
      print('MediaStore download error: $e');
      return null;
    }
  }

  // Android traditional download (same as before)
  static Future<String?> _downloadTraditional(String url, String fileName, Function(double)? onProgress) async {
    try {
      final downloadsPath = '/storage/emulated/0/Download';
      final downloadsDir = Directory(downloadsPath);

      if (!downloadsDir.existsSync()) {
        downloadsDir.createSync(recursive: true);
      }

      final filePath = '$downloadsPath/$fileName';

      await _dio.download(
        url,
        filePath,
        onReceiveProgress: (received, total) {
          if (total != -1 && onProgress != null) {
            onProgress(received / total);
          }
        },
      );

      return filePath;
    } catch (e) {
      print('Traditional download error: $e');
      return null;
    }
  }

  static Future<bool> _hasInternet() async {
    try {
      final result = await http.head(Uri.parse('https://www.google.com'));
      return result.statusCode == 200;
    } catch (e) {
      return false;
    }
  }

  static Future<int> _getAndroidApiLevel() async {
    if (!Platform.isAndroid) return 0;

    try {
      final version = Platform.operatingSystemVersion;
      final match = RegExp(r'API\s+(\d+)').firstMatch(version);
      return int.tryParse(match?.group(1) ?? '30') ?? 30;
    } catch (e) {
      return 30;
    }
  }

  static Future<bool> _requestStoragePermission(BuildContext context) async {
    // iOS में storage permission की जरूरत नहीं
    if (Platform.isIOS) return true;

    final status = await Permission.storage.request();

    if (status.isPermanentlyDenied) {
      final shouldOpen = await _showPermissionDialog(context);
      if (shouldOpen) {
        await openAppSettings();
      }
      return false;
    }

    return status.isGranted;
  }

  static Future<bool> _showPermissionDialog(BuildContext context) async {
    return await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text("Permission Required"),
        content: Text("Storage permission needed to download files. Open settings?"),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: Text("Cancel"),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context, true),
            child: Text("Open Settings"),
          ),
        ],
      ),
    ) ?? false;
  }

  static String _getMimeType(String fileName) {
    final ext = fileName.split('.').last.toLowerCase();
    switch (ext) {
      case 'pdf': return 'application/pdf';
      case 'jpg': case 'jpeg': return 'image/jpeg';
      case 'png': return 'image/png';
      case 'doc': return 'application/msword';
      case 'docx': return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      default: return 'application/octet-stream';
    }
  }

  static Future<bool> _askToOpen(BuildContext context) async {
    final message = Platform.isIOS
        ? "File downloaded to app documents. Open now?"
        : "File downloaded to Downloads folder. Open now?";

    return await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text("Download Complete"),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: Text("Later"),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context, true),
            child: Text("Open"),
          ),
        ],
      ),
    ) ?? false;
  }


  static void _showMessage(BuildContext context, String message, {bool isSuccess = false}) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: isSuccess ? Colors.green : Colors.red,
        duration: Duration(seconds: 3),
      ),
    );
  }

  // Better file opening with error handling
  static Future<void> _openFileWithBetterHandling(String filePath, BuildContext context) async {
    try {
      print('Attempting to open file: $filePath');

      // First verify file exists
      final file = File(filePath);
      if (!await file.exists()) {
        print('File does not exist: $filePath');
        _showMessage(context, "File not found. It may have been moved or deleted.");
        return;
      }

      print('File exists, size: ${await file.length()} bytes');

      // Try to open the file
      final result = await OpenFilex.open(filePath);
      print('OpenFilex result: ${result.type}, message: ${result.message}');

      // Handle different result types
      switch (result.type) {
        case ResultType.done:
          print('File opened successfully');
          break;

        case ResultType.noAppToOpen:
          _showMessage(context, "No app found to open this file type");
          // Try alternative opening method for Android
          if (Platform.isAndroid) {
            await _tryAlternativeOpenMethod(filePath, context);
          }
          break;

        case ResultType.permissionDenied:
          _showMessage(context, "Permission denied to open file");
          break;

        case ResultType.fileNotFound:
          _showMessage(context, "File not found at location");
          break;

        case ResultType.error:
          _showMessage(context, "Error opening file: ${result.message}");
          // Try alternative method
          if (Platform.isAndroid) {
            await _tryAlternativeOpenMethod(filePath, context);
          }
          break;

        default:
          _showMessage(context, "Could not open file");
          if (Platform.isAndroid) {
            await _tryAlternativeOpenMethod(filePath, context);
          }
      }

    } catch (e) {
      print('Error in _openFileWithBetterHandling: $e');
      _showMessage(context, "Error opening file: $e");

      // Try alternative method as last resort
      if (Platform.isAndroid) {
        await _tryAlternativeOpenMethod(filePath, context);
      }
    }
  }

  // Alternative opening method for Android using file URI
  static Future<void> _tryAlternativeOpenMethod(String filePath, BuildContext context) async {
    try {
      print('Trying alternative open method for: $filePath');

      // Show instructions to user
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          title: Text("File Downloaded"),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text("File has been downloaded successfully!"),
              SizedBox(height: 10),
              Text("Location:", style: TextStyle(fontWeight: FontWeight.bold)),
              Text(filePath, style: TextStyle(fontSize: 12, color: Colors.grey[600])),
              SizedBox(height: 10),
              Text("You can find your file in:", style: TextStyle(fontWeight: FontWeight.bold)),
              Text("• Downloads folder", style: TextStyle(fontSize: 14)),
              Text("• File Manager app", style: TextStyle(fontSize: 14)),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: Text("OK"),
            ),
          ],
        ),
      );

    } catch (e) {
      print('Alternative open method failed: $e');
    }
  }




}


















// import 'dart:io';
// import 'package:flutter/material.dart';
// import 'package:flutter/services.dart';
// import 'package:http/http.dart' as http;
// import 'package:path_provider/path_provider.dart';
// import 'package:permission_handler/permission_handler.dart';
// import 'package:open_filex/open_filex.dart';
// import 'package:dio/dio.dart';
//
// class FileDownloader {
//   static final Dio _dio = Dio();
//
//   // Platform channel for MediaStore operations
//   static const MethodChannel _channel = MethodChannel('file_downloader/mediastore');
//
//   // Main download function with better error handling
//   static Future<void> downloadAndOpenFile({
//     required String url,
//     required String fileName,
//     required BuildContext context,
//     Function(double)? onProgress,
//   }) async {
//     print('=== DOWNLOAD STARTED ===');
//     print('URL: $url');
//     print('FileName: $fileName');
//
//     try {
//       // Validate inputs first
//       if (url.isEmpty || fileName.isEmpty) {
//         _showSnackBar(context, "Invalid URL or filename");
//         return;
//       }
//
//       // Check internet connection
//       print('Checking internet connection...');
//       if (!await _hasInternetConnection()) {
//         print('ERROR: No internet connection');
//         _showSnackBar(context, "No internet connection available");
//         return;
//       }
//       print('Internet connection: OK');
//
//       // Validate URL format
//       print('Validating URL...');
//       if (!_isValidUrl(url)) {
//         print('ERROR: Invalid URL format');
//         _showSnackBar(context, "Invalid URL format");
//         return;
//       }
//       print('URL validation: OK');
//
//       // Test URL accessibility
//       print('Testing URL accessibility...');
//       if (!await _testUrlAccessibility(url)) {
//         print('ERROR: URL not accessible');
//         _showSnackBar(context, "File URL is not accessible");
//         return;
//       }
//       print('URL accessibility: OK');
//
//       // Request permissions
//       print('Requesting permissions...');
//       if (!await _requestPermissionsWithContext(context)) {
//         print('ERROR: Permission denied');
//         return;
//       }
//       print('Permissions: OK');
//
//       // Show loading dialog
//       _showLoadingDialog(context);
//
//       final androidInfo = await _getAndroidVersion();
//       print('Android API Level: $androidInfo');
//
//       String? filePath;
//       bool downloadSuccess = false;
//
//       if (Platform.isAndroid && androidInfo >= 29) {
//         // Android 10+ - Use MediaStore API
//         print('Using MediaStore API for Android 10+');
//         filePath = await _downloadUsingMediaStore(url, fileName, onProgress);
//         downloadSuccess = filePath != null;
//       } else {
//         // Android 9 and below - Use traditional method
//         print('Using traditional download method');
//         filePath = await _downloadUsingTraditionalMethod(url, fileName, onProgress);
//         downloadSuccess = filePath != null;
//       }
//
//       Navigator.of(context).pop(); // Close loading dialog
//       print('Download process completed');
//
//       if (downloadSuccess && filePath != null) {
//         // Verify file exists and has content
//         if (await _verifyDownloadedFile(filePath)) {
//           final file = File(filePath);
//           final fileSize = await file.length();
//           print('File verified successfully with size: $fileSize bytes');
//
//           _showSnackBar(context, "File downloaded successfully (${_formatFileSize(fileSize)})", isSuccess: true);
//
//           // Ask user if they want to open the file
//           final shouldOpen = await _showOpenFileDialog(context, filePath);
//           if (shouldOpen) {
//             print('Opening file...');
//             await _openFile(filePath, context);
//           }
//         } else {
//           print('ERROR: File verification failed');
//           _showSnackBar(context, "Download failed. File verification failed");
//         }
//       } else {
//         print('ERROR: Download failed');
//         _showSnackBar(context, "Download failed. Please try again");
//       }
//
//     } catch (e) {
//       print('ERROR: Exception occurred: $e');
//       Navigator.of(context).pop(); // Close loading dialog if open
//
//       String errorMessage = "Download failed";
//       if (e is DioException) {
//         print('DioException type: ${e.type}');
//         print('DioException message: ${e.message}');
//         switch (e.type) {
//           case DioExceptionType.connectionTimeout:
//           case DioExceptionType.receiveTimeout:
//             errorMessage = "Download timeout. Please check your connection";
//             break;
//           case DioExceptionType.connectionError:
//             errorMessage = "Connection error. Please check your internet";
//             break;
//           case DioExceptionType.badResponse:
//             final statusCode = e.response?.statusCode ?? 0;
//             errorMessage = "Server error ($statusCode). Please try again later";
//             break;
//           case DioExceptionType.cancel:
//             errorMessage = "Download cancelled";
//             break;
//           default:
//             errorMessage = "Download failed: Network error";
//         }
//       } else if (e is PlatformException) {
//         errorMessage = "Download failed: ${e.message ?? 'Platform error'}";
//       } else {
//         errorMessage = "Download failed: Unexpected error";
//       }
//
//       _showSnackBar(context, errorMessage);
//     }
//     print('=== DOWNLOAD PROCESS ENDED ===');
//   }
//
//   // Test URL accessibility before downloading
//   static Future<bool> _testUrlAccessibility(String url) async {
//     try {
//       final response = await _dio.head(
//         url,
//         options: Options(
//           receiveTimeout: const Duration(seconds: 10),
//           sendTimeout: const Duration(seconds: 10),
//         ),
//       );
//       return response.statusCode == 200;
//     } catch (e) {
//       print('URL accessibility test failed: $e');
//       return false;
//     }
//   }
//
//   // Verify downloaded file
//   static Future<bool> _verifyDownloadedFile(String filePath) async {
//     try {
//       final file = File(filePath);
//       if (!await file.exists()) {
//         print('File does not exist: $filePath');
//         return false;
//       }
//
//       final fileSize = await file.length();
//       if (fileSize == 0) {
//         print('File is empty: $filePath');
//         return false;
//       }
//
//       print('File verification successful: $filePath (${fileSize} bytes)');
//       return true;
//     } catch (e) {
//       print('File verification error: $e');
//       return false;
//     }
//   }
//
//   // Download using MediaStore API for Android 10+ with better error handling
//   static Future<String?> _downloadUsingMediaStore(
//       String url,
//       String fileName,
//       Function(double)? onProgress
//       ) async {
//     try {
//       print('Starting MediaStore download...');
//
//       // Create MediaStore entry
//       final uri = await _channel.invokeMethod('createDownloadUri', {
//         'displayName': fileName,
//         'mimeType': _getMimeType(fileName),
//       });
//
//       if (uri == null) {
//         print('ERROR: Failed to create MediaStore URI');
//         return null;
//       }
//
//       print('MediaStore URI created: $uri');
//
//       // Get temporary file for downloading
//       final tempDir = await getTemporaryDirectory();
//       final tempFile = File('${tempDir.path}/temp_${DateTime.now().millisecondsSinceEpoch}_$fileName');
//
//       try {
//         // Download to temporary file first
//         await _dio.download(
//           url,
//           tempFile.path,
//           onReceiveProgress: (received, total) {
//             if (total != -1) {
//               final progress = received / total;
//               print('Download progress: ${(progress * 100).toStringAsFixed(1)}%');
//               if (onProgress != null) {
//                 onProgress(progress);
//               }
//             }
//           },
//           options: Options(
//             receiveTimeout: const Duration(minutes: 10),
//             sendTimeout: const Duration(minutes: 5),
//             headers: {
//               'User-Agent': 'Shanya Scans App/1.0',
//             },
//           ),
//         );
//
//         // Verify temp file was downloaded
//         if (!await tempFile.exists() || await tempFile.length() == 0) {
//           print('ERROR: Temp file download failed or empty');
//           return null;
//         }
//
//         print('Temp file downloaded successfully: ${await tempFile.length()} bytes');
//
//         // Copy from temp file to MediaStore
//         final success = await _channel.invokeMethod('copyToMediaStore', {
//           'uri': uri,
//           'sourcePath': tempFile.path,
//         });
//
//         if (success == true) {
//           // Get the actual file path for opening
//           final actualPath = await _channel.invokeMethod('getFilePathFromUri', {
//             'uri': uri,
//           });
//           print('MediaStore download successful. File path: $actualPath');
//           return actualPath ?? uri; // Return URI if path not available
//         } else {
//           print('ERROR: Failed to copy file to MediaStore');
//           return null;
//         }
//
//       } finally {
//         // Clean up temp file
//         try {
//           if (await tempFile.exists()) {
//             await tempFile.delete();
//             print('Temp file cleaned up');
//           }
//         } catch (e) {
//           print('Error cleaning up temp file: $e');
//         }
//       }
//
//     } catch (e) {
//       print('ERROR in MediaStore download: $e');
//       return null;
//     }
//   }
//
//   // Traditional download method with better error handling
//   static Future<String?> _downloadUsingTraditionalMethod(
//       String url,
//       String fileName,
//       Function(double)? onProgress
//       ) async {
//     try {
//       print('Starting traditional download...');
//
//       // Get download directory
//       final directory = await _getDownloadDirectory();
//       if (directory == null) {
//         print('ERROR: Could not get download directory');
//         return null;
//       }
//       print('Download directory: ${directory.path}');
//
//       // Ensure directory exists
//       if (!await directory.exists()) {
//         try {
//           await directory.create(recursive: true);
//           print('Download directory created');
//         } catch (e) {
//           print('ERROR: Could not create download directory: $e');
//           return null;
//         }
//       }
//
//       // Create unique filename if file exists
//       String finalFileName = fileName;
//       String filePath = '${directory.path}/$finalFileName';
//       int counter = 1;
//
//       while (await File(filePath).exists()) {
//         final parts = fileName.split('.');
//         if (parts.length > 1) {
//           final name = parts.sublist(0, parts.length - 1).join('.');
//           final extension = parts.last;
//           finalFileName = '${name}_$counter.$extension';
//         } else {
//           finalFileName = '${fileName}_$counter';
//         }
//         filePath = '${directory.path}/$finalFileName';
//         counter++;
//       }
//
//       print('Final file path: $filePath');
//
//       // Download file using Dio with better configuration
//       await _dio.download(
//         url,
//         filePath,
//         onReceiveProgress: (received, total) {
//           if (total != -1) {
//             final progress = received / total;
//             print('Download progress: ${(progress * 100).toStringAsFixed(1)}%');
//             if (onProgress != null) {
//               onProgress(progress);
//             }
//           }
//         },
//         options: Options(
//           receiveTimeout: const Duration(minutes: 10),
//           sendTimeout: const Duration(minutes: 5),
//           headers: {
//             'User-Agent': 'Shanya Scans App/1.0',
//           },
//           followRedirects: true,
//           maxRedirects: 5,
//         ),
//       );
//
//       print('Traditional download completed: $filePath');
//       return filePath;
//
//     } catch (e) {
//       print('ERROR in traditional download: $e');
//       return null;
//     }
//   }
//
//   // Improved permission handling
//   static Future<bool> _requestPermissionsWithContext(BuildContext context) async {
//     if (!Platform.isAndroid) return true;
//
//     final androidInfo = await _getAndroidVersion();
//     print('Android API Level: $androidInfo');
//
//     if (androidInfo >= 30) {
//       // Android 11+ - Check if we can manage external storage
//       if (androidInfo >= 30) {
//         var manageStorageStatus = await Permission.manageExternalStorage.status;
//         print('Manage External Storage permission status: $manageStorageStatus');
//
//         if (manageStorageStatus.isDenied) {
//           final shouldRequest = await _showManageStoragePermissionDialog(context);
//           if (shouldRequest) {
//             manageStorageStatus = await Permission.manageExternalStorage.request();
//           }
//         }
//
//         // If manage external storage is granted, we're good
//         if (manageStorageStatus.isGranted) {
//           return true;
//         }
//       }
//
//       // Fallback: MediaStore doesn't need special permissions for Downloads folder
//       print('Android 11+: Using MediaStore (no special permission needed)');
//       return true;
//     } else if (androidInfo >= 29) {
//       // Android 10 - Use MediaStore
//       print('Android 10: Using MediaStore (no permission needed)');
//       return true;
//     } else {
//       // Android 9 and below - Request storage permission
//       print('Android 9-: Requesting storage permission');
//       var status = await Permission.storage.status;
//       print('Storage permission status: $status');
//
//       if (status.isDenied) {
//         final shouldRequest = await _showPermissionExplanationDialog(context);
//         if (!shouldRequest) return false;
//
//         status = await Permission.storage.request();
//         print('Permission request result: $status');
//       }
//
//       if (status.isPermanentlyDenied) {
//         final shouldOpenSettings = await _showOpenSettingsDialog(context);
//         if (shouldOpenSettings) {
//           await openAppSettings();
//         }
//         return false;
//       }
//
//       if (status.isDenied) {
//         _showSnackBar(context, "Storage permission is required to download files");
//         return false;
//       }
//
//       return status.isGranted;
//     }
//   }
//
//   // Show manage external storage permission dialog
//   static Future<bool> _showManageStoragePermissionDialog(BuildContext context) async {
//     return await showDialog<bool>(
//       context: context,
//       builder: (context) => AlertDialog(
//         title: const Text("Storage Access Required"),
//         content: const Text(
//             "To download files to your device's Downloads folder, this app needs access to manage external storage. "
//                 "This allows us to save files where you can easily find them."
//         ),
//         actions: [
//           TextButton(
//             onPressed: () => Navigator.of(context).pop(false),
//             child: const Text("Cancel"),
//           ),
//           TextButton(
//             onPressed: () => Navigator.of(context).pop(true),
//             child: const Text("Grant Access"),
//           ),
//         ],
//       ),
//     ) ?? false;
//   }
//
//   // Rest of the methods remain the same...
//   static String _getMimeType(String fileName) {
//     final extension = fileName.split('.').last.toLowerCase();
//     switch (extension) {
//       case 'pdf': return 'application/pdf';
//       case 'jpg': case 'jpeg': return 'image/jpeg';
//       case 'png': return 'image/png';
//       case 'gif': return 'image/gif';
//       case 'mp4': return 'video/mp4';
//       case 'mp3': return 'audio/mpeg';
//       case 'doc': return 'application/msword';
//       case 'docx': return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
//       case 'xls': return 'application/vnd.ms-excel';
//       case 'xlsx': return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
//       case 'txt': return 'text/plain';
//       case 'zip': return 'application/zip';
//       default: return 'application/octet-stream';
//     }
//   }
//
//   static String _formatFileSize(int bytes) {
//     if (bytes < 1024) return '$bytes B';
//     if (bytes < 1024 * 1024) return '${(bytes / 1024).toStringAsFixed(1)} KB';
//     if (bytes < 1024 * 1024 * 1024) return '${(bytes / (1024 * 1024)).toStringAsFixed(1)} MB';
//     return '${(bytes / (1024 * 1024 * 1024)).toStringAsFixed(1)} GB';
//   }
//
//   static Future<bool> _hasInternetConnection() async {
//     try {
//       final result = await http.head(Uri.parse('https://www.google.com')).timeout(
//         const Duration(seconds: 10),
//       );
//       return result.statusCode == 200;
//     } catch (e) {
//       print('Internet check error: $e');
//       return false;
//     }
//   }
//
//   static bool _isValidUrl(String url) {
//     try {
//       final uri = Uri.parse(url);
//       return uri.isScheme('http') || uri.isScheme('https');
//     } catch (e) {
//       return false;
//     }
//   }
//
//   static Future<bool> _showPermissionExplanationDialog(BuildContext context) async {
//     return await showDialog<bool>(
//       context: context,
//       builder: (context) => AlertDialog(
//         title: const Text("Permission Required"),
//         content: const Text(
//             "This app needs storage permission to download and save files to your device. "
//                 "Without this permission, downloaded files cannot be saved."
//         ),
//         actions: [
//           TextButton(
//             onPressed: () => Navigator.of(context).pop(false),
//             child: const Text("Cancel"),
//           ),
//           TextButton(
//             onPressed: () => Navigator.of(context).pop(true),
//             child: const Text("Grant Permission"),
//           ),
//         ],
//       ),
//     ) ?? false;
//   }
//
//   static Future<bool> _showOpenSettingsDialog(BuildContext context) async {
//     return await showDialog<bool>(
//       context: context,
//       builder: (context) => AlertDialog(
//         title: const Text("Permission Permanently Denied"),
//         content: const Text(
//             "Storage permission has been permanently denied. "
//                 "Please go to app settings and enable storage permission manually."
//         ),
//         actions: [
//           TextButton(
//             onPressed: () => Navigator.of(context).pop(false),
//             child: const Text("Cancel"),
//           ),
//           TextButton(
//             onPressed: () => Navigator.of(context).pop(true),
//             child: const Text("Open Settings"),
//           ),
//         ],
//       ),
//     ) ?? false;
//   }
//
//   static Future<int> _getAndroidVersion() async {
//     if (Platform.isAndroid) {
//       try {
//         final version = Platform.operatingSystemVersion;
//         print('Platform version string: $version');
//
//         RegExp regex = RegExp(r'API\s+(\d+)|Android\s+(\d+)\.(\d+)|SDK\s+(\d+)');
//         final match = regex.firstMatch(version);
//
//         if (match != null) {
//           if (match.group(1) != null) {
//             final apiLevel = int.tryParse(match.group(1)!) ?? 30;
//             print('Found API level: $apiLevel');
//             return apiLevel;
//           }
//         }
//
//         print('Could not parse version, assuming API 30');
//         return 30;
//       } catch (e) {
//         print('Error getting Android version: $e');
//         return 30;
//       }
//     }
//     return 0;
//   }
//
//   static Future<Directory?> _getDownloadDirectory() async {
//     try {
//       if (Platform.isAndroid) {
//         final androidInfo = await _getAndroidVersion();
//
//         // For Android 11+, try to use public downloads if we have permission
//         if (androidInfo >= 30) {
//           final hasManagePermission = await Permission.manageExternalStorage.isGranted;
//           if (hasManagePermission) {
//             final publicDownloads = Directory('/storage/emulated/0/Download');
//             if (await publicDownloads.exists()) {
//               return publicDownloads;
//             }
//           }
//         }
//
//         // For Android 10 and below with storage permission
//         if (androidInfo < 30) {
//           final hasPermission = await Permission.storage.isGranted;
//           if (hasPermission) {
//             final publicDownloads = Directory('/storage/emulated/0/Download');
//             if (await publicDownloads.exists()) {
//               return publicDownloads;
//             }
//           }
//         }
//
//         // Fallback to app-specific directory
//         final directory = await getExternalStorageDirectory();
//         if (directory != null) {
//           final downloadDir = Directory('${directory.path}/Downloads');
//           if (!await downloadDir.exists()) {
//             await downloadDir.create(recursive: true);
//           }
//           return downloadDir;
//         }
//       }
//
//       return await getApplicationDocumentsDirectory();
//     } catch (e) {
//       print('Error getting download directory: $e');
//       return await getApplicationDocumentsDirectory();
//     }
//   }
//
//   static Future<void> _openFile(String filePath, BuildContext context) async {
//     try {
//       print('Attempting to open file: $filePath');
//
//       // First verify file still exists
//       final file = File(filePath);
//       if (!await file.exists()) {
//         _showSnackBar(context, "File not found. It may have been moved or deleted.");
//         return;
//       }
//
//       final result = await OpenFilex.open(filePath);
//       print('OpenFilex result: ${result.type}, message: ${result.message}');
//
//       if (result.type != ResultType.done) {
//         switch (result.type) {
//           case ResultType.noAppToOpen:
//             _showSnackBar(context, "No app found to open this file type");
//             break;
//           case ResultType.permissionDenied:
//             _showSnackBar(context, "Permission denied to open file");
//             break;
//           case ResultType.fileNotFound:
//             _showSnackBar(context, "File not found");
//             break;
//           default:
//             _showSnackBar(context, "Could not open file");
//         }
//       } else {
//         print('File opened successfully');
//       }
//     } catch (e) {
//       print('Error opening file: $e');
//       _showSnackBar(context, "Error opening file");
//     }
//   }
//
//   static void _showLoadingDialog(BuildContext context) {
//     showDialog(
//       context: context,
//       barrierDismissible: false,
//       builder: (context) => const AlertDialog(
//         content: Row(
//           mainAxisSize: MainAxisSize.min,
//           children: [
//             CircularProgressIndicator(),
//             SizedBox(width: 20),
//             Expanded(child: Text("Downloading file...")),
//           ],
//         ),
//       ),
//     );
//   }
//
//   static Future<bool> _showOpenFileDialog(BuildContext context, String filePath) async {
//     return await showDialog<bool>(
//       context: context,
//       builder: (context) => AlertDialog(
//         title: const Text("Download Complete"),
//         content: Column(
//           mainAxisSize: MainAxisSize.min,
//           crossAxisAlignment: CrossAxisAlignment.start,
//           children: [
//             const Text("File downloaded successfully! Would you like to open it now?"),
//             const SizedBox(height: 8),
//             Text(
//               "File: ${filePath.split('/').last}",
//               style: const TextStyle(fontSize: 12, color: Colors.grey),
//             ),
//           ],
//         ),
//         actions: [
//           TextButton(
//             onPressed: () => Navigator.of(context).pop(false),
//             child: const Text("Later"),
//           ),
//           ElevatedButton(
//             onPressed: () => Navigator.of(context).pop(true),
//             child: const Text("Open Now"),
//           ),
//         ],
//       ),
//     ) ?? false;
//   }
//
//   static void _showSnackBar(BuildContext context, String message, {bool isSuccess = false}) {
//     ScaffoldMessenger.of(context).showSnackBar(
//       SnackBar(
//         content: Text(message),
//         backgroundColor: isSuccess ? Colors.green : Colors.red,
//         duration: const Duration(seconds: 4),
//         action: SnackBarAction(
//           label: "OK",
//           textColor: Colors.white,
//           onPressed: () {
//             ScaffoldMessenger.of(context).hideCurrentSnackBar();
//           },
//         ),
//       ),
//     );
//   }
// }