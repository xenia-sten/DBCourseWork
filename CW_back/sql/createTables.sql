DROP SCHEMA IF EXISTS calendar CASCADE;
CREATE SCHEMA IF NOT EXISTS calendar;
SET search_path = calendar;
CREATE TABLE IF NOT EXISTS users (
    id bigserial primary key,
    email varchar unique not null,
    phone_number varchar null,
    name varchar not null,
    password varchar not null,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
CREATE TABLE IF NOT EXISTS users_old (
    id bigserial primary key,
    email varchar not null,
    phone_number varchar null,
    name varchar not null,
    password varchar not null
);
create table if not exists roles (
    id bigserial primary key,
    name varchar not null,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
insert into roles(name)
values ('user');
insert into roles(name)
values ('admin');
CREATE TABLE IF NOT EXISTS user_roles (
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    "userId" bigint references users (id) on delete cascade not null,
    "roleId" bigint references roles (id) on delete cascade not null
);
CREATE TABLE IF NOT EXISTS jobs (
    id bigserial primary key,
    name varchar not null,
    description text null,
    user_id bigint references users (id) on delete cascade not null
);
CREATE TABLE IF NOT EXISTS company (
    id bigserial primary key,
    name varchar not null,
    description text null
);
CREATE TABLE IF NOT EXISTS users_company (
    user_id bigint references users (id) on delete cascade not null,
    company_id bigint references company (id) on delete cascade not null
);
CREATE TABLE IF NOT EXISTS category (
    id bigserial primary key,
    name varchar not null,
    job_id bigint references jobs (id) on delete
    set null
);
CREATE TABLE IF NOT EXISTS service_template (
    id bigserial primary key,
    name varchar not null,
    price integer not null,
    duration interval not null,
    user_id bigint references users (id) on delete
    set null,
        company_id bigint references company (id) on delete cascade not null,
        category_id bigint references category (id) on delete cascade not null,
        description text null
);
CREATE TABLE IF NOT EXISTS service_template_old (
    id bigserial primary key,
    name varchar not null,
    price integer not null,
    duration interval not null,
    user_id bigint references users (id) on delete
    set null,
        company_id bigint references company (id) on delete cascade not null,
        category_id bigint references category (id) on delete cascade not null,
        description text null
);
CREATE TABLE IF NOT EXISTS client (
    id bigserial primary key,
    company_id bigint references company (id) on delete cascade not null,
    email varchar unique not null,
    phone_number varchar null,
    name varchar not null,
    description text null
);
CREATE TABLE IF NOT EXISTS client_old (
    id bigserial primary key,
    company_id bigint references company (id) on delete cascade not null,
    email varchar not null,
    phone_number varchar null,
    name varchar not null,
    description text null
);
CREATE TABLE IF NOT EXISTS visit (
    id bigserial primary key,
    company_id bigint references company (id) on delete
    set null not null,
        user_id bigint references users (id),
        user_old_id bigint references users_old (id),
        template_id bigint references service_template (id),
        template_old_id bigint references service_template_old (id),
        client_id bigint references client (id),
        client_old_id bigint references client_old (id),
        visit_date timestamp not null,
        creation_date timestamp default (now()),
        description text null
);
DROP FUNCTION IF EXISTS func_is_visits_to_update_service_template();
CREATE FUNCTION func_is_visits_to_update_service_template(check_id bigint) RETURNS boolean AS '
    DECLARE
        FOUND bigint;
    BEGIN
        SELECT id FROM calendar.visit WHERE  (visit.visit_date < now() AND visit.template_id = check_id) INTO FOUND;
        IF(FOUND IS NULL)
        THEN
            RETURN false;
        END IF;
        IF(FOUND IS NOT NULL)
        THEN
            RETURN true;
        END IF;
    END;
' LANGUAGE plpgsql;
DROP FUNCTION IF EXISTS func_on_service_template_update();
CREATE FUNCTION func_on_service_template_update() RETURNS TRIGGER AS '
    DECLARE
        new_id int;
        date timestamp;
    BEGIN
        IF (calendar.func_is_visits_to_update_service_template(OLD.id) = true)
        THEN
        INSERT INTO calendar.service_template_old (name, price, duration, user_id, company_id, category_id, description)
        VALUES (OLD.name, OLD.price, OLD.duration, OLD.user_id, OLD.company_id, OLD.category_id, OLD.description) RETURNING id INTO new_id;
        UPDATE calendar.visit SET template_id = NULL, template_old_id = new_id WHERE (visit_date < now() AND template_old_id IS NULL AND template_id = OLD.id);
        END IF;
        return new;
    END;
' LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS trigger_on_update_service_template ON service_template;
CREATE TRIGGER trigger_on_update_service_template
AFTER
UPDATE ON service_template FOR EACH ROW EXECUTE PROCEDURE func_on_service_template_update();
DROP TRIGGER IF EXISTS trigger_on_delete_service_template ON service_template;
CREATE TRIGGER trigger_on_delete_service_template
AFTER DELETE ON service_template FOR EACH ROW EXECUTE PROCEDURE func_on_service_template_update();
DROP FUNCTION IF EXISTS func_is_visits_to_update_users();
CREATE FUNCTION func_is_visits_to_update_users(check_id bigint) RETURNS boolean AS '
    DECLARE
        FOUND bigint;
    BEGIN
        SELECT id FROM calendar.visit WHERE (visit_date < now() AND user_id = check_id) INTO FOUND;
        IF(FOUND IS NULL)
        THEN
            RETURN false;
        END IF;
        IF(FOUND IS NOT NULL)
        THEN
            RETURN true;
        END IF;
    END;
' LANGUAGE plpgsql;
DROP FUNCTION IF EXISTS func_on_users_update();
CREATE FUNCTION func_on_users_update() RETURNS TRIGGER AS '
    DECLARE
        new_id int;
    BEGIN
        IF (calendar.func_is_visits_to_update_users(OLD.id) = true)
        THEN
        INSERT INTO calendar.users_old (name, phone_number, email, password)
        VALUES (OLD.name, OLD.phone_number, OLD.email, OLD.password) RETURNING id INTO new_id;
        UPDATE calendar.visit SET user_id = NULL, user_old_id = new_id WHERE (visit_date < now() AND user_old_id IS NULL AND user_id = OLD.id);
        END IF;
        return new;
    END;
' LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS trigger_on_update_users ON users;
CREATE TRIGGER trigger_on_update_users
AFTER
UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE func_on_users_update();
DROP TRIGGER IF EXISTS trigger_on_delete_users ON users;
CREATE TRIGGER trigger_on_delete_users
AFTER DELETE ON users FOR EACH ROW EXECUTE PROCEDURE func_on_users_update();
DROP FUNCTION IF EXISTS func_is_visits_to_update_client();
CREATE FUNCTION func_is_visits_to_update_client(check_id bigint) RETURNS boolean AS '
    DECLARE
        FOUND bigint;
    BEGIN
        SELECT id FROM calendar.visit WHERE (visit_date < now() AND client_id = check_id) INTO FOUND;
        IF(FOUND IS NULL)
        THEN
            RETURN false;
        END IF;
        IF(FOUND IS NOT NULL)
        THEN
            RETURN true;
        END IF;
    END;
' LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS func_on_client_update();
CREATE FUNCTION func_on_client_update() RETURNS TRIGGER AS '
    DECLARE
        new_id int;
    BEGIN
        IF (calendar.func_is_visits_to_update_client(OLD.id) = true)
        THEN
        INSERT INTO calendar.client_old (company_id, email, phone_number, name, description)
        VALUES (OLD.company_id, OLD.email, OLD.phone_number, OLD.name, OLD.description) RETURNING id INTO new_id;
        UPDATE calendar.visit SET client_id = NULL, client_old_id = new_id WHERE (visit_date < now() AND client_old_id IS NULL AND client_id = OLD.id);
        END IF;
        return new;
    END;
' LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS trigger_on_update_client ON client;
CREATE TRIGGER trigger_on_update_client
AFTER
UPDATE ON client FOR EACH ROW EXECUTE PROCEDURE func_on_client_update();
DROP TRIGGER IF EXISTS trigger_on_delete_users ON client;
CREATE TRIGGER trigger_on_delete_users
AFTER DELETE ON client FOR EACH ROW EXECUTE PROCEDURE func_on_client_update();

-- DROP FUNCTION IF EXISTS func_on_user_create();
-- CREATE FUNCTION func_on_user_create() RETURNS TRIGGER AS '
--     DECLARE
--     BEGIN
--         INSERT INTO calendar.user_roles (user_id, role)
--         VALUES (new.id, 'role_user');
--         return new;
--     END;
-- ' LANGUAGE plpgsql;

-- DROP TRIGGER IF EXISTS trigger_on_create_user ON calendar.users;
-- CREATE TRIGGER trigger_on_create_user
-- AFTER INSERT ON calendar.users FOR EACH ROW EXECUTE PROCEDURE func_on_user_create();