import 'package:easy_stepper/easy_stepper.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_html/flutter_html.dart';
import 'package:shanya_scans/screen/checkout/checkout_text_fields.dart';
import 'package:shanya_scans/screen/order/model/OrderItem.dart';
import 'package:shanya_scans/ui_helper/app_colors.dart';
import 'package:shanya_scans/ui_helper/storage_helper.dart';
import 'package:provider/provider.dart';
import 'package:shanya_scans/util/StringUtils.dart';
import 'package:shanya_scans/util/image_loader_util.dart';

import '../../base_widgets/custom_rounded_container.dart';
import '../../base_widgets/loading_indicator.dart';
import '../../base_widgets/solid_rounded_button.dart';
import '../../ui_helper/app_text_styles.dart';
import '../../ui_helper/responsive_helper.dart';
import '../../ui_helper/snack_bar.dart';
import '../../util/date_formate.dart';
import '../cart/cart_list_screen.dart';
import 'controller/checkout_api_provider.dart';

class CheckoutScreen extends StatefulWidget {
  @override
  _CheckoutScreenState createState() => _CheckoutScreenState();
}

class _CheckoutScreenState extends State<CheckoutScreen> {
  final TextEditingController fullNameController = TextEditingController();
  final TextEditingController ageController = TextEditingController();
  TextEditingController phoneController = TextEditingController();
  TextEditingController altPhoneController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController localityController = TextEditingController();
  final TextEditingController pinCodeController = TextEditingController();
  final TextEditingController addressController = TextEditingController();
  final TextEditingController cityStateController = TextEditingController();
  final TextEditingController houseFlatController = TextEditingController();

  final _formKey = GlobalKey<FormState>(); // Add this at the class level

  String? selectedBookingFor = "Self";
  String? selectedGender = "Male";
  String? selectedCity;
  String? selectedAddressType = "Home";
  DateTime? selectedDate = DateTime.now();
  TimeOfDay? selectedTime;
  String? selectedDateString = DateUtil.formatDate(
      date: DateTime.now().toString(),
      currentFormat: "yyyy-MM-dd HH:mm:ss.SSS",
      desiredFormat: "yyyy-MM-dd"); // ✅ Store default date
  String? selectedTimeString;
  bool showBookingFor = false;
  bool showGender = false;
  bool showCities = false;

  final List<String> bookingForOptions = ['Self', 'Other'];
  final List<String> gender = ['Male', 'Female', 'Other'];
  final List<String> cities = ['City A', 'City B', 'City C'];

  bool isBookingExpanded = false;
  int _currentStep = 0;

  String? selectedPlace = StorageHelper().getUserLiveAddress();

// Variables needed for booking functionality
  final TextEditingController otherPersonController = TextEditingController();
  bool showOtherPersonField = false;

  @override
  void initState() {
    super.initState();
    initializeTime();
    SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle(
      statusBarColor: AppColors.primary,
      statusBarIconBrightness: Brightness.light,
    ));

    WidgetsBinding.instance.addPostFrameCallback((_) async {
      final checkoutProvider = Provider.of<CheckoutProvider>(context, listen: false);
      // First load checkout items
      await checkoutProvider.loadCheckoutItems();
      // ✅ IMPORTANT: Wait for checkFirstTimeUser to complete
      await checkoutProvider.checkFirstTimeUser();
      setState(() {}); // Force rebuild after data loads
      // Debug print to verify
      print("🔍 Checkout Page - Is First Time User: ${checkoutProvider.isFirstTimeUser}");
      print("🔍 Checkout Page - Is Coupon Applied: ${checkoutProvider.isCouponApplied}");
    });

