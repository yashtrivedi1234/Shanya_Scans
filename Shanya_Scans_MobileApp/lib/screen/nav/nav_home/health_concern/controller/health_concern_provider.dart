import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:shanya_scans/network_manager/repository.dart';
import 'package:shanya_scans/screen/nav/nav_home/health_concern/model/HealthConcernPacakageTagModel.dart';
import '../model/HealthConcernDetailModel.dart';

class HealthConcernApiProvider with ChangeNotifier {
  final Repository _repository = Repository();

  bool _isLoading = false;
  String _errorMessage = "";
  HealthConcernPackageTagModel? _healthConcernPackageTagModel;
  HealthConcernDetailModel? _healthConcernDetailModel;

  // UI Getters
  bool get isLoading => _isLoading;
  String get errorMessage => _errorMessage;
  HealthConcernPackageTagModel? get healthConcernPackageTagListModel => _healthConcernPackageTagModel;
  HealthConcernDetailModel? get healthConcernDetailModel => _healthConcernDetailModel;

  static const String _cacheKey = 'cached_health_concern_list';
  static const String _cacheTimeKey = 'cached_health_concern_list_time';

  HealthConcernApiProvider() {
    loadCachedHomeHealthConcern();
  }

  // ------------------------------
  // LOADING STATE
  // ------------------------------
  void _setLoadingState(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void _setErrorState(String message) {
    _errorMessage = message;
    _isLoading = false;
    notifyListeners();
  }

  void _clearError() {
    _errorMessage = "";
  }

  // ------------------------------
  // LOAD CACHED DATA FIRST
  // ------------------------------
  Future<void> loadCachedHomeHealthConcern({bool forceRefresh = false}) async {
    final prefs = await SharedPreferences.getInstance();

    final cachedData = prefs.getString(_cacheKey);
    final cachedTime = prefs.getInt(_cacheTimeKey);

    print("📦 Loading cached Health Concern list...");

    if (cachedData != null) {
      try {
        _healthConcernPackageTagModel =
            HealthConcernPackageTagModel.fromJson(json.decode(cachedData));
        notifyListeners();
        print("✅ Cached Health Concern loaded (${_healthConcernPackageTagModel!.data!.length} items)");
      } catch (e) {
        print("⚠️ Cache parse error: $e");
      }
    } else {
      print("⚠️ No cached Health Concern found");
    }

    // Check cache expiry (1 day)
    final isExpired = cachedTime == null ||
        DateTime.now().millisecondsSinceEpoch - cachedTime > 86400000;

    if (forceRefresh || cachedData == null || isExpired) {
      print("🔄 Fetching fresh Health Concern list...");
      await getHealthConcernTagList();
    }
  }

  // ------------------------------
  // FETCH FROM API + UPDATE CACHE
  // ------------------------------
  Future<bool> getHealthConcernTagList() async {
    if (_isLoading) {
      print("⚠️ Blocked duplicate call");
      return false;
    }

    _setLoadingState(true);
    _clearError();
    _healthConcernPackageTagModel = null;

    try {
      final prefs = await SharedPreferences.getInstance();
      final response = await _repository.getHealthConcerListTag();

      if (response.success == true && response.data != null) {
        print("✅ Health Concern API Fetched (${response.data!.length} items)");

        // Save new cache
        final encoded = json.encode(response.toJson());
        await prefs.setString(_cacheKey, encoded);
        await prefs.setInt(
            _cacheTimeKey, DateTime.now().millisecondsSinceEpoch);
        print("💾 Cache Updated Successfully");

        _healthConcernPackageTagModel = response;
        _setLoadingState(false);
        return true;
      } else {
        _setErrorState(response.message ?? "Failed to fetch data");
        return false;
      }
    } catch (error) {
      print("❌ API Exception: $error");
      _setErrorState("API Error: $error");
      return false;
    }
  }

  // ------------------------------
  // DETAILS API (No cache needed)
  // ------------------------------
  Future<bool> getHealthConcernListDetail(
      BuildContext context, String healthConcernSlug) async {
    _setLoadingState(true);
    _clearError();
    _healthConcernDetailModel = null;

    try {
      var response =
      await _repository.getHealthConcernDetail(healthConcernSlug);

      if (response.success == true && response.data != null) {
        print("✅ Health Concern Detail Loaded");
        _healthConcernDetailModel = response;
        _setLoadingState(false);
        return true;
      } else {
        _setErrorState(
            response.message ?? "Failed to load health concern detail");
        return false;
      }
    } catch (error) {
      _setErrorState("API Error: $error");
      return false;
    }
  }

  // ------------------------------
  // CLEAR CACHE
  // ------------------------------
  Future<void> clearCache() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_cacheKey);
    await prefs.remove(_cacheTimeKey);

    _healthConcernPackageTagModel = null;
    notifyListeners();

    print("🗑 Health Concern Cache Cleared!");
  }
}
