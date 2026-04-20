import 'package:flutter/material.dart';

import '../../ui_helper/app_text_styles.dart';
import '../../ui_helper/responsive_helper.dart';

class CheckoutTextField extends StatefulWidget {
  final String label;
  final String hint;
  final int? maxLength;
  final TextEditingController controller;
  final TextInputType keyboardType;
  final bool isRequired;
  final bool? isMultiLine;
  final int? maxLines;

  const CheckoutTextField({
    Key? key,
    required this.label,
    required this.hint,
    this.maxLength,
    required this.controller,
    this.keyboardType = TextInputType.text,
    this.isRequired = false,
    this.isMultiLine = false,
    this.maxLines ,
  }) : super(key: key);

  @override
  State<CheckoutTextField> createState() => _CheckoutTextFieldState();
}

class _CheckoutTextFieldState extends State<CheckoutTextField> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            widget.label,
            style: AppTextStyles.bodyText1(
              context,
              overrideStyle: TextStyle(
                color: Colors.black,
                  fontWeight: FontWeight.bold,
                  fontSize: ResponsiveHelper.fontSize(context, 12)),
            ),
          ),
          const SizedBox(height: 5),
          TextFormField(
            controller: widget.controller,
            keyboardType: widget.keyboardType,
            maxLength: widget.maxLength,
            maxLines: (widget.isMultiLine ?? false) ? widget.maxLines ?? 5 : widget.maxLines ?? 1,
            style: AppTextStyles.bodyText1(
              context,
              overrideStyle: TextStyle(
                color: Colors.black,
                  fontSize: ResponsiveHelper.fontSize(context, 13)),
            ),
            validator: widget.isRequired
                ? (value) {
                    if (value == null || value.trim().isEmpty) {
                      return "${widget.label} is required";
                    }
                    return null;
                  }
                : null,
            decoration: InputDecoration(
              hintText: widget.hint,
              filled: true,
              counterText: "",
              fillColor: Colors.grey.shade100,
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
                borderSide: BorderSide.none,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
