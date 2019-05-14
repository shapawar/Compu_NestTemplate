-- Table: public.user_entity

CREATE TABLE public.user_entity
(
    id integer NOT NULL DEFAULT nextval('user_entity_id_seq'::regclass),
    username character varying COLLATE pg_catalog."default" NOT NULL,
    email character varying COLLATE pg_catalog."default" NOT NULL,
    mobile bigint NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    address text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.user_entity
    OWNER to postgres;