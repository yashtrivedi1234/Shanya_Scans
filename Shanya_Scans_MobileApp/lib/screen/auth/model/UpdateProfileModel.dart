import 'dart:convert';

UpdateProfileModel updateProfileModelFromJson(String str) =>
    UpdateProfileModel.fromJson(json.decode(str));

String updateProfileModelToJson(UpdateProfileModel data) =>
    json.encode(data.toJson());

class UpdateProfileModel {
  final bool? success;
  final String? message;
  final Data? data;

  UpdateProfileModel({
    this.success,
    this.message,
    this.data,
  });

  factory UpdateProfileModel.fromJson(Map<String, dynamic> json) =>
      UpdateProfileModel(
        success: json["success"],
        message: json["message"],
        data: json["data"] == null ? null : Data.fromJson(json["data"]),
      );

  Map<String, dynamic> toJson() => {
    "success": success,
    "message": message,
    "data": data?.toJson(),
  };
}

class Data {
  final String? id;
  final String? name;
  final String? email;
  final String? password;
  final String? verificationCode;
  final bool? isVerified;
  final List<dynamic>? orderDetails;
  final String? phoneNumber;
  final String? whatsappNumber;
  final String? age;
  final String? dob;
  final String? gender;
  final List<dynamic>? member;
  final int? v;
  final String? token;

  Data({
    this.id,
    this.name,
    this.email,
    this.password,
    this.verificationCode,
    this.isVerified,
    this.orderDetails,
    this.phoneNumber,
    this.whatsappNumber,
    this.age,
    this.dob,
    this.gender,
    this.member,
    this.v,
    this.token,
  });

  factory Data.fromJson(Map<String, dynamic> json) => Data(
    id: json["_id"],
    name: json["name"],
    email: json["email"],
    password: json["password"],
    verificationCode: json["verificationCode"],
    isVerified: json["isVerified"],
    orderDetails: json["orderDetails"] == null
        ? []
        : List<dynamic>.from(json["orderDetails"]!.map((x) => x)),
    phoneNumber: json["phoneNumber"],
    whatsappNumber: json["whatsappNumber"],
    age: json["age"],
    dob: json["dob"],
    gender: json["gender"],
    member: json["member"] == null
        ? []
        : List<dynamic>.from(json["member"]!.map((x) => x)),
    v: json["__v"],
    token: json["token"],
  );

  Map<String, dynamic> toJson() => {
    "_id": id,
    "name": name,
    "email": email,
    "password": password,
    "verificationCode": verificationCode,
    "isVerified": isVerified,
    "orderDetails": orderDetails == null
        ? []
        : List<dynamic>.from(orderDetails!.map((x) => x)),
    "phoneNumber": phoneNumber,
    "whatsappNumber": whatsappNumber,
    "age": age,
    "dob": gender,
    "gender": gender,
    "member":
    member == null ? [] : List<dynamic>.from(member!.map((x) => x)),
    "__v": v,
    "token": token,
  };
}


