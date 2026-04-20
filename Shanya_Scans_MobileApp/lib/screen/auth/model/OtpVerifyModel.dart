class OtpVerifyModel {
  bool? success;
  String? message;
  String? token;
  User? user;

  OtpVerifyModel({this.success, this.message, this.token, this.user});

  OtpVerifyModel.fromJson(Map<String, dynamic> json) {
    success = json['success'];
    message = json['message'];
    token = json['token'];
    user = json['user'] != null ? new User.fromJson(json['user']) : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['success'] = this.success;
    data['message'] = this.message;
    data['token'] = this.token;
    if (this.user != null) {
      data['user'] = this.user!.toJson();
    }
    return data;
  }
}

class User {
  String? sId;
  String? name;
  String? email;
  String? phoneNumber;
  String? whatsappNumber;
  String? age;
  String? dob;
  String? gender;
  bool? isVerified;
  List<OrderDetails>? orderDetails;
  List<dynamic>? member;

  User(
      {this.sId,
      this.name,
      this.email,
      this.phoneNumber,
      this.whatsappNumber,
      this.age,
      this.dob,
      this.gender,
      this.isVerified,
      this.orderDetails,
      this.member});

  User.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    name = json['name'];
    email = json['email'];
    phoneNumber = json['phoneNumber'];
    whatsappNumber = json['whatsappNumber'];
    age = json['age'];
    dob = json['dob'];
    gender = json['gender'];
    isVerified = json['isVerified'];
    if (json['orderDetails'] != null) {
      orderDetails = <OrderDetails>[];
      json['orderDetails'].forEach((v) {
        orderDetails!.add(new OrderDetails.fromJson(v));
      });
    }
    member = json['member'] ?? [];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = this.sId;
    data['name'] = this.name;
    data['email'] = this.email;
    data['phoneNumber'] = this.phoneNumber;
    data['whatsappNumber'] = this.whatsappNumber;
    data['age'] = this.age;
    data['dob'] = this.dob;
    data['gender'] = this.gender;
    data['isVerified'] = this.isVerified;
    if (this.orderDetails != null) {
      data['orderDetails'] = this.orderDetails!.map((v) => v.toJson()).toList();
    }
    if (this.member != null) {
      data['member'] = this.member!.map((v) => v.toJson()).toList();
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

  OrderDetails(
      {this.sId,
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
      this.iV});

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
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = this.sId;
    data['orderName'] = this.orderName;
    data['phone'] = this.phone;
    data['altPhone'] = this.altPhone;
    data['address'] = this.address;
    data['name'] = this.name;
    data['category'] = this.category;
    data['price'] = this.price;
    data['bod'] = this.bod;
    data['bot'] = this.bot;
    data['createdAt'] = this.createdAt;
    data['updatedAt'] = this.updatedAt;
    data['__v'] = this.iV;
    return data;
  }
}

// class OtpVerifyModel {
//   bool? success;
//   String? message;
//   Data? data;
//
//   OtpVerifyModel({this.success, this.message, this.data});
//
//   OtpVerifyModel.fromJson(Map<String, dynamic> json) {
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
//   Null verificationCode;
//   bool? isVerified;
//   String? password;
//   List<dynamic>? member;
//   int? iV;
//   String? age;
//   List<OrderDetails>? orderDetails;
//   String? phoneNumber;
//   String? token;
//   String? whatsappNumber;
//
//   Data(
//       {this.sId,
//         this.name,
//         this.email,
//         this.verificationCode,
//         this.isVerified,
//         this.password,
//         this.member,
//         this.iV,
//         this.age,
//         this.orderDetails,
//         this.phoneNumber,
//         this.token,
//         this.whatsappNumber});
//
//   Data.fromJson(Map<String, dynamic> json) {
//     sId = json['_id'];
//     name = json['name'];
//     email = json['email'];
//     verificationCode = json['verificationCode'];
//     isVerified = json['isVerified'];
//     password = json['password'];
//     member = json['member'] ?? []; // FIXED: Handle null lists
//     iV = json['__v'];
//     age = json['age'];
//     if (json['orderDetails'] != null) {
//       orderDetails = <OrderDetails>[];
//       json['orderDetails'].forEach((v) {
//         orderDetails!.add(new OrderDetails.fromJson(v));
//       });
//     }
//     phoneNumber = json['phoneNumber'];
//     token = json['token'];
//     whatsappNumber = json['whatsappNumber'];
//   }
//
//   Map<String, dynamic> toJson() {
//     final Map<String, dynamic> data = new Map<String, dynamic>();
//     data['_id'] = this.sId;
//     data['name'] = this.name;
//     data['email'] = this.email;
//     data['verificationCode'] = this.verificationCode;
//     data['isVerified'] = this.isVerified;
//     data['password'] = this.password;
//     if (this.member != null) {
//       data['member'] = this.member!.map((v) => v.toJson()).toList();
//     }
//     data['__v'] = this.iV;
//     data['age'] = this.age;
//     if (this.orderDetails != null) {
//       data['orderDetails'] = this.orderDetails!.map((v) => v.toJson()).toList();
//     }
//     data['phoneNumber'] = this.phoneNumber;
//     data['token'] = this.token;
//     data['whatsappNumber'] = this.whatsappNumber;
//     return data;
//   }
// }
//
// class OrderDetails {
//   String? sId;
//   String? orderName;
//   String? phone;
//   String? altPhone;
//   String? address;
//   String? name;
//   String? category;
//   String? price;
//   String? bod;
//   String? bot;
//   String? createdAt;
//   String? updatedAt;
//   int? iV;
//
//   OrderDetails(
//       {this.sId,
//         this.orderName,
//         this.phone,
//         this.altPhone,
//         this.address,
//         this.name,
//         this.category,
//         this.price,
//         this.bod,
//         this.bot,
//         this.createdAt,
//         this.updatedAt,
//         this.iV});
//
//   OrderDetails.fromJson(Map<String, dynamic> json) {
//     sId = json['_id'];
//     orderName = json['orderName'];
//     phone = json['phone'];
//     altPhone = json['altPhone'];
//     address = json['address'];
//     name = json['name'];
//     category = json['category'];
//     price = json['price'];
//     bod = json['bod'];
//     bot = json['bot'];
//     createdAt = json['createdAt'];
//     updatedAt = json['updatedAt'];
//     iV = json['__v'];
//   }
//
//   Map<String, dynamic> toJson() {
//     final Map<String, dynamic> data = new Map<String, dynamic>();
//     data['_id'] = this.sId;
//     data['orderName'] = this.orderName;
//     data['phone'] = this.phone;
//     data['altPhone'] = this.altPhone;
//     data['address'] = this.address;
//     data['name'] = this.name;
//     data['category'] = this.category;
//     data['price'] = this.price;
//     data['bod'] = this.bod;
//     data['bot'] = this.bot;
//     data['createdAt'] = this.createdAt;
//     data['updatedAt'] = this.updatedAt;
//     data['__v'] = this.iV;
//     return data;
//   }
// }