    houseFlatController.addListener(_updateThirdField);
    localityController.addListener(_updateThirdField);
    cityStateController.addListener(_updateThirdField);
  }

  void _updateThirdField() {
    // Combine the text from the first two controllers and update the third one
    addressController.text =
        '${houseFlatController.text}  ${localityController.text}  ${cityStateController.text}';
  }

  /// Function to set the initial 1-hour-later time
  void initializeTime() {
    DateTime now = DateTime.now();
    DateTime oneHourLater = now.add(const Duration(hours: 1));

    setState(() {
      // Use setState to ensure UI updates immediately
      selectedTime = TimeOfDay.fromDateTime(oneHourLater);
      selectedTimeString = DateUtil.formatDate(
          date: oneHourLater.toString(),
          currentFormat: "yyyy-MM-dd HH:mm:ss.SSS",
          desiredFormat: "hh:mm a" // Or "HH:mm" for 24-hour format
          );
    });

    print("Initially set selectedTimeString to: $selectedTimeString");
  }

  void defaultStatusBarColor() {
    SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle(
      statusBarColor: AppColors.primary,
      statusBarIconBrightness: Brightness.light,
    ));
  }

  // validate booking forom ////////
  bool validateBookingForm(BuildContext context) {
    final phoneRegex = RegExp(r'^[6-9]\d{9}$'); // Indian 10-digit mobile number

    if (fullNameController.text.isEmpty) {
      showError(context, "Please Enter Your Full Name.");
      return false;
    }

    if (phoneController.text.isEmpty) {
      showError(context, "Please Enter Your Phone Number.");
      return false;
    }
    if (!phoneRegex.hasMatch(phoneController.text)) {
      showError(
          context, "Enter a valid 10-digit Phone Number Starting with 6-9.");
      return false;
    }
    if (phoneController.text.length != 10) {
      showError(context, "Invalid Phone Number.");
      return false;
    }
    if (altPhoneController.text.isEmpty) {
      showError(context, "Please Enter Your Whatsapp Number.");
      return false;
    }
    if (!phoneRegex.hasMatch(altPhoneController.text)) {
      showError(context, "Enter a Valid 10-Digit Whatsapp Number.");
      return false;
    }
    if (altPhoneController.text.length != 10) {
      showError(context, "Invalid Whatsapp Number.");
      return false;
    }

    if (ageController.text.isEmpty) {
      showError(context, "Please Enter Your Age.");
      return false;
    }

    // All validations passed
    return true;
  }

  bool validateShippingForm(BuildContext context) {
    if (houseFlatController.text.isEmpty) {
      showError(context, "Please Enter House/Flat/Landmark.");
      return false;
    }

    if (localityController.text == null || localityController.text!.isEmpty) {
      showError(context, "Please Enter Your Locality.");
      return false;
    }
    if (cityStateController.text == null || cityStateController.text!.isEmpty) {
      showError(context, "Please Enter Your City.");
      return false;
    }
    if (pinCodeController.text == null || pinCodeController.text!.isEmpty) {
      showError(context, "Please Enter Your Pin Code.");
      return false;
    }
    if (selectedBookingFor == null || selectedBookingFor!.isEmpty) {
      showError(context, "Please Select a Booking For.");
      return false;
    }
    if (selectedDateString == null || selectedDateString!.isEmpty) {
      showError(context, "Please Select a Booking Date.");
      return false;
    }
    if (selectedTimeString == null || selectedTimeString!.isEmpty) {
      showError(context, "Please select a Time.");
      return false;
    }
    if (addressController.text.isEmpty) {
      showError(context, "Please Enter Your Address.");
      return false;
    }

    // All validations passed
    return true;
  }

  void showError(BuildContext context, String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message), backgroundColor: Colors.red),
    );
  }

  // validate   ////////

  @override
  void dispose() {
    defaultStatusBarColor();
    // _razorpay.clear(); // Cleanup Razorpay instance
    // final checkoutProvider = Provider.of<CheckoutProvider>(context, listen: false);
    // checkoutProvider.clearRazorpay();
    // checkoutProvider.resetLoadingState();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        bool shouldExit = await _showExitDialog(context);
        return shouldExit; // Allow exit only if the user confirms
      },
      child: Scaffold(
        backgroundColor: AppColors.endingGreyColor,
        resizeToAvoidBottomInset: true, // Prevents button from moving
        appBar: AppBar(
          backgroundColor: AppColors.primary,
          elevation: 0,
          leading: IconButton(
            icon: const Icon(Icons.arrow_back, color: Colors.white),
            onPressed: () =>
                _showExitDialog(context), // Show exit confirmation dialog
            // onPressed: () => Navigator.of(context).pop(),
          ),
          title: const Text(
            "Checkout",
            style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
          ),
          centerTitle: true,
          // actions: [
          //   IconButton(
          //     icon:
          //         const Icon(Icons.shopping_cart_outlined, color: Colors.white),
          //     onPressed: () {},
          //   ),
          // ],
        ),
        body: SafeArea(
          bottom: false,
          child: Container(
            color: AppColors.endingGreyColor,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Card(
                  color: Colors.white,
                  margin: EdgeInsets.symmetric(horizontal: 4.0, vertical: 8.0),
                  elevation: 0,
                  // Adjust elevation for shadow depth
                  shape: RoundedRectangleBorder(
                    borderRadius:
                        BorderRadius.circular(12.0), // Rounded corners
                  ),
                  child: Center(
                    child: EasyStepper(
                      activeStep: _currentStep,
                      stepShape: StepShape.circle,
                      activeStepBorderColor: AppColors.primary,
                      finishedStepBorderColor: Colors.green,
                      finishedStepBackgroundColor: Colors.green,
                      activeStepTextColor: Colors.black,
                      unreachedStepTextColor: Colors.grey,
                      // Add this for previous step title color
                      finishedStepTextColor: AppColors.primary,
                      stepRadius: ResponsiveHelper.containerWidth(context, 6),
                      showLoadingAnimation: false,
                      textDirection: TextDirection.ltr,
                      lineStyle: LineStyle(
                        lineLength: 60,
                        lineThickness: 3,
                        lineSpace: 4,
                        activeLineColor: AppColors.primary,
                        finishedLineColor: Colors.green,
                        unreachedLineColor: Colors.grey[300]!,
                      ),
                      steps: [
                        EasyStep(
                            title: "",
                            icon: Icon(Icons.list_alt),
                            customTitle: Center(
                                child: Text(
                              "Basic\nDetails",
                              style: TextStyle(fontSize: 10),
                              textAlign: TextAlign.center,
                            ))),
                        EasyStep(
                            title: "",
                            icon: Icon(Icons.local_shipping),
                            customTitle: Center(
                                child: Text(
                              "Booking\nDetails",
                              style: TextStyle(fontSize: 10),
                              textAlign: TextAlign.center,
                            ))),
                        // EasyStep(title: "Payment", icon: Icon(Icons.payment)),
                        EasyStep(
                            title: "",
                            icon: Icon(Icons.receipt),
                            customTitle: Center(
                                child: Text(
                              "Payment",
                              style: TextStyle(fontSize: 10),
                              textAlign: TextAlign.center,
                            ))),
                      ],
                      // onStepReached: (index) =>setState(() => _currentStep = index),
                    ),
                  ),
                ),
                Expanded(
                  child: Card(
                    color: Colors.white,
                    margin: EdgeInsets.symmetric(horizontal: 0.0, vertical: 8.0),
                    elevation: 0,
                    // Adjust elevation for shadow depth
                    shape: RoundedRectangleBorder(
                      borderRadius:
                          BorderRadius.circular(12.0), // Rounded corners
                    ),
                    child: GestureDetector(
                      onTap: () => FocusScope.of(context).unfocus(),
                      // Hide keyboard on tap
                      child: SingleChildScrollView(
                        keyboardDismissBehavior:
                            ScrollViewKeyboardDismissBehavior.manual,
                        child: getStepContent(),
                      ),
                    ),
                  ),
                ),
                buildNavigationButtons(),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Future<bool> _showExitDialog(BuildContext context) async {
    bool exitConfirmed = false;
    await showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20),
          ),
          backgroundColor: Colors.white,
          title: Row(
            children: [
              Icon(Icons.exit_to_app, color: Colors.orange),
              SizedBox(width: 8),
              Text(
                "Exit Checkout",
                style: AppTextStyles.heading1(context,
                    overrideStyle: TextStyle(
                        fontSize: ResponsiveHelper.fontSize(context, 16))),
              ),
            ],
          ),
          content: Text(
            "Are you sure you want to leave the checkout page? Your progress will be lost.",
            style: AppTextStyles.heading2(context,
                overrideStyle: TextStyle(
                    color: AppColors.txtGreyColor,
                    fontSize: ResponsiveHelper.fontSize(context, 12))),
          ),
          actions: [
            TextButton(
              onPressed: () {
                exitConfirmed = false;
                Navigator.of(context).pop();
              },
              style: TextButton.styleFrom(
                padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
              ),
              child: Text("Cancel", style: TextStyle(color: Colors.grey[600])),
            ),
            ElevatedButton(
              onPressed: () {
                exitConfirmed = true;
                Navigator.of(context).pop();
                Navigator.of(context).pop();
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.red,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
                padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
              ),
              child: Text("Exit"),
            ),
          ],
        );
      },
    );
    return exitConfirmed;
  }

  Widget getStepContent() {
    switch (_currentStep) {
      case 0:
        return Column(
          children: [
            buildBookingForm(),
            // buildNavigationButtons(), // Navigation after booking form
          ],
        );
      case 1:
        return Column(
          children: [
            buildShippingForm(),
            // buildNavigationButtons(), // Navigation after shipping form
          ],
        );
      case 2:
        return Column(
          children: [
            buildReviewForm(),
            // buildNavigationButtons(), // Navigation after review form
          ],
        );
      default:
        return Column(
          children: [
            buildBookingForm(),
            // buildNavigationButtons(),
          ],
        );
    }
  }

  Widget buildNavigationButtons() {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black
                .withOpacity(0.1), // Shadow color
            spreadRadius: 0, // No extra spread
            blurRadius: 10, // Blur effect for smooth shadow
            offset: Offset(0,
                -3), // Moves shadow **above** the container
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            // Back Button - Fixed width and consistent styling
            if (_currentStep > 0)
              Expanded(
                flex: 1,
                child: SolidRoundedButton(
                  text: "Back",
                  color: Colors.grey.shade200,
                  borderRadius: 10.0,
                  onPressed: () {
                    setState(() {
                      _currentStep -= 1;
                    });
                  },
                  textStyle: const TextStyle(
                    color: Colors.black,
                    fontSize: 16,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              )
            else
              // Empty space when no back button
              Expanded(flex: 1, child: SizedBox()),

            // Spacing between buttons
            if (_currentStep > 0) SizedBox(width: 16),

            // Next/Proceed Button - Fixed width and consistent styling
            Expanded(
              flex: 2, // Give more space to the primary action button
              child: Consumer<CheckoutProvider>(
                builder: (context, provider, child) {
                  // Check if the loading state is true
                  if (provider.isLoading) {
                    return Container(
                      height: 50,
                      child: loadingIndicator(),
                    );
                  }

                  return AnimatedOpacity(
                    duration: const Duration(milliseconds: 300),
                    curve: Curves.easeInOut,
                    opacity:
                        MediaQuery.of(context).viewInsets.bottom > 0 ? 0.0 : 1.0,
                    child: AnimatedPadding(
                      duration: const Duration(milliseconds: 300),
                      curve: Curves.easeInOut,
                      padding: EdgeInsets.only(
                        bottom: MediaQuery.of(context).viewInsets.bottom > 0
                            ? MediaQuery.of(context).viewInsets.bottom + 0
                            : 0,
                      ),
                      child: SolidRoundedButton(
                        text: _currentStep == 2 ? "Proceed to Payment" : "Next",
                        color: AppColors.primary,
                        borderRadius: 10.0,
                        onPressed: () async {
                          if (_currentStep < 2) {
                            print("Next button clicked");
                            if (_currentStep == 0) {
                              if (!validateBookingForm(context)) {
                                print("Validation failed at step 0.");
                                return;
                              }
                            }
                            if (_currentStep == 1) {
                              if (!validateShippingForm(context)) {
                                print("Validation failed at step 1.");
                                return;
                              }
                            }
                            setState(() {
                              _currentStep += 1;
                            });
                          } else {
                            print("Finish button clicked");
                            final checkoutProvider =
                            Provider.of<CheckoutProvider>(context,
                                listen: false);
                            checkoutProvider.resetLoadingState();

                            checkoutProvider.saveFormData(
                              selectedDate: selectedDateString.toString(),
                              selectedTime: selectedTimeString.toString(),
                              email: StorageHelper().getEmail(),
                              fullName: fullNameController.text.toString(),
                              age: ageController.text.toString(),
                              phone: phoneController.text.toString(),
                              altPhone: altPhoneController.text.toString(),
                              gender: selectedGender.toString(),
                              address: addressController.text.toString(),
                              pinCode: pinCodeController.text.toString(),
                              selectedPlace: selectedPlace.toString(),
                              addressType: selectedAddressType.toString(),
                              bookingFor: bookingForOptions.toString(),
                            );
                            try {
                              await checkoutProvider.initRazorpay(context);
                            } catch (e) {
                              checkoutProvider.setLoadingState(false);
                              showError(
                                  context, "Payment initialization failed");
                            }
                          }
                        },
                        textStyle: TextStyle(
                          color: Colors.white,
                          fontSize: MediaQuery.of(context).size.width < 350 ? 12 : 14,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget buildBookingForm() {
    print("Booking for=> ${selectedBookingFor}");
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // New Booking For dropdown
        buildExpandableList(
          "Booking For",
          bookingForOptions,
          selectedBookingFor,
          (value) {
            setState(() {
              selectedBookingFor = value;
              showBookingFor = false;
            });
          },
          showBookingFor,
          () {
            setState(() => showBookingFor = !showBookingFor);
          },
        ),
        CheckoutTextField(
          label: "Full Name*",
          hint: "Enter Full Name",
          controller: fullNameController,
          isRequired: true,
        ),

        // CheckoutTextField(
        //   label: "Email*",
        //   hint: "Email",
        //   controller: emailController,
        //   isRequired: true,
        //   keyboardType: TextInputType.emailAddress,
        // ),

        buildPhoneField(),
        buildAltPhoneField(),
        CheckoutTextField(
          label: "Age*",
          hint: "Enter Age",
          controller: ageController,
          isRequired: true,
          maxLength: 2,
          keyboardType: TextInputType.number,
        ),
        buildExpandableList(
            "Gender",
            gender,
            selectedGender,
            (value) {
              setState(() {
                selectedGender = value;
                showGender = false;
              });
            },
            showGender,
            () {
              setState(() => showGender = !showGender);
            }),
      ],
    );
  }

  Widget buildShippingForm() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        AddressTypeSelector(
          addressTypes: ["Home", "Work", "Other"],
          selectedAddressType: selectedAddressType,
          onSelected: (value) {
            setState(() {
              selectedAddressType = value;
              print("Address type =>${selectedAddressType.toString()}");
            });
          },
        ),
        CheckoutTextField(
          label: "House No. / Flat No. / Building / Landmark*",
          hint: "House No. / Flat No. / Building / Landmark*",
          controller: houseFlatController,
          isRequired: true,
          keyboardType: TextInputType.text,
        ),
        CheckoutTextField(
          label: "Locality",
          hint: "Locality",
          controller: localityController,
          isRequired: true,
          keyboardType: TextInputType.text,
        ),
        CheckoutTextField(
          label: "City",
          hint: "City",
          controller: cityStateController,
          isRequired: true,
          keyboardType: TextInputType.text,
        ),
        CheckoutTextField(
          label: "Pincode",
          hint: "Pincode",
          controller: pinCodeController,
          isRequired: true,
          keyboardType: TextInputType.number,
        ),
        SizedBox(
          height: 5,
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 18.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "Booking Date & Time",
                style: AppTextStyles.bodyText1(
                  context,
                  overrideStyle: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                      fontSize: ResponsiveHelper.fontSize(context, 12)),
                ),
              ),
              Row(
                children: [
                  buildBookingDate(),
                  SizedBox(
                    width: 8,
                  ),

                  /// **Booking Time Selection**
                  buildDateTimePicker(
                    title: "",
                    selectedValue: selectedTime != null
                        ? "${selectedTime!.hourOfPeriod}:${selectedTime!.minute.toString().padLeft(2, '0')} ${selectedTime!.period == DayPeriod.am ? "AM" : "PM"}"
                        : "Select Booking Time",
                    icon: Icons.access_time,
                    onTap: _selectTime,
                  ),
                ],
              ),
            ],
          ),
        ),
        CheckoutTextField(
          label: "Address*",
          hint: "123 Main Street, City, Country",
          controller: addressController,
          isMultiLine: true,
          maxLines: 3,
        ),
      ],
    );
  }

  /// **Date/Time Picker Widget**
  Widget buildDateTimePicker({
    required String title,
    required String selectedValue,
    required IconData icon,
    required VoidCallback onTap,
  }) {
    return Expanded(
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Text(
            //   title,
            //   style: AppTextStyles.bodyText1(
            //     context,
            //     overrideStyle: TextStyle(
            //         color: Colors.black,
            //         fontWeight: FontWeight.bold,
            //         fontSize: ResponsiveHelper.fontSize(context, 12)),
            //   ),
            // ),
            // const SizedBox(height: 5),
            GestureDetector(
              onTap: onTap,
              child: Container(
                width: double.infinity,
                padding:
                    const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                decoration: BoxDecoration(
                  color: Colors.grey.shade100,
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: Colors.grey.shade400),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      selectedValue,
                      style: AppTextStyles.bodyText1(
                        context,
                        overrideStyle: TextStyle(
                            color: Colors.black,
                            fontSize: ResponsiveHelper.fontSize(context, 13)),
                      ),
                    ),
                    Icon(icon, color: Colors.black54),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget buildBookingDate() {
    print("selectedDateString: $selectedDateString"); // Debugging output
    return Expanded(
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            GestureDetector(
              onTap: _selectDate,
              child: Container(
                width: double.infinity,
                padding:
                    const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                decoration: BoxDecoration(
                  color: Colors.grey.shade100,
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: Colors.grey.shade400),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      selectedDateString ?? "Select Date",
                      // ✅ Display formatted date
                      // "${DateUtil.formatDate(
                      //   date: "${selectedDate}",
                      //   currentFormat: "yyyy-MM-dd",
                      //   desiredFormat: "dd-MM-yyyy",
                      // )}", // ✅ Formatted date
                      // DateFormat("dd-MM-yy").format(selectedDate), // ✅ Formatted date

                      style: AppTextStyles.bodyText1(
                        context,
                        overrideStyle: TextStyle(
                            color: Colors.black,
                            fontSize: ResponsiveHelper.fontSize(context, 13)),
                      ),
                    ),
                    const Icon(Icons.calendar_month_outlined,
                        color: Colors.black54),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  /// **Date Picker Function**

  Future<void> _selectDate() async {
    DateTime? picked = await showDatePicker(
      context: context,
      initialDate: selectedDate, // ✅ Default today’s date
      firstDate: DateTime.now(), // ✅ Prevents past date selection
      lastDate: DateTime(2101),
    );

    if (picked != null) {
      setState(() {
        selectedDateString = DateUtil.formatDate(
            date: picked.toString(),
            currentFormat: "yyyy-MM-dd HH:mm:ss.SSS",
            desiredFormat:
                "yyyy-MM-dd"); // ✅ Store selected date in correct format
        print("selectedDateString: $selectedDateString"); // Debugging output
        selectedDate = picked;
      });
    }
  }

  /// **Time Picker Function**
  void _selectTime() async {
    // Calculate initial time as 1 hour later than current time
    DateTime now = DateTime.now();
    DateTime initialDateTime = now.add(const Duration(hours: 1));
    TimeOfDay initialTimeOfDay = TimeOfDay.fromDateTime(initialDateTime);

    TimeOfDay? pickedTime = await showTimePicker(
      context: context,
      initialTime: selectedTime ?? TimeOfDay.now(),
    );

    if (pickedTime != null && pickedTime != selectedTime) {
      setState(() {
        selectedTime = pickedTime;
        print("selected booking time=>${selectedTime}");
        selectedTimeString =
            "${selectedTime!.hourOfPeriod}:${selectedTime!.minute.toString().padLeft(2, '0')} ${selectedTime!.period == DayPeriod.am ? "AM" : "PM"}";
        print("selected booking time=>${selectedTime}");
      });
    } else if (pickedTime == null && selectedTime == null) {
      // If no time was previously selected AND the user dismissed the picker
      // Set the selected time and string to the calculated initial 1-hour-later time
      setState(() {
        selectedTime = initialTimeOfDay;
        print("selected booking time (default 1 hour later)=> ${selectedTime}");
        selectedTimeString =
            "${selectedTime!.hourOfPeriod}:${selectedTime!.minute.toString().padLeft(2, '0')} ${selectedTime!.period == DayPeriod.am ? "AM" : "PM"}";
        print(
            "selected booking time string (default 1 hour later)=> ${selectedTimeString}");
      });
    }
  }

// Enhanced dropdown widget with better design
  Widget buildExpandableList(
    String title,
    List<String> items,
    String? selectedValue,
    Function(String) onSelect,
    bool isExpanded,
    Function() toggleExpand,
  ) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: AppTextStyles.bodyText1(
              context,
              overrideStyle: TextStyle(
                color: Colors.black87,
                fontWeight: FontWeight.w600,
                fontSize: ResponsiveHelper.fontSize(context, 12),
              ),
            ),
          ),
          const SizedBox(height: 8),
          GestureDetector(
            onTap: toggleExpand,
            child: AnimatedContainer(
              duration: Duration(milliseconds: 200),
              width: double.infinity,
              padding: EdgeInsets.symmetric(horizontal: 16, vertical: 14),
              decoration: BoxDecoration(
                color: Colors.grey.shade100,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color:
                      isExpanded ? Colors.blue.shade300 : Colors.grey.shade300,
                  width: isExpanded ? 2 : 1,
                ),
                boxShadow: [
                  BoxShadow(
                    color: Colors.grey.withOpacity(0.1),
                    spreadRadius: 1,
                    blurRadius: 4,
                    offset: Offset(0, 2),
                  ),
                ],
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    child: Text(
                      selectedValue ?? "Select $title",
                      style: AppTextStyles.bodyText1(
                        context,
                        overrideStyle: TextStyle(
                          color: selectedValue != null
                              ? Colors.black87
                              : Colors.grey.shade600,
                          fontSize: ResponsiveHelper.fontSize(context, 14),
                          fontWeight: selectedValue != null
                              ? FontWeight.w500
                              : FontWeight.normal,
                        ),
                      ),
                    ),
                  ),
                  AnimatedRotation(
                    turns: isExpanded ? 0.5 : 0,
                    duration: Duration(milliseconds: 200),
                    child: Icon(
                      Icons.keyboard_arrow_down,
                      color: isExpanded
                          ? Colors.blue.shade400
                          : Colors.grey.shade600,
                      size: 24,
                    ),
                  ),
                ],
              ),
            ),
          ),
          AnimatedContainer(
            duration: Duration(milliseconds: 300),
            height: isExpanded ? null : 0,
            child: isExpanded
                ? Container(
                    margin: EdgeInsets.only(top: 4),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: Colors.grey.shade200),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.grey.withOpacity(0.1),
                          spreadRadius: 1,
                          blurRadius: 4,
                          offset: Offset(0, 2),
                        ),
                      ],
                    ),
                    child: Column(
                      children: items
                          .map((item) => InkWell(
                                onTap: () {
                                  onSelect(item);
                                  print("Selected item: $item");
                                },
                                child: Container(
                                  width: double.infinity,
                                  padding: EdgeInsets.symmetric(
                                    horizontal: 16,
                                    vertical: 12,
                                  ),
                                  decoration: BoxDecoration(
                                    border: Border(
                                      bottom: items.indexOf(item) !=
                                              items.length - 1
                                          ? BorderSide(
                                              color: Colors.grey.shade200,
                                              width: 0.5,
                                            )
                                          : BorderSide.none,
                                    ),
                                  ),
                                  child: Row(
                                    children: [
                                      Expanded(
                                        child: Text(
                                          item,
                                          style: AppTextStyles.bodyText1(
                                            context,
                                            overrideStyle: TextStyle(
                                              color: selectedValue == item
                                                  ? Colors.blue.shade600
                                                  : Colors.black87,
                                              fontSize:
                                                  ResponsiveHelper.fontSize(
                                                      context, 14),
                                              fontWeight: selectedValue == item
                                                  ? FontWeight.w600
                                                  : FontWeight.normal,
                                            ),
                                          ),
                                        ),
                                      ),
                                      if (selectedValue == item)
                                        Icon(
                                          Icons.check,
                                          color: Colors.blue.shade600,
                                          size: 20,
                                        ),
                                    ],
                                  ),
                                ),
                              ))
                          .toList(),
                    ),
                  )
                : SizedBox.shrink(),
          ),
        ],
      ),
    );
  }

  Widget buildPaymentForm() {
    return PaymentSelectionWidget();
  }

  // Replace buildReviewForm() method with this updated version
  Widget buildReviewForm() {
    return Column(
      children: [
        Consumer<CheckoutProvider>(
          builder: (context, checkoutItemsProvider, child) {
            // ✅ DEBUG: Print values to check
            print("🔍 Building Review Form");
            print("🔍 Is First Time User: ${checkoutItemsProvider.isFirstTimeUser}");
            print("🔍 Is Coupon Applied: ${checkoutItemsProvider.isCouponApplied}");

            if (checkoutItemsProvider.isCheckoutEmpty) {
              return Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.remove_shopping_cart, size: 80, color: Colors.grey),
                    SizedBox(height: 20),
                    Text(
                      "Your Cart is Empty",
                      style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: Colors.grey),
                    ),
                  ],
                ),
              );
            }

            // Calculate dynamic cart total
            double cartTotal = checkoutItemsProvider.checkoutItems
                .fold(0, (sum, item) => sum + ((item.price) * item.quantity));

            double discount = checkoutItemsProvider.isCouponApplied
                ? checkoutItemsProvider.couponDiscount
                : 0.00;

            double orderTotal = cartTotal - discount;
            StorageHelper().setOrderTotalToPrefs(orderTotal);
            // ✅ Check if cart total is >= 500 for coupon eligibility
            bool isCouponEligible = cartTotal >= 500;

            print("💰 Cart Total: ₹$cartTotal");
            print("🎫 Coupon Eligible (≥500): $isCouponEligible");
            return Stack(
              children: [
                SingleChildScrollView(
                  padding: EdgeInsets.only(bottom: 0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Cart Items List
                      ListView.builder(
                        shrinkWrap: true,
                        physics: NeverScrollableScrollPhysics(),
                        itemCount: checkoutItemsProvider.checkoutItems.length,
                        itemBuilder: (context, index) {
                          final orserItem = checkoutItemsProvider.checkoutItems[index];
                          return Container(
                            padding: EdgeInsets.symmetric(vertical: 8, horizontal: 10),
                            decoration: BoxDecoration(
                              border: Border(
                                  bottom: BorderSide(
                                      color: AppColors.lightBlueColor, width: 5)),
                            ),
                            child: Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                // Image Section
                                ClipRRect(
                                  borderRadius: BorderRadius.circular(10),
                                  child: Container(
                                    color: AppColors.lightBrown_color,
                                    width: ResponsiveHelper.containerWidth(context, 20),
                                    height: ResponsiveHelper.containerWidth(context, 20),
                                    child: Padding(
                                      padding: orserItem.imageUrl == OrderItem.defaultImage
                                          ? EdgeInsets.all(8.0)
                                          : EdgeInsets.all(0.0),
                                      child: orserItem.imageUrl.startsWith("http")
                                          ? Image.network(
                                        orserItem.imageUrl,
                                        fit: BoxFit.cover,
                                        errorBuilder: (context, error, stackTrace) {
                                          return Image.asset(
                                            OrderItem.defaultImage,
                                            fit: BoxFit.cover,
                                          );
                                        },
                                      )
                                          : Image.asset(
                                        orserItem.imageUrl,
                                        fit: BoxFit.cover,
                                      ),
                                    ),
                                  ),
                                ),
                                SizedBox(width: 10),

                                // Details Section
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        StringUtils.toUpperCase(orserItem.name),
                                        maxLines: 2,
                                        style: AppTextStyles.heading1(
                                          context,
                                          overrideStyle: TextStyle(
                                              color: Colors.black,
                                              fontSize: ResponsiveHelper.fontSize(context, 14),
                                              fontWeight: FontWeight.bold),
                                        ),
                                      ),
                                      ResponsiveHelper.sizeBoxHeightSpace(context, 0.5),

                                      // Price + Quantity Controls
                                      Row(
                                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                        children: [
                                          Text(
                                            "₹${orserItem.price}",
                                            style: AppTextStyles.heading1(
                                              context,
                                              overrideStyle: TextStyle(
                                                color: AppColors.primary,
                                                fontSize: 16,
                                              ),
                                            ),
                                          ),

                                          // Quantity Control
                                          Container(
                                            padding: EdgeInsets.symmetric(
                                                horizontal: 8, vertical: 2),
                                            decoration: BoxDecoration(
                                              borderRadius: BorderRadius.circular(20),
                                              border: Border.all(
                                                color: Colors.orange,
                                                width: 1,
                                              ),
                                              color: Colors.white,
                                            ),

                                            child: Row(
                                              mainAxisSize: MainAxisSize.min,
                                              children: [
                                                GestureDetector(
                                                  onTap: () => checkoutItemsProvider
                                                      .decreaseQuantity(
                                                      context, orserItem.id,
                                                      isCheckoutPage: true),
                                                  child: Container(
                                                    width: 24,
                                                    height: 24,
                                                    decoration: BoxDecoration(
                                                      shape: BoxShape.circle,
                                                      color: Colors.transparent,
                                                    ),
                                                    child: Icon(
                                                      Icons.remove,
                                                      color: Colors.black87,
                                                      size: 18,
                                                    ),
                                                  ),
                                                ),
                                                Padding(
                                                  padding: const EdgeInsets.symmetric(
                                                      horizontal: 12),
                                                  child: Text(
                                                    "${orserItem.quantity}",
                                                    style: TextStyle(
                                                      fontSize: 16,
                                                      fontWeight: FontWeight.w600,
                                                      color: Colors.black87,
                                                    ),
                                                  ),
                                                ),
                                                GestureDetector(
                                                  onTap: () => checkoutItemsProvider
                                                      .increaseQuantity(
                                                      context, orserItem.id),
                                                  child: Container(
                                                    width: 24,
                                                    height: 24,
                                                    decoration: BoxDecoration(
                                                      shape: BoxShape.circle,
                                                      color: Colors.transparent,
                                                    ),
                                                    child: Icon(
                                                      Icons.add,
                                                      color: Colors.black87,
                                                      size: 18,
                                                    ),
                                                  ),
                                                ),
                                              ],
                                            ),
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          );
                        },
                      ),

                      // ✅ COUPON SECTION - Show only for first-time users
                      if (checkoutItemsProvider.isFirstTimeUser && isCouponEligible)
                        buildCouponSection(checkoutItemsProvider),
                      Container(
                        child: CustomRoundedContainer(
                          borderRadius: 0,
                          borderColor: Colors.transparent,
                          borderWidth: 0,
                          elevation: 0,
                          backgroundColor: Colors.white,
                          child: Padding(
                            padding: EdgeInsets.only(
                                left: 12.0, right: 12.0, bottom: 10, top: 0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                ResponsiveHelper.sizeBoxHeightSpace(context, 1),
                                SummaryRow(label: 'Cart Total', value: '₹$cartTotal'),

                                // Show discount row only if coupon is applied
                                if (checkoutItemsProvider.isCouponApplied)
                                  SummaryRow(
                                    label: 'Coupon Discount',
                                    value: '- ₹$discount',
                                    valueColor: Colors.green,
                                  ),

                                Divider(),
                                SummaryRow(
                                    label: 'Amount Payable',
                                    value: '₹$orderTotal',
                                    isBold: true),
                                SizedBox(height: 8),

                                // Show savings message if coupon is applied
                                if (checkoutItemsProvider.isCouponApplied)
                                  Text(
                                    'You saved ₹$discount on this order! 🎉',
                                    style: AppTextStyles.heading2(
                                      context,
                                      overrideStyle: TextStyle(
                                        color: Colors.green,
                                        fontSize: ResponsiveHelper.fontSize(context, 12),
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            );
          },
        ),
      ],
    );
  }


// ✅ NEW WIDGET: Coupon Section
  Widget buildCouponSection(CheckoutProvider provider) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 12, vertical: 16),
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [Colors.orange.shade50, Colors.deepOrange.shade50],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.orange.shade200, width: 2),
        boxShadow: [
          BoxShadow(
            color: Colors.orange.withOpacity(0.2),
            blurRadius: 8,
            offset: Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: Colors.orange,
                  shape: BoxShape.circle,
                ),
                child: Icon(Icons.local_offer, color: Colors.white, size: 20),
              ),
              SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "🎉 First Time User Offer!",
                      style: AppTextStyles.heading1(
                        context,
                        overrideStyle: TextStyle(
                          fontSize: ResponsiveHelper.fontSize(context, 14),
                          fontWeight: FontWeight.bold,
                          color: Colors.deepOrange.shade900,
                        ),
                      ),
                    ),
                    SizedBox(height: 4),
                    Text(
                      "Get ₹200 OFF on your first order",
                      style: AppTextStyles.bodyText1(
                        context,
                        overrideStyle: TextStyle(
                          fontSize: ResponsiveHelper.fontSize(context, 12),
                          color: Colors.black87,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          SizedBox(height: 12),

          // Apply/Remove Button
          SolidRoundedButton(
            text: provider.isCouponApplied ? "Remove Coupon" : "Apply Coupon",
            color: provider.isCouponApplied ? Colors.red : Colors.green,
            borderRadius: 8.0,
            onPressed: () {
              if (provider.isCouponApplied) {
                provider.removeCoupon();
                showCustomSnackbarHelper.showSnackbar(
                  context: context,
                  message: "Coupon removed",
                  backgroundColor: Colors.orange,
                  duration: Duration(seconds: 2),
                );
              } else {
                provider.applyCoupon();
                showCustomSnackbarHelper.showSnackbar(
                  context: context,
                  message: "₹200 coupon applied successfully! 🎉",
                  backgroundColor: Colors.green,
                  duration: Duration(seconds: 2),
                );
              }
            },
            textStyle: TextStyle(
              color: Colors.white,
              fontSize: 14,
              fontWeight: FontWeight.bold,
            ),
          ),

        ],
      ),
    );
  }

  Widget buildTextField(
    String label,
    String hint,
    TextEditingController controller, {
    TextInputType keyboardType = TextInputType.text,
    bool isRequired = false,
  }) {
    return Form(
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(label, style: const TextStyle(fontWeight: FontWeight.bold)),
            const SizedBox(height: 5),
            TextFormField(
              controller: controller,
              keyboardType: keyboardType,
              validator: isRequired
                  ? (value) {
                      if (value == null || value.trim().isEmpty) {
                        return "$label is required";
                      }
                      return null;
                    }
                  : null,
              decoration: InputDecoration(
                hintText: hint,
                filled: true,
                fillColor: Colors.grey.shade100,
                border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10),
                    borderSide: BorderSide.none),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget buildPhoneField() {
    return CheckoutTextField(
        label: "Phone Number*",
        hint: "Enter Phone Number",
        controller: phoneController,
        maxLength: 10,
        keyboardType: TextInputType.number,
        isRequired: true);

    // buildTextField(
    //   "Phone Number*", "Enter phone number", phoneController,
    //   keyboardType: TextInputType.number, isRequired: true);
  }

  Widget buildAltPhoneField() {
    return CheckoutTextField(
        label: "Whatsapp Number",
        hint: "Whatsapp Number",
        controller: altPhoneController,
        maxLength: 10,
        keyboardType: TextInputType.number,
        isRequired: true);

    // buildTextField(
    //   "Phone Number*", "Enter phone number", phoneController,
    //   keyboardType: TextInputType.number, isRequired: true);
  }

  Widget buildDropdown(String hint, List<String> items, String? selectedValue,
      Function(String?) onChanged) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(hint, style: const TextStyle(fontWeight: FontWeight.bold)),
          const SizedBox(height: 5),
          Container(
            width: double.infinity, // Ensures dropdown width matches parent
            decoration: BoxDecoration(
              color: Colors.grey.shade100, // Background color
              borderRadius: BorderRadius.circular(10),
            ),
            child: DropdownButtonFormField<String>(
              decoration: InputDecoration(
                filled: true,
                fillColor: Colors.transparent,
                // Keeps background color from Container
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10),
                  borderSide: BorderSide.none,
                ),
                contentPadding:
                    EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              ),
              hint: Text(hint),
              value: selectedValue,
              onChanged: onChanged,
              items: items
                  .map((item) => DropdownMenuItem(
                        value: item,
                        child: Text(item),
                      ))
                  .toList(),
              dropdownColor: Colors.white, // Background color of dropdown list
            ),
          ),
        ],
      ),
    );
  }
}

