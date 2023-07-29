CREATE SCHEMA lumi;

CREATE TABLE lumi.cliente (
    "cli_id" UUID NOT NULL,
    "cli_name" VARCHAR,
    "cli_month" VARCHAR,
    "cli_due_date" VARCHAR,
    "cli_ee_kwh" VARCHAR,
    "cli_ee_unitvalue" VARCHAR,
    "cli_ee_total" MONEY,
    "cli_ij_kwh" VARCHAR,
    "cli_ij_unitvalue" VARCHAR,
    "cli_ij_total" MONEY,
    "cli_icms_kwh" VARCHAR,
    "cli_icms_unitvalue" VARCHAR,
    "cli_icms_total" MONEY,
    "cli_public" VARCHAR,
    "cli_total" MONEY,
    "cli_created_at" TIMESTAMP(6),
    "cli_updated_at" TIMESTAMP(6),
    "cli_deleted_at" TIMESTAMP(6),
    CONSTRAINT "pk_cli_id" PRIMARY KEY ("cli_id")
);
