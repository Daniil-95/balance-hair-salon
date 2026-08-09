import { Prisma } from "@prisma/client";

type PrismaErrorMeta = {
  code?: string;
  message: string;
  context?: string;
};

function buildPrismaErrorMeta(error: unknown, context?: string): PrismaErrorMeta {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P1000") {
      return {
        code: error.code,
        context,
        message: "Prisma auth failed (P1000). Check DB user/password in DATABASE_URL or DIRECT_URL.",
      };
    }

    return {
      code: error.code,
      context,
      message: `Prisma known error (${error.code}). ${error.message}`,
    };
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    const raw = error.message.toLowerCase();

    if (raw.includes("ssl") || raw.includes("tls")) {
      return {
        context,
        message: "Prisma SSL/TLS issue. Ensure connection string includes sslmode=require.",
      };
    }

    if (raw.includes("timed out") || raw.includes("timeout")) {
      return {
        context,
        message: "Prisma connection timeout. Check network access, host/port, and Supabase status.",
      };
    }

    return {
      context,
      message: `Prisma initialization error. ${error.message}`,
    };
  }

  if (error instanceof Error) {
    const raw = error.message.toLowerCase();

    if (raw.includes("ssl") || raw.includes("tls")) {
      return {
        context,
        message: "Database SSL/TLS error detected. Ensure sslmode=require is enabled.",
      };
    }

    if (raw.includes("timed out") || raw.includes("timeout")) {
      return {
        context,
        message: "Database connection timeout detected.",
      };
    }

    return {
      context,
      message: error.message,
    };
  }

  return {
    context,
    message: "Unknown database error.",
  };
}

export function logPrismaError(error: unknown, context?: string) {
  const info = buildPrismaErrorMeta(error, context);

  console.error("[prisma]", {
    code: info.code,
    context: info.context,
    message: info.message,
    error,
  });
}

export function toPublicPrismaMessage(error: unknown): string {
  const info = buildPrismaErrorMeta(error);
  return info.message;
}
