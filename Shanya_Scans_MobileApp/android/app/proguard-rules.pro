# --- FLUTTER / PLAY CORE SUPPORT ---
-keep class com.google.android.play.** { *; }
-dontwarn com.google.android.play.**

# --- RAZORPAY KEEP RULES ---
# Required for Google Pay
-keep class com.google.android.apps.nbu.paisa.** { *; }

# Required for Razorpay
-keep class com.razorpay.** { *; }
-dontwarn com.razorpay.**

# ✅ FLUTTER SPECIFIC RULES - CRITICAL FOR APP LOADING
-keep class io.flutter.app.** { *; }
-keep class io.flutter.plugin.** { *; }
-keep class io.flutter.util.** { *; }
-keep class io.flutter.view.** { *; }
-keep class io.flutter.** { *; }
-keep class io.flutter.plugins.** { *; }
-keep class io.flutter.embedding.** { *; }

# ✅ MEDIA STORE API - For file downloads
-keep class android.provider.MediaStore { *; }
-keep class android.provider.MediaStore$** { *; }

# ✅ DIO HTTP CLIENT
-keep class dio.** { *; }
-keep class com.dio.** { *; }
-keepclassmembers class * {
    @retrofit2.http.* <methods>;
}

# ✅ NETWORK SECURITY
-keep class javax.net.ssl.** { *; }
-keep class org.apache.http.** { *; }
-keep class okhttp3.** { *; }
-dontwarn okhttp3.**
-dontwarn javax.annotation.**

# ✅ JSON SERIALIZATION
-keepattributes *Annotation*
-keepattributes SourceFile,LineNumberTable
-keepattributes Signature
-keepattributes InnerClasses
-keepattributes EnclosingMethod

-keepclassmembers class ** {
    @com.google.gson.annotations.SerializedName <fields>;
    @com.fasterxml.jackson.annotation.JsonProperty <fields>;
}

# ✅ NATIVE METHODS - CRITICAL for Android 15
-keepclasseswithmembernames class * {
    native <methods>;
}

# ✅ ANDROID COMPONENTS - FIXED ERROR HERE
-keep public class * extends android.app.Activity
-keep public class * extends android.app.Application
-keep public class * extends android.app.Service
-keep public class * extends android.content.BroadcastReceiver
-keep public class * extends android.content.ContentProvider

# ✅ FILE OPERATIONS - For download functionality
-keep class * implements java.io.Serializable {
    static final long serialVersionUID;
    private static final java.io.ObjectStreamField[] serialPersistentFields;
    !static !transient <fields>;
    private void writeObject(java.io.ObjectOutputStream);
    private void readObject(java.io.ObjectInputStream);
    java.lang.Object writeReplace();
    java.lang.Object readResolve();
}

# ✅ PREVENT CRASHES
-dontwarn java.lang.invoke**
-dontwarn **$$serializer
-dontwarn javax.**
-dontwarn sun.misc.Unsafe
-dontwarn com.google.common.util.concurrent.ListenableFuture

# ✅ ANDROID 15 EDGE-TO-EDGE COMPATIBILITY
-keep class androidx.window.** { *; }
-keep class androidx.core.** { *; }

# ✅ KEEP MAIN APPLICATION CLASS
-keep class com.codecrafter.shanya.MainActivity { *; }
-keep class com.codecrafter.shanya.MainApplication { *; }