// class UpdateProfileModel {
//   bool? success;
//   String? message;
//   Data? data;
//
//   UpdateProfileModel({this.success, this.message, this.data});
//
//   UpdateProfileModel.fromJson(Map<String, dynamic> json) {
//     success = json['success'];
//     message = json['message'];
//     data = json['data'] != null ? new Data.fromJson(json['data']) : null;
//   }
//
//   Map<String, dynamic> toJson() {
//     final Map<String, dynamic> data = new Map<String, dynamic>();
//     data['success'] = this.success;
//     data['message'] = this.message;
//     if (this.data != null) {
//       data['data'] = this.data!.toJson();
//     }
//     return data;
//   }
// }
//
// class Data {
//   String? sId;
//   String? name;
//   String? email;
//   String? password;
//   String? verificationCode;
//   bool? isVerified;
//   List<String>? orderDetails;
//   String? phoneNumber;
//   String? whatsappNumber;
//   String? age;
//   List<String>? member;
//   int? iV;
//   String? token;
//
//   Data(
//       {this.sId,
//         this.name,
//         this.email,
//         this.password,
//         this.verificationCode,
//         this.isVerified,
//         this.orderDetails,
//         this.phoneNumber,
//         this.whatsappNumber,
//         this.age,
//         this.member,
//         this.iV,
//         this.token});
//
//   Data.fromJson(Map<String, dynamic> json) {
//     sId = json['_id'];
//     name = json['name'];
//     email = json['email'];
//     password = json['password'];
//     verificationCode = json['verificationCode'];
//     isVerified = json['isVerified'];
//     orderDetails = json['orderDetails'];
//     // if (json['orderDetails'] != null) {
//     //   orderDetails = <Null>[];
//     //   json['orderDetails'].forEach((v) {
//     //     orderDetails!.add(new Null.fromJson(v));
//     //   });
//     // }
//     phoneNumber = json['phoneNumber'];
//     whatsappNumber = json['whatsappNumber'];
//     age = json['age'];
//
//     member = json['member'];
//     // member = json['member'] ?? []; // FIXED: Handle null lists
//     iV = json['__v'];
//     token = json['token'];
//   }
//
//   Map<String, dynamic> toJson() {
//     final Map<String, dynamic> data = new Map<String, dynamic>();
//     data['_id'] = this.sId;
//     data['name'] = this.name;
//     data['email'] = this.email;
//     data['password'] = this.password;
//     data['verificationCode'] = this.verificationCode;
//     data['isVerified'] = this.isVerified;
//     data['orderDetails'] = this.orderDetails;
//     // if (this.orderDetails != null) {
//     //   data['orderDetails'] = this.orderDetails!.map((v) => v.toJson()).toList();
//     // }
//     data['phoneNumber'] = this.phoneNumber;
//     data['whatsappNumber'] = this.whatsappNumber;
//     data['age'] = this.age;
//     // if (this.member != null) {
//     //   data['member'] = this.member!.map((v) => v.toJson()).toList();
//     // }
//     data['member'] = this.member;
//     data['__v'] = this.iV;
//     data['token'] = this.token;
//     return data;
//   }
// }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// // class UpdateProfileModel {
// //   bool? success;
// //   String? message;
// //   Data? data;
// //
// //   UpdateProfileModel({this.success, this.message, this.data});
// //
// //   UpdateProfileModel.fromJson(Map<String, dynamic> json) {
// //     success = json['success'];
// //     message = json['message'];
// //     data = json['data'] != null ? new Data.fromJson(json['data']) : null;
// //   }
// //
// //   Map<String, dynamic> toJson() {
// //     final Map<String, dynamic> data = new Map<String, dynamic>();
// //     data['success'] = this.success;
// //     data['message'] = this.message;
// //     if (this.data != null) {
// //       data['data'] = this.data!.toJson();
// //     }
// //     return data;
// //   }
// // }
// //
// // class Data {
// //   String? sId;
// //   String? name;
// //   String? email;
// //   Null verificationCode;
// //   bool? isVerified;
// //   String? password;
// //   List<dynamic>? member;
// //   int? iV;
// //   String? age;
// //   List<String>? orderDetails;
// //   String? phoneNumber;
// //   String? token;
// //   String? whatsappNumber;
// //
// //   Data(
// //       {this.sId,
// //         this.name,
// //         this.email,
// //         this.verificationCode,
// //         this.isVerified,
// //         this.password,
// //         this.member,
// //         this.iV,
// //         this.age,
// //         this.orderDetails,
// //         this.phoneNumber,
// //         this.token,
// //         this.whatsappNumber});
// //
// //   Data.fromJson(Map<String, dynamic> json) {
// //     sId = json['_id'];
// //     name = json['name'];
// //     email = json['email'];
// //     verificationCode = json['verificationCode'];
// //     isVerified = json['isVerified'];
// //     password = json['password'];
// //     member = json['member'] ?? []; // FIXED: Handle null lists
// //
// //     // if (json['member'] != null) {
// //     //   member = <Null>[];
// //     //   json['member'].forEach((v) {
// //     //     member!.add(new Null.fromJson(v));
// //     //   });
// //     // }
// //
// //
// //     iV = json['__v'];
// //     age = json['age'];
// //     orderDetails = json['orderDetails'].cast<String>();
// //     phoneNumber = json['phoneNumber'];
// //     token = json['token'];
// //     whatsappNumber = json['whatsappNumber'];
// //   }
// //
// //   Map<String, dynamic> toJson() {
// //     final Map<String, dynamic> data = new Map<String, dynamic>();
// //     data['_id'] = this.sId;
// //     data['name'] = this.name;
// //     data['email'] = this.email;
// //     data['verificationCode'] = this.verificationCode;
// //     data['isVerified'] = this.isVerified;
// //     data['password'] = this.password;
// //     if (this.member != null) {
// //       data['member'] = this.member!.map((v) => v.toJson()).toList();
// //     }
// //     data['__v'] = this.iV;
// //     data['age'] = this.age;
// //     data['orderDetails'] = this.orderDetails;
// //     data['phoneNumber'] = this.phoneNumber;
// //     data['token'] = this.token;
// //     data['whatsappNumber'] = this.whatsappNumber;
// //     return data;
// //   }
// // }
