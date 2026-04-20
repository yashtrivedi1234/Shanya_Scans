import 'dart:math';
import 'package:flutter/material.dart';
import 'package:shanya_scans/screen/order/screen/order_history_detail.dart';
import 'package:provider/provider.dart';
import 'package:shanya_scans/ui_helper/app_colors.dart';
import 'package:shanya_scans/util/image_loader_util.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../../base_widgets/common/default_common_app_bar.dart';
import '../../../ui_helper/app_text_styles.dart';
import '../../../ui_helper/responsive_helper.dart';
import '../../../ui_helper/storage_helper.dart';
import '../../../util/date_formate.dart';
import '../../../util/download_file_utils.dart';
import '../controller/order_provider.dart';
import '../model/MyOrderHistoryListModel.dart';
import 'package:shanya_scans/base_widgets/loading_indicator.dart';

class OrderListScreen extends StatefulWidget {
  @override
  State<OrderListScreen> createState() => _OrderListScreenState();
}

class _OrderListScreenState extends State<OrderListScreen> {
  @override
  void initState() {
    super.initState();
    _refreshData();
    // ✅ Check offer eligibility on screen load
    _checkOfferEligibility();
  }

  Future<void> _refreshData() async {
    WidgetsBinding.instance.addPostFrameCallback((_) async  {
      final orderProvider =
      Provider.of<OrderApiProvider>(context, listen: false);
     await orderProvider.getOrderHistory(context);
    });
    print("refresh data is loaded");
  }
  // ✅ NEW METHOD: Check and log offer eligibility
  Future<void> _checkOfferEligibility() async {
    try {
      final storage = StorageHelper();
      await storage.init();

      int orderCount = await storage.getOrderCount();
      bool shouldShowOffer = orderCount < 1;

      print("===========================================");
      print("🎁 OFFER ELIGIBILITY CHECK");
      print("📊 Total orders: $orderCount");
      print("🎯 Should show offer: $shouldShowOffer");
      print("===========================================");
    } catch (e) {
      print("❌ Error checking offer eligibility: $e");
    }
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: DefaultCommonAppBar(
        activityName: "Your Orders",
        backgroundColor: AppColors.primary,
      ),
      body: Consumer<OrderApiProvider>(
        builder: (context, orderProvider, child) {
          if (orderProvider.isLoading) {
            return loadingIndicator();
          }  else {
            final orderHistoryList =orderProvider.myOrderHistoryListModel?.data;
            if (orderHistoryList == null || orderHistoryList.isEmpty) {
              return Center(
                child: Text(
                  "No Orders Found",
                    style: AppTextStyles.bodyText1(
                      context,
                      overrideStyle: TextStyle(
                        fontSize: ResponsiveHelper.fontSize(
                            context, 16),
                      ),
                    ),
                ),
              );
            }

            return RefreshIndicator(
              onRefresh: _refreshData,
              child: ListView.builder(
                itemCount: orderHistoryList.length,
                itemBuilder: (context, index) {
                  final order = orderHistoryList[index];
                  return OrderCard(order: order);
                },
              ),
            );
          }
        },
      ),
    );
  }
}

class OrderCard extends StatefulWidget {
  final Data order;

  OrderCard({Key? key, required this.order}) : super(key: key);

  @override
  State<OrderCard> createState() => _OrderCardState();
}

class _OrderCardState extends State<OrderCard> {
  final Random _random = Random();

  final List<Color> _statusColors = [
    Colors.green.shade500,
    Colors.orange.shade500,
    Colors.red.shade500,
    Colors.blue.shade500,
    Colors.purple.shade500,
    Colors.teal.shade500,
  ];

  double _downloadProgress = 0.0;
  bool _isDownloading = false;
  Color _getRandomStatusColor() {
    return _statusColors[_random.nextInt(_statusColors.length)];
  }

  Future<void> _downloadFile() async {
    final url = widget.order.report?.secureUrl.toString() ?? "";

    if (url.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Report URL is empty. Cannot download.")),
      );
      return;
    }

