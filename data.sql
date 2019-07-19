insert into user (id, password, name, logo, account, mobile, needChangePassword, userCode, nickname, lastPasswordResetDate)
values
  (1, '$2b$10$bt.jm3Opex8oC9r/B/F9ruvg2KdzerOH07QMhBnAOOwHPSg.7yLny', 'tom', 'http://www.yurencloud.com/_nuxt/img/avatar.902cc14.png', 'mackwang', '15757130092', 0, 'USER3303003030123', now(), now(), now()),
  (2, '$2b$10$bt.jm3Opex8oC9r/B/F9ruvg2KdzerOH07QMhBnAOOwHPSg.7yLny', 'bob', 'http://www.yurencloud.com/_nuxt/img/avatar.902cc14.png', 'mackbob', '15757130093', 1, 'USER3303003030124', now(), now(), now());


insert into role (id, name)
values
  (1, 'ROLE_ADMIN'),
  (2, 'ROLE_USER');

insert into user_role (id, user_id, role_id)
values
  (1, 1, 1),
  (2, 2, 2);

insert into merchant (id, code, merchantAppId, name, status, type)
values
  (1, 'SGSJ000145', 'APPL2019070811444822900000400000)','小王1',1,2);

insert into permission (id, code, uri)
values
  (1, 'SGSJ000145', 'home.index'),
  (2, 'SGSJ000145', 'business'),
  (3, 'SGSJ000145', 'business.order');