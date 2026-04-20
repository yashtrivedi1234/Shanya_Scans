import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:shanya_scans/network_manager/repository.dart';
import 'package:shanya_scans/screen/service/model/HomeServiceDetailModel.dart'
as HomeDetailModel;
import 'package:shanya_scans/screen/service/model/HomeServiceListModel.dart'
as HomeListModel;
import 'package:shanya_scans/screen/service/model/ServiceDetailRateListModel.dart'
as RateModel;

class ServiceApiProvider with ChangeNotifier {
  final Repository _repository = Repository();

  bool _isLoading = false;
  String _errorMessage = "";
  HomeListModel.HomeServiceListModel? _homeServiceListModel;
  HomeDetailModel.HomeServiceDetailModel? _homeServiceDetailModel;
  RateModel.ServiceDetailRateListModel? _serviceRateListModel;

  List<HomeListModel.Data> _scanList = [];

  List<HomeListModel.Data> get scanList => _scanList;

  ServiceApiProvider() {
    loadCachedScans();
  }

  // Getters for UI
  bool get isLoading => _isLoading;
  String get errorMessage => _errorMessage;

  HomeListModel.HomeServiceListModel? get homeServiceListModel =>
      _homeServiceListModel;

  HomeDetailModel.HomeServiceDetailModel? get homeServiceDetailModel =>
      _homeServiceDetailModel;

  RateModel.ServiceDetailRateListModel? get homeDerviceRateListModel =>
      _serviceRateListModel;

  /// **Set Loading State for UI**
  void _setLoadingState(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  /// **Set Error State for UI**
  void _setErrorState(String message) {
    _errorMessage = message;
    _isLoading = false; // ✅ Loading bhi false kar do
    notifyListeners();
  }

  /// **Clear Error State**
  void _clearError() {
    _errorMessage = "";
  }

  /// **Load Cached Data (WITHOUT API Call)**
  Future<void> loadCachedScans() async {
    print("📦 Loading cached scans...");
    final prefs = await SharedPreferences.getInstance();
    final cachedData = prefs.getString('cached_health_scanList');

    if (cachedData != null) {
      try {
        final List<dynamic> rawList = json.decode(cachedData);
        _scanList = rawList.map((e) => HomeListModel.Data.fromJson(e)).toList();
        print("✅ Loaded ${_scanList.length} cached scans");
      } catch (e) {
        print("⚠️ Cache Parse Error: $e");
        _scanList = [];
      }
    } else {
      print("⚠️ No Cached Data Found");
      _scanList = [];
    }

    notifyListeners();

    // ✅ First load ke time API call karo (agar cache empty hai)
    if (_scanList.isEmpty) {
      print("🔄 Cache empty, fetching from API...");
      await fetchScansList();
    }
  }

  /// **Fetch Home Service List API (Only API Call, No Cache Loading)**
  Future<void> fetchScansList() async {
    print("🌐 Fetching scans from API...");

    // ✅ Agar already loading hai to return karo (prevent double calls)
    if (_isLoading) {
      print("⚠️ Already loading, skipping duplicate call");
      return;
    }

    _setLoadingState(true);
    _clearError(); // ✅ Error clear karo pehle

    try {
      var response = await _repository.getHomeServiceModelResponse();

      if (response.success == true && response.data != null) {
        print("✅ API Response: ${response.data!.length} items");

        final newList = List<HomeListModel.Data>.from(response.data!);

        // ✅ Cache update karo
        final prefs = await SharedPreferences.getInstance();
        final newJson = json.encode(newList.map((e) => e.toJson()).toList());
        await prefs.setString('cached_health_scanList', newJson);
        print("💾 Cache updated");

        // ✅ State update karo
        _scanList = newList;
        _errorMessage = ""; // ✅ Error clear

      } else {
        _setErrorState(response.message ?? "Failed to fetch service list");
        print("❌ API Error: ${response.message}");
      }
    } catch (error) {
      _setErrorState("API Error: $error");
      print("❌ Exception: $error");
    } finally {
      // ✅ Finally block mein loading false karo
      _setLoadingState(false);
    }
  }

  /// **Check Cached Data**
  Future<void> checkCachedData() async {
    final prefs = await SharedPreferences.getInstance();
    String? cachedData = prefs.getString('cached_health_scanList');

    if (cachedData == null || cachedData.isEmpty) {
      print("⚠️ No Cached Data Found!");
    } else {
      print("✅ Cached Data Retrieved Successfully");
    }
  }

  /// **Clear Cache**
  Future<void> clearCache() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('cached_health_scanList');
    _scanList = [];
    notifyListeners();
    print("🗑 Cache Cleared!");
  }

  /// **Fetch Home Service List API**
  Future<bool> getHomeServiceList(BuildContext context) async {
    _setLoadingState(true);
    _clearError();
    _homeServiceListModel = null;

    try {
      var response = await _repository.getHomeServiceModelResponse();

      if (response.success == true && response.data != null) {
        print("✅ Home Service List Fetched Successfully");

        // Priority order
        List<String> priorityItems = [
          "Digital 3.0 Tesla MRI",
          "Digital Gamma Scans",
          "Digital PET CT Scan",
        ];

        // Sort by priority
        response.data!.sort((a, b) {
          bool aIsPriority = priorityItems.contains(a.serviceDetailName);
          bool bIsPriority = priorityItems.contains(b.serviceDetailName);

          if (aIsPriority && !bIsPriority) return -1;
          if (!aIsPriority && bIsPriority) return 1;
          return 0;
        });

        _homeServiceListModel = response;
        _setLoadingState(false);
        return true;
      } else {
        _homeServiceListModel = null;
        _setErrorState(response.message ?? "Failed to fetch service list");
      }
    } catch (error) {
      _homeServiceListModel = null;
      _setErrorState("⚠️ API Error: $error");
    }

    _setLoadingState(false);
    return false;
  }

  /// **Fetch Home Service Detail API**
  Future<bool> getHomeServiceListDetail(
      BuildContext context, String serviceSlug) async {
    _setLoadingState(true);
    _clearError();
    _homeServiceDetailModel = null;

    try {
      var response = await _repository.getHomeServiceDetailResponse(serviceSlug);

      if (response.success == true && response.data != null) {
        print("✅ Home Service Detail Fetched Successfully");
        _homeServiceDetailModel = response;
        _setLoadingState(false);
        return true;
      } else {
        _homeServiceDetailModel = null;
        _setErrorState(response.message ?? "Failed to fetch service detail");
      }
    } catch (error) {
      _homeServiceDetailModel = null;
      _setErrorState("⚠️ API Error: $error");
    }

    _setLoadingState(false);
    return false;
  }

  /// **Fetch Service Detail Rate List API**
  Future<bool> getServiceDetailRateList(
      BuildContext context, String serviceName) async {
    _setLoadingState(true);
    _clearError();
    _serviceRateListModel = null;

    try {
      var response = await _repository.getServiceDetailRateList(serviceName);

      if (response.success == true && response.data != null) {
        print("✅ Service Detail Rate List Fetched Successfully");
        _serviceRateListModel = response;
        _setLoadingState(false);
        return true;
      } else {
        _serviceRateListModel = null;
        _setErrorState(response.message ?? "Failed to fetch service rate list");
      }
    } catch (error) {
      _serviceRateListModel = null;
      _setErrorState("⚠️ API Error: $error");
    }

    _setLoadingState(false);
    return false;
  }
}