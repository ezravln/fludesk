import AppError from "../errors/appError"

export default function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
      data: null,
    })
  }

  console.log(err)

  return res.status(500).json({
    status: 500,
    message: "Internal server error",
    data: null,
  })
}
