SET search_path TO calendar;

TRUNCATE TABLE company RESTART IDENTITY CASCADE;
TRUNCATE TABLE users RESTART IDENTITY CASCADE;
TRUNCATE TABLE users_old RESTART IDENTITY CASCADE;

INSERT INTO company (name, description)
VALUES ('Nail Studio', 'Studio of nail art');

INSERT INTO users (email, phone_number, name, password)
VALUES
  ('sagittis.nullam@aol.net','1-964-752-8578','Dustin Mclean',4793),
  ('ac.nulla.in@aol.com','1-316-554-6301','Levi Manning',7876),
  ('semper.erat@protonmail.org','1-443-413-2569','Deanna Norton',7404);

-- Присвоили роли
DO
$$
  DECLARE
    admin_id integer;
    user1_id integer;
    user2_id integer;
  BEGIN
    SELECT id FROM users WHERE name = 'Dustin Mclean' INTO admin_id;
    SELECT id FROM users WHERE name = 'Levi Manning' INTO user1_id;
    SELECT id FROM users WHERE name = 'Deanna Norton' INTO user2_id;
    INSERT INTO user_roles (user_id, role) VALUES (admin_id, 'role_admin');
    INSERT INTO user_roles (user_id, role) VALUES (user1_id, 'role_user');
    INSERT INTO user_roles (user_id, role) VALUES (user2_id, 'role_user');
  END
$$;
END;

-- Присвоили пользователей компании
DO
$$
  DECLARE
    curr_company integer;
    admin_id integer;
    user1_id integer;
    user2_id integer;
  BEGIN
    SELECT id FROM company WHERE name = 'Nail Studio' INTO curr_company;
    
    SELECT id FROM users WHERE name = 'Dustin Mclean' INTO admin_id;
    SELECT id FROM users WHERE name = 'Levi Manning' INTO user1_id;
    SELECT id FROM users WHERE name = 'Deanna Norton' INTO user2_id;
    INSERT INTO users_company (user_id, company_id) VALUES (admin_id, curr_company);
    INSERT INTO users_company (user_id, company_id) VALUES (user1_id, curr_company);
    INSERT INTO users_company (user_id, company_id) VALUES (user2_id, curr_company);
  END
$$;
END;

-- Присвоили работникам должности
DO
$$
  DECLARE
    admin_id integer;
    user1_id integer;
    user2_id integer;
  BEGIN
    SELECT id FROM users WHERE name = 'Dustin Mclean' INTO admin_id;
    SELECT id FROM users WHERE name = 'Levi Manning' INTO user1_id;
    SELECT id FROM users WHERE name = 'Deanna Norton' INTO user2_id;
    INSERT INTO jobs (name, description, user_id) VALUES ('Старший мастер маникюра', 'Hhisdf', admin_id);
    INSERT INTO jobs (name, user_id) VALUES ('Мастер маникюра', user1_id);
    INSERT INTO jobs (name, user_id) VALUES ('Бровист', user1_id);
    INSERT INTO jobs (name, user_id) VALUES ('Парикмахер', user2_id);
  END
$$;
END;

-- Добавили категории услуг
DO
$$
  DECLARE
    job1_id integer;
    job2_id integer;
    job3_id integer;
    job4_id integer;
  BEGIN
    SELECT id FROM jobs WHERE name = 'Старший мастер маникюра' INTO job1_id;
    SELECT id FROM jobs WHERE name = 'Мастер маникюра' INTO job2_id;
    SELECT id FROM jobs WHERE name = 'Бровист' INTO job3_id;
    SELECT id FROM jobs WHERE name = 'Парикмахер' INTO job4_id;
    INSERT INTO category (name, job_id) VALUES ('Маникюр', job1_id);
    INSERT INTO category (name, job_id) VALUES ('Педикюр', job1_id);
    INSERT INTO category (name, job_id) VALUES ('Маникюр', job2_id);
    INSERT INTO category (name, job_id) VALUES ('Брови', job3_id);
    INSERT INTO category (name, job_id) VALUES ('Стрижка', job4_id);
  END
$$;
END;

-- Добавили услуги в категории
DO
$$
  DECLARE
    curr_company_id integer;
    curr_user_id integer;
    curr_job_id integer;
    curr_category1_id integer;
    curr_category2_id integer;
  BEGIN
    SELECT id FROM company WHERE name = 'Nail Studio' INTO curr_company_id;
    SELECT id FROM users WHERE name = 'Dustin Mclean' INTO curr_user_id;
    SELECT id FROM jobs WHERE name = 'Старший мастер маникюра' INTO curr_job_id;
    SELECT id FROM category WHERE name = 'Маникюр' AND job_id = curr_job_id INTO curr_category1_id;
    SELECT id FROM category WHERE name = 'Педикюр' AND job_id = curr_job_id INTO curr_category2_id;
    INSERT INTO service_template (name, price, duration, user_id, company_id, category_id, description)
    VALUES ('Маникюр с покрытием гель-лак', 1800, '2 hours', curr_user_id, curr_company_id, curr_category1_id, 'Jhdfjjs');
    INSERT INTO service_template (name, price, duration, user_id, company_id, category_id, description)
    VALUES ('Маникюр без покрытия', 1200, '1 hours', curr_user_id, curr_company_id, curr_category1_id, 'HOIJij');
    INSERT INTO service_template (name, price, duration, user_id, company_id, category_id, description)
    VALUES ('Наращивание', 2500, '3 hours', curr_user_id, curr_company_id, curr_category1_id, 'djhnfghn');

    INSERT INTO service_template (name, price, duration, user_id, company_id, category_id, description)
    VALUES ('Педикюр без покрытия', 1500, '2 hours', curr_user_id, curr_company_id, curr_category2_id, 'djhnfghn');
  END
$$;
END;

-- Добавление клиентов
DO
$$
  DECLARE
    curr_company_id integer;
  BEGIN
    SELECT id FROM company WHERE name = 'Nail Studio' INTO curr_company_id;
    INSERT INTO client (company_id, email, phone_number, name, description)
    VALUES (curr_company_id, 'a@outlook.edu', '1-914-832-2959', 'Vielka Buchanan', 'От Насти');
    INSERT INTO client (company_id, email, phone_number, name)
    VALUES (curr_company_id, 'quis@protonmail.org', '1-722-935-6416', 'Aretha Howe');
  END
$$;
END;

-- Добавление визитов
DO
$$
  DECLARE
    curr_company_id integer;
    curr_user_id integer;
    curr_template_id integer;
    curr_client_id integer;
  BEGIN
    SELECT id FROM company WHERE name = 'Nail Studio' INTO curr_company_id;
    SELECT id FROM users WHERE name = 'Dustin Mclean' INTO curr_user_id;
    SELECT id FROM service_template WHERE name = 'Наращивание' AND user_id = curr_user_id INTO curr_template_id;
    SELECT id FROM client WHERE name = 'Vielka Buchanan' INTO curr_client_id;
    INSERT INTO visit (company_id, user_id, template_id, client_id, visit_date)
    VALUES (curr_company_id, curr_user_id, curr_template_id, curr_client_id, '2023-01-31 12:00');
    INSERT INTO visit (company_id, user_id, template_id, client_id, visit_date)
    VALUES (curr_company_id, curr_user_id, curr_template_id, curr_client_id, '2023-02-28 15:00');
    INSERT INTO visit (company_id, user_id, template_id, client_id, visit_date)
    VALUES (curr_company_id, curr_user_id, curr_template_id, curr_client_id, '2024-05-10 18:00');
  END
$$;
END;