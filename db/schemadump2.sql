--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7
-- Dumped by pg_dump version 14.7

-- Started on 2025-04-09 10:48:28

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA IF NOT EXISTS public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3339 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 213 (class 1259 OID 51838)
-- Name: m_directory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.m_directory (
    id integer NOT NULL,
    parent integer,
    name character varying(255) DEFAULT 0,
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.m_directory OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 51837)
-- Name: m_directory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.m_directory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.m_directory_id_seq OWNER TO postgres;

--
-- TOC entry 3340 (class 0 OID 0)
-- Dependencies: 212
-- Name: m_directory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.m_directory_id_seq OWNED BY public.m_directory.id;


--
-- TOC entry 209 (class 1259 OID 51741)
-- Name: m_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.m_user (
    user_id bigint NOT NULL,
    username character varying(255)
);


ALTER TABLE public.m_user OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 51824)
-- Name: menu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.menu (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    status boolean DEFAULT true NOT NULL,
    parent_id integer
);


ALTER TABLE public.menu OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 51823)
-- Name: menu_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.menu_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.menu_id_seq OWNER TO postgres;

--
-- TOC entry 3341 (class 0 OID 0)
-- Dependencies: 210
-- Name: menu_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.menu_id_seq OWNED BY public.menu.id;


--
-- TOC entry 3175 (class 2604 OID 51841)
-- Name: m_directory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m_directory ALTER COLUMN id SET DEFAULT nextval('public.m_directory_id_seq'::regclass);


--
-- TOC entry 3173 (class 2604 OID 51827)
-- Name: menu id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu ALTER COLUMN id SET DEFAULT nextval('public.menu_id_seq'::regclass);


--
-- TOC entry 3333 (class 0 OID 51838)
-- Dependencies: 213
-- Data for Name: m_directory; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.m_directory VALUES (1, NULL, 'folder 1', true, '2025-04-09 09:38:34.563372', '2025-04-09 09:38:34.563372');
INSERT INTO public.m_directory VALUES (2, NULL, 'folder 2', true, '2025-04-09 09:38:45.791863', '2025-04-09 09:38:45.791863');
INSERT INTO public.m_directory VALUES (3, NULL, 'isi folder yang ke 3', true, '2025-04-09 09:39:38.977318', '2025-04-09 09:39:38.977318');
INSERT INTO public.m_directory VALUES (4, 1, 'sub folder 1', true, '2025-04-09 09:53:00.450496', '2025-04-09 09:53:00.450496');
INSERT INTO public.m_directory VALUES (5, 1, 'sub folder 2', true, '2025-04-09 09:53:13.637609', '2025-04-09 09:53:13.637609');


--
-- TOC entry 3329 (class 0 OID 51741)
-- Dependencies: 209
-- Data for Name: m_user; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3331 (class 0 OID 51824)
-- Dependencies: 211
-- Data for Name: menu; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.menu VALUES (1, 'Master Folder 1', true, NULL);
INSERT INTO public.menu VALUES (2, 'Master Folder 2', true, NULL);
INSERT INTO public.menu VALUES (8, 'Sub Settings', true, NULL);
INSERT INTO public.menu VALUES (9, 'Sub Profile', true, NULL);
INSERT INTO public.menu VALUES (10, 'Sub Security', true, NULL);
INSERT INTO public.menu VALUES (11, 'Sub Logout', true, NULL);
INSERT INTO public.menu VALUES (3, 'Sub Master Folder 1', true, 1);
INSERT INTO public.menu VALUES (7, 'Sub Master Folder 1 (1)', true, 1);
INSERT INTO public.menu VALUES (4, 'Sub Master Folder 2', true, 2);
INSERT INTO public.menu VALUES (5, 'Sub Sub Master Folder 1', true, 3);
INSERT INTO public.menu VALUES (6, 'Sub Sub Master Folder 2', true, 4);


--
-- TOC entry 3342 (class 0 OID 0)
-- Dependencies: 212
-- Name: m_directory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.m_directory_id_seq', 5, true);


--
-- TOC entry 3343 (class 0 OID 0)
-- Dependencies: 210
-- Name: menu_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.menu_id_seq', 1, false);


--
-- TOC entry 3187 (class 2606 OID 51847)
-- Name: m_directory m_directory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m_directory
    ADD CONSTRAINT m_directory_pkey PRIMARY KEY (id);


--
-- TOC entry 3181 (class 2606 OID 51745)
-- Name: m_user m_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m_user
    ADD CONSTRAINT m_user_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3183 (class 2606 OID 51747)
-- Name: m_user m_user_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m_user
    ADD CONSTRAINT m_user_username_key UNIQUE (username);


--
-- TOC entry 3185 (class 2606 OID 51830)
-- Name: menu menu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_pkey PRIMARY KEY (id);


--
-- TOC entry 3189 (class 2606 OID 51848)
-- Name: m_directory m_directory_parent_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m_directory
    ADD CONSTRAINT m_directory_parent_fkey FOREIGN KEY (parent) REFERENCES public.m_directory(id) ON DELETE CASCADE;


--
-- TOC entry 3188 (class 2606 OID 51831)
-- Name: menu menu_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.menu(id) ON DELETE CASCADE;


-- Completed on 2025-04-09 10:48:28

--
-- PostgreSQL database dump complete
--

