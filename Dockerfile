# build stage
FROM golang:1.12 as builder

WORKDIR /app

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

RUN go build -o anon-chat

# final stage
FROM alpine:3.9.2

WORKDIR /app

COPY --from=builder /app/anon-chat /app/

EXPOSE 3001

ENTRYPOINT ["/app/anon-chat"]