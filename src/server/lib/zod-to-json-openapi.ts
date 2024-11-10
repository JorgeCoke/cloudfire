import { z, type ZodType, type ZodTypeAny } from "zod";
import { HTTPException } from "hono/http-exception";
import { StatusCode } from "hono/utils/http-status";

export class HttpException extends HTTPException {
  constructor(error: { status: StatusCode; message: string }) {
    super(error.status, { message: error.message });
  }
}

export const HttpExceptionZod = z.object({
  message: z.string(),
});
export type HttpExceptionZod = z.infer<typeof HttpExceptionZod>;

export const openApiBearerGuard = () => {
  return [
    {
      Bearer: [],
    },
  ];
};

// Convert Zod schema to OpenApi Body Request specification
export const openApiRequest = <T extends ZodTypeAny>(opts: { body: T }) => {
  return {
    ...(opts.body && {
      body: {
        content: {
          "application/json": {
            schema: opts.body,
          },
        },
      },
    }),
  };
};

// Convert Zod schema to OpenApi response specification
export const openApiResponse = <T extends ZodTypeAny>(
  zod: T,
  status: number,
  description: string
) => {
  return {
    [status]: {
      description,
      content: {
        "application/json": {
          schema: zod,
        },
      },
    },
  };
};

// Convert custom errors to OpenApi response specification
export const openApiErrors = (
  errors: { status: number; message: string }[]
) => {
  const responses: {
    [key: number]: {
      description: string;
      content: {
        "application/json": {
          schema: ZodType<HttpExceptionZod>;
        };
      };
    };
  } = {};
  for (const e of errors) {
    responses[e.status] = {
      description: e.message,
      content: {
        "application/json": {
          schema: HttpExceptionZod,
        },
      },
    };
  }
  return responses;
};
