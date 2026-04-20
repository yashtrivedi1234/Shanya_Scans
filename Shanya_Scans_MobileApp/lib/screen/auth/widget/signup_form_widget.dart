import 'package:flutter/material.dart';
import 'package:shanya_scans/screen/auth/controller/auth_provider.dart';
import 'package:shanya_scans/screen/auth/login_screen.dart';
import 'package:shanya_scans/base_widgets/loading_indicator.dart';
import 'package:provider/provider.dart';
import '../../../base_widgets/common/custom_text_field.dart';
import '../../../base_widgets/solid_rounded_button.dart';
import '../../../ui_helper/app_colors.dart';
import '../../../ui_helper/app_text_styles.dart';
import '../../../ui_helper/responsive_helper.dart';

class SignUpFormWidget extends StatefulWidget {
  final String phoneNumber; // ✅ Verified phone number pass karenge

  const SignUpFormWidget({super.key, required this.phoneNumber});

  @override
  _SignUpFormWidgetState createState() => _SignUpFormWidgetState();
}

class _SignUpFormWidgetState extends State<SignUpFormWidget> {
  final TextEditingController nameController = TextEditingController();
  final TextEditingController ageController = TextEditingController();
  final TextEditingController dobController = TextEditingController();

  String? selectedGender;

  final FocusNode _nameFocusNode = FocusNode();
  final FocusNode _ageFocusNode = FocusNode();
  final FocusNode _dobFocusNode = FocusNode();

  final _formKey = GlobalKey<FormState>();

  // ✅ Final signup with all details
  void handleSubmit() async {
    if (_formKey.currentState!.validate()) {
      final signUpProvider = context.read<AuthApiProvider>();

      await signUpProvider.signUpUser(
        context,
        nameController.text.trim(),
        widget.phoneNumber, // Use verified phone number
        ageController.text.trim(),
        dobController.text.trim(),
        selectedGender ?? '',
      );
    }
  }

