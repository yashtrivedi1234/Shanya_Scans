import 'dart:convert';
// Add other necessary imports like dio, flutter/material.dart, etc. as per your project

class SignUpModel {
  bool? success;
  String? message;
  String? token;
  User? user;

  SignUpModel({this.success, this.message, this.token, this.user});

  SignUpModel.fromJson(Map<String, dynamic> json) {
    success = json['success'];
    message = json['message'];
    token = json['token'];
    user = json['user'] != null ? User.fromJson(json['user']) : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = {};
    data['success'] = success;
    data['message'] = message;
    data['token'] = token;
    if (user != null) {
      data['user'] = user!.toJson();
    }
    return data;
  }
}

class User {
  String? name;
  String? email;
  String? otpExpiresAt;
  bool? isVerified;
  List<OrderDetails>? orderDetails;
  String? phoneNumber;
  String? whatsappNumber;
  String? age;
  String? dob;
  String? gender;
  String? sId;
  List<dynamic>? member; // Keep as dynamic if unknown, otherwise define proper model
  int? iV;

  User({
    this.name,
    this.email,
    this.otpExpiresAt,
    this.isVerified,
    this.orderDetails,
    this.phoneNumber,
    this.whatsappNumber,
    this.age,
    this.dob,
    this.gender,
    this.sId,
    this.member,
    this.iV,
  });

  User.fromJson(Map<String, dynamic> json) {
    name = json['name'];
    email = json['email'];
    otpExpiresAt = json['otpExpiresAt'];
    isVerified = json['isVerified'];
    phoneNumber = json['phoneNumber'];
    whatsappNumber = json['whatsappNumber'];
    age = json['age'];
    dob = json['dob'];
    gender = json['gender'];
    sId = json['_id'];
    iV = json['__v'];
    member = json['member'] ?? [];

    if (json['orderDetails'] != null) {
      orderDetails = <OrderDetails>[];
      json['orderDetails'].forEach((v) {
        orderDetails!.add(OrderDetails.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = {};
    data['name'] = name;
    data['email'] = email;
    data['otpExpiresAt'] = otpExpiresAt;
    data['isVerified'] = isVerified;
    data['phoneNumber'] = phoneNumber;
    data['whatsappNumber'] = whatsappNumber;
    data['age'] = age;
    data['dob'] = dob;
    data['gender'] = gender;
    data['_id'] = sId;
    data['__v'] = iV;

    if (orderDetails != null) {
      data['orderDetails'] = orderDetails!.map((v) => v.toJson()).toList();
    }

    // Only map member if items have toJson(), otherwise just assign raw
    if (member != null) {
      // Warning: this may fail if items don't have toJson()
      // data['member'] = member!.map((v) => v.toJson()).toList();
      data['member'] = member; // Safer: keep as raw list
    }

    return data;
  }
}

class OrderDetails {
  String? sId;
  String? orderName;
  String? phone;
  String? altPhone;
  String? address;
  String? name;
  String? category;
  String? price;
  String? bod;
  String? bot;
  String? createdAt;
  String? updatedAt;
  int? iV;

  OrderDetails({
    this.sId,
    this.orderName,
    this.phone,
    this.altPhone,
    this.address,
    this.name,
    this.category,
    this.price,
    this.bod,
    this.bot,
    this.createdAt,
    this.updatedAt,
    this.iV,
  });

  OrderDetails.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    orderName = json['orderName'];
    phone = json['phone'];
    altPhone = json['altPhone'];
    address = json['address'];
    name = json['name'];
    category = json['category'];
    price = json['price'];
    bod = json['bod'];
    bot = json['bot'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = {};
    data['_id'] = sId;
    data['orderName'] = orderName;
    data['phone'] = phone;
    data['altPhone'] = altPhone;
    data['address'] = address;
    data['name'] = name;
    data['category'] = category;
    data['price'] = price;
    data['bod'] = bod;
    data['bot'] = bot;
    data['createdAt'] = createdAt;
    data['updatedAt'] = updatedAt;
    data['__v'] = iV;
    return data;
  }
}






//
// class SignUpModel {
//   final bool success;
//   final String message;
//
//   SignUpModel({
//     required this.success,
//     required this.message,
//   });
//
//   // Factory constructor to create an instance from JSON
//   factory SignUpModel.fromJson(Map<String, dynamic> json) {
//     return SignUpModel(
//       success: json["success"] ?? false,
//       message: json["message"] ?? "Something went wrong",
//     );
//   }
//
//   // Convert instance to JSON (useful for debugging or saving data locally)
//   Map<String, dynamic> toJson() {
//     return {
//       "success": success,
//       "message": message,
//     };
//   }
// }