class AddressTypeSelector extends StatefulWidget {
  final List<String> addressTypes;
  final String? selectedAddressType;
  final ValueChanged<String> onSelected;

  const AddressTypeSelector({
    Key? key,
    required this.addressTypes,
    this.selectedAddressType,
    required this.onSelected,
  }) : super(key: key);

  @override
  _AddressTypeSelectorState createState() => _AddressTypeSelectorState();
}

class _AddressTypeSelectorState extends State<AddressTypeSelector> {
  String? _selectedType;

  @override
  void initState() {
    super.initState();
    _selectedType = widget.selectedAddressType ?? widget.addressTypes.first;
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "Select Address Type",
            style: AppTextStyles.bodyText1(
              context,
              overrideStyle: TextStyle(
                  color: Colors.black,
                  fontWeight: FontWeight.bold,
                  fontSize: ResponsiveHelper.fontSize(context, 12)),
            ),
          ),
          const SizedBox(height: 8),
          Wrap(
            spacing: 10, // Spacing between chips
            children: widget.addressTypes.map((type) {
              return ChoiceChip(
                label: Text(type),
                selected: _selectedType == type,
                selectedColor: AppColors.primary,
                checkmarkColor: Colors.white,
                labelStyle: AppTextStyles.heading1(
                  context,
                  overrideStyle: TextStyle(
                      color: _selectedType == type
                          ? AppColors.whiteColor
                          : Colors.black,
                      fontWeight: FontWeight.bold,
                      fontSize: ResponsiveHelper.fontSize(context, 12)),
                ),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20),
                ),
                onSelected: (isSelected) {
                  if (isSelected) {
                    setState(() {
                      _selectedType = type;
                    });
                    widget.onSelected(type);
                  }
                },
              );
            }).toList(),
          ),
        ],
      ),
    );
  }
}