  // DOB Date Picker
  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(1900),
      lastDate: DateTime.now(),
    );
    if (picked != null) {
      String formattedDate =
          "${picked.day.toString().padLeft(2, '0')}-${picked.month.toString().padLeft(2, '0')}-${picked.year}";
      setState(() {
        dobController.text = formattedDate;
      });
    }
  }

  @override
  void initState() {
    super.initState();
    _nameFocusNode.addListener(() => setState(() {}));
    _ageFocusNode.addListener(() => setState(() {}));
    _dobFocusNode.addListener(() => setState(() {}));
  }

  @override
  void dispose() {
    nameController.dispose();
    ageController.dispose();
    dobController.dispose();
    _nameFocusNode.dispose();
    _ageFocusNode.dispose();
    _dobFocusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.whiteColor,
      appBar: AppBar(
        backgroundColor: AppColors.whiteColor,
        elevation: 0,
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: Colors.black),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(
          "Complete Signup",
          style: AppTextStyles.heading1(context),
        ),
        centerTitle: true,
      ),
      body: GestureDetector(
        onTap: () => FocusScope.of(context).unfocus(),
        child: SingleChildScrollView(
          child: Form(
            key: _formKey,
            child: Padding(
              padding: const EdgeInsets.all(20.0),
              child: Container(
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxShadow(
                      color: AppColors.primary.withOpacity(0.05),
                      blurRadius: 20,
                      spreadRadius: 5,
                      offset: const Offset(0, 5),
                    ),
                  ],
                ),
                padding: const EdgeInsets.all(20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // ✅ Phone number display (read-only)
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 10.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            "Phone Number (Verified)",
                            style: AppTextStyles.heading2(
                              context,
                              overrideStyle: TextStyle(
                                fontSize: ResponsiveHelper.fontSize(context, 10),
                                color: Colors.green,
                              ),
                            ),
                          ),
                          const SizedBox(height: 4),
                          Container(
                            padding: EdgeInsets.all(16),
                            decoration: BoxDecoration(
                              color: Colors.green.shade50,
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(color: Colors.green),
                            ),
                            child: Row(
                              children: [
                                Icon(Icons.check_circle, color: Colors.green),
                                SizedBox(width: 10),
                                Text(
                                  widget.phoneNumber,
                                  style: AppTextStyles.heading2(
                                    context,
                                    overrideStyle: TextStyle(
                                      fontSize: ResponsiveHelper.fontSize(context, 12),
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 20),

                    CustomTextField(
                      controller: nameController,
                      focusNode: _nameFocusNode,
                      icon: Icons.person,
                      hintText: "Enter your full name",
                      title: "Full Name",
                      errorMessage: "Please enter your name",
                      keyboardType: TextInputType.name,
                    ),
                    const SizedBox(height: 10),

                    CustomTextField(
                      controller: ageController,
                      focusNode: _ageFocusNode,
                      icon: Icons.cake,
                      hintText: "Enter your age",
                      title: "Age",
                      errorMessage: "Please enter your age",
                      keyboardType: TextInputType.number,
                    ),
                    const SizedBox(height: 10),

                    CustomTextField(
                      controller: dobController,
                      focusNode: _dobFocusNode,
                      icon: Icons.calendar_month,
                      hintText: "DD-MM-YYYY",
                      title: "Date of Birth",
                      errorMessage: "Please select your date of birth",
                      keyboardType: TextInputType.none,
                      readOnly: true,
                      onTap: () => _selectDate(context),
                    ),

                    const SizedBox(height: 14),

                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 10.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            "Gender",
                            style: AppTextStyles.heading2(
                              context,
                              overrideStyle: TextStyle(
                                fontSize: ResponsiveHelper.fontSize(context, 10),
                              ),
                            ),
                          ),
                          const SizedBox(height: 4),
                          DropdownButtonFormField<String>(
                            value: selectedGender,
                            decoration: InputDecoration(
                              prefixIcon: Icon(Icons.wc, color: AppColors.primary),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                              focusedBorder: OutlineInputBorder(
                                borderSide: BorderSide(color: AppColors.primary),
                                borderRadius: BorderRadius.circular(12),
                              ),
                            ),
                            hint: Text(
                              "Select your gender",
                              style: AppTextStyles.heading2(
                                context,
                                overrideStyle: TextStyle(
                                  fontSize: ResponsiveHelper.fontSize(context, 10),
                                ),
                              ),
                            ),
                            items: ["Male", "Female", "Other"]
                                .map((label) => DropdownMenuItem(
                              value: label,
                              child: Text(
                                label,
                                style: AppTextStyles.heading2(
                                  context,
                                  overrideStyle: TextStyle(
                                    fontSize: ResponsiveHelper.fontSize(context, 10),
                                  ),
                                ),
                              ),
                            ))
                                .toList(),
                            onChanged: (value) {
                              setState(() {
                                selectedGender = value;
                              });
                            },
                            validator: (value) =>
                            value == null ? "Please select your gender" : null,
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 20),

                    Consumer<AuthApiProvider>(
                      builder: (context, signUpProvider, child) {
                        return signUpProvider.isLoading
                            ? loadingIndicator()
                            : SolidRoundedButton(
                          text: 'Complete Signup',
                          color: AppColors.primary,
                          borderRadius: 10.0,
                          onPressed: handleSubmit,
                          textStyle: const TextStyle(
                            color: Colors.white,
                            fontSize: 18,
                          ),
                        );
                      },
                    ),

                    ResponsiveHelper.sizeBoxHeightSpace(context, 2),

                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          "Already have an account?",
                          style: AppTextStyles.heading1(
                            context,
                            overrideStyle: TextStyle(
                              fontSize: ResponsiveHelper.fontSize(context, 12),
                            ),
                          ),
                        ),
                        const SizedBox(width: 8),
                        InkWell(
                          onTap: () {
                            Navigator.pushReplacement(
                              context,
                              MaterialPageRoute(builder: (context) => LoginScreen()),
                            );
                          },
                          child: Text(
                            "Login",
                            style: AppTextStyles.heading1(
                              context,
                              overrideStyle: TextStyle(
                                fontWeight: FontWeight.w900,
                                color: AppColors.primary,
                                fontSize: ResponsiveHelper.fontSize(context, 14),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}