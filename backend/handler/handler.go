package handler

type Server struct{}

func InitializeServer(router EchoRouter, baseURL string) {
	RegisterHandlersWithBaseURL(router, &Server{}, baseURL)
}
