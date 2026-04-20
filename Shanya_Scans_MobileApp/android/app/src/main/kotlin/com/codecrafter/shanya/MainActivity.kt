package com.codecrafter.shanya

import android.content.ContentValues
import android.net.Uri
import android.os.Build
import android.os.Environment
import android.provider.MediaStore
import androidx.annotation.NonNull
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel
import io.flutter.plugin.common.MethodCall
import java.io.File

class MainActivity : FlutterActivity() {

    private val CHANNEL = "file_downloader/mediastore"

    override fun configureFlutterEngine(@NonNull flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)

        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler {
                call: MethodCall, result: MethodChannel.Result ->

            when (call.method) {
                "createDownloadUri" -> {
                    val displayName = call.argument<String>("displayName") ?: ""
                    val mimeType = call.argument<String>("mimeType") ?: ""

                    val uri = createDownloadUri(displayName, mimeType)
                    result.success(uri?.toString())
                }
                "copyToMediaStore" -> {
                    val uriString = call.argument<String>("uri") ?: ""
                    val sourcePath = call.argument<String>("sourcePath") ?: ""

                    val uri = Uri.parse(uriString)
                    val sourceFile = File(sourcePath)

                    val success = copyToMediaStore(uri, sourceFile)
                    result.success(success)
                }
                "getFilePathFromUri" -> {
                    val uriString = call.argument<String>("uri") ?: ""
                    val uri = Uri.parse(uriString)
                    val path = getDownloadPath(uri)
                    result.success(path)
                }
                else -> result.notImplemented()
            }
        }
    }

    private fun createDownloadUri(displayName: String, mimeType: String): Uri? {
        val contentValues = ContentValues().apply {
            put(MediaStore.MediaColumns.DISPLAY_NAME, displayName)
            put(MediaStore.MediaColumns.MIME_TYPE, mimeType)
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                put(MediaStore.MediaColumns.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS)
            }
        }
        return contentResolver.insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, contentValues)
    }

    private fun copyToMediaStore(targetUri: Uri, sourceFile: File): Boolean {
        return try {
            contentResolver.openOutputStream(targetUri)?.use { output ->
                sourceFile.inputStream().use { input ->
                    input.copyTo(output)
                }
            }
            true
        } catch (e: Exception) {
            false
        }
    }

    private fun getDownloadPath(uri: Uri): String {
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            uri.toString() // For Android 10+, return URI
        } else {
            // For older Android, try to get actual path
            val projection = arrayOf(MediaStore.MediaColumns.DATA)
            contentResolver.query(uri, projection, null, null, null)?.use { cursor ->
                if (cursor.moveToFirst()) {
                    val columnIndex = cursor.getColumnIndex(MediaStore.MediaColumns.DATA)
                    if (columnIndex >= 0) {
                        return cursor.getString(columnIndex) ?: uri.toString()
                    }
                }
            }
            uri.toString()
        }
    }
}