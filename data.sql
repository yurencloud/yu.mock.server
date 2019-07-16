-- drop table yurencloud.user;
-- drop table yurencloud.role;
-- drop table yurencloud.user_role;
-- drop table yurencloud.account;
-- drop table yurencloud.article;
-- drop table yurencloud.catalog;


insert into user (id, password, name, logo, account, mobile, needChangePassword, userCode, nickname, lastPasswordResetDate)
values
  (1, 'secret', 'tom', 'http://www.yurencloud.com/_nuxt/img/avatar.902cc14.png', 'mackwang', '15757130092', 0, 'USER3303003030123', now(), now(), now()),
  (2, 'secret', 'bob', 'http://www.yurencloud.com/_nuxt/img/avatar.902cc14.png', 'mackbob', '15757130093', 1, 'USER3303003030124', now(), now(), now());


insert into role (id, name)
values
  (1, 'ROLE_ADMIN'),
  (2, 'ROLE_USER');

insert into user_role (id, user_id, role_id)
values
  (1, 1, 1),
  (2, 2, 2);

  // code: "SGSJ000145"
  // id: 112
  // merchantAppId: "APPL2019070811444822900000400000"
  // name: "小王1"
  // status: 1
  // type: 2


insert into merchant (id, code, merchantAppId, name, status, type)
values
  (1, 'SGSJ000145', 'APPL2019070811444822900000400000)','小王1',1,2);


insert into permission (id, code, uri)
values
  (1, 'SGSJ000145', 'home.index'),
  (2, 'SGSJ000145', 'business'),
  (3, 'SGSJ000145', 'business.order');


insert into `order` (id, startTime, endTime, skuCode, supplierSkuCode, supplierOrderNo, mobile, name, star, status, productImage, productName, tag, info, price, amount, message, remark, deliveryTime, merchantCode)
values
  (1, now(), now(), 'SKU001', 'SSC001', 'NO0001','15757130092', '王乐城', 1, 1, 'http://www.yurencloud.com/_nuxt/img/avatar.902cc14.png', '华为手机', '售后中', '内存：64G', 6000.00, 1, '留言', '备注', now(), 'SGSJ000145'),
  (2, now(), now(), 'SKU002', 'SSC002', 'NO0002','15757130092', '王乐城', 1, 1, 'http://www.yurencloud.com/_nuxt/img/avatar.902cc14.png', '华为手机', '售后中', '内存：64G', 6000.00, 1, '留言', '备注', now(), 'SGSJ000145'),
  (3, now(), now(), 'SKU003', 'SSC003', 'NO0003','15757130092', '王乐城', 1, 1, 'http://www.yurencloud.com/_nuxt/img/avatar.902cc14.png', '华为手机', '售后中', '内存：64G', 6000.00, 1, '留言', '备注', now(), 'SGSJ000145'),
  (4, now(), now(), 'SKU004', 'SSC004', 'NO0004','15757130092', '王乐城', 1, 1, 'http://www.yurencloud.com/_nuxt/img/avatar.902cc14.png', '华为手机', '售后中', '内存：64G', 6000.00, 1, '留言', '备注', now(), 'SGSJ000145'),
  (5, now(), now(), 'SKU005', 'SSC005', 'NO0005','15757130092', '王乐城', 1, 1, 'http://www.yurencloud.com/_nuxt/img/avatar.902cc14.png', '华为手机', '售后中', '内存：64G', 6000.00, 1, '留言', '备注', now(), 'SGSJ000145'),
  (6, now(), now(), 'SKU006', 'SSC006', 'NO0006','15757130092', '王乐城', 1, 1, 'http://www.yurencloud.com/_nuxt/img/avatar.902cc14.png', '华为手机', '售后中', '内存：64G', 6000.00, 1, '留言', '备注', now(), 'SGSJ000145'),
  (7, now(), now(), 'SKU007', 'SSC007', 'NO0007','15757130092', '王乐城', 1, 1, 'http://www.yurencloud.com/_nuxt/img/avatar.902cc14.png', '华为手机', '售后中', '内存：64G', 6000.00, 1, '留言', '备注', now(), 'SGSJ000145'),
  (8, now(), now(), 'SKU008', 'SSC008', 'NO0008','15757130092', '王乐城', 1, 1, 'http://www.yurencloud.com/_nuxt/img/avatar.902cc14.png', '华为手机', '售后中', '内存：64G', 6000.00, 1, '留言', '备注', now(), 'SGSJ000145'),
  (9, now(), now(), 'SKU009', 'SSC009', 'NO0009','15757130092', '王乐城', 1, 1, 'http://www.yurencloud.com/_nuxt/img/avatar.902cc14.png', '华为手机', '售后中', '内存：64G', 6000.00, 1, '留言', '备注', now(), 'SGSJ000145'),
  (10, now(), now(), 'SKU010', 'SSC010', 'NO00010','15757130092', '王乐城', 1, 1, 'http://www.yurencloud.com/_nuxt/img/avatar.902cc14.png', '华为手机', '售后中', '内存：64G', 6000.00, 1, '留言', '备注', now(), 'SGSJ000145'),
  (11, now(), now(), 'SKU011', 'SSC011', 'NO0011','15757130092', '王乐城', 1, 1, 'http://www.yurencloud.com/_nuxt/img/avatar.902cc14.png', '华为手机', '售后中', '内存：64G', 6000.00, 1, '留言', '备注', now(), 'SGSJ000145'),
  (12, now(), now(), 'SKU012', 'SSC012', 'NO0012','15757130092', '王乐城', 1, 1, 'http://www.yurencloud.com/_nuxt/img/avatar.902cc14.png', '华为手机', '售后中', '内存：64G', 6000.00, 1, '留言', '备注', now(), 'SGSJ000145');

