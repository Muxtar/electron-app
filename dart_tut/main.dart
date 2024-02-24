void main() {
  List<dynamic> nums = [
    1,
    2,
    4,
    5.5,
    6,
    'muxtar',
    true,
    [1, 2],
    ['eli', 1]
  ];
  dynamic a = 1;
  print(a.runtimeType);
  // for (int i = 0; nums.length > i; i++) {
  //   print('${nums[i].runtimeType} == > ${nums[i]}');
  // }
}