class PaymentSelectionWidget extends StatefulWidget {
  @override
  _PaymentSelectionWidgetState createState() => _PaymentSelectionWidgetState();
}

class _PaymentSelectionWidgetState extends State<PaymentSelectionWidget> {
  String selectedPayment = "razorpay"; // Default selected payment method

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 15.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "Select Payment Method",
            style: AppTextStyles.heading1(
              context,
              overrideStyle: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: ResponsiveHelper.fontSize(context, 14),
              ),
            ),
          ),
          SizedBox(height: 10),

          // ✅ Razorpay Payment Option
          _buildPaymentOption(
            title: "Pay with Razorpay",
            subtitle: "Pay securely using Razorpay",
            image: "assets/images/razorpayicon.png",
            value: "razorpay",
          ),

          //✅ Cash on Delivery (COD) Option
          // _buildPaymentOption(
          //   title: "Cash on Delivery",
          //   subtitle: "Pay cash upon receiving the order",
          //   image: "assets/images/codimage.png",
          //   value: "razorpay",
          // ),
        ],
      ),
    );
  }

  /// 🔹 **Reusable Payment Option Builder**
  Widget _buildPaymentOption({
    required String title,
    required String subtitle,
    required String image,
    required String value,
  }) {
    bool isSelected = selectedPayment == value;

    print("selected payment mehtod=>${selectedPayment}");
    return GestureDetector(
      onTap: () {
        setState(() {
          selectedPayment = value;
          // print("selected payment mehtod=>${selectedPayment}");
        });
      },
      child: AnimatedContainer(
        duration: Duration(milliseconds: 300),
        margin: EdgeInsets.symmetric(vertical: 6),
        padding: EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: isSelected ? Colors.blue.shade50 : Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isSelected ? Colors.blue : Colors.grey.shade300,
            width: isSelected ? 1 : 1,
          ),
          boxShadow: [
            if (isSelected)
              BoxShadow(
                color: Colors.blue.shade200,
                blurRadius: 5,
                spreadRadius: 1,
              ),
          ],
        ),
        child: Row(
          children: [
            // ✅ Payment Icon
            ImageLoaderUtil.assetImage(image, width: 40, height: 40),
            SizedBox(width: 12),

            // ✅ Payment Details
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: AppTextStyles.heading1(
                      context,
                      overrideStyle: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: ResponsiveHelper.fontSize(context, 14),
                      ),
                    ),
                  ),
                  SizedBox(height: 4),
                  Text(
                    subtitle,
                    style: AppTextStyles.caption(
                      context,
                      overrideStyle: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: ResponsiveHelper.fontSize(context, 10),
                      ),
                    ),
                  ),
                ],
              ),
            ),

            // ✅ Selection Indicator
            Icon(
              isSelected ? Icons.radio_button_checked : Icons.radio_button_off,
              color: isSelected ? Colors.blue : Colors.grey,
            ),
          ],
        ),
      ),
    );
  }
}