    setState(() {
      _isDownloading = true;
      _downloadProgress = 0.0;
    });

    await FileDownloader.downloadFile(
      url: url,
      fileName: "report_${widget.order.orderName}.pdf",
      context: context,
      onProgress: (progress) {
        setState(() {
          _downloadProgress = progress;
        });
      },
    );

    setState(() {
      _isDownloading = false;
      _downloadProgress = 0.0;
    });
  }
  @override
  Widget build(BuildContext context) {
    Color statusColor = _getRandomStatusColor();

    return Padding(
      padding: const EdgeInsets.only(top: 0.0, bottom: 0.0, left: 5, right: 5),
      child: Padding(
        padding: EdgeInsets.all(10),
        child: InkWell(
          onTap: () {
            print("Navigating to order history detail with ID: ${widget.order.sId}");
            Navigator.push(
              context,
              MaterialPageRoute(
                  builder: (context) => UserOrderHistoryDetailScreen(
                        orderId: widget.order.sId.toString(),
                      )),
              // MaterialPageRoute(builder: (context) =>  OrderDetailsPage(orderId: order.sId.toString(),)),
            );
          },
          child: Container(
            width: double.infinity,
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(15),
              boxShadow: [
                BoxShadow(
                  color: Colors.black12,
                  blurRadius: 8,
                  spreadRadius: 2,
                  offset: Offset(0, 4),
                ),
              ],
            ),
            child: Padding(
              // commit just check
              padding: const EdgeInsets.all(12.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Order ID & Status
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(
                        child: Text(
                          "${widget.order.orderName}",
                          style: TextStyle(
                              fontSize: 16, fontWeight: FontWeight.bold),
                          maxLines: 2, // Limits to 2 lines
                          overflow: TextOverflow
                              .ellipsis, // Adds "..." if text is too long
                        ),
                      ),
                      _buildStatusBadge(widget.order.bookingStatus.toString()),
                    ],
                  ),

                  SizedBox(height: 6),
                  // Customer & Address
                  Row(
                    children: [
                      Row(
                        children: [
                          Text(
                            "Patient Name: ",
                            style: AppTextStyles.bodyText1(
                              context,
                              overrideStyle: TextStyle(
                                color: Colors.black,
                                fontSize:
                                    ResponsiveHelper.fontSize(context, 12),
                              ),
                            ),
                          ),
                          Text(
                            "${widget.order.patientName.toString()}",
                            style: AppTextStyles.bodyText1(
                              context,
                              overrideStyle: TextStyle(
                                fontSize:
                                    ResponsiveHelper.fontSize(context, 12),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),

                  SizedBox(height: 5),
                  Row(
                    children: [
                      Text(
                        "Date:",
                        style: AppTextStyles.bodyText1(
                          context,
                          overrideStyle: TextStyle(
                            color: Colors.black,
                            fontSize: ResponsiveHelper.fontSize(context, 12),
                          ),
                        ),
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                      SizedBox(width: 4),
                      Expanded(
                        child: Text(
                          "${DateUtil.formatISODate(widget.order.bookingDate.toString())}",
                          style:
                              TextStyle(fontSize: 13, color: Colors.grey[700]),
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      Text(
                        "Time:",
                        style: TextStyle(fontSize: 13, color: Colors.black),
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                      SizedBox(width: 4),
                      Expanded(
                        child: Text(
                          "${DateUtil.formatISOTime(widget.order.bookingTime.toString())}",
                          style:
                              TextStyle(fontSize: 13, color: Colors.grey[700]),
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                  // SizedBox(height: 10),

                  // Row(
                  //   children: [
                  //     Icon(Icons.location_on, color: Colors.red, size: 18),
                  //     SizedBox(width: 4),
                  //     Expanded(
                  //       child: Text(
                  //         "Lucknow",
                  //         style: TextStyle(fontSize: 13, color: Colors.grey[700]),
                  //         maxLines: 2,
                  //         overflow: TextOverflow.ellipsis,
                  //       ),
                  //     ),
                  //   ],
                  // ),

                  // SizedBox(height: 10),
                  // Row(
                  //   children: [
                  //     Text(
                  //       "Payment Mode:",
                  //       style: TextStyle(
                  //           fontSize: 13,
                  //           color: Colors.black,
                  //           fontWeight: FontWeight.bold),
                  //       maxLines: 2,
                  //       overflow: TextOverflow.ellipsis,
                  //     ),
                  //     SizedBox(width: 4),
                  //     Expanded(
                  //       child: Text(
                  //         "Cash on delivery ",
                  //         style: TextStyle(
                  //             fontSize: 13,
                  //             color: Colors.black,
                  //             fontWeight: FontWeight.bold),
                  //         maxLines: 2,
                  //         overflow: TextOverflow.ellipsis,
                  //       ),
                  //     ),
                  //   ],
                  // ),

                  // Call & Navigate Buttons (Replaced ElevatedButton with TextButton)
                  SizedBox(
                    height: 5,
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      if (widget.order.reportStatus == "ready")
                        Row(
                          children: [
                            // View Report Button
                            InkWell(
                              onTap: () async {
                                final url = widget.order.report?.secureUrl.toString() ?? "";
                                if (await canLaunchUrl(Uri.parse(url))) {
                                  await launchUrl(Uri.parse(url), mode: LaunchMode.externalApplication);
                                }
                              },
                              child: Row(
                                children: [
                                  Icon(Icons.visibility, color: Colors.blue),
                                  SizedBox(width: 6),
                                  Text(
                                    "View",
                                    style: TextStyle(
                                      color: Colors.blue,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            SizedBox(width: 12),
                            // Download Report Button
                            InkWell(
                              onTap: _isDownloading ? null : () => _downloadFile(),
                              child: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                                decoration: BoxDecoration(
                                  border: Border.all(color: Colors.green),
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: Row(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    if (_isDownloading)
                                      SizedBox(
                                        width: 16,
                                        height: 16,
                                        child: CircularProgressIndicator(
                                          value: _downloadProgress,
                                          strokeWidth: 2,
                                          color: Colors.green,
                                        ),
                                      )
                                    else
                                      const Icon(Icons.download, color: Colors.green, size: 16),
                                    const SizedBox(width: 6),
                                    Text(
                                      _isDownloading ? "Downloading..." : "Download",
                                      style: const TextStyle(
                                        color: Colors.green,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        )
                      else
                        Text(
                          "Report: ${widget.order.reportStatus == "not ready" ? "Not Ready" : "Pending"}",
                          style: TextStyle(
                            color: Colors.green,
                            fontWeight: FontWeight.w600,
                          ),
                        ),

                      Text(
                        "\u20B9 ${widget.order.orderPrice}",
                        style: TextStyle(
                          color: Colors.blue,
                          fontSize: 18,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  )
                  ,
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  // Status Badge Design
  Widget _buildStatusBadge(String status) {
    Color badgeColor;
    switch (status) {
      // case "pending":
      //   badgeColor = Colors.black;
      //   break;
      case "confirmed":
        badgeColor = Colors.orange;
        break;
      case "ongoing":
        badgeColor = AppColors.primary;
        break;
      case "completed":
        badgeColor = Colors.green;
        break;
      default:
        badgeColor = Colors.grey;
    }

    return Container(
      padding: EdgeInsets.symmetric(horizontal: 10, vertical: 1),
      decoration: BoxDecoration(
        color: badgeColor,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Text(
        // status== "confirmed"
        //     ? "Pending"
        //     : status == "ongoing"
        //     ? "Ongoing"
        //     : status == "completed"
        //     ? "Completed"
        //     : "",

        // status == "confirmed"
        //     ? "Confirmed"
        //     : status == "ongoing"
        //         ? "Ongoing"
        //         : status == "completed"
        //             ? "Completed"
        //             : "",

          status == "confirmed"
              ? "Confirmed"
              : status == "ongoing"
              ? "Ongoing"
              : status == "completed"
              ? "Completed"
              : status == "pending"
              ? "Pending"
              : "",


          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold,fontSize: 10),
      ),
    );
  }
}
