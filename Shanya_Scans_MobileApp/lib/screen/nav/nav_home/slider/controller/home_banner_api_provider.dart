import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shanya_scans/network_manager/repository.dart';
import 'package:shanya_scans/screen/nav/nav_home/slider/mdel/HomeBanner1ModelResponse.dart';
import 'package:shanya_scans/screen/nav/nav_home/slider/mdel/HomeBanner2ModelResponse.dart';
import 'package:shared_preferences/shared_preferences.dart';

class HomeBannerApiProvider with ChangeNotifier {
  final Repository _repository = Repository();

  bool _isLoading = false;
  String _errorMessage = "";
  HomeBanner1ModelResponse? _homeBanner1Model;
  HomeBanner2ModelResponse? _homeBanner2Model;

  // Getters for UI
  bool get isLoading => _isLoading;
  String get errorMessage => _errorMessage;
  HomeBanner1ModelResponse? get homeBanner1ListModel => _homeBanner1Model;
  HomeBanner2ModelResponse? get homeBanner2ListModel => _homeBanner2Model;

  /// **Set Loading State for UI**
  void _setLoadingState(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  /// **Set Error State for UI**
  void _setErrorState(String message) {
    _errorMessage = message;
    _isLoading = false;
    notifyListeners();
  }

  /// **Clear Error State**
  void _clearError() {
    _errorMessage = "";
  }

  // ============================================
  // 🎯 BANNER 1 METHODS
  // ============================================

  /// **Load Cached Banners (WITHOUT API Call)**
  Future<void> loadCachedBanners() async {
    print("📦 Loading cached banner 1...");
    final prefs = await SharedPreferences.getInstance();
    final cachedData = prefs.getString('cached_home_banners');

    if (cachedData != null) {
      try {
        _homeBanner1Model = HomeBanner1ModelResponse.fromJson(json.decode(cachedData));
        print("✅ Banner 1 cache loaded successfully");
      } catch (e) {
        print("⚠️ Banner 1 cache parse error: $e");
        _homeBanner1Model = null;
      }
    } else {
      print("⚠️ No cached banner 1 found");
      _homeBanner1Model = null;
    }

    notifyListeners();

    // ✅ Agar cache empty hai to API call karo
    if (_homeBanner1Model == null || _homeBanner1Model!.data == null || _homeBanner1Model!.data!.isEmpty) {
      print("🔄 Cache empty, fetching banner 1 from API...");
      await getHomeBanner1List();
    }
  }

  /// **Fetch Home Banner 1 List API (Only API Call)**
  Future<bool> getHomeBanner1List() async {
    print("🌐 Fetching banner 1 from API...");

    // ✅ Prevent double API calls
    if (_isLoading) {
      print("⚠️ Already loading banner 1, skipping");
      return false;
    }

    _setLoadingState(true);
    _clearError();

    try {
      var response = await _repository.getHomeBanner2ModelResponse();

      if (response.success == true && response.data != null) {
        print("✅ Banner 1 API response: ${response.data!.length} items");

        // ✅ Update cache
        final prefs = await SharedPreferences.getInstance();
        String newData = json.encode(response.toJson());
        await prefs.setString('cached_home_banners', newData);
        print("💾 Banner 1 cache updated");

        // ✅ Update state
        _homeBanner1Model = response;
        _errorMessage = "";

        _setLoadingState(false);
        return true;
      } else {
        _setErrorState(response.message ?? "Failed to fetch banner list");
        print("❌ Banner 1 API error: ${response.message}");
        return false;
      }
    } catch (error) {
      _setErrorState("API Error: $error");
      print("❌ Banner 1 exception: $error");
      return false;
    } finally {
      _setLoadingState(false);
    }
  }

  // ============================================
  // 🎯 BANNER 2 METHODS
  // ============================================

  /// **Load Cached Banners 2 (WITHOUT API Call)**
  Future<void> loadCachedBanners1() async {
    print("📦 Loading cached banner 2...");
    final prefs = await SharedPreferences.getInstance();
    final cachedData = prefs.getString('cached_home_banners_1');

    if (cachedData != null) {
      try {
        _homeBanner2Model = HomeBanner2ModelResponse.fromJson(json.decode(cachedData));
        print("✅ Banner 2 cache loaded successfully");
      } catch (e) {
        print("⚠️ Banner 2 cache parse error: $e");
        _homeBanner2Model = null;
      }
    } else {
      print("⚠️ No cached banner 2 found");
      _homeBanner2Model = null;
    }

    notifyListeners();

    // ✅ Agar cache empty hai to API call karo
    if (_homeBanner2Model == null || _homeBanner2Model!.data == null || _homeBanner2Model!.data!.isEmpty) {
      print("🔄 Cache empty, fetching banner 2 from API...");
      await getHomeBanner2List();
    }
  }

  /// **Fetch Home Banner 2 List API (Only API Call)**
  Future<bool> getHomeBanner2List() async {
    print("🌐 Fetching banner 2 from API...");

    // ✅ Prevent double API calls
    if (_isLoading) {
      print("⚠️ Already loading banner 2, skipping");
      return false;
    }

    _setLoadingState(true);
    _clearError();

    try {
      var response = await _repository.getHomeBanner1ModelResponse();

      if (response.success == true && response.data != null) {
        print("✅ Banner 2 API response: ${response.data!.length} items");

        // ✅ Update cache
        final prefs = await SharedPreferences.getInstance();
        String newData = json.encode(response.toJson());
        await prefs.setString('cached_home_banners_1', newData);
        print("💾 Banner 2 cache updated");

        // ✅ Update state
        _homeBanner2Model = response;
        _errorMessage = "";

        _setLoadingState(false);
        return true;
      } else {
        _setErrorState(response.message ?? "Failed to fetch banner 2 list");
        print("❌ Banner 2 API error: ${response.message}");
        return false;
      }
    } catch (error) {
      _setErrorState("API Error: $error");
      print("❌ Banner 2 exception: $error");
      return false;
    } finally {
      _setLoadingState(false);
    }
  }

  // ============================================
  // 🗑️ CACHE MANAGEMENT
  // ============================================

  /// **Clear All Banner Cache**
  Future<void> clearCache() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('cached_home_banners');
    await prefs.remove('cached_home_banners_1');
    _homeBanner1Model = null;
    _homeBanner2Model = null;
    notifyListeners();
    print("🗑 All banner cache cleared!");
  }

  /// **Clear Banner 1 Cache**
  Future<void> clearBanner1Cache() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('cached_home_banners');
    _homeBanner1Model = null;
    notifyListeners();
    print("🗑 Banner 1 cache cleared!");
  }

  /// **Clear Banner 2 Cache**
  Future<void> clearBanner2Cache() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('cached_home_banners_1');
    _homeBanner2Model = null;
    notifyListeners();
    print("🗑 Banner 2 cache cleared!");
  }
}