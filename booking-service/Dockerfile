FROM golang:1.26-alpine AS builder

WORKDIR /app

COPY go.mod ./
COPY go.sum ./

RUN go mod download

COPY . .

RUN go build -o booking-service ./cmd/app

FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/booking-service .

EXPOSE 8081

CMD ["./booking-service"